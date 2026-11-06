import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from "./Header";
export default function Footer() {
  const [e, setE] = useState("");
  const [msg, setMsg] = useState("");
  const sub = (ev) => {
    ev.preventDefault();
    setMsg(
      /^\S+@\S+\.\S+$/.test(e)
        ? "Thanks for subscribing ()."
        : "Please enter a valid email.",
    );
  };
  return (
    <footer>
      <div className="wrap cols">
        <div>
          <Logo />
          <p>Discover Your Signature Scent.</p>
        </div>
        <div>
          <h4>Customer Service</h4>
          <Link to="/shop">Shop All</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/signin">My Account</Link>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/shop/Men">Men's</Link>
          <Link to="/shop/Women">Women's</Link>
          <Link to="/shop/Unisex">Unisex</Link>
        </div>
        <form onSubmit={sub}>
          <h4>Newsletter</h4>
          <input
            value={e}
            onChange={(x) => setE(x.target.value)}
            placeholder="Email address"
            aria-label="Email"
          />
          <button className="btn">Subscribe</button>
          <small>{msg}</small>
        </form>
      </div>
      <p className="copy">
        © {new Date().getFullYear()} Nenny Blair Fragrance store: prices are
        sample data and no real payments are processed.
      </p>
    </footer>
  );
}
