const express = require("express");
const userRouter = express.Router();
const { getUser, getUsers } = require("../controllers/userControllers.js");
const authorized = require("../middlewares/authorized.js");
const auth = require("../middlewares/auth.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

userRouter.get("/", authorized("ADMIN"), getUsers);
userRouter.get("/me", auth, getUser);

userRouter.patch("/:userId", authorized("ADMIN"), async (req, res) => {
  const { id, userId, userRole, email, username, ...rest } = req.body;

  const newUser = await prisma.users.update({
    where: {
      id: req.params.userId,
    },
    data: {
      ...rest,
    },
  });

  console.log('rest', rest, 'newUser', newUser);
  return res.status(200).json(newUser);
});

module.exports = userRouter;
