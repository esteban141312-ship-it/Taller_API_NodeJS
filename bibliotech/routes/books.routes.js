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

const router = Router();

router.get("/", getBooks);

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
        check("title").notEmpty(),
        check("isbn").notEmpty(),
        check("author").isMongoId(),
        check("genre").notEmpty(),
        check("totalCopies").isInt({ min: 1 }),
        validarCampos
    ],
    createBook
);

router.put(
    "/:id",
    [
        check("id").isMongoId(),
        validarCampos
    ],
    updateBook
);

router.delete(
    "/:id",
    [
        check("id").isMongoId(),
        validarCampos
    ],
    deleteBook
);

export default router;