import React, { useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  // acá va tu código
  const [city, setCity] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(city);
      }}
      className={styles.container}
    >
      <input
        onChange={(e) => setCity(e.target.value)}
        type="text"
        className={styles.input}
        placeholder='Ciudad...'
      />
      <button type="submit" className={styles.btn}>Agregar</button>
    </form>
  );
}
