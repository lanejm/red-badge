const Sequelize = require('sequelize');


const database = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

database.authenticate()
.then(() => console.log('postgres database is connected'))
.catch(err => console.log(err))


module.exports = database;

//db association? 