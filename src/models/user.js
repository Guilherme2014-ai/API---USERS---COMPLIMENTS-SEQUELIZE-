const { DataTypes, Model } = require('sequelize');

class Users extends Model {
  static init(sequelize){
    super.init({
      
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rule: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }

    },{
      sequelize,
      modelName: "users"
    })
  }

  static associate(models){
    this.hasMany(models.compliments, { foreignKey: "user_receiver", as: "Receiveds" });
    this.hasMany(models.compliments, { foreignKey: "user_sender", as: "Sent" });
  }
}

// Tags.sync({ force: false }).then(()=>{ console.log('Tags_Sync_Success !') }).catch(err => console.error(`Tags_Sync_ERROR(${err})`));

module.exports = Users;