const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('zooberride', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;

sequelize.authenticate()
    .then(() => {
        console.log("Connected to MySQL Database");
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
