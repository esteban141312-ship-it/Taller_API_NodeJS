import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import 'dotenv/config';

import authorsRoutes from "./routes/authors.routes.js";
import booksRoutes from "./routes/books.routes.js";

import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import loansRoutes from "./routes/loans.routes.js";

// dotenv.config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        // this.connectDB();

        this.middlewares();
        this.routes();
        this.errors();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(logger);
    }

    routes(){
        this.app.use("/api/authors", authorsRoutes);
        this.app.use("/api/books", booksRoutes);
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/users", usersRoutes);
        this.app.use("/api/loans", loansRoutes);
    }

    errors(){
        this.app.use(notFound);
        this.app.use(errorHandler);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("listen port")
        })
    }
}

export default Server;
