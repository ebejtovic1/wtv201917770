const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
    const Imenik = sequelize.define('Imenik',{
        ime: Sequelize.STRING,
        adresa: Sequelize.STRING,
        brojTelefona: Sequelize.STRING
    })
    return Imenik;
}