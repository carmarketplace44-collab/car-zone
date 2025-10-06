import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { method } = req;
  const action = req.query.action;
  const { id } = req.query;

  if (method === "POST" && action === "signup") {
    const { name, email, password, phone, brand_name } = req.body;
    if (!name || !email || !password || !phone) return res.status(400).json({ error: "Missing required fields" });
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) return res.status(400).json({ error: authError.message });
      const user_id = authData?.user?.id;
      const { data, error } = await supabase.from("users").insert([{ id: user_id, name, email, phone, brand_name }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ message: "Dealer registered", dealer: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "POST" && action === "login") {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing email or password" });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data?.user) return res.status(401).json({ error: error?.message || "Invalid credentials" });
      const { data: dealerData, error: dealerError } = await supabase.from("users").select("*").eq("email", email).single();
      if (dealerError || !dealerData) return res.status(404).json({ error: dealerError?.message || "Dealer not found" });
      return res.status(200).json({ message: "Login successful", dealer: dealerData, session: data.session });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "GET") {
    if (!id) return res.status(400).json({ error: "Missing dealer ID" });
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
      if (error || !data) return res.status(404).json({ error: error?.message || "Dealer not found" });
      return res.status(200).json({ dealer: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${method} Not Allowed` });
}