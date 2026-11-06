import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { naira } from "../data/products";
export default function Cart() {
  const { lines, setQty, removeItem, subtotal, delivery, total } = useStore();
  if (!lines.length)
    return (
      <div className="wrap center">
        <h2>Your cart is empty</h2>
        <Link className="btn" to="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  return (
    <div className="wrap">
      <h1>Shopping Cart</h1>
      {lines.map((l) => (
        <div className="line" key={l.id}>
          <div>
            <b>{l.name}</b>
            <small>
              {naira(l.price)} × {l.qty} = {naira(l.price * l.qty)}
            </small>
          </div>
          <div className="qty">
            <button onClick={() => setQty(l.id, l.qty - 1)}>−</button>
            {l.qty}
            <button
              onClick={() => setQty(l.id, l.qty + 1)}
              disabled={l.qty >= l.stock}
            >
              +
            </button>
            <button onClick={() => removeItem(l.id)}>Remove</button>
          </div>
        </div>
      ))}
      <p>Subtotal: {naira(subtotal)}</p>
      <p>Delivery (sample): {naira(delivery)}</p>
      <h3>Estimated total: {naira(total)}</h3>
      <Link className="btn" to="/checkout">
        Proceed to Checkout
      </Link>
    </div>
  );
}
