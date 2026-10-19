import { Router } from "express";
import { check } from "express-validator";
import { getUsers, updateUserRole } from "../controllers/user.controller.js";
import { validarJWT } from "../middlewares/validarJwt.js";
import { tieneRol } from "../middlewares/validarRoles.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", [
  validarJWT,
  tieneRol("ADMIN"),
  check("page", "La página debe ser un entero mayor a 0").optional().isInt({ min: 1 }),
  check("limit", "El límite debe ser un entero entre 1 y 50").optional().isInt({ min: 1, max: 50 }),
  validarCampos
], getUsers);

router.patch("/:id/role", [
  validarJWT,
  tieneRol("ADMIN"),
  check("id", "ID inválido").isMongoId(),
  check("role", "El rol debe ser USER o ADMIN").isIn(["USER", "ADMIN"]),
  validarCampos
], updateUserRole);

export default router;
