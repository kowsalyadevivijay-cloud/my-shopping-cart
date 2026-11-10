import { useState } from "react";
import Stars from "./Stars";

export default function ProductCard({
  product,
  onSelect,
  index = 0,
  cart,
  addToCart,
  isWishlisted,
  toggleWishlist,
}) {
  const [isJustAdded, setIsJustAdded] = useState(false);

  const isLiked = isWishlisted(product.id);
  const cartItem = cart.find((item) => item.id === product.id);

  function handleAddToCart() {
    addToCart(product);
    
   
    if (!cartItem) {
      setIsJustAdded(true);
      setTimeout(() => setIsJustAdded(false), 1200);
    }
  }

  return (
    <article
      style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
      className="group relative flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
 
      <div className="relative overflow-hidden bg-white p-4">
        <img
          src={product.image}
          alt={product.title}
          onClick={() => onSelect(product)}
          className="h-52 w-full cursor-pointer object-contain transition duration-500 group-hover:scale-110"
        />

      
        <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-medium capitalize text-white backdrop-blur-sm">
          {product.category}
        </span>
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow transition hover:scale-110 active:scale-90 dark:bg-gray-800"
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => onSelect(product)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 text-gray-900 shadow-2xl backdrop-blur-md opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:bg-indigo-600 hover:text-white hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] dark:bg-gray-900/95 dark:text-white dark:hover:bg-indigo-600 dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.9)] [@media(hover:none)]:opacity-100 [@media(hover:none)]:scale-100"
          title="Quick View"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wide">Quick View</span>
        </button>
      </div>

     
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3
          title={product.title}
          className="line-clamp-2 min-h-10 text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          {product.title}
        </h3>

        <Stars rate={product.rating?.rate} count={product.rating?.count} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
          {cartItem && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              In cart: {cartItem.quantity}
            </span>
          )}
        </div>

   
        <button
          onClick={handleAddToCart}
          className={`rounded-xl px-4 py-2.5 font-medium text-white transition active:scale-95 ${
            isJustAdded
              ? "bg-emerald-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isJustAdded ? "✓ Added" : cartItem ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}