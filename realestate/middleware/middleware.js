const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  //logger.error(error.message);
  console.log("error Handler", error.message);

  switch (error.name) {
    case "CastError":
      return res.status(400).json({ error: "Malformatted ID" });
    case "ValidationError":
      return res.status(400).json({ error: "Invalid Crediantial" });
    case "MongoServerError":
      if (error.code === 11000) {
        return res.status(400).json({ error: "Username must be unique" });
      }
    case "JsonWebTokenError":
      return res.status(401).json({ error: "Token missing or invalid" });
    case "TokenExpiredError":
      return res.status(401).json({ error: "Token expired" });
    default:
      return next(error);
  }

  next(error);
};

export default {
  unknownEndpoint,
  errorHandler,
};
