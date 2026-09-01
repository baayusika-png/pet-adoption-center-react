import { createContext, useContext, useEffect, useState } from "react";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import { useAuth } from "./authContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user || !token) {
        setWishlist([]);
        return;
      }

      try {
        setLoading(true);

        const data = await getWishlist(token);

        setWishlist(data);
      } catch (error) {
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [user, token]);

  const isInWishlist = (petId) => {
    return wishlist.some((item) => Number(item.id) === Number(petId));
  };

  const toggleWishlist = async (pet) => {
    if (!user || !token) {
      alert("Please login first.");
      return;
    }

    const liked = isInWishlist(pet.id);

    try {
      if (liked) {
        const wishlistItem = wishlist.find(
          (item) => Number(item.id) === Number(pet.id),
        );

        if (!wishlistItem) {
          return;
        }

        await removeFromWishlist(wishlistItem.wishlist_id, token);

        setWishlist((previousWishlist) =>
          previousWishlist.filter((item) => Number(item.id) !== Number(pet.id)),
        );
      } else {
        await addToWishlist(pet.id, token);

        const updatedWishlist = await getWishlist(token);

        setWishlist(updatedWishlist);
      }
    } catch (error) {
      alert(error.message);
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
