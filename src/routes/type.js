const express = require("express");
const {
  getAllTypes,
  createType,
  addTypesToPokemon,
  addDamageRelationshipToType,
  deleteAllTypes,
} = require("../controllers/type");

const router = express.Router();

router.get("/", getAllTypes);
router.post("/", createType);
router.post("/:typeName/pokemons/:pokemonName", addTypesToPokemon);
router.put("/:typeName", addDamageRelationshipToType);
router.delete("/", deleteAllTypes);

module.exports = router;
