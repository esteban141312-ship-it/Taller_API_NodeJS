import { Router } from "express";
import { check } from "express-validator";
import { createLoan, getMyLoans, getLoans, getOverdueLoans, returnLoan } from "../controllers/loan.controller.js";
import { validarJWT } from "../middlewares/validarJwt.js";
import { tieneRol } from "../middlewares/validarRoles.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.post("/", [ validarJWT,check("book", "El libro debe ser un ID válido").isMongoId(),validarCampos], createLoan);

router.get("/me", [
  validarJWT
], getMyLoans);

router.get("/overdue", [
  validarJWT,
  tieneRol("ADMIN")
], getOverdueLoans);

router.get("/", [validarJWT,
  tieneRol("ADMIN"),
  check("status", "El estado debe ser ACTIVE o RETURNED").optional().isIn(["ACTIVE", "RETURNED"]),
  validarCampos
], getLoans);

router.patch("/:id/return", [
  validarJWT,
  check("id", "ID inválido").isMongoId(),
  validarCampos
], returnLoan);

export default router;
