import React, { useState } from "react";

const RatingForm = ({ storeId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeId, rating, comment }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Rating submitted successfully!");
      setRating(1);
      setComment("");
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block">
        <span className="text-gray-700">Your Rating:</span>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-700">Comment:</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows="2"
          placeholder="Write your review..."
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Rating
      </button>

      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
};

export default RatingForm;
