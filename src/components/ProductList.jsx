import ProductCard from "./ProductCard";

const GRID_LAYOUT_CLASSES = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4";

export default function ProductList({
  products,
  loading,
  error,
  onSelect,
  onReset,
  cart,
  addToCart,
  isWishlisted,
  toggleWishlist,
}) {

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-5xl">⚠️</p>
        <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          {error}
        </p>
        <p className="text-sm text-gray-500">Check your internet connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }


  if (loading) {
    return (
      <div className={GRID_LAYOUT_CLASSES}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="h-52 bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-3 p-4">
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }


  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-5xl">🔍</p>
        <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          No products found
        </p>
        <p className="text-sm text-gray-500">Try searching with a different keyword or category.</p>
        <button
          onClick={onReset}
          className="mt-4 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Reset filters
        </button>
      </div>
    );
  }

  return (
    <div className={GRID_LAYOUT_CLASSES}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onSelect={onSelect}
          cart={cart}
          addToCart={addToCart}
          isWishlisted={isWishlisted}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}