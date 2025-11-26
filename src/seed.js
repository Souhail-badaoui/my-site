import { sequelize } from "./config/database.js";
import { Team } from "./models/Team.js";
import { Player } from "./models/Player.js";

async function seed() {
  await sequelize.sync({ force: true });
  console.log("Database cleared.");

  const morocco = await Team.create({
    name: "Morocco",
    coach: "Walid Regragui",
    group: "A",
    ranking: 1
  });

  const senegal = await Team.create({
    name: "Senegal",
    coach: "Aliou Cissé",
    group: "A",
    ranking: 2
  });

  await Player.create({
    name: "Achraf Hakimi",
    age: 25,
    position: "RB",
    teamId: morocco.id
  });

  await Player.create({
    name: "Bono",
    age: 33,
    position: "GK",
    teamId: morocco.id
  });

  await Player.create({
    name: "Sadio Mane",
    age: 32,
    position: "LW",
    teamId: senegal.id
  });

  console.log("Seeding completed!");
}

seed();
