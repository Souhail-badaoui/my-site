

export default (sequelize, DataTypes) => {
  const Player = sequelize.define(
    "Player",
    {
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      number: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
    },
    { tableName: "players", timestamps: true }
  );

  Player.associate = (models) => {
    Player.belongsTo(models.Team, {
      foreignKey: "team_id",
      as: "team",
    });
  };

  return Player;
};


