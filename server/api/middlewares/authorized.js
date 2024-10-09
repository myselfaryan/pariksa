const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

function authorized(requiredRole) {
  async function middleware(req, res, next) {
    try {
      // console.log(req.headers.authorization_token)
      let token = req.headers.authorization_token;
      if (!token) {
        return res
          .status(400)
          .json({ message: "No authorization_token provided" });
      }
      token = token.split(" ")[1];

      // Verifying the token and decoding it to get the userinfo
      let user = jwt.verify(token, process.env.SECRET_KEY);

      // Checking if the user exists in the database
      const isUser = await prisma.users.findUnique({
        where: {
          id: user.id,
        },
        select: {
          id: true,
          username: true,
          email: false,
          Role: true,
        },
      });
      if (!isUser) {
        return res
          .status(404)
          .json({ message: "Invalid Token: No user exists with provided id" });
      }

      const roles = ["USER", "ORGANIZER", "ADMIN"];
      const userRole = isUser.Role;

      if (roles.findIndex(role => role === userRole) < roles.findIndex(role => role === requiredRole)) {
        return res
          .status(403)
          .json({ message: "Authorization level not enough!" });
      }

      // adding userId from the decoded token to req object
      req.body.userId = user.id;
      req.body.userRole = isUser.Role;
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message:
          "lacking proper authentication credentials or invalid credentials jwt couldn't verify",
      });
    }

    next();
  }

  return middleware;
}
module.exports = authorized;
