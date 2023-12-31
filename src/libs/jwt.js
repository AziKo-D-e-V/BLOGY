const jwt = require("jsonwebtoken");

const SecretKey = process.env.jwtSecretKey;

const sign = (payload) => jwt.sign(payload, SecretKey, { expiresIn: "24h" });
const verify = (payload) => jwt.verify(payload, SecretKey);

module.exports = {
  sign,
  verify,
};
