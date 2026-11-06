import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products, naira } from "../data/products";
import { useStore } from "../context/StoreContext";
import Bottle from "../components/Bottle";
import ProductCard from "../components/ProductCard";
export default function ProductDetails() {
  const { id } = useParams();
  const p = products.find((x) => x.id === +id);
  const { addToCart, toggleWish, wish } = useStore();
  const [q, setQ] = useState(1);
  const nav = useNavigate();
  if (!p)
    return (
      <div className="wrap center">
        <p>Product not found.</p>
        <Link className="btn" to="/shop">
          Back to shop
        </Link>
      </div>
    );
  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 5);
  return (
    <div className="wrap">
      <p className="muted">
        <Link to="/">Home</Link> ›{" "}
        <Link to={`/shop/${p.category}`}>{p.category}</Link> › {p.name}
      </p>
      <div className="detail">
        <div className="big">
          <Bottle
            hue={product.hue}
            image={product.image}
            alt={`${product.brand} ${product.name}`}
          />
        </div>
        <div>
          <small className="muted">{p.brand}</small>
          <h1>{p.name}</h1>
          <p>
            ★ {p.rating} ({p.reviews} sample reviews)
          </p>
          <div className="price">
            {naira(p.price)} {p.oldPrice && <s>{naira(p.oldPrice)}</s>}
          </div>
          <p>{p.description}</p>
          <p>
            <b>Size:</b> {p.size} · <b>Family:</b> {p.family}
          </p>
          <p>
            <b>Notes:</b> Top {p.notes[0]}, Middle {p.notes[1]}, Base{" "}
            {p.notes[2]}
          </p>
          <p>
            <b>Longevity:</b> 6–8 hrs · <b>Projection:</b> Moderate (sample
            info)
          </p>
          <p className={p.stock ? "ok" : "bad"}>
            {p.stock ? `In stock (${p.stock})` : "Out of stock"}
          </p>
          <div className="qty">
            <button onClick={() => setQ(Math.max(1, q - 1))}>−</button>
            {q}
            <button onClick={() => setQ(Math.min(p.stock || 1, q + 1))}>
              +
            </button>
          </div>
          <div className="row">
            <button
              className="btn"
              disabled={!p.stock}
              onClick={() => addToCart(p.id, q)}
            >
              Add to Cart
            </button>
            <button
              className="btn gold"
              disabled={!p.stock}
              onClick={() => {
                addToCart(p.id, q);
                nav("/checkout");
              }}
            >
              Buy Now
            </button>
            <button className="btn ghost" onClick={() => toggleWish(p.id)}>
              {wish.includes(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
          <p className="muted">
            Delivery: 2–5 working days (sample information).
          </p>
        </div>
      </div>
      <h2>Related Products</h2>
      <div className="grid">
        {related.map((r) => (
          <ProductCard key={r.id} p={r} />
        ))}
      </div>
    </div>
  );
}
