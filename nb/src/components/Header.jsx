import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { naira } from "../data/products";
export const Logo = () => (
  <Link to="/" className="logo" aria-label="Nenny Blair Fragrance home">
    <span className="mono">NB</span>
    <span>
      <b>NENNY BLAIR</b>
      <small>FRAGRANCE</small>
    </span>
  </Link>
);
const links = [
  ["/", "Home"],
  ["/shop", "Shop All"],
  ["/shop/Women", "Women"],
  ["/shop/Men", "Men"],
  ["/shop/Unisex", "Unisex"],
];
export default function () {
  const {
    count,
    subtotal,
    wish,
    drawer,
    setDrawer,
    lines,
    setQty,
    removeItem,
  } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const go = (e) => {
    e.preventDefault();
    nav("/shop?q=" + encodeURIComponent(q));
  };
  return (
    <header>
      <div className="util">
        <div className="wrap">
          <span>
            <Link to="/signin">About Us</Link>
            <Link to="/signin">My Account</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Order Tracking</Link>
          </span>
          <span>
            Need help? Contact us via the site{" "}
            <select aria-label="Currency">
              <option>NGN ₦</option>
            </select>
          </span>
        </div>
      </div>
      <div className="wrap bar">
        <button
          className="icon mob"
          aria-label="Menu"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
        <Logo />
        <form className="search" onSubmit={go}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search perfume or brand…"
            aria-label="Search"
          />
          <button aria-label="Search">
            <Search size={18} />
          </button>
        </form>
        <nav className="icons">
          <Link className="icon" to="/signin" aria-label="Account">
            <User />
          </Link>
          <Link className="icon" to="/wishlist" aria-label="Wishlist">
            <Heart />
            <i>{wish.length}</i>
          </Link>
          <button
            className="icon"
            onClick={() => setDrawer(true)}
            aria-label="Cart"
          >
            <ShoppingBag />
            <i>{count}</i>
          </button>
          <span className="sub">{naira(subtotal)}</span>
        </nav>
      </div>
      <nav className="menu wrap">
        <Link className="allcat" to="/shop">
          <Menu size={16} /> ALL CATEGORIES
        </Link>
        {links.map(([to, t]) => (
          <NavLink key={t} end to={to}>
            {t}
          </NavLink>
        ))}
      </nav>
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <aside className="panel left" onClick={(e) => e.stopPropagation()}>
            <button
              className="icon"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X />
            </button>
            {links.map(([to, t]) => (
              <Link key={t} to={to} onClick={() => setOpen(false)}>
                {t}
              </Link>
            ))}
            <Link to="/signin" onClick={() => setOpen(false)}>
              Sign In / Register
            </Link>
          </aside>
        </div>
      )}
      {drawer && (
        <div className="overlay" onClick={() => setDrawer(false)}>
          <aside className="panel right" onClick={(e) => e.stopPropagation()}>
            <button
              className="icon"
              onClick={() => setDrawer(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <h3>Your Cart</h3>
            {lines.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              lines.map((l) => (
                <div className="line" key={l.id}>
                  <div>
                    <b>{l.name}</b>
                    <small>{naira(l.price)}</small>
                  </div>
                  <div className="qty">
                    <button
                      onClick={() => setQty(l.id, l.qty - 1)}
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    {l.qty}
                    <button
                      onClick={() => setQty(l.id, l.qty + 1)}
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(l.id)}
                      aria-label="Remove"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
            <p>
              <b>Subtotal: {naira(subtotal)}</b>
            </p>
            <Link
              className="btn"
              to={lines.length ? "/cart" : "/shop"}
              onClick={() => setDrawer(false)}
            >
              {lines.length ? "View Cart" : "Continue Shopping"}
            </Link>
          </aside>
        </div>
      )}
    </header>
  );
}
