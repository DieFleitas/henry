import React from "react";

export default function Card({ min, max, name, img, onClose }) {
  // acá va tu código
  return (
    <div>
      <button onClick={onClose}>X</button>
      <h2>{name}</h2>
      <h3>
        Min: {min} - Max: {max}
      </h3>
      <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt={name} />
    </div>
  );
}
