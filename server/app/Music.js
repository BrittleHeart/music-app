import Sequelize from 'sequelize'
import connection from '../database/config'

const MusicList = connection.define('musicList', {
    musicId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 4,
        max: 255,
        defaultValue: 'Default Music'
    },

    author: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 3,
        max: 255,
        defaultValue: 'Default Music'
    },

    src: {
        type: Sequelize.STRING,
        min: 5,
        max: 255,
        allowNull: false
    },

    extension: {
        type: Sequelize.STRING,
        allowNull: false,
        min: 3,
        max: 4
    },

    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },

    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },

    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
})

export default MusicList