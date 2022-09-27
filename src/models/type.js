const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  imgSrc: { type: String, required: true },
  color: { type: String, required: true },
  double_damage_from: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  double_damage_to: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  half_damage_from: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  half_damage_to: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  no_damage_from: [{ type: Schema.Types.ObjectId, ref: "Type" }],
  no_damage_to: [{ type: Schema.Types.ObjectId, ref: "Type" }],
});

module.exports = model("Type", schema);
