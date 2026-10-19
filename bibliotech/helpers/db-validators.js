import Author from "../models/author.js";
import Book from "../models/book.js";
import User from "../models/user.js";

export const existeAutorPorId = async (id) => {
  const author = await Author.findOne({ _id: id, active: true });

  if (!author) {
    throw new Error("El autor no existe o está inactivo");
  }
};

export const isbnExiste = async (isbn, { req }) => {
  const book = await Book.findOne({ isbn });

  if (book && book.id !== req.params.id) {
    throw new Error("El ISBN ya está registrado");
  }
};

export const emailExiste = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    throw new Error("El correo ya está registrado");
  }
};
