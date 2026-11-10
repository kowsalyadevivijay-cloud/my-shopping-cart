import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        
        if (!isCancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      isCancelled = true;
    };
  }, []);

  return { products, loading, error };
}