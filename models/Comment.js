const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Comment extends Model{}

//comment model includes id, userid, blog id, and the content of the comment
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        blog_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'blog',
                key: 'id',
            }
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;