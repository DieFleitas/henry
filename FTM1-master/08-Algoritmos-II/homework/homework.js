"use strict";
// No cambies los nombres de las funciones.

function quickSort(array) {
  // Implementar el método conocido como quickSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:
  if (array.length < 2) return array;

  let left = [],
    right = [],
    pivot = array.shift();

  for (let item of array) {
    if (pivot > item) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(array) {
  // Implementar el método conocido como mergeSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:

  if (array.length < 2) return array;

  const idx = Math.floor(array.length / 2);
  let left = array.slice(0, idx);
  let right = array.slice(idx);

  left = mergeSort(left);
  right = mergeSort(right);

  const result = [];

  while(left.length && right.length) {
    if(left[0] > right[0]) {
      result.push(right.shift())
    } else {
      result.push(left.shift())
    };
  }

  return [...result, ...left, ...right];
}

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  quickSort,
  mergeSort,
};
