const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));
  });

  describe("POST /producto", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    it("responds with 200", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .expect(200));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 2 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it("responds with and object with message `test`", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 4 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });

  describe("POST /numString", () => {
    it("responds with 200", () =>
      agent.post("/numString").send({ str: "hola" }).expect(200));

    it("responds with 200", () =>
      agent
        .post("/numString")
        .send({ str: "hola" })
        .expect(200)
        .then((res) => {
          expect(res.body.result).toEqual(4);
        }));

    it("responds with 200", () =>
      agent.post("/numString").send({ str: 5 }).expect(400));

    it("responds with 200", () =>
      agent.post("/numString").send({ str: "" }).expect(400));
  });

  describe("POST /pluck", () => {
    it("responds with 200", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "pepe" }, { surname: "argento" }, { name: "moni" }],
          prop: "name",
        })
        .expect(200));

    it("responds with 200", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "pepe" }, { surname: "argento" }, { name: "moni" }],
          prop: "name",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.result).toEqual(["pepe", "moni"]);
        }));

    it("responds with 400", () =>
      agent
        .post("/pluck")
        .send({
          array: true,
          prop: "name",
        })
        .expect(400));

    it("responds with 400", () =>
      agent
        .post("/pluck")
        .send({
          array: [{ name: "pepe" }, { surname: "argento" }, { name: "moni" }],
          prop: "",
        })
        .expect(400));
  });
});
