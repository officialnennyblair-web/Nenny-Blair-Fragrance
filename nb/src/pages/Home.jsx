import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const best = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);
  const fresh = [...products].sort((a, b) => b.order - a.order).slice(0, 5);
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <h1>Find Your Signature Scent</h1>
          <p>
            Explore captivating fragrances for every mood, moment, and occasion.
          </p>
          <Link className="btn" to="/shop">
            Shop Collection
          </Link>
        </div>
      </section>
      <h2>Best Sellers</h2>
      <div className="grid">
        {best.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
      <section className="promo">
        <h2>Seasonal Offer</h2>
        <p>Free delivery on orders above ₦300,000 (sample offer).</p>
        <Link className="btn gold" to="/shop">
          Shop Offers
        </Link>
      </section>
      <h2>New Arrivals</h2>
      <div className="grid">
        {fresh.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
