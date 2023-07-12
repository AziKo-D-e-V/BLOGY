const pg = require("../libs/pg");
const bcrypt = require("bcrypt");
const jwt = require("../libs/jwt");
const { generateHash, compareHash } = require("../libs/bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findAdmin = (
      await pg(`select * from Administrator where username = $1`, username)
    )[0];

    if (!findAdmin) {
      return res.redirect("/login");
    }

    const compare = await compareHash(password, findAdmin.password);

    if (!compare) {
      return res.redirect("/login");
    }
    const token = jwt.sign({ userId: findAdmin.id });

    res.cookie("token", token);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const findAdmin = await pg(
      `select * from administrator where username = $1 and password = $2`,
      username,
      password
    );

    if (findAdmin.length) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const generate = await generateHash(password);

    const newAdmin = (
      await pg(
        `insert into administrator(name, username, password) values($1, $2, $3) returning *`,
        name,
        username,
        generate
      )
    )[0];

    delete newAdmin.password;
    res.status(201).json({ message: "Admin created", data: newAdmin });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,

  register,
};
