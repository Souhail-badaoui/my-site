

export default (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      match_date: DataTypes.DATE,
      stadium: DataTypes.STRING,
      score_home: { type: DataTypes.INTEGER, defaultValue: 0 },
      score_away: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: {
        type: DataTypes.ENUM("scheduled", "live", "finished"),
        defaultValue: "scheduled",
      },
      team_home_id: DataTypes.INTEGER,
      team_away_id: DataTypes.INTEGER,
    },
    { tableName: "matches", timestamps: true }
  );

  Match.associate = (models) => {
    Match.belongsTo(models.Team, {
      foreignKey: "team_home_id",
      as: "homeTeam",
    });

    Match.belongsTo(models.Team, {
      foreignKey: "team_away_id",
      as: "awayTeam",
    });
  };

  return Match;
};
