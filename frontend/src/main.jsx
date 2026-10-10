import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import ShippingPage from "./pages/ShippingPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";

import AdminProductListPage from "./pages/AdminProductListPage.jsx";
import AdminProductAddPage from "./pages/AdminProductAddPage.jsx";
import AdminProductEditPage from "./pages/AdminProductEditPage.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}>
          <Route path="" Component={HomePage} />
          <Route path="products/:id" Component={ProductDetailPage} />
          <Route path="login" Component={LoginPage} />
          <Route path="cart" Component={CartPage} />
          <Route path="" Component={PrivateRoute}>
            <Route path="shipping" Component={ShippingPage} />
            <Route path="payment" Component={PaymentPage} />
            <Route path="placeorder" Component={PlaceOrderPage} />
            <Route path="order/:id" Component={OrderDetailPage} />
          </Route>
          <Route path="admin/products" Component={AdminProductListPage} />
          <Route
            path="/admin/products/add"
            Component={AdminProductAddPage}
          ></Route>
          <Route
            path="admin/products/:id/edit"
            element={<AdminProductEditPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
