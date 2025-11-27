
export default (sequelize, DataTypes) => {
  const Team = sequelize.define(
    "Team",
    {
      name: DataTypes.STRING,
      coach: DataTypes.STRING,
      group: DataTypes.STRING,
      ranking: DataTypes.INTEGER,
    },
    { tableName: "teams", timestamps: true }
  );

  Team.associate = (models) => {
    Team.hasMany(models.Player, {
      foreignKey: "team_id",
      as: "players",
    });

    Team.hasMany(models.Match, {
      foreignKey: "team_home_id",
      as: "homeMatches",
    });

    Team.hasMany(models.Match, {
      foreignKey: "team_away_id",
      as: "awayMatches",
    });
  };

  return Team;
};
