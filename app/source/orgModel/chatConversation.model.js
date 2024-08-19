module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lz_chats", {
      conversation_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      messages: {
        type: Sequelize.TEXT,
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
      tableName:'lz_chats'
    });
  };
  