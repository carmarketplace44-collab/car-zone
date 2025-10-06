import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const carData = [
  {
    id: 1,
    image: "/car1.jpg",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    mileage: 15000,
    price: 220000,
    dealerName: "AutoHub",
    dealerPhone: "+1234567890",
  },
  {
    id: 2,
    image: "/car2.jpg",
    make: "Honda",
    model: "Civic",
    year: 2021,
    mileage: 12000,
    price: 20000,
    dealerName: "CarZone",
    dealerPhone: "+1987654321",
  },
];

export default function BuyerBrowsePage() {
  const [search, setSearch] = useState({ make: "", model: "", year: "", price: "", mileage: "" });
  const filteredCars = carData; // Placeholder

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-2 py-6 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Browse Cars</h1>
          <form className="bg-white rounded-xl shadow p-4 mb-7 flex flex-col gap-2 sm:flex-row sm:gap-2">
            <input type="text" className="border rounded p-2 text-sm flex-1" placeholder="Make" value={search.make} onChange={e => setSearch({ ...search, make: e.target.value })} />
            <input type="text" className="border rounded p-2 text-sm flex-1" placeholder="Model" value={search.model} onChange={e => setSearch({ ...search, model: e.target.value })} />
            <input type="number" className="border rounded p-2 text-sm flex-1" placeholder="Year" value={search.year} onChange={e => setSearch({ ...search, year: e.target.value })} />
            <input type="number" className="border rounded p-2 text-sm flex-1" placeholder="Max Price" value={search.price} onChange={e => setSearch({ ...search, price: e.target.value })} />
            <input type="number" className="border rounded p-2 text-sm flex-1" placeholder="Max Mileage" value={search.mileage} onChange={e => setSearch({ ...search, mileage: e.target.value })} />
            <button type="button" className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 focus:bg-blue-900 transition" disabled>Search</button>
          </form>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map(car => (
              <div key={car.id} className="bg-white rounded-xl shadow hover:shadow-lg transition group flex flex-col overflow-hidden">
                <img src={car.image} alt="Car" className="w-full h-44 object-cover group-hover:scale-105 transition" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="font-bold text-lg text-gray-800">{car.year} {car.make} {car.model}</h2>
                  <p className="text-gray-500 text-sm mb-1">Mileage: {car.mileage.toLocaleString()} km</p>
                  <p className="text-blue-700 font-bold text-lg mb-1">BWP {car.price.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm mb-3">Dealer: {car.dealerName}</p>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/car/${car.id}`} className="text-blue-700 hover:underline hover:text-blue-900 font-medium transition">View Details</Link>
                    <a href={`https://wa.me/${car.dealerPhone.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer"
                      className="bg-green-500 text-white px-3 py-1 rounded font-medium hover:bg-green-700 focus:bg-green-700 transition">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}