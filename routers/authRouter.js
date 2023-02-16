const Router = require("express");
const authRouter = Router();
const { register, login, getUser } = require("../controllers/userController");
const { registerValidation, loginValidation } = require("../validations.js");
const authWare = require("../utils/authWare");

authRouter.post("/api/register",registerValidation,register);
authRouter.post("/api/login", loginValidation,  login);
authRouter.get("/api/me", authWare, getUser);

module.exports = authRouter;
