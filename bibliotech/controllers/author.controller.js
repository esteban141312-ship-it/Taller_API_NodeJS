
import Author from "../models/author.js";

export const getAuthors = async (req, res, next) => {
    try {
        const authors = await Author.find({ active: true });
        res.json({ ok: true, data: authors });
    } catch (error) {
        next(error);
    }
};

export const getAuthor = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author || !author.active) {
            return res.status(404).json({
                ok: false, msg: "Autor no encontrado"
            });
        }

        const books = await import("../models/book.js");
        const list = await books.default.find({
            author: author._id, active: true
        });

        res.json({ ok: true, data: { author, books: list } });
    } catch (error) {
        next(error);
    }
};

export const createAuthor = async (req, res, next) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ ok: true, data: author });
    } catch (error) {
        next(error);
    }
};

export const updateAuthor = async (req, res, next) => {
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        );

        if (!author) {
            return res.status(404).json({
                ok: false, msg: "Autor no encontrado"
            });
        }

        res.json({ ok: true, data: author });
    } catch (error) {
        next(error);
    }
};

export const deleteAuthor = async (req, res, next) => {
    try {
        const Book = (await import("../models/book.js")).default;

        const books = await Book.findOne({
            author: req.params.id, active: true
        });

        if (books) {
            return res.status(409).json({
                ok: false, msg: "El autor tiene libros activos"
            });
        }

        const author = await Author.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { returnDocument: "after" }
        );

        if (!author) {
            return res.status(404).json({
                ok: false, msg: "Autor no encontrado"
            });
        }

        res.json({ ok: true, data: author });
    } catch (error) {
        next(error);
    }
};