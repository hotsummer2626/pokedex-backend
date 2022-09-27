const express = require("express");
const pokemonRouter = require("./pokemon");
const typeRouter = require("./type");

const router = express.Router();

router.use("/pokemons", pokemonRouter);
router.use("/types", typeRouter);

module.exports = router;
