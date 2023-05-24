const express = require('express');
const {Createevent,getevents,geterrorevents} = require('../utility/service');

const route = express.Router();

route.post("/", async(req, res) => {
    try {
        const OrgId = req.headers.orgid;
        const tenantId = req.headers.tenantid;
        const {name,type,details,loggedBy, role,date,Contextid} = req?.body;
        const createevent = await Createevent(name,type,details,loggedBy, role,date,Contextid,OrgId,tenantId);
        if(name && type && details &&  loggedBy &&  role && date&& Contextid){
        res.status(200).json(createevent);
        }else{
  res.status(400).json({error: "bad request"})

        }
    } catch (error) {
    console.log(error);
    res.status(500).json({sucess: false, message:"internal server error", error: error.message});
}
})

//GET all logs in org id from start to end date with different type log
route.get("/:OrgId", async (req, res)=> {
    try {
        const {startdate=null,enddate=null,ty=null,offset=0, limit=null} = req?.query
        const orgId=req?.params?.OrgId
        const eventdetails = await  getevents(orgId,startdate,enddate,ty,offset,limit);
        res.status(eventdetails?.statusCode).json(eventdetails);
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});
// contextid
route.get("/error/:OrgId/:Contextid", async (req, res)=> {
    try {
        const { OrgId, Contextid } = req?.params;
        const { startdate, enddate } = req?.query;
        const errorinfo = await  geterrorevents(OrgId,Contextid,startdate,enddate);

        res.status(errorinfo?.statusCode).json(errorinfo);
    
    }catch (error) {
        res.status(500).json({ sucess: false, message: "internal server error", error: error.message});
    }
});

module.exports = route;
