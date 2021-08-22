const { DataTypes, Model } = require('sequelize');

class Compliments extends Model {
  static init(sequelize){
    super.init({

      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_receiver: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      user_sender: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      tag_id: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
      
    },{
      sequelize,
      modelName: "compliments"
    })
  }

  static associate(models){
    // Tag
      this.belongsTo(models.tags, { foreignKey: "tag_id", as: "Compliment_Tag" });
    // User
      this.belongsTo(models.users, { foreignKey: "user_receiver", as: "Receiveds" });
      this.belongsTo(models.users, { foreignKey: "user_sender", as: "Sent" });
    //
  }
};


module.exports = Compliments;