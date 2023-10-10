const express = require("express");
const {
  createEvent,
  getevents,
  geteventsbyTenants,
  errorEvents,
} = require("../utility/service");

const route = express.Router();

route.post("/", async (req, res) => {
  try {
    const { orgid, tenantId } = req.headers;

    const {
      user,
      type,
      details,
      event,
      IPAddress,
      url,
      role,
      body,
      Contextid,
    } = req?.body;

    const createevent = await createEvent(
      orgid,
      tenantId,
      user,
      type,
      details,
      event,
      IPAddress,
      url,
      role,
      body,
      Contextid
    );
    return res.status(createevent?.statusCode).json(createevent);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});
//GET all logs in org id from start to end date with different type log
route.get("/:OrgId/events", async (req, res) => {
  try {
    const {
      offset = 0,
      limit = null,
      type = null,
      startdate = null,
      enddate = null,
    } = req?.query;
    const orgId = req?.params?.OrgId;
    const eventdetails = await getevents(
      orgId,
      offset,
      limit,
      type,
      startdate,
      enddate
    );
    return res.status(eventdetails?.statusCode).json(eventdetails);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});
//tenantId;
route.get("/tenants/:tenantId/events", async (req, res) => {
  try {
    const {
      offset = 0,
      limit = null,
      type = null,
      startdate = null,
      enddate = null,
    } = req?.query;
    const TenantId = req?.params?.tenantId;
    const eventdata = await geteventsbyTenants(
      TenantId,
      offset,
      limit,
      type,
      startdate,
      enddate
    );
    return res.status(eventdata?.statusCode).json(eventdata);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

//contextid
route.get("/:Contextid", async (req, res) => {
  try {
    const { startdate, enddate, Contextid } = req?.query;
    const errorinfo = await errorEvents(Contextid, startdate, enddate);
    res.status(errorinfo?.statusCode).json(errorinfo);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
});

module.exports = route;
