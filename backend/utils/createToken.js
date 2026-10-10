import jwt from "jsonwebtoken";

const createToken = (_id, res) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3d",
  });

  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export default createToken;
