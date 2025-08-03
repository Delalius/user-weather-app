import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { User } from "@/types";

// Path to the JSON file storing saved users.
// Using absolute path relative to project root for consistency.
const filePath = path.resolve(process.cwd(), "data", "savedUsers.json");

/**
 * Reads users from the JSON file.
 * Returns an empty array if file doesn't exist or parsing fails.
 */
function readUsers(): User[] {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to read users:", error);
    return [];
  }
}


/**
 * Writes the array of users back to the JSON file,
 * formatting with 2 spaces indentation for readability.
 */
function writeUsers(users: User[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

/**
 * API route handler supporting GET, POST, and DELETE methods.
 * - GET: returns all saved users
 * - POST: adds a new user, rejects duplicates by email
 * - DELETE: removes a user by email
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = readUsers();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const newUser: User = req.body;

    // Basic validation: user object must exist and have an email
    if (!newUser || !newUser.email) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const users = readUsers();

    // Check for existing user by email to prevent duplicates
    if (users.find((u) => u.email === newUser.email)) {
      return res.status(409).json({ error: "User already saved" });
    }

    users.push(newUser);
    writeUsers(users);

    return res.status(201).json({ message: "User saved", user: newUser });
  }

  if (req.method === "DELETE") {
    const { email } = req.body;

    // Email is required to delete user
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let users = readUsers();
    const initialLength = users.length;

    // Filter out user with matching email
    users = users.filter((u) => u.email !== email);

    // If length didn't change, user not found
    if (users.length === initialLength) {
      return res.status(404).json({ error: "User not found" });
    }

    writeUsers(users);
    return res.status(200).json({ message: "User deleted" });
  }

  // Method not allowed - specify allowed methods in header
  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
