const Match = require("../models/Match");

exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMatches = async (req, res) => {
  const matches = await Match.findAll();
  res.json(matches);
};

exports.getMatch = async (req, res) => {
  const match = await Match.findByPk(req.params.id);
  res.json(match);
};

exports.updateMatch = async (req, res) => {
  await Match.update(req.body, { where: { id: req.params.id }});
  const updated = await Match.findByPk(req.params.id);
  res.json(updated);
};

exports.deleteMatch = async (req, res) => {
  await Match.destroy({ where: { id: req.params.id }});
  res.json({ message: "Match deleted" });
};
