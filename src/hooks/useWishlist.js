import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function loadWishlist() {
  try {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  } catch {
    return [];
  }
}
export default function useWishlist() {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch {
  
    }
  }, [wishlist]);

  function isWishlisted(id) {
    return wishlist.some((item) => item.id === id);
  }

  function toggleWishlist(product) {
    if (isWishlisted(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast("Removed from wishlist", { icon: "💔" });
    } else {
      setWishlist((prev) => [...prev, product]);
      toast.success("Added to wishlist ❤️");
    }
  }

  function removeFromWishlist(id) {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }

  return {
    wishlist,
    wishlistCount: wishlist.length,
    isWishlisted,
    toggleWishlist,
    removeFromWishlist,
  };
}