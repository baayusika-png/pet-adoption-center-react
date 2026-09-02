import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]); //Stores all wishlist item of the logged in user
  const [loading, setLoading] = useState(false); //Used to show whether data is currently loading

  const { user } = useAuth(); //Get the current logged in user for AuthContext
  const token = sessionStorage.getItem("token"); //Get authentocatiio token from sessionStorage.

  useEffect(() => {
    //Function to fetch the user's wishlist from the backend
    const loadWishlist = async () => {
      //If there is no logged in user or no token there is no wishlist to load
      if (!user || !token) {
        setWishlist([]);
        return;
      }

      try {
        setLoading(true); //Start the loading state before calling the API

        const data = await getWishlist(token); //Get wishlist data from the backend

        setWishlist(data); //Stores the received wishlist data in state
      } catch (error) {
        setWishlist([]); //If API request fails clear the wishlist
      } finally {
        setLoading(false); //Stop the loading whether the request suceeds or failed.
      }
    };

    loadWishlist(); //Call the function when the effect runs
  }, [user, token]);

  //Return true if selected pet is already in wishlist and retun false if the pet is not in wishlist
  const isInWishlist = (petId) => {
    return wishlist.some((item) => Number(item.id) === Number(petId));
  };

  //Add or remove pet from wishlist
  const toggleWishlist = async (pet) => {
    //User must be logged in before using the wishlist
    if (!user || !token) {
      alert("Please login first.");
      return;
    }

    //Check whether this pet is already in wishlist
    const liked = isInWishlist(pet.id);

    try {
      //If pet already in wishlist then remove it
      if (liked) {
        const wishlistItem = wishlist.find(
          (item) => Number(item.id) === Number(pet.id),
        );

        //If wishlist item cannot be found stop the function
        if (!wishlistItem) {
          return;
        }

        //Send the wishlist ID to backend so that specific pet is deleted from wishlist
        await removeFromWishlist(wishlistItem.wishlist_id, token);

        //Remove the pet from state
        setWishlist(
          (previousWishlist) =>
            previousWishlist.filter(
              (item) => Number(item.id) !== Number(pet.id),
            ), //.filter() creates a new array without the removed pet
        );
      }
      //If pet is not in wishlist add it
      else {
        await addToWishlist(pet.id, token); //Send the pet ID to backend to add it in user wishlist

        //Fetch the updated wishlist from backend
        const updatedWishlist = await getWishlist(token);

        setWishlist(updatedWishlist); //Update state with latest wishlist
      }
    } catch (error) {
      alert(error.message); //Show error message to user in case of error while add/remove
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
