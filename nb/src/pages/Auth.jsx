import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
export default function Auth({ mode }) {
  const { user, setUser } = useStore();
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [e, setE] = useState("");
  if (user)
    return (
      <div className="wrap center">
        <h1>My Account</h1>
        <p>
          Signed in as {user.email} (for custumer only, not secure
          authentication).
        </p>
        <Link className="btn" to="/wishlist">
          Wishlist
        </Link>{" "}
        <button className="btn ghost" onClick={() => setUser(null)}>
          Sign Out
        </button>
      </div>
    );
  const sub = (ev) => {
    ev.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setE("Enter a valid email.");
    if (f.pw.length < 6) return setE("Password must be at least 6 characters.");
    if (mode === "register" && !f.name.trim()) return setE("Name is required.");
    setUser({ email: f.email, name: f.name });
  };
  return (
    <form className="wrap auth" onSubmit={sub}>
      <h1>{mode === "register" ? "Register" : "Sign In"}</h1>
      {mode === "register" && (
        <label>
          Name
          <input
            value={f.name}
            onChange={(x) => setF({ ...f, name: x.target.value })}
          />
        </label>
      )}
      <label>
        Email
        <input
          value={f.email}
          onChange={(x) => setF({ ...f, email: x.target.value })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={f.pw}
          onChange={(x) => setF({ ...f, pw: x.target.value })}
        />
      </label>
      {e && <small className="bad">{e}</small>}
      <button className="btn">
        {mode === "register" ? "Create account" : "Sign in"}
      </button>
      <Link to={mode === "register" ? "/signin" : "/register"}>
        {mode === "register"
          ? "Have an account? Sign in"
          : "New here? Register"}
      </Link>
    </form>
  );
}
