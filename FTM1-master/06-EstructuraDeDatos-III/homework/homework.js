"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  size() {
    let count = 1;

    if (this.left) {
      count += this.left.size();
    }
    if (this.right) {
      count += this.right.size();
    }

    return count;
  }

  insert(value) {
    if (this.value > value) {
      if (!this.left) {
        this.left = new BinarySearchTree(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new BinarySearchTree(value);
      } else {
        this.right.insert(value);
      }
    }
  }

  contains(value) {
    if (this.value === value) {
      return true;
    }

    if (this.left) {
      if (this.left.contains(value)) {
        return true;
      }
    }

    if (this.right) {
      if (this.right.contains(value)) {
        return true;
      }
    }

    return false;
  }

  depthFirstForEach(cb, order = "in-order") {
    switch (order) {
      case "in-order": {
        if(this.left) this.left.depthFirstForEach(cb, order);
        cb(this.value);
        if(this.right) this.right.depthFirstForEach(cb, order);
        break;
      }

      case "pre-order": {
        cb(this.value);
        if(this.left) this.left.depthFirstForEach(cb, order);
        if(this.right) this.right.depthFirstForEach(cb, order);
        break;
      }

      case "post-order": {
        if(this.left) this.left.depthFirstForEach(cb, order);
        if(this.right) this.right.depthFirstForEach(cb, order);
        cb(this.value);
        break;
      }
    }
  }

  breadthFirstForEach(cb, queue = []) {
    cb(this.value);
    if(this.left) queue.push(this.left);
    if(this.right) queue.push(this.right);

    if(queue.length) {
      queue.shift().breadthFirstForEach(cb, queue)
    }

  }
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
