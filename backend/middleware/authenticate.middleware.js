import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, "privateKey");
    if (decoded) {
      next();
    } else {
      res.send({ status: "Failed to verify", message: "Please login first" });
    }
  } else {
    res.send({ status: "Failed to verify", message: "Please login first" });
  }
};

export { authentication };
