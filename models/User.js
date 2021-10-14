const { DataTypes } = require('sequelize')
const connection = require('../db/database')

const User = connection.define('User', {
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation: {
        type: DataTypes.STRING,
        require: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
})



module.exports = User

