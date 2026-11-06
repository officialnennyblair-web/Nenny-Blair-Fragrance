import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../data/products";
const Ctx = createContext();
export const useStore = () => useContext(Ctx);
const load = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("nb_cart", []));
  const [wish, setWish] = useState(() => load("nb_wish", []));
  const [user, setUser] = useState(() => load("nb_user", null)); // demo auth only, NOT secure
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    localStorage.setItem("nb_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("nb_wish", JSON.stringify(wish));
  }, [wish]);
  useEffect(() => {
    localStorage.setItem("nb_user", JSON.stringify(user));
  }, [user]);
  const stockOf = (id) => products.find((p) => p.id === id).stock;
  const addToCart = (id, q = 1) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id);
      const max = stockOf(id);
      if (max === 0) return c;
      return f
        ? c.map((i) =>
            i.id === id ? { ...i, qty: Math.min(max, i.qty + q) } : i,
          )
        : [...c, { id, qty: Math.min(max, q) }];
    });
    setDrawer(true);
  };
  const setQty = (id, q) =>
    setCart((c) =>
      c.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, Math.min(stockOf(id), q)) } : i,
      ),
    );
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const toggleWish = (id) =>
    setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  const lines = cart.map((i) => ({
    ...products.find((p) => p.id === i.id),
    qty: i.qty,
  }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= 300000 ? 0 : 4500; // sample fee
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <Ctx.Provider
      value={{
        cart,
        lines,
        subtotal,
        delivery,
        total: subtotal + delivery,
        count,
        addToCart,
        setQty,
        removeItem,
        clearCart,
        wish,
        toggleWish,
        user,
        setUser,
        drawer,
        setDrawer,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
