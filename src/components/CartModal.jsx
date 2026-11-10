import { useState } from "react";
import toast from "react-hot-toast";
import useModalBehavior from "../hooks/useModalBehavior";

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_FEE = 5.99;

export default function CartModal({
  onClose,
  initialTab = "cart",
  cart,
  cartCount,
  cartTotal,
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  wishlist,
  wishlistCount,
  removeFromWishlist,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useModalBehavior(onClose);

 
  const shippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal;
  const currentShippingFee =
    cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : STANDARD_SHIPPING_FEE;

  function handleMoveToCart(product) {
    addToCart(product);
    removeFromWishlist(product.id);
  }

  const getTabStyles = (tabName) =>
    `flex-1 border-b-2 py-3 text-center text-sm font-medium transition ${
      activeTab === tabName
        ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
        : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
    }`;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 animate-fade-in bg-black/50 backdrop-blur-sm"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in flex-col bg-white shadow-2xl dark:bg-gray-900"
      >
      
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {activeTab === "cart" ? "Your Cart" : "Your Wishlist"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 flex border-b border-gray-200 px-5 dark:border-gray-800">
          <button onClick={() => setActiveTab("cart")} className={getTabStyles("cart")}>
            🛒 Cart ({cartCount})
          </button>
          <button onClick={() => setActiveTab("wishlist")} className={getTabStyles("wishlist")}>
            ❤️ Wishlist ({wishlistCount})
          </button>
        </div>

      
        <div className="flex-1 overflow-y-auto px-5 py-4">
          
  
          {activeTab === "cart" && (
            cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                <p className="text-6xl">🛒</p>
                <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Your cart is empty
                </p>
                <p className="text-sm">Explore products and add your favorites!</p>
                <button
                  onClick={onClose}
                  className="mt-4 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Browse products
                </button>
              </div>
            ) : (
              <>
              
                <div className="mb-4 rounded-xl bg-indigo-50 p-3 text-sm dark:bg-indigo-950/50">
                  <p className="mb-2 font-medium text-gray-800 dark:text-gray-200">
                    {amountNeededForFreeShipping > 0
                      ? `Add $${amountNeededForFreeShipping.toFixed(2)} more for free shipping 🚚`
                      : "🎉 You've unlocked free shipping!"}
                  </p>
                  <div className="h-2 overflow-hidden rounded-full bg-indigo-100 dark:bg-gray-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex animate-fade-in gap-3 border-b border-gray-100 py-4 dark:border-gray-800"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 shrink-0 rounded-lg bg-white object-contain p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <p title={item.title} className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>

                      <div className="mt-2 inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="h-8 w-8 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-2">
                      <strong className="text-sm font-semibold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )
          )}

          {activeTab === "wishlist" && (
            wishlist.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                <p className="text-6xl">💔</p>
                <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Your wishlist is empty
                </p>
                <p className="text-sm">Tap the heart icon on any product to save it here.</p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex animate-fade-in gap-3 border-b border-gray-100 py-4 dark:border-gray-800"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 shrink-0 rounded-lg bg-white object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p title={item.title} className="line-clamp-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.title}
                    </p>
                    <p className="mt-1 font-bold text-indigo-600 dark:text-indigo-400">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 active:scale-95"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {activeTab === "cart" && cart.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal ({cartCount} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Shipping Fee</span>
              <span>{currentShippingFee === 0 ? "Free" : `$${currentShippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
              <span>Total Amount</span>
              <span>${(cartTotal + currentShippingFee).toFixed(2)}</span>
            </div>

            <button
              onClick={() => toast.success("Checkout simulation successful! 🎉")}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              Clear entire cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}