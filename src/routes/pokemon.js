const express = require("express");
const {
  getAllPokemons,
  createPokemon,
  deleteAllPokemons,
  addEvolutionChainToPokemon,
} = require("../controllers/pokemon");

const router = express.Router();

router.get("/", getAllPokemons);
router.post("/", createPokemon);
router.put("/:name", addEvolutionChainToPokemon);
router.delete("/", deleteAllPokemons);

module.exports = router;
