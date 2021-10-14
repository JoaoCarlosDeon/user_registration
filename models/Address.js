const { DataTypes } = require('sequelize')
const connection = require('../db/database')
const User = require('./User')
const Address = connection.define('Address', {

    street: {
        type: DataTypes.STRING,
        require: true,
    },
    number: {
        type: DataTypes.STRING,
        require: true,
    },
    city: {
        type: DataTypes.STRING,
        require: true,
    }
})

//RELACIONAMENTO
User.hasMany(Address)
//um usuário tem muitos endereços

Address.belongsTo(User)
//um endereço pertence á um usuario


module.exports = Address