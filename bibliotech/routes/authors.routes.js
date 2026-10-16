import { Router } from "express";
import { check } from "express-validator";

import {getAuthors,getAuthor,createAuthor,updateAuthor,deleteAuthor} from "../controllers/author.controller.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { existeAutorPorId } from "../errores/helpers/dbValidators.js";

const router = Router();

router.get("/", getAuthors);

// router.get("/:id",[check("id","ID inválido").isMongoId(),validarCampos],getAuthor);

router.post("/",[check("name").notEmpty(),check("name").isLength({ min: 3, max: 80 }),validarCampos],createAuthor);

router.put("/:id",[check("id").isMongoId(),validarCampos],updateAuthor);

router.delete("/:id",[check("id").isMongoId(),validarCampos],deleteAuthor);
router.get("/:id",[check("id").isMongoId(),check("id").custom(existeAutorPorId),validarCampos],getAuthor);
export default router;