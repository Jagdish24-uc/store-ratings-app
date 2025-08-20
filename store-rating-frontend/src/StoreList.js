import React, { useState, useEffect } from "react";
import RatingForm from "./RatingForm";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch stores from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/stores")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading stores...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {stores.map((store) => (
        <div
          key={store._id}
          className="bg-white shadow-lg rounded-xl p-5 border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>
          <p className="text-gray-500">📍 {store.location}</p>
          <p className="text-yellow-600 font-medium mt-2">
            ⭐ Average Rating: {store.averageRating?.toFixed(1) || "No ratings yet"}
          </p>

          <div className="mt-4">
            <RatingForm storeId={store._id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
