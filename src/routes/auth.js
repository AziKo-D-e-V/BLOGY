const { Router } = require("express");
const { register, login, loginGet } = require("../controllers/auth.controller");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.post("/auth/login", login);
router.post("/auth/register", register);

module.exports = router;
