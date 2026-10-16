import { Router } from "express";
import { check } from "express-validator";

import {
  register,
  login,
  me
} from "../controllers/auth.controllers.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJwt.js";

import {
  emailExiste
} from "../errores/helpers/dbValidators.js";

const router = Router();

router.post(
  "/register",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("email").custom(emailExiste),
    check("password").isLength({ min: 6 }),
    validarCampos
  ],
  register
);

router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password").notEmpty(),
    validarCampos
  ],
  login
);

router.get(
  "/me",
  [
    validarJWT
  ],
  me
);

export default router;