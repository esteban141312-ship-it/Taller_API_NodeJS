import { Router } from "express";
import { check } from "express-validator";

import {
    getBooks,
    getAvailableBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/book.controller.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarJwt.js";
import { tieneRol } from "../middlewares/validarRoles.js";
import { existeAutorPorId, isbnExiste } from "../helpers/db-validators.js";

const router = Router();

router.get("/", [
    check("page", "La página debe ser un entero mayor a 0").optional().isInt({ min: 1 }),
    check("limit", "El límite debe ser un entero entre 1 y 50").optional().isInt({ min: 1, max: 50 }),
    check("author", "El autor debe ser un ID válido").optional().isMongoId(),
    validarCampos
], getBooks);

router.get("/available", getAvailableBooks);

router.get(
    "/:id",
    [
        check("id", "Id inválido").isMongoId(),
        validarCampos
    ],
    getBook
);

router.post(
    "/",
    [
    validarJWT,
    tieneRol("ADMIN"),
    check("title", "El título debe tener entre 1 y 120 caracteres").isLength({ min: 1, max: 120 }),
    check("isbn", "El ISBN debe tener 10 o 13 dígitos").matches(/^(\d{10}|\d{13})$/).custom(isbnExiste),
    check("author", "El autor debe ser un ID válido").isMongoId().custom(existeAutorPorId),
    check("genre", "El género no es válido").isIn(["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"]),
    check("year", "El año no es válido").optional().isInt({ max: new Date().getFullYear() }),
    check("totalCopies", "Las copias deben ser un entero mayor o igual a 1").isInt({ min: 1 }),
    validarCampos
    ],
    createBook
);

router.put(
    "/:id",
    [
    validarJWT,
    tieneRol("ADMIN"),
    check("id", "ID inválido").isMongoId(),
    check("title", "El título debe tener entre 1 y 120 caracteres").optional().isLength({ min: 1, max: 120 }),
    check("isbn", "El ISBN debe tener 10 o 13 dígitos").optional().matches(/^(\d{10}|\d{13})$/).custom(isbnExiste),
    check("author", "El autor debe ser un ID válido").optional().isMongoId().custom(existeAutorPorId),
    check("genre", "El género no es válido").optional().isIn(["novela", "cuento", "poesia", "ensayo", "tecnologia", "historia", "infantil"]),
    check("year", "El año no es válido").optional().isInt({ max: new Date().getFullYear() }),
    check("totalCopies", "Las copias deben ser un entero mayor o igual a 1").optional().isInt({ min: 1 }),
    check("active", "El estado debe ser booleano").optional().isBoolean(),
    validarCampos
    ],
    updateBook
);

router.delete(
    "/:id",
    [
    validarJWT,
    tieneRol("ADMIN"),
    check("id", "ID inválido").isMongoId(),
    validarCampos
    ],
    deleteBook
);

export default router;
