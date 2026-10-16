import mongoose from "mongoose";

export const dbCotection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Base de datos conectada");

    }catch (error) {
        console.log(error);
        throw new Error ("Error en la conexión");
    }
};