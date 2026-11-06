import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import { products, naira } from "../data/products";
import ProductCard from "../components/ProductCard";
import Bottle from "../components/Bottle";

const SEG = {
  All: () => true,
  Men: (p) => p.category === "Men",
  Women: (p) => p.category === "Women",
  Unisex: (p) => p.category === "Unisex",
  Luxury: (p) => p.price >= 150000,
  Designer: (p) => !["Lattafa", "Armaf"].includes(p.brand),
  Niche: (p) => ["Tom Ford", "Baccarat"].includes(p.brand),
};

const SEGLABEL = {
  All: "All Fragrances",
  Men: "Men's Perfumes",
  Women: "Women's Perfumes",
  Unisex: "Unisex Fragrances",
  Luxury: "Luxury Perfumes",
  Designer: "Designer Perfumes",
  Niche: "Niche Fragrances",
  Oil: "Oil Perfume",
};

export default function Shop() {
  const { cat } = useParams();
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") || "";
  const [seg, setSeg] = useState(cat || "All");
  const [brandSel, setBrandSel] = useState([]);
  const [status, setStatus] = useState([]);
  const [max, setMax] = useState(350000);
  const [sort, setSort] = useState("featured");
  const [per, setPer] = useState(15);
  const [page, setPage] = useState(1);
  const [fOpen, setFOpen] = useState(false);
  const [view, setView] = useState("grid");

  useEffect(() => setSeg(cat || "All"), [cat]);
  useEffect(() => setPage(1), [seg, q, brandSel, status, max, sort, per]);

  const brands = useMemo(() => {
    const m = {};
    products.forEach((p) => (m[p.brand] = (m[p.brand] || 0) + 1));
    return Object.entries(m);
  }, []);

  const list = useMemo(() => {
    const l = products.filter(
      (p) =>
        SEG[seg](p) &&
        p.price <= max &&
        (!brandSel.length || brandSel.includes(p.brand)) &&
        (!status.length ||
          (status.includes("in") && p.stock > 0) ||
          (status.includes("sale") && p.oldPrice)) &&
        `${p.name} ${p.brand} ${p.family} ${p.category}`
          .toLowerCase()
          .includes(q.toLowerCase()),
    );
    const s = {
      featured: (a, b) => a.id - b.id,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      rated: (a, b) => b.rating - a.rating,
      new: (a, b) => b.order - a.order,
      best: (a, b) => b.reviews - a.reviews,
    };
    return l.sort(s[sort]);
  }, [seg, q, brandSel, status, max, sort]);

  const pages = Math.max(1, Math.ceil(list.length / per));
  const shown = list.slice((page - 1) * per, page * per);

  // Safely extract a singular promo product from list or main data arrays
  const promoProduct = shown[0] || products[0];

  const reset = () => {
    setBrandSel([]);
    setStatus([]);
    setMax(350000);
    setSeg("All");
    setSp({});
  };

  const tog = (set, v) =>
    set((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <div className="wrap">
      <p className="crumb">
        <Link to="/">HOME</Link> › SHOP
      </p>
      <button className="btn mob" onClick={() => setFOpen(!fOpen)}>
        Filters
      </button>
      <div className="shop">
        <aside className={"side" + (fOpen ? " open" : "")}>
          <h4>PRODUCT CATEGORIES</h4>
          {Object.keys(SEG).map((k) => (
            <button
              key={k}
              className={"cat" + (seg === k ? " on" : "")}
              onClick={() => setSeg(k)}
            >
              {SEGLABEL[k]}
            </button>
          ))}
          <h4>FILTER BY PRICE</h4>
          <input
            type="range"
            min="30000"
            max="350000"
            step="5000"
            value={max}
            onChange={(e) => setMax(+e.target.value)}
          />
          <small>
            Price: {naira(30000)} — {naira(max)}
          </small>
          <h4>PRODUCT STATUS</h4>
          <label>
            <input
              type="checkbox"
              checked={status.includes("in")}
              onChange={() => tog(setStatus, "in")}
            />{" "}
            In Stock
          </label>
          <label>
            <input
              type="checkbox"
              checked={status.includes("sale")}
              onChange={() => tog(setStatus, "sale")}
            />{" "}
            On Sale
          </label>
          <h4>BRANDS</h4>
          {brands.map(([b, n]) => (
            <label key={b} className="brand">
              <span>
                <input
                  type="checkbox"
                  checked={brandSel.includes(b)}
                  onChange={() => tog(setBrandSel, b)}
                />{" "}
                {b}
              </span>
              <small>({n})</small>
            </label>
          ))}
          <button className="btn ghost" onClick={reset}>
            Reset All Filters
          </button>

          {promoProduct && (
            <div className="sidepromo">
              <Bottle
                hue={promoProduct.hue}
                image={promoProduct.image}
                alt={`${promoProduct.brand} ${promoProduct.name}`}
              />
              <b>Gift Sets</b>
              <small>Perfect for every occasion</small>
            </div>
          )}
        </aside>

        <section>
          <div className="banner">
            <div>
              <small>Luxury & designer perfumes</small>
              <h2>
                Delivered to <span>your Home</span>
              </h2>
              <small>Sample promotion: free delivery above ₦300,000</small>
            </div>
            <div className="bb">
              {/* Dynamically fallback to products if shown array is empty */}
              {(shown.length ? shown : products)
                .slice(0, 3)
                .map((item, index) => (
                  <Bottle
                    key={item.id || index}
                    hue={item.hue}
                    image={item.image}
                    alt={`${item.brand} ${item.name}`}
                  />
                ))}
            </div>
          </div>
          <div className="tools">
            <span>
              <button
                className="icon"
                aria-label="List view"
                onClick={() => setView("list")}
              >
                <List />
              </button>
              <button
                className="icon"
                aria-label="Grid view"
                onClick={() => setView("grid")}
              >
                <LayoutGrid />
              </button>{" "}
              <small>{list.length} results</small>
            </span>
            <span>
              Sort by{" "}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort"
              >
                <option value="featured">Featured</option>
                <option value="new">Latest</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rated">Highest Rated</option>
                <option value="best">Best Sellers</option>
              </select>
              &nbsp;Show{" "}
              <select
                value={per}
                onChange={(e) => setPer(+e.target.value)}
                aria-label="Per page"
              >
                {[10, 15, 20].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </span>
          </div>
          {shown.length ? (
            <div className={"grid " + view}>
              {shown.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <p className="center">
              No fragrances match.{" "}
              <button className="btn" onClick={reset}>
                Clear
              </button>
            </p>
          )}
          <div className="pager">
            <button
              className="btn"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              {page} / {pages}
            </span>
            <button
              className="btn"
              disabled={page >= pages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
