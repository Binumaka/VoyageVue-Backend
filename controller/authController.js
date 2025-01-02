const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const Credential = require("../model/userModel");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const cred = new Credential({ email, password: hashedPassword, role });
  cred.save();
  res.status(201).send(cred);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const cred = await Credential.findOne({ email });
  if (!cred || !(await bcrypt.compare(password, cred.password))) {
    return res.status(403).send("Invalid username or password");
  }

  const token = jwt.sign(
    { email: cred.email, role: cred.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

module.exports = {
  test,
  loginUser,
  registerUser,
};
