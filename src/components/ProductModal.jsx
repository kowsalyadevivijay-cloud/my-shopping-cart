import useModalBehavior from "../hooks/useModalBehavior";
import Stars from "./Stars";

export default function ProductModal({
  product,
  related = [],
  onSelectRelated,
  onClose,
  addToCart,
  isWishlisted,
  toggleWishlist,
}) {

  useModalBehavior(onClose);

  const isLiked = isWishlisted(product.id);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[90vh] w-full max-w-3xl animate-scale-in overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-gray-900 md:grid-cols-2"
      >
      
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          ✕
        </button>

     
        <div className="flex items-center justify-center bg-white p-8 dark:bg-gray-900/50">
          <img
            src={product.image}
            alt={product.title}
            className="h-72 w-full object-contain"
          />
        </div>

      
        <div className="flex flex-col gap-3 p-6">
          <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium capitalize text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {product.category}
          </span>
          
          <h2 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
            {product.title}
          </h2>
          
          <Stars rate={product.rating?.rate} count={product.rating?.count} />
          
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          
          <p className="mt-auto text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            ${product.price.toFixed(2)}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="w-12 rounded-xl border border-gray-300 text-xl transition hover:bg-gray-100 active:scale-90 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

       
        {related.length > 0 && (
          <div className="border-t border-gray-200 p-6 dark:border-gray-800 md:col-span-2">
            <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
              You may also like
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectRelated(item)}
                  className="rounded-xl border border-gray-200 p-2 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-full rounded-lg bg-white object-contain p-1"
                  />
                  <p className="mt-2 line-clamp-1 text-xs text-gray-800 dark:text-gray-200">
                    {item.title}
                  </p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    ${item.price.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}