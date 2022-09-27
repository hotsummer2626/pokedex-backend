const Pokemon = require("../models/pokemon");

const getAllPokemons = async (req, res) => {
  const pokemons = await Pokemon.find()
    .sort({ order: 1 })
    .populate({
      path: "types",
      populate: {
        path: "type",
        select: { name: 1, color: 1, _id: 0 },
      },
    })
    .populate({
      path: "evolution_chain",
      select: { name: 1, imgSrc: 1, order: 1, _id: 0 },
    })
    .exec();
  if (!pokemons) {
    return res.status(404).json("pokemons have not been founded");
  }
  pokemons.reduce((prev, curr) => {
    curr.types = curr.types.sort((prev, curr) => prev.slot - curr.slot);
    return [...prev, curr];
  }, []);
  return res.json(pokemons);
};

const createPokemon = async (req, res) => {
  const {
    name,
    imgSrc,
    order,
    weight,
    height,
    shape,
    growth_rate,
    habitat,
    abilities,
    egg_groups,
    base_stats,
  } = req.body;
  const pokemon = new Pokemon({
    name,
    imgSrc,
    order: order * 1,
    weight: weight * 1,
    height: height * 1,
    shape,
    growth_rate,
    habitat,
    abilities,
    egg_groups,
    base_stats,
  });
  await pokemon.save();
  return res.json(pokemon);
};

const addEvolutionChainToPokemon = async (req, res) => {
  const { name } = req.params;
  const { evolutionChain } = req.body;
  const pokemon = await Pokemon.findOne({ name }).exec();
  if (!pokemon) {
    return res.status(404).json("pokemon has not been founded");
  }
  for (let i = 0; i < evolutionChain.length; i += 1) {
    let target = await Pokemon.findOne({ name: evolutionChain[i] }).exec();
    if (!target) continue;
    pokemon.evolution_chain.addToSet(target._id);
    await pokemon.save();
  }
  return res.json(pokemon);
};

const deleteAllPokemons = async (req, res) => {
  await Pokemon.deleteMany().exec();
  return res.json("deleted");
};

module.exports = {
  getAllPokemons,
  createPokemon,
  addEvolutionChainToPokemon,
  deleteAllPokemons,
};
