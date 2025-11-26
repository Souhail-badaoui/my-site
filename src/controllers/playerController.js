import {Player} from '../models/Player.js'
import { Team  } from '../models/Team.js';
export const playerController = {

  async getAllPlayers(req, res) {
    try {
      const players = await Player.findAll({ include: Team });
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async getPlayerById(req, res) {
    try {
      const player = await Player.findByPk(req.params.id, { include: Team });
      if (!player) return res.status(404).json({ message: "Player not found" });

      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async createPlayer(req, res) {
    try {
      const player = await Player.create(req.body);
      res.status(201).json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updatePlayer(req, res) {
    try {
      const player = await Player.findByPk(req.params.id);
      if (!player) return res.status(404).json({ message: "Player not found" });

      await player.update(req.body);
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  async deletePlayer(req, res) {
    try {
      const player = await Player.findByPk(req.params.id);
      if (!player) return res.status(404).json({ message: "Player not found" });

      await player.destroy();
      res.json({ message: "Player deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
