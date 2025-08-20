import React from "react";
import StoreList from "./StoreList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🏪 Store Rating App
      </h1>
      <StoreList />
    </div>
  );
}

export default App;
