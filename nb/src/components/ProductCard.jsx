import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { naira } from "../data/products";
import Bottle from "./Bottle";
export default function ProductCard({ p }) {
  const { addToCart, toggleWish, wish } = useStore();
  const liked = wish.includes(p.id);
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return (
    <article className="card">
      {off > 0 && <span className="badge">-{off}%</span>}
      <button
        className={"heart" + (liked ? " on" : "")}
        aria-label="Toggle wishlist"
        onClick={() => toggleWish(p.id)}
      >
        <Heart size={18} fill={liked ? "currentColor" : "none"} />
      </button>
      <Link to={`/product/${p.id}`} className="img">
        <Bottle hue={p.hue} image={p.image} alt={`${p.brand} ${p.name}`} />
      </Link>
      <small className="muted">{p.brand}</small>
      <Link to={`/product/${p.id}`} className="title">
        {p.name}
      </Link>
      <small className="muted">{p.size}</small>
      <div className="rate">
        <Star size={14} fill="#C7A45A" stroke="#C7A45A" /> {p.rating} (
        {p.reviews})
      </div>
      <div className="price">
        {naira(p.price)} {p.oldPrice && <s>{naira(p.oldPrice)}</s>}
      </div>
      <small className={p.stock ? "ok" : "bad"}>
        {p.stock ? `In stock (${p.stock})` : "Out of stock"}
      </small>
      <button
        className="btn"
        disabled={!p.stock}
        onClick={() => addToCart(p.id)}
      >
        <ShoppingBag size={16} /> Add to Cart
      </button>
    </article>
  );
}
