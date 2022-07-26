import React from "react";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <>
      <p> Filtrar: </p>
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={'buscar'}
      />
    </>
  );
}