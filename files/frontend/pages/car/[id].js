import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const getCarById = (id) => ({
  id,
  image: "/car1.jpg",
  make: "Toyota",
  model: "Camry",
  year: 2022,
  mileage: 15000,
  price: 220000,
  dealerName: "AutoHub",
  dealerPhone: "+26771234567",
  description: "Excellent condition, full service history, accident free.",
});

export default function CarDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [car, setCar] = useState(null);
  const [aiInput, setAiInput] = useState({ make: "", model: "", year: "" });
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    if (id) {
      setCar(getCarById(id));
      setAiInput((prev) => ({
        ...prev,
        make: getCarById(id).make,
        model: getCarById(id).model,
        year: getCarById(id).year,
      }));
    }
  }, [id]);

  const handleSuggestPrice = async () => {
    setSuggestedPrice(null);
    setAiError(null);
    setLoadingAI(true);
    try {
      const response = await fetch("/api/suggest-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiInput),
      });
      const data = await response.json();
      if (response.ok) {
        setSuggestedPrice(data.suggestedPrice);
      } else {
        setAiError(data.error || "Failed to get price suggestion.");
      }
    } catch (err) {
      setAiError("Something went wrong. Please try again.");
    } finally {
      setLoadingAI(false);
    }
  };

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading car details...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
          <Link href="/browse" className="inline-block mb-4 text-blue-600 hover:underline font-medium">&larr; Back to Browse</Link>
          <img src={car.image} alt="Car" className="w-full h-64 object-cover rounded-xl mb-6 shadow" />
          <h1 className="text-2xl font-bold mb-3 text-blue-800">{car.year} {car.make} {car.model}</h1>
          <div className="grid grid-cols-2 gap-3 mb-2">
            <span className="text-gray-700 font-medium">Price:</span>
            <span className="text-blue-700 font-semibold">BWP {car.price.toLocaleString()}</span>
            <span className="text-gray-700 font-medium">Mileage:</span>
            <span>{car.mileage.toLocaleString()} km</span>
            <span className="text-gray-700 font-medium">Dealer:</span>
            <span>{car.dealerName}</span>
          </div>
          <div className="mb-4"><span className="text-gray-700 font-medium">Description:</span>
            <p className="text-gray-600 mt-1">{car.description}</p>
          </div>
          <a href={`https://wa.me/${car.dealerPhone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer"
            className="block bg-green-500 text-white rounded-lg px-4 py-2 font-medium text-center hover:bg-green-700 focus:bg-green-700 transition mb-4">
            Contact via WhatsApp
          </a>
          <div className="bg-gray-100 rounded-xl p-4 mt-2">
            <div className="font-semibold mb-2 text-blue-800">AI-Powered Suggest Price</div>
            <form className="flex flex-col gap-2 sm:flex-row sm:gap-2 mb-2" onSubmit={e => { e.preventDefault(); handleSuggestPrice(); }}>
              <input type="text" className="border rounded p-2 text-sm flex-1" placeholder="Make" value={aiInput.make} onChange={e => setAiInput({ ...aiInput, make: e.target.value })} required />
              <input type="text" className="border rounded p-2 text-sm flex-1" placeholder="Model" value={aiInput.model} onChange={e => setAiInput({ ...aiInput, model: e.target.value })} required />
              <input type="number" className="border rounded p-2 text-sm flex-1" placeholder="Year" value={aiInput.year} onChange={e => setAiInput({ ...aiInput, year: e.target.value })} required />
              <button type="submit" className="bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700" disabled={loadingAI}>{loadingAI ? "Suggesting..." : "Suggest Price"}</button>
            </form>
            {loadingAI && (<div className="text-gray-500 text-sm">Getting AI suggestion...</div>)}
            {suggestedPrice && (<div className="mt-2 text-green-600 font-semibold">{suggestedPrice}</div>)}
            {aiError && (<div className="mt-2 text-red-600 text-sm">{aiError}</div>)}
          </div>
        </div>
      </div>
    </>
  );
}