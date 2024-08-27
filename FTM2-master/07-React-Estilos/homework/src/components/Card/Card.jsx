import React from "react";
import styles from "./Card.module.css";

export default function Card({ min, max, name, img, onClose }) {
  // acá va tu código
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button onClick={onClose}>X</button>
        <h2>{name}</h2>
      </div>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          Min: <br />
           {min}
          </p>
        <p className={styles.paragraph}>
          Max: <br />
           {max}
          </p>
        <img
          src={`http://openweathermap.org/img/wn/${img}@2x.png`}
          alt={name}
        />
      </div>
    </div>
  );
}
