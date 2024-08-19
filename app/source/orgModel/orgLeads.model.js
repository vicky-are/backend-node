module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lz_leads", {
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: 1,
        },
        created_by: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'created_at'
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            field: 'updated_at'
        },
    }, {
        tableName: 'lz_leads'
    });
};