import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const validarJWT = async (req, res, next) => {

  try {

    const token = req.header("x-token");

    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "Token requerido"
      });
    }

    const { uid } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    

    const user = await User.findById(uid);

    if (!user || !user.active) {
      return res.status(401).json({
        ok: false,
        msg: "Token inválido"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      msg: "Token inválido"
    });

  }
};