
import Loan from "../models/loan.js";
import Book from "../models/book.js";

export const createLoan = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const bookId = req.body.book;

        const total = await Loan.countDocuments({
            user: userId, status: "ACTIVE"
        });

        if (total >= 3) {
            return res.status(409).json({
                ok: false, msg: "Límite de préstamos alcanzado"
            });
        }

        const repetido = await Loan.findOne({
            user: userId,
            book: bookId,
            status: "ACTIVE"
        });

        if (repetido) {
            return res.status(409).json({
                ok: false, msg: "Ya tienes este libro prestado"
            });
        }

        const book = await Book.findOneAndUpdate(
            {
                _id: bookId,
                active: true,
                availableCopies: { $gt: 0 }
            },
            { $inc: { availableCopies: -1 } },
            { returnDocument: "after" }
        );

        if (!book) {
            return res.status(409).json({
                ok: false, msg: "No hay copias disponibles"
            });
        }

        const loanDate = new Date();
        const dueDate = new Date(loanDate);
        dueDate.setDate(dueDate.getDate() + 14);

        const loan = await Loan.create({
            user: userId,
            book: bookId,
            loanDate,
            dueDate
        });

        res.status(201).json({ ok: true, data: loan });
    } catch (error) {
        next(error);
    }
};

export const getMyLoans = async (req, res, next) => {
    try {
        const loans = await Loan.find({ user: req.user._id })
            .populate("book");

        res.json({ ok: true, data: loans });
    } catch (error) {
        next(error);
    }
};

export const getLoans = async (req, res, next) => {
    try {
        const filtro = {};

        if (req.query.status) {
            filtro.status = req.query.status;
        }

        const loans = await Loan.find(filtro)
            .populate("user", "name email")
            .populate("book", "title isbn");

        res.json({ ok: true, data: loans });
    } catch (error) {
        next(error);
    }
};

export const getOverdueLoans = async (req, res, next) => {
    try {
        const loans = await Loan.find({
            status: "ACTIVE",
            dueDate: { $lt: new Date() }
        }).populate("user book");

        res.json({ ok: true, data: loans });
    } catch (error) {
        next(error);
    }
};

export const returnLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findById(req.params.id);

        if (!loan) {
            return res.status(404).json({
                ok: false, msg: "Préstamo no encontrado"
            });
        }

        if (loan.status === "RETURNED") {
            return res.status(400).json({
                ok: false, msg: "El préstamo ya fue devuelto"
            });
        }

        if (
            loan.user.toString() !== req.user._id.toString() &&
            req.user.role !== "ADMIN"
        ) {
            return res.status(403).json({
                ok: false, msg: "No tienes permiso"
            });
        }

        loan.status = "RETURNED";
        loan.returnDate = new Date();
        await loan.save();

        await Book.findByIdAndUpdate(loan.book, {
            $inc: { availableCopies: 1 }
        });

        res.json({ ok: true, data: loan });
    } catch (error) {
        next(error);
    }
};
