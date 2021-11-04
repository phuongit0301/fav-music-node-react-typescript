module.exports = (sequelize, Sequelize) => {
  const Album = sequelize.define("album", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isBest: {
      type: Sequelize.BOOLEAN
    }
  });

  return Album;
};