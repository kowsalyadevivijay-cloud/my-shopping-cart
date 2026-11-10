import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return [];
  }
}

export default function useCart() {
  const [cart, setCart] = useState(loadCartFromStorage);
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [cart]);


  function addToCart(product) {
    if (cart.some((item) => item.id === product.id)) {
      toast.error("Item already added to the cart");
      return;
    }
    
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    toast.success("Added to cart");
  }

  function increaseQty(id) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function decreaseQty(id) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }


  function removeFromCart(id) {
    const itemToRemove = cart.find((item) => item.id === id);
    if (!itemToRemove) return;

    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    toast(
      (t) => (
        <span className="flex items-center gap-3 text-sm font-medium">
          Item removed
          <button
            onClick={() => {
             
              setCart((prevCart) =>
                prevCart.some((item) => item.id === itemToRemove.id)
                  ? prevCart
                  : [...prevCart, itemToRemove]
              );
              toast.dismiss(t.id);
            }}
            className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Undo
          </button>
        </span>
      ),
      { duration: 4000 }
    );
  }

  function clearCart() {
    setCart([]);
    toast("Cart cleared", { icon: "🗑️" });
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    cart,
    cartCount,
    cartTotal,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  };
}