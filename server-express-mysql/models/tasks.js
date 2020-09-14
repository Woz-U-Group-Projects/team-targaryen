/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tasks', {
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    taskTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    taskBody: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'tasks'
  });
};
