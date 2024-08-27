"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor != "function")
    throw TypeError("El executor no es una funcion");

  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype.then = function (successCb, errorCb) {
  let downstreamPromise = new $Promise(function () {});

  if (typeof successCb != "function") successCb = false;
  if (typeof errorCb != "function") errorCb = false;

  let objetoCb = {
    successCb,
    errorCb,
    downstreamPromise,
  };
  this._handlerGroups.push(objetoCb);

  if (this._state != "pending") {
    this._callHandlers();
  }

  return downstreamPromise;
};
$Promise.prototype.catch = function () {
  return this.then(null, errorCb);
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let actualObject = this._handlerGroups.shift();
    let downstreamPromise = actualObject.downstreamPromise;

    if (this._state === "fulfilled") {
      if (!actualObject.successCb) {
        downstreamPromise._internalResolve(this._value);
      } else {
        try {
          let resultSuccess = actualObject.successCb(this._value);
          if (resultSuccess instanceof $Promise) {
            resultSuccess.then(
              (value) => {
                downstreamPromise._internalResolve(value);
              },
              (reason) => {
                downstreamPromise._internalReject(reason);
              }
            );
          } else {
            downstreamPromise._internalResolve(resultSuccess);
          }
        } catch (error) {
          downstreamPromise._internalReject(error);
        }
      }
    } else if (this._state === "rejected") {
      if (!actualObject.errorCb) {
        downstreamPromise._internalReject(this._value);
      } else {
        try {
          let resultError = actualObject.errorCb(this._value);
          if (resultError instanceof $Promise) {
            resultError.then(
              (value) => {
                downstreamPromise._internalResolve(value);
              },
              (reason) => {
                downstreamPromise._internalReject(reason);
              }
            );
          } else {
            downstreamPromise._internalResolve(resultError);
          }
        } catch (error) {
          downstreamPromise._internalReject(error);
        }
      }

    }
  }
};

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this_state === "pending") {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
