import { products } from "../data/products";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
export default function Wishlist() {
  const { wish } = useStore();
  const l = products.filter((p) => wish.includes(p.id));
  return (
    <div className="wrap">
      <h1>Wishlist</h1>
      {l.length ? (
        <div className="grid">
          {l.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p>
          No saved items. <Link to="/shop">Browse fragrances</Link>
        </p>
      )}
    </div>
  );
}
