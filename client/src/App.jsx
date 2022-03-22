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
import Success from "./pages/Success";

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
          <Route path="/product/:id" element={<ProductSingle />} />
          <Route
            path="/register"
            element={user ? <Navigate replace to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
