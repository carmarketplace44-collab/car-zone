import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const initialCars = [
  {
    id: 1,
    image: "/car1.jpg",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    mileage: 15000,
    price: 220000,
    status: "available",
    description: "Great condition, full service history.",
    whatsapp: "+26771234567",
  },
  {
    id: 2,
    image: "/car2.jpg",
    make: "Honda",
    model: "CR-V",
    year: 2021,
    mileage: 20000,
    price: 210000,
    status: "sold",
    description: "Reliable SUV, low mileage.",
    whatsapp: "+26776543210",
  },
];

export default function DealerDashboard() {
  const [authMode, setAuthMode] = useState("login");
  const [cars, setCars] = useState(initialCars);
  const [newCar, setNewCar] = useState({
    image: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    description: "",
    whatsapp: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInput = (e) => setNewCar({ ...newCar, [e.target.name]: e.target.value });
  const handleImageUpload = (e) => setNewCar({ ...newCar, image: "/car-placeholder.jpg" });
  const handleAddCar = (e) => {
    e.preventDefault();
    setCars([...cars, { ...newCar, id: Date.now(), status: "available" }]);
    setNewCar({ image: "", make: "", model: "", year: "", mileage: "", price: "", description: "", whatsapp: "" });
  };
  const handleEditCar = (id) => {
    setEditingId(id);
    const car = cars.find((c) => c.id === id);
    setNewCar({ ...car });
  };
  const handleSaveEdit = () => {
    setCars(cars.map((c) => (c.id === editingId ? { ...newCar, id: editingId } : c)));
    setEditingId(null);
    setNewCar({ image: "", make: "", model: "", year: "", mileage: "", price: "", description: "", whatsapp: "" });
  };
  const handleDeleteCar = (id) => setCars(cars.filter((c) => c.id !== id));
  const handleMarkSold = (id) => setCars(cars.map((c) => (c.id === id ? { ...c, status: "sold" } : c)));
  const dealerId = "dealer123";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Dealer Dashboard</h1>
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <div className="flex gap-4 mb-2">
              <button className={`text-sm font-semibold py-1 px-3 rounded ${authMode === "login" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAuthMode("login")}>Log In</button>
              <button className={`text-sm font-semibold py-1 px-3 rounded ${authMode === "signup" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setAuthMode("signup")}>Sign Up</button>
            </div>
            {authMode === "login" ? (
              <form className="flex flex-col gap-2">
                <input type="email" placeholder="Email" className="border rounded p-2 text-sm" />
                <input type="password" placeholder="Password" className="border rounded p-2 text-sm" />
                <button type="button" className="bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700 mt-2" disabled>Log In</button>
              </form>
            ) : (
              <form className="flex flex-col gap-2">
                <input type="text" placeholder="Dealer Name" className="border rounded p-2 text-sm" />
                <input type="email" placeholder="Email" className="border rounded p-2 text-sm" />
                <input type="password" placeholder="Password" className="border rounded p-2 text-sm" />
                <input type="text" placeholder="WhatsApp Number" className="border rounded p-2 text-sm" />
                <button type="button" className="bg-blue-600 text-white rounded p-2 font-medium hover:bg-blue-700 mt-2" disabled>Sign Up</button>
              </form>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">My Car Listings</h2>
            <Link href={`/dealers/${dealerId}`} className="text-blue-700 hover:underline font-medium transition">White-label Page</Link>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow mb-6">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-100 text-blue-800 text-sm">
                  <th className="p-2">Image</th>
                  <th className="p-2">Make</th>
                  <th className="p-2">Model</th>
                  <th className="p-2">Year</th>
                  <th className="p-2">Mileage</th>
                  <th className="p-2">Price (BWP)</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} className="border-t text-sm hover:bg-blue-50 transition">
                    <td className="p-2">
                      <img src={car.image} alt="Car" className="w-20 h-12 object-cover rounded" />
                    </td>
                    <td className="p-2">{car.make}</td>
                    <td className="p-2">{car.model}</td>
                    <td className="p-2">{car.year}</td>
                    <td className="p-2">{car.mileage.toLocaleString()}</td>
                    <td className="p-2 font-semibold text-blue-700">{car.price.toLocaleString()}</td>
                    <td className="p-2">
                      {car.status === "sold" ? (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">Sold</span>
                      ) : (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold">Available</span>
                      )}
                    </td>
                    <td className="p-2 flex gap-2">
                      {car.status !== "sold" && (
                        <button className="bg-yellow-500 text-white rounded px-2 py-1 text-xs hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition" onClick={() => handleMarkSold(car.id)}>Mark as Sold</button>
                      )}
                      <button className="bg-gray-300 text-gray-700 rounded px-2 py-1 text-xs hover:bg-gray-400 focus:ring-2 focus:ring-blue-300 transition" onClick={() => handleEditCar(car.id)}>Edit</button>
                      <button className="bg-red-500 text-white rounded px-2 py-1 text-xs hover:bg-red-700 focus:ring-2 focus:ring-red-300 transition" onClick={() => handleDeleteCar(car.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-2 text-blue-800">{editingId ? "Edit Car Listing" : "Add New Car Listing"}</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={editingId ? (e) => { e.preventDefault(); handleSaveEdit(); } : handleAddCar}>
              <div>
                <label className="block text-xs font-medium mb-1">Image</label>
                <input type="file" accept="image/*" className="border rounded p-2 text-sm w-full" onChange={handleImageUpload} disabled />
                {newCar.image && (<img src={newCar.image} alt="Preview" className="mt-2 w-24 h-16 object-cover rounded" />)}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Make</label>
                <input type="text" name="make" className="border rounded p-2 text-sm w-full" value={newCar.make} onChange={handleInput} required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Model</label>
                <input type="text" name="model" className="border rounded p-2 text-sm w-full" value={newCar.model} onChange={handleInput} required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Year</label>
                <input type="number" name="year" className="border rounded p-2 text-sm w-full" value={newCar.year} onChange={handleInput} required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Mileage</label>
                <input type="number" name="mileage" className="border rounded p-2 text-sm w-full" value={newCar.mileage} onChange={handleInput} required />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Price (BWP)</label>
                <input type="number" name="price" className="border rounded p-2 text-sm w-full" value={newCar.price} onChange={handleInput} required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea name="description" className="border rounded p-2 text-sm w-full" value={newCar.description} onChange={handleInput} required />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">WhatsApp Number</label>
                <input type="text" name="whatsapp" className="border rounded p-2 text-sm w-full" value={newCar.whatsapp} onChange={handleInput} required />
              </div>
              <div className="sm:col-span-2 flex gap-2 mt-4">
                <button type="submit" className="bg-blue-700 text-white rounded px-4 py-2 font-semibold hover:bg-blue-900 focus:bg-blue-900 transition">{editingId ? "Save Changes" : "Add Car"}</button>
                {editingId && (
                  <button type="button" className="bg-gray-300 text-gray-700 rounded px-4 py-2 font-semibold hover:bg-gray-400 focus:bg-gray-400 transition" onClick={() => { setEditingId(null); setNewCar({ image: "", make: "", model: "", year: "", mileage: "", price: "", description: "", whatsapp: "" }); }}>Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}