export const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    ok: false,
    message: 'Error interno del servidor'
  });
};