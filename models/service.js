const sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const AuditService = sequelize.define(
    "Audit",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      OrgId: { type: DataTypes.UUID, allowNull: true },
      tenantId: { type: DataTypes.UUID, allowNull: true },
      IPAddress: { type: DataTypes.STRING, allowNull: true },
      user: { type: DataTypes.JSONB, allowNull: true },
      role: { type: DataTypes.JSONB, allowNull: true },
      Contextid: { type: DataTypes.STRING, allowNull: true },
      event: { type: DataTypes.JSONB, allowNull: true },
      type: { type: DataTypes.STRING, allowNull: true },
      url: { type: DataTypes.STRING, allowNull: true },
      body: { type: DataTypes.JSONB, allowNull: true },
      details: { type: DataTypes.JSONB, allowNull: true },
    },
    { tableName: "audit" }
  );
  return AuditService;
};
