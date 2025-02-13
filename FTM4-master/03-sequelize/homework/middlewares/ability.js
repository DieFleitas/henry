const { Router } = require("express");
const { Ability, Character } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const error = validateAbility(req.body.hab);
  if (error) return res.status(404).send("Falta enviar datos obligatorios");
  try {
    const { hab } = req.body;
    const habilidad = await Ability.create({ hab });

    res.status(201).send(habilidad);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/setCharacter", async (req, res) => {
  const { idAbility, codeCharacter } = req.body;
  if (!idAbility || !codeCharacter)
    return res.status(400).json({ msg: "Missing data" });

  try {
    const habilidad = await Ability.findByPk(idAbility);
    const personaje = await Character.findByPk(codeCharacter);
    if (!personaje) return res.status(404).send("Personaje no encontrado");

    const resultado = await habilidad.setCharacter(codeCharacter);
    res.json({msg: Success, data: resultado});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = router;
