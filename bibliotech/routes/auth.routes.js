import { Router } from "express";
import { check } from "express-validator";

import {
  register,
  login,
  me
} from "../controllers/auth.controllers.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJwt.js";

import { emailExiste } from "../helpers/db-validators.js";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre debe tener entre 3 y 60 caracteres").isLength({ min: 3, max: 60 }),
    check("email", "El correo no es válido").isEmail().normalizeEmail(),
    check("email").custom(emailExiste),
    check("password", "La contraseña debe tener mínimo 6 caracteres").isLength({ min: 6 }),
    validarCampos
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "El correo no es válido").isEmail().normalizeEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
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
