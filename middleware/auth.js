const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).send("No Token was provided");
  }

  const token = authHeader.split(" ")[1];
  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.user_secret_key);
    // console.log(decoded)
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (err) {
    // console.log(err)

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Not authorized to access this route");
  }
};

module.exports = AuthMiddleware;
