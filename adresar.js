const Sequelize = require("sequelize");
const sequelize = require("./db.js");
const Imenik = sequelize.import(__dirname+"/imenik.js");
const Adresar = sequelize.define('Adresar',{
    idKontakta: {
        type: Sequelize.INTEGER,
        references: {
            model: Imenik,
            key: 'id'
        }
    },
    idPoznanika: {
        type: Sequelize.INTEGER,
        references: {
            model: Imenik,
        }
    }
})


module.exports = function(sequelize,DataTypes){
    return Adresar;
}