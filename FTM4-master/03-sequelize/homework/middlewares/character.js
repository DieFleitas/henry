const { Router } = require("express");
const { Op, Character, Role, Ability } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const error = validatePost(req.body.personaje);
  if (error) return res.status(404).send("Falta enviar datos obligatorios");

  const { habilidades } = req.body;

  try {
    const pj = await Character.create({ ...req.body.personaje });

    if (pj) {
      const resultado = await pj.addAbilities(habilidades);
      return res.send(
        await Character.findByPk(pj.code, {
          include: Ability,
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { race, age } = req.query;
    if (!race) {
      return res.status(200).json(await Character.findAll());
    } else {
      const filtro = await Character.findAll({
        where: { race, age },
      });
      if (filtro.length > 0) return res.status(200).json(filtro);
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
});

router.get("/young", async (req, res) => {
  try {
    const personajes = await Character.findAll({
      where: {
        age: {
          [Op.lt]: 25,
        },
      },
    });

    return res.json(personajes);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/:code", (req, res, next) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({ err: "Falta enviar code por params" });
  } else {
    Character.findByPk(code)
      .then((pj) => res.status(200).json(pj))
      .catch((err) => res.status(400).json({ err }));
  }
});

router.put("/:attribute", (req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;

  if (!attribute || !value)
    return res.status(400).json({ err: "Faltan paramas o query" });

  Character.update(
    { [attribute]: value },
    {
      where: {
        [attribute]: null,
      },
    }
  )
    .then((response) => res.send("Personajes actualizados"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
