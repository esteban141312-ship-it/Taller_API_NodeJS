import Author from "../../models/author.js";
import Book from "../../models/book.js";
import User from "../../models/user.js";

export const existeAutorPorId = async (id) => {

  const author = await Author.findById(id);

  if (!author) {
    throw new Error("Autor no existe");
  }

};

export const isbnExiste = async (isbn) => {

  const book = await Book.findOne({ isbn });

  if (book) {
    throw new Error("ISBN ya registrado");
  }

};

export const emailExiste = async (email) => {

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("El correo ya está registrado");
  }

};

export const existeUsuarioPorId = async (id) => {

  const user = await User.findById(id);

  if (!user) {
    throw new Error("Usuario no existe");
  }

};