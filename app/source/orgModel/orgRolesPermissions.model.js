module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lz_role_permissions", {
      designation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      list_: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
      },
      save_: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
      },
      update_: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
      },
      delete_: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:1,
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
      tableName:'lz_role_permissions'
    });
  };
  