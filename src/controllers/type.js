const Type = require("../models/type");
const Pokemon = require("../models/pokemon");

const getAllTypes = async (req, res) => {
  const types = await Type.find()
    .select({
      half_damage_from: 0,
      half_damage_to: 0,
      no_damage_from: 0,
      no_damage_to: 0,
    })
    .populate([
      {
        path: "double_damage_from double_damage_to",
        select: { name: 1, imgSrc: 1, color: 1, _id: 0 },
      },
    ])
    .exec();
  if (!types) {
    return res.json("types have not been founded");
  }
  return res.json(types);
};

const createType = async (req, res) => {
  const { name, imgSrc, color } = req.body;
  const type = new Type({ name, imgSrc, color });
  await type.save();
  return res.json(type);
};

const addTypesToPokemon = async (req, res) => {
  const { typeName, pokemonName } = req.params;
  const { typeSlot } = req.body;
  const type = await Type.findOne({ name: typeName }).exec();
  const pokemon = await Pokemon.findOne({ name: pokemonName }).exec();
  if (!type || !pokemon) {
    return res.status(404).json("type or pokemon has not been founded");
  }
  pokemon.types.addToSet({ slot: typeSlot * 1, type: type._id });
  await pokemon.save();
  return res.json(pokemon);
};

const addDamageRelationshipToType = async (req, res) => {
  const { typeName } = req.params;
  const { doubleFrom, doubleTo, halfFrom, halfTo, noFrom, noTo } = req.body;
  const targetType = await Type.findOne({ name: typeName }).exec();
  if (!targetType) {
    return res.status(404).json("type has not been founded");
  }
  const dataForm = [
    { value: doubleFrom, docKey: "double_damage_from" },
    { value: doubleTo, docKey: "double_damage_to" },
    { value: halfFrom, docKey: "half_damage_from" },
    { value: halfTo, docKey: "half_damage_to" },
    { value: noFrom, docKey: "no_damage_from" },
    { value: noTo, docKey: "no_damage_to" },
  ];
  for (let i = 0; i < dataForm.length; i += 1) {
    let typeArr = [];
    if (dataForm[i].value.length !== 0) {
      for (let j = 0; j < dataForm[i].value.length; j += 1) {
        const type = await Type.findOne({
          name: dataForm[i].value[j].name,
        }).exec();
        typeArr.push(type);
      }
    }
    if (typeArr.length !== 0) {
      for (let z = 0; z < typeArr.length; z += 1) {
        targetType[dataForm[i].docKey].addToSet(typeArr[z]._id);
        await targetType.save();
      }
    }
  }
  return res.json(targetType);
};

const deleteAllTypes = async (req, res) => {
  await Type.deleteMany().exec();
  return res.json("deleted");
};

module.exports = {
  getAllTypes,
  createType,
  addTypesToPokemon,
  addDamageRelationshipToType,
  deleteAllTypes,
};
