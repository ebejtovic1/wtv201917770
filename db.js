const Sequelize = require("sequelize");
const sequelize = new Sequelize("imenikwt","root","root",{host:"localhost",dialect:"mysql",port:3308});
module.exports = sequelize;