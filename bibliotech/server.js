import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConection } from "./database/config.js";

import authorsRoutes from "./routes/authors.routes.js";
import booksRoutes from "./routes/books.routes.js";

import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.connectDB();

        this.middlewares();
        this.routes();
        this.errors();
    }

    async connectDB(){
        await dbConection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(logger);
    }

    routes(){
        this.app.use("/api/authors", authorsRoutes);
        this.app.use("/api/books", booksRoutes);
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