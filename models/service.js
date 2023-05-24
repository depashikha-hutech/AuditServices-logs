const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const AduitService = sequelize.define(
        "Audit",
        {
            Contextid: {
                type :DataTypes.TEXT,
                allowNull: false
            },
            name:{type:DataTypes.TEXT,allowNull: false},
            type:{type:DataTypes.TEXT,allowNull: false},
            details:{type:DataTypes.TEXT,allowNull: false},
            OrgId:{type :DataTypes.UUID,allowNull: true},
            tenantId:{type :DataTypes.UUID,allowNull: true},
            loggedBy:{type:DataTypes.TEXT,allowNull: false},
            role:{type:DataTypes.TEXT,allowNull: false},
            Contextid: { type :DataTypes.TEXT, allowNull: false},
            date:{type:DataTypes.DATE},
        },
        { tabelName :"aduitservice"}
    );
    return AduitService;
}