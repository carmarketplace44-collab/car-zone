export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { make, model, year } = req.body;
  if (!make || !model || !year) {
    return res.status(400).json({ error: "Missing car make, model, or year" });
  }
  try {
    const prompt = `Estimate the fair market price in Botswana Pula (BWP) for a used ${year} ${make} ${model} in good condition. Only reply with the price.`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 30,
        temperature: 0.2
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.choices || !result.choices[0]?.message?.content) {
      throw new Error("Failed to get AI price suggestion");
    }
    let price = result.choices[0].message.content.trim();
    if (!price.toLowerCase().includes("bwp")) {
      price = `BWP ${price}`;
    }
    res.status(200).json({ suggestedPrice: price });
  } catch (err) {
    res.status(500).json({ error: err.message || "AI price suggestion failed" });
  }
}