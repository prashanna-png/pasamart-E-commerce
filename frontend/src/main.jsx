import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Signup";

import CartPage from "./pages/CartPage.jsx";

import { Provider } from "react-redux";

import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}>
          <Route path="" Component={HomePage} />
          <Route path="products/:id" Component={ProductDetailPage} />
          <Route path="login" Component={LoginPage} />
          <Route path="signup" Component={Signup}/>
          <Route path="cart" Component={CartPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
