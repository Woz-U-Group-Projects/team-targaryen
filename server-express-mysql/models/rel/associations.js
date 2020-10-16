module.exports = function (models) {
    models.users.hasMany(models.tasks, { foreignKey: "userId" });
    models.tasks.belongsTo(models.users, {
        foreignKey: "userId",
        targetKey: "userId"
    });
}