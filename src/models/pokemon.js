const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  imgSrc: { type: String, required: true },
  order: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  shape: { type: String, required: true },
  growth_rate: { type: String, required: true },
  habitat: { type: String, required: true },
  abilities: [{ type: String }],
  egg_groups: [{ type: String }],
  base_stats: [
    {
      _id: false,
      name: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
  types: [
    {
      _id: false,
      slot: { type: Number },
      type: { type: Schema.Types.ObjectId, ref: "Type" },
    },
  ],
  evolution_chain: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }],
});

module.exports = model("Pokemon", schema);
