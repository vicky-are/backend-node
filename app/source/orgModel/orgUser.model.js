module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lz_user", {
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      designation: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // validate : {isInt: true}
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: true, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
        validate : {isInt: true}
      },
      createdAt: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
        field:'created_at'
      },
      updatedAt: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue:sequelize.literal('CURRENT_TIMESTAMP'),
        field:'updated_at'
      },
    },{
      tableName:'lz_user'
    });
};