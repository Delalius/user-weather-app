import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { data, error } = await supabase.from("users").select("*");
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const newUser: User = req.body;

    if (!newUser || !newUser.email) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", newUser.email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res.status(500).json({ error: fetchError.message });
    }

    if (existingUser) {
      return res.status(409).json({ error: "User already saved" });
    }

    const { error: insertError } = await supabase.from("users").insert({
      gender: newUser.gender,
      first_name: newUser.name.first,
      last_name: newUser.name.last,
      email: newUser.email,
      city: newUser.location.city,
      country: newUser.location.country,
      latitude: newUser.location.coordinates.latitude,
      longitude: newUser.location.coordinates.longitude,
      picture_url: newUser.picture.large,
    });

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    return res.status(201).json({ message: "User saved", user: newUser });
  }

  if (req.method === "DELETE") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const { error } = await supabase.from("users").delete().eq("email", email);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ message: "User deleted" });
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
