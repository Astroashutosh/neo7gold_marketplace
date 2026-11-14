"use client";

import { useState } from "react";

export default function GoldWeightSelector() {
  const [selectedWeight, setSelectedWeight] = useState("");

  return (
    <select
      className="gold-weight-select"
      value={selectedWeight}
      onChange={(e) => setSelectedWeight(e.target.value)}
    >
      <option value="">Select Weight</option>
      <option value="1">1 Gram</option>
      <option value="2">2 Gram</option>
      <option value="5">5 Gram</option>
      <option value="10">10 Gram</option>
      <option value="20">20 Gram</option>
    </select>
  );
}