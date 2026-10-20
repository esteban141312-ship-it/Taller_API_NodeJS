import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { generarJWT } from "../helpers/generar-jwt.js";

export const register = async (req, res, next) => {

  try {

    const { name, email, password } = req.body;

    const user = new User({ name, email, role: "USER" });

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(
      password,
      salt
    );

    await user.save();

    const token = await generarJWT(user.id);

    res.status(201).json({
      ok: true,
      data: {
        user,
        token
      }
    });

  } catch (error) {
    next(error);
  }

};

export const login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.active) {

      return res.status(401).json({
        ok: false,
        msg: "Credenciales inválidas"
      });

    }

    const validPassword =
      bcrypt.compareSync(
        password,
        user.password
      );

    if (!validPassword) {

      return res.status(401).json({
        ok: false,
        msg: "Credenciales inválidas"
      });

    }

    const token =
      await generarJWT(user.id);

    res.json({
      ok: true,
      data: {
        user,
        token
      }
    });

  } catch (error) {
    next(error);
  }

};

export const me = async (req, res, next) => {

  try {

    res.json({
      ok: true,
      data: req.user
    });

  } catch (error) {
    next(error);
  }

};
