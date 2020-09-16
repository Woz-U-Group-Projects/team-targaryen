'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Tasks", deps: []
 * createTable "users", deps: []
 * createTable "tasks", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "init",
    "created": "2020-09-16T00:42:44.340Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Tasks",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "complete": {
                    "type": Sequelize.BOOLEAN,
                    "field": "complete"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "users",
            {
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING(90),
                    "field": "username",
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING(90),
                    "field": "email",
                    "unique": true,
                    "allowNull": false
                },
                "password": {
                    "type": Sequelize.STRING(255),
                    "field": "password",
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "tasks",
            {
                "taskId": {
                    "type": Sequelize.INTEGER,
                    "field": "taskId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "taskTitle": {
                    "type": Sequelize.STRING(255),
                    "field": "taskTitle",
                    "allowNull": true
                },
                "taskBody": {
                    "type": Sequelize.STRING(255),
                    "field": "taskBody",
                    "allowNull": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "field": "userId",
                    "references": {
                        "model": "users",
                        "key": "userId"
                    },
                    "allowNull": false
                },
                "done": {
                    "type": Sequelize.BOOLEAN,
                    "field": "done",
                    "defaultValue": false,
                    "allowNull": false
                },
                "deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "deleted",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
