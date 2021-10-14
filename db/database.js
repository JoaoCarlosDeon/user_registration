const {Sequelize} = require('sequelize')

const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
)
// try{
//     connection.authenticate()
//     console.log('DB conectado com sucesso eeee!')
// }
// catch(err) {
//     console.log('Não foi possível a conexção com o DB', err)
// }

module.exports = connection