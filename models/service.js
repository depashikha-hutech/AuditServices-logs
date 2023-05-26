const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const AduitService = sequelize.define(
        "Audit",
        {
            Contextid: {
                type :DataTypes.TEXT,
                allowNull: true
            },
            event:{type:DataTypes.TEXT,allowNull: false},
            type:{type:DataTypes.TEXT,allowNull: false},
            details:{type:DataTypes.TEXT,allowNull: false},
            OrgId:{type :DataTypes.UUID,allowNull: true},
            tenantId:{type :DataTypes.UUID,allowNull: true},
            user:{type:DataTypes.TEXT,allowNull: false},
            role:{type:DataTypes.TEXT,allowNull: false},
            Contextid: { type :DataTypes.TEXT, allowNull: false},
            url: { type :DataTypes.TEXT, allowNull: false},
            IPAddress:{type :DataTypes.TEXT,allowNull: true}
        },
        { tabelName :"aduitservice"}
    );
    return AduitService;
}