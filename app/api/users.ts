// /pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";

const users: User[] = [
  // Seed data or fetch from external API
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    // Implement authentication logic
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
