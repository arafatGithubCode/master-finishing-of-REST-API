let users = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

//get users
const getUsers = (req, res) => {
  res.status(200).json(users);
};

//create users
const createUsers = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const newUser = {
    id: uuidv4(),
    name: name,
    email: email,
  };
  users.push(newUser);
  res.status(202).json(users);
};

//update user
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  users
    .filter((user) => user.id === userId)
    .map((selectedUser) => {
      selectedUser.name = name;
      selectedUser.email = email;
    });
  res.status(202).json(users);
};

//delete user
const deleteUser = (req, res) => {
  const userId = req.params.id;
  users = users.filter((user) => user.id !== userId);
  res.status(202).json(users);
};

module.exports = { getUsers, createUsers, updateUser, deleteUser };
