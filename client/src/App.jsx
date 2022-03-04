import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductSingle from "./pages/ProductSingle";
import Register from "./pages/Register";

function App() {
  const user = true;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />}>
            <Route path="/products/:categories" element={<ProductList />} />
          </Route>
          <Route path="/products/:id" element={<ProductSingle />} />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
