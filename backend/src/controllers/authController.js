import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let users = []; // temporary in-memory storage (later replace with DB)

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existing = users.find((u) => u.email === email);
  if (existing) return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Create user
  const newUser = { id: users.length + 1, name, email, password: hashed };
  users.push(newUser);

  // Create JWT
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
};
