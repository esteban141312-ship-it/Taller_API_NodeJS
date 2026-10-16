import bcrypt from "bcryptjs";

import User from "../models/user.js";
import { generarJWT } from "../errores/helpers/generar-jwt.js";

export const register = async (req, res, next) => {

  try {

    const { password, ...rest } = req.body;

    const user = new User(rest);

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

    if (!user) {

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

export const me = async (req, res) => {

  res.json({
    ok: true,
    data: req.user
  });

};