import { createClient } from "@supabase/supabase-js";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    try {
      if (id) {
        const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
        if (error || !data) return res.status(404).json({ error: "Car not found" });
        return res.status(200).json(data);
      } else {
        const { data, error } = await supabase.from("cars").select("*");
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "POST") {
    try {
      const { image_url, make, model, year, mileage, price, dealer_id, description, whatsapp_number } = req.body;
      if (!make || !model || !year || !price || !dealer_id) return res.status(400).json({ error: "Missing required fields" });
      const { data, error } = await supabase.from("cars").insert([{
        image_url, make, model, year, mileage, price, dealer_id, description, whatsapp_number, is_sold: false
      }]).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "PUT") {
    try {
      if (!id) return res.status(400).json({ error: "Missing car ID" });
      const updates = req.body;
      const { data, error } = await supabase.from("cars").update(updates).eq("id", id).select().single();
      if (error || !data) return res.status(404).json({ error: error?.message || "Car not found" });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (method === "DELETE") {
    try {
      if (!id) return res.status(400).json({ error: "Missing car ID" });
      const { data, error } = await supabase.from("cars").delete().eq("id", id).select().single();
      if (error || !data) return res.status(404).json({ error: error?.message || "Car not found" });
      return res.status(200).json({ message: "Car deleted", car: data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).json({ error: `Method ${method} Not Allowed` });
}