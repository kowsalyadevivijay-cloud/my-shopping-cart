function Badge({ count }) {
  if (count <= 0) return null;

  return (
    <span
      key={count}
      className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-pop items-center justify-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white shadow-sm"
    >
      {count}
    </span>
  );
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  theme,
  onToggleTheme,
}) {
 
  const iconButtonStyle =
    "relative flex h-10 w-10 items-center justify-center rounded-full text-xl transition-colors hover:bg-gray-100 active:scale-95 dark:hover:bg-gray-800";

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        
    
        <a
          href="/"
          className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent transition-opacity hover:opacity-90"
        >
          ShopEase
        </a>

   
        <div className="flex items-center gap-2">
          
         
          <button
            onClick={onToggleTheme}
            className={iconButtonStyle}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

     
          <button
            onClick={onWishlistClick}
            className={iconButtonStyle}
            aria-label="Open wishlist"
          >
            ❤️
            <Badge count={wishlistCount} />
          </button>

          <button
            onClick={onCartClick}
            className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95"
          >
            <span>🛒 Cart</span>
            <span
              key={cartCount}
              className="animate-pop rounded-full bg-white px-2 py-0.5 text-xs font-bold text-indigo-600 shadow-xs"
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}