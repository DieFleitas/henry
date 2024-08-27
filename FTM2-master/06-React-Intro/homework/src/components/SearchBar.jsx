import React from "react";
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  // acá va tu código
  return (
    <div>
      <input type="text" />
      <button onClick={() => onSearch("Agregado!")}>Agregar</button>
    </div>
  );
}
