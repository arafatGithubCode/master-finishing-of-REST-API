const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    name: "Arafat",
    email: "arafat@gmail.com",
  },
];
module.exports = users;
