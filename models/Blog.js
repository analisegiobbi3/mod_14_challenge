const {Model, DataType} = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model {}

Blog.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
        },
        content: {
            type: DataType.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataType.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;

