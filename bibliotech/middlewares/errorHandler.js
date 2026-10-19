export const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.code === 11000) {
    return res.status(400).json({
      ok: false,
      msg: "Dato único ya registrado"
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      ok: false,
      msg: err.message
    });
  }

  res.status(500).json({
    ok: false,
    msg: 'Error interno del servidor'
  });
};
