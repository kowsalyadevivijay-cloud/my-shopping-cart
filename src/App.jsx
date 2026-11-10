import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import Home from "./pages/Home";
import useCart from "./hooks/useCart";
import useWishlist from "./hooks/useWishlist";

export default function App() {
 
  const [modalTab, setModalTab] = useState(null); 
  
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const cart = useCart();
  const wishlist = useWishlist();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "12px",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#f9fafb" : "#111827",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />

      <Navbar
        cartCount={cart.cartCount}
        wishlistCount={wishlist.wishlistCount}
        onCartClick={() => setModalTab("cart")}
        onWishlistClick={() => setModalTab("wishlist")}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />


      <Home
        cart={cart.cart}
        addToCart={cart.addToCart}
        isWishlisted={wishlist.isWishlisted}
        toggleWishlist={wishlist.toggleWishlist}
      />


      {modalTab && (
        <CartModal
          initialTab={modalTab}
          onClose={() => setModalTab(null)}
          cart={cart.cart}
          cartCount={cart.cartCount}
          cartTotal={cart.cartTotal}
          addToCart={cart.addToCart}
          increaseQty={cart.increaseQty}
          decreaseQty={cart.decreaseQty}
          removeFromCart={cart.removeFromCart}
          clearCart={cart.clearCart}
          wishlist={wishlist.wishlist}
          wishlistCount={wishlist.wishlistCount}
          removeFromWishlist={wishlist.removeFromWishlist}
        />
      )}
    </div>
  );
}