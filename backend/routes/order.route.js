import express from "express";
import {
  addOrder,
  orderDelivered,
  getEsewaPaymentDetails,
  getMyOrders,
  getOrderById,
  getOrders,
  payOrder,
} from "../controller/order.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getOrders);
router.post("/", checkAuth, addOrder);
router.get("/mine", checkAuth, getMyOrders);
router.get("/:id", checkAuth, getOrderById);
router.get("/:id/getpaymentdetails", getEsewaPaymentDetails);
router.put("/:id/pay", checkAuth, checkAdmin, payOrder);
router.put("/:id/deliver", checkAuth, checkAdmin, orderDelivered);

export default router;
