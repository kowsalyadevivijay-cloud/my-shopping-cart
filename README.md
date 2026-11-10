<div align="center">

# 🛍️ ShopEase

**A modern shopping cart experience built with React**

Browse products, save favourites, and check out in seconds.

![React]
![Vite]
![Tailwind CSS]
![JavaScript]
![Netlify]

[**Live Demo**](https://shopease-cart-app.netlify.app) · [**Report a Bug**](https://github.com/kowsalyadevivijay-cloud/my-shopping-cart/issues)

</div>

---

## 📖 About

ShopEase is a responsive e-commerce front end that pulls live product data from the [Fake Store API](https://fakestoreapi.com/). Users can search and filter products, add them to a cart, manage quantities in a slide-in cart panel, and keep a wishlist of items they like.

The project focuses on clean component structure, reusable custom hooks, and a smooth user experience on both desktop and mobile.

## ✨ Features

### Core

- **Live product data** fetched from the Fake Store API (image, title, rating, price)
- **Add to Cart** button on every product card
- **Duplicate protection** that shows an alert, "Item already added to the cart", when a product is already in the cart
- **Cart counter** in the navbar that updates instantly
- **Cart modal** that lists every item with:
  - Quantity controls (+ / −)
  - Remove button for each item
  - Undo option after removing an item
  - Subtotal, shipping fee and total amount
  - Clear entire cart

other features

- 🔍 **Search** by product name, with **voice search** in supported browsers
- 🗂️ **Category filters** and **sorting** by price, rating or name
- ❤️ **Wishlist** with its own tab inside the cart panel
- 👁️ **Quick View** modal for product details
- 🚚 **Free shipping progress bar** in the cart
- 🌙 **Dark mode**
- 📱 **Fully responsive** layout for desktop, tablet and mobile

## 🧰 Tech Stack

| Technology | Purpose |
| --- | --- |
| React | UI components and state management |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive design |
| JavaScript | Application logic |
| Fake Store API | Product data |

## 📁 Project Structure

```
src/
├── components/   # ProductCard, ProductList, ProductModal, Stars, etc.
├── hooks/        # useCart, useProducts, useWishlist, useModalBehavior
├── pages/        # Home page
├── services/     # api.js (Fake Store API calls)
├── App.jsx
└── main.jsx      # Entry point
```

**How data flows:** cart, wishlist and product logic live in custom hooks. The state and handler functions are passed down to child components as props, which keeps the components simple and reusable.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kowsalyadevivijay-cloud/my-shopping-cart.git

# 2. Move into the project folder
cd my-shopping-cart

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build in the `dist` folder |
| `npm run preview` | Previews the production build locally |

## 🌐 API

Products are fetched from the Fake Store API:

```
GET https://fakestoreapi.com/products
```

## ☁️ Deployment

The app is deployed on Netlify. To deploy your own copy:

1. Push the project to GitHub
2. Connect the repository in Netlify
3. Use these settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |

## 🗺️ Future Improvements

- Persist the cart and wishlist using local storage
- Add a real checkout flow
- Add user authentication

## 👤 Author

**Kowsalya Devi**

- GitHub: [@kowsalyadevivijay-cloud](https://github.com/kowsalyadevivijay-cloud)
