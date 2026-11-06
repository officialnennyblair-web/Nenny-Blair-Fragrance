import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { naira } from "../data/products";
export default function Checkout() {
  const { lines, subtotal, delivery, total, clearCart } = useStore();
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    pay: "Pay on Delivery",
  });
  const [err, setErr] = useState({});
  const [order, setOrder] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    ["name", "phone", "address", "state", "city"].forEach((k) => {
      if (!f[k].trim()) x[k] = "Required";
    });
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email";
    setErr(x);
    if (Object.keys(x).length) return;
    setOrder("NB-" + Math.floor(100000 + Math.random() * 900000));
    clearCart();
  };
  if (order)
    return (
      <div className="wrap center">
        <h1>Order placed (demo)</h1>
        <p>
          Simulated order number: <b>{order}</b>
        </p>
        <p>No real payment or delivery was processed.</p>
        <Link className="btn" to="/shop">
          Continue Shopping
        </Link>
      </div>
    );
  if (!lines.length)
    return (
      <div className="wrap center">
        <p>Your cart is empty.</p>
        <Link className="btn" to="/shop">
          Shop
        </Link>
      </div>
    );
  const F = (k, l) => (
    <label>
      {l}
      <input value={f[k]} onChange={set(k)} />
      {err[k] && <small className="bad">{err[k]}</small>}
    </label>
  );
  return (
    <form className="wrap checkout" onSubmit={submit} noValidate>
      <div>
        <h2>Customer & Delivery</h2>
        {F("name", "Full name")}
        {F("email", "Email")}
        {F("phone", "Phone")}
        {F("address", "Street address")}
        {F("state", "State")}
        {F("city", "City")}
        <label>
          Payment (demonstration)
          <select value={f.pay} onChange={set("pay")}>
            <option>Pay on Delivery</option>
            <option>Bank Transfer</option>
            <option>Card Payment</option>
          </select>
        </label>
        <small className="muted">
          Do not enter card details; none are collected.
        </small>
      </div>
      <div>
        <h2>Order Summary</h2>
        {lines.map((l) => (
          <p key={l.id}>
            {l.name} × {l.qty}
          </p>
        ))}
        <p>Subtotal {naira(subtotal)}</p>
        <p>Delivery {naira(delivery)}</p>
        <h3>Total {naira(total)}</h3>
        <button className="btn">Place Order</button>
      </div>
    </form>
  );
}
