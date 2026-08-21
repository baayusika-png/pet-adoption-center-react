import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(); //Creates a context for managing wishlist data

//Provider components
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    //Stores wishlist items in state
    const saved = localStorage.getItem("wishlist"); //Load saved wishlist from localStorage
    return saved ? JSON.parse(saved) : []; //Return saved wishlish otherwise start with an empty array
  });

  //Save wishlist to localStorage whenever list changers
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (petId) => {
    //Check whether pet already exist in wishlist
    return wishlist.some((item) => item.id === petId);
  };

  //Add or remove pet from wishlist
  const toggleWishlist = (pet) => {
    setWishlist((prev) => {
      //Check if selected pet is already in the wishlist
      const exists = prev.some((item) => item.id === pet.id);

      //If pet exist then remove
      if (exists) {
        return prev.filter((item) => item.id !== pet.id);
      } else {
        //If it doesn't then add
        return [...prev, pet];
      }
    });
  };

  //Provide wishlist data and functions to child components
  return (
    <WishlistContext.Provider
      value={{ wishlist, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
