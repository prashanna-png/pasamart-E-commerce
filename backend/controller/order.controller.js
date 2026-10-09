import Order from "../models/order.js";
import crypto from "crypto";

const addOrder = async (req, res) => {
  const {
    orderedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  const newOrder = {
    user: req.user._id,
    orderedItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
  const order = await Order.create(newOrder);
  if (!order) {
    return res.status(201).send({ error: "order not created" });
  }
  res.send({ message: "order created succesfully", orderId: order._id });
};

const getOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "fullName email");
  if (!orders) {
    return res.status(404).send({ error: "no orders found" });
  }
  res.send(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById({ _id: id });
  if (!order) {
    return res.status(404).send({ error: "order not found" });
  }
  res.send(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return res.status(404).send({ message: "no orders found" });
  }
  res.send(orders);
};

const payOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById({ _id: id });
  if (!order) {
    return res.status(404).send({ message: "order not found" });
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  await order.save();
  res.send({ message: "order paid successfully" });
};

const orderDelivered = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).send({ message: "order not found" });
  }
  if (!order.isPaid) {
    return res.status(400).send({ message: "order not paid yet" });
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();
  res.send({ message: "order delivered successfully" });
};
const getEsewaPaymentDetails = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).send({ message: "Order not found" });
  const tran_uuid = Date.now() + "_" + order._id;
  const message = `total_amount=${order.totalPrice},transaction_uuid=${tran_uuid},product_code=EPAYTEST`;
  const signature = crypto
    .createHmac("sha256", "8gBm/:&EnhH.1/q")
    .update(message)
    .digest("base64");
  const paymentDetail = {
    amount: order.itemsPrice,
    failure_url: "http://localhost:5173/order/" + id,
    product_delivery_charge: String(order.shippingPrice),
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:3000/api/orders/confirmpayment",
    tax_amount: String(order.taxPrice),
    total_amount: String(order.totalPrice),
    transaction_uuid: tran_uuid,
  };
  res.send(paymentDetail);
};
export {
  addOrder,
  getOrders,
  getOrderById,
  getMyOrders,
  payOrder,
  orderDelivered,
  getEsewaPaymentDetails,
};
