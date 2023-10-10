const { Op } = require("sequelize");
const db = require("../models/db");
const events = require("../models/service");
require("dotenv").config();
const env = process?.env;

// create events
async function createEvent(
  orgid,
  tenantid,
  user,
  type,
  details,
  event,
  IPAddress,
  url,
  role,
  body,
  Contextid
) {
  try {
    const payload = {
      OrgId: orgid,
      tenantId: tenantid,
      user,
      type,
      details,
      event,
      IPAddress,
      url,
      role,
      body,
      Contextid,
    };
    console.log(typeof OrgId);

    const eventdata = await db.AuditService.create(payload);
    return {
      success: true,
      statusCode: 200,
      message: "event created successfully",
      services: eventdata,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 400,
      message: "services not found",
      error: error.message,
    };
  }
}
//GET all logs in org id from start to end date

async function getevents(
  OrgId,
  offset,
  limit = null,
  type = null,
  startdate = null,
  enddate = null
) {
  try {
    let where = { OrgId };
    if (type)
      where = {
        ...where,
        type,
      };
    if (startdate && enddate) {
      enddate += "  23:59:59.000 +00:00";

      where = {
        ...where,
        createdAt: {
          [Op.between]: [new Date(startdate), new Date(enddate)],
        },
      };
    }
    const { count: totalCount, rows: logs } =
      await await db.AuditService.findAndCountAll({
        where,
        offset,
        limit,
      });
    return {
      success: true,
      statusCode: 200,
      message: "logs fetched successfully",
      totalCount,
      logs,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 400,
      message: "logs not found",
      error: error.message,
    };
  }
}

async function geteventsbyTenants(
  tenantId,
  offset,
  limit = null,
  type = null,
  startdate = null,
  enddate = null
) {
  try {
    let where = { tenantId };
    if (type)
      where = {
        ...where,
        type,
      };
    if (startdate && enddate) {
      enddate += "  23:59:59.000 +00:00";
      where = {
        ...where,
        createdAt: {
          [Op.between]: [new Date(startdate), new Date(enddate)],
        },
      };
    }
    const { count: totalCount, rows: logs } =
      await await db.AuditService.findAndCountAll({
        where,
        offset,
        limit,
      });
    return {
      success: true,
      statusCode: 200,
      message: "logs fetched successfully",
      totalCount,
      logs,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 400,
      message: "logs not found",
      error: error.message,
    };
  }
}
//contextId...
async function errorEvents(Contextid, startdate, enddate) {
  try {
    let whereClause = {
      Contextid: Contextid,
    };

    if (startdate && enddate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startdate), new Date(enddate)],
      };
    }

    const { count: totalCount, rows: data } =
      await db.AuditService.findAndCountAll({
        where: whereClause,
      });
    return {
      success: true,
      statusCode: 200,
      message: "events fetched successfully",
      totalCount,
      data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 400,
      message: "error logs not found",
      error: error.message,
    };
  }
}
module.exports = { createEvent, getevents, geteventsbyTenants, errorEvents };
