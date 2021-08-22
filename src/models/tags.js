const { DataTypes, Model } = require('sequelize');

class Tags extends Model {
  static init(sequelize){
    super.init({

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      }

    },{
      sequelize,
      modelName: "tags"
    })
  }

  static associate(models){
    this.hasMany(models.compliments, { foreignKey: "tag_id", as: "Tag_Compliments" });
  }
}

module.exports = Tags;