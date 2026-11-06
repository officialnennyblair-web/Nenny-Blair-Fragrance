import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
function NotFound() {
  return (
    <div className="wrap center">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link className="btn" to="/">
        Back Home
      </Link>
    </div>
  );
}
export default function App() {
  return (
    <>
      <div className="announce">
        Discover Your Signature Scent — Enjoy Exclusive Offers on Selected
        Fragrances.
      </div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:cat" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signin" element={<Auth mode="signin" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
