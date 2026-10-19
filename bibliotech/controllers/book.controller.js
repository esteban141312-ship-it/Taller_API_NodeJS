
import Book from "../models/book.js";

export const getBooks = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 10, 50);
        const filter = { active: true };

        if (req.query.genre) {
            filter.genre = req.query.genre;
        }

        if (req.query.author) {
            filter.author = req.query.author;
        }

        if (req.query.q) {
            filter.title = { $regex: req.query.q, $options: "i" };
        }

        const total = await Book.countDocuments(filter);
        const books = await Book.find(filter)
            .populate("author", "name")
            .sort(req.query.sort || "title")
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            ok: true,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: books
        });
    } catch (error) {
        next(error);
    }
};

export const getAvailableBooks = async (req, res, next) => {
    try {
        const books = await Book.find({
            active: true,
            availableCopies: { $gt: 0 }
        }).populate("author", "name");

        res.json({ ok: true, data: books });
    } catch (error) {
        next(error);
    }
};

export const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate("author");

        if (!book || !book.active) {
            return res.status(404).json({
                ok: false, msg: "Libro no encontrado"
            });
        }

        res.json({ ok: true, data: book });
    } catch (error) {
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    try {
        const book = await Book.create({
            ...req.body,
            availableCopies: req.body.totalCopies
        });

        res.status(201).json({ ok: true, data: book });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book || !book.active) {
            return res.status(404).json({
                ok: false, msg: "Libro no encontrado"
            });
        }

        if (req.body.active === false) {
            const Loan = (await import("../models/loan.js")).default;
            const loan = await Loan.findOne({ book: req.params.id, status: "ACTIVE" });

            if (loan) {
                return res.status(409).json({
                    ok: false, msg: "El libro tiene préstamos activos"
                });
            }
        }

        const { availableCopies, ...data } = req.body;

        if (data.totalCopies !== undefined) {
            const prestadas = book.totalCopies - book.availableCopies;

            if (data.totalCopies < prestadas) {
                return res.status(400).json({
                    ok: false, msg: "No puedes reducir las copias prestadas"
                });
            }

            data.availableCopies = data.totalCopies - prestadas;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            data,
            { returnDocument: "after", runValidators: true }
        );

        res.json({ ok: true, data: updatedBook });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const Loan = (await import("../models/loan.js")).default;

        const loan = await Loan.findOne({
            book: req.params.id, status: "ACTIVE"
        });

        if (loan) {
            return res.status(409).json({
                ok: false, msg: "El libro tiene préstamos activos"
            });
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { active: false },
            { returnDocument: "after", runValidators: true }
        );

        if (!book) {
            return res.status(404).json({
                ok: false, msg: "Libro no encontrado"
            });
        }

        res.json({ ok: true, data: book });
    } catch (error) {
        next(error);
    }
};
