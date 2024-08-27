import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  // acá va tu código
  return (
    <div className={styles.container}>
      <input type="text"  className={styles.input}/>
      <button className={styles.btn} onClick={() => onSearch("Agregado!")}>
        Agregar
      </button>
    </div>
  );
}
