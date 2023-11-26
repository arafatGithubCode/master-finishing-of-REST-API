const router = require("express").Router();

const {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router.get("/", getUsers);
router.post("/", createUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
