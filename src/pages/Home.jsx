import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModal";

export default function Home({ cart, addToCart, isWishlisted, toggleWishlist }) {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const categories = useMemo(
    () => ["all", ...new Set(products.map((item) => item.category))],
    [products]
  );
  const visibleProducts = useMemo(() => {
    let filteredList = products.filter(
      (item) =>
        (selectedCategory === "all" || item.category === selectedCategory) &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "price-asc") {
      filteredList = [...filteredList].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filteredList = [...filteredList].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filteredList = [...filteredList].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      filteredList = [...filteredList].sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return filteredList;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const areFiltersActive = searchQuery !== "" || selectedCategory !== "all" || sortBy !== "default";

  const relatedProducts = selectedProduct
    ? products
        .filter((item) => item.category === selectedProduct.category && item.id !== selectedProduct.id)
        .slice(0, 4)
    : [];

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
  }

  function startVoiceSearch() {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      toast.error("Voice search is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-IN";
    
    recognition.onstart = () => setIsVoiceListening(true);
    recognition.onend = () => setIsVoiceListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.start();
  }

  return (
    <>
     
      <section className="bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-14 text-center text-white">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Find something you&rsquo;ll love
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/80">
          Browse our collection, save favourites, and check out in seconds.
        </p>

      
        <div className="relative mx-auto mt-7 max-w-xl">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-white py-3.5 pl-12 pr-24 text-gray-900 shadow-xl outline-none ring-2 ring-transparent transition focus:ring-white/70"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          )}
          <button
            onClick={startVoiceSearch}
            aria-label="Voice search"
            className={`absolute right-4 top-1/2 -translate-y-1/2 text-lg transition ${
              isVoiceListening ? "animate-pulse" : "opacity-70 hover:opacity-100"
            }`}
          >
            🎤
          </button>
        </div>
      </section>

     
      <main className="mx-auto max-w-7xl px-5 py-8">
        
      
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition active:scale-95 ${
                selectedCategory === category
                  ? "border-indigo-600 bg-indigo-600 text-white shadow"
                  : "border-gray-300 bg-white hover:border-indigo-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              }`}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {loading ? (
              "Loading products..."
            ) : (
              <>
                Showing <b>{visibleProducts.length}</b> of {products.length} products
              </>
            )}
            {areFiltersActive && (
              <button
                onClick={handleResetFilters}
                className="ml-3 text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Reset filters
              </button>
            )}
          </p>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top rated</option>
            <option value="name">Name: A → Z</option>
          </select>
        </div>

       
        <ProductList
          products={visibleProducts}
          loading={loading}
          error={error}
          onSelect={setSelectedProduct}
          onReset={handleResetFilters}
          cart={cart}
          addToCart={addToCart}
          isWishlisted={isWishlisted}
          toggleWishlist={toggleWishlist}
        />
      </main>

  
      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          related={relatedProducts}
          onSelectRelated={setSelectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          isWishlisted={isWishlisted}
          toggleWishlist={toggleWishlist}
        />
      )}

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-20 flex h-12 w-12 animate-fade-in items-center justify-center rounded-full bg-indigo-600 text-xl text-white shadow-lg transition hover:bg-indigo-700 active:scale-90"
        >
          ↑
        </button>
      )}
    </>
  );
}