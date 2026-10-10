import Product from "../models/products.js";

const getProducts = async (req, res) => {
  const products = await Product.find().populate("user", "fullName email -_id");
  res.send(products);
};

const addProducts = async (req, res) => {
  const { name, price, description, brand, category, image, countInStock } =
    req.body;

  const newProduct = {
    name,
    price,
    description,
    brand,
    category,
    image,
    countInStock,
    user: req.user._id,
  };

  const product = await Product.create(newProduct);

  res.status(201).send({
    message: "Product added successfully",
    product,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "product not found" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, category, brand, image, description } = req.body;
  const product = await Product.findById(id);

  if (!product) return res.status(404).send({ error: "product not found" });

  product.name = name || product.name;
  product.price = price || product.price;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.image = image || product.image;
  product.description = description || product.description;

  await product.save();
  res.send({ message: "product updated" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).send({ error: "product no found" });

  await product.deleteOne();
  res.send({ message: "product Deleted" });

  // const product = await Product.findByIdAndDelete(id);
};

export {
  getProducts,
  addProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
