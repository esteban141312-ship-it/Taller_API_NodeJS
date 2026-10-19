import { Router } from "express";
import { check } from "express-validator";

import { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } from "../controllers/author.controller.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJwt.js";
import { tieneRol } from "../middlewares/validarRoles.js";

const router = Router();

router.get("/", getAuthors);

router.get("/:id", [
  check("id", "ID inválido").isMongoId(),
  validarCampos
], getAuthor);

router.post("/", [
  validarJWT,
  tieneRol("ADMIN"),
  check("name", "El nombre debe tener entre 3 y 80 caracteres").isLength({ min: 3, max: 80 }),
  check("nationality", "La nacionalidad debe tener entre 2 y 40 caracteres").optional().isLength({ min: 2, max: 40 }),
  check("birthYear", "El año de nacimiento no es válido").optional().isInt({ min: 0, max: new Date().getFullYear() }),
  check("active", "El estado debe ser booleano").optional().isBoolean(),
  validarCampos
], createAuthor);

router.put("/:id", [
  validarJWT,
  tieneRol("ADMIN"),
  check("id", "ID inválido").isMongoId(),
  check("name", "El nombre debe tener entre 3 y 80 caracteres").optional().isLength({ min: 3, max: 80 }),
  check("nationality", "La nacionalidad debe tener entre 2 y 40 caracteres").optional().isLength({ min: 2, max: 40 }),
  check("birthYear", "El año de nacimiento no es válido").optional().isInt({ min: 0, max: new Date().getFullYear() }),
  check("active", "El estado debe ser booleano").optional().isBoolean(),
  validarCampos
], updateAuthor);

router.delete("/:id", [
  validarJWT,
  tieneRol("ADMIN"),
  check("id", "ID inválido").isMongoId(),
  validarCampos
], deleteAuthor);
export default router;
