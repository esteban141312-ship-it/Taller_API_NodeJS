export const tieneRol = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(500).json({
        ok: false,
        msg: "JWT requerido"
      });
    }

    if (!roles.includes(req.user.role)) {

      return res.status(403).json({
        ok: false,
        msg: "No tienes permisos"
      });

    }

    next();

  };

};
