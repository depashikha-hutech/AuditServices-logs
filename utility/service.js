const { Op } = require("sequelize");
const db = require("../models/db");
const events = require("../models/service");
require("dotenv").config();
const env = process?.env

// create events
 async function Createevent(user,type,details,event,IPAddress,url,role,Contextid,OrgId,tenantId) {
     try{
 const payload = {user,type,details,event,IPAddress,url,role,Contextid,OrgId,tenantId};
  const eventinfo = await db.AduitService.create(payload)
 return (eventinfo)
      } catch (error){
          console.log(error);
          return{
             sucess:false,
             statusCode:500,
             message:"event failed",
             error:error.message,
          }
      }

}


//GET all logs in org id from start to end date

async function getevents(OrgId,startdate=null,enddate=null,type=null,offset,limit) { 
  
  try {
    let where ={OrgId }
     if (type)
    where={
      ...where,type
    }
    if (startdate && enddate){
     where={ ...where,createdAt: {
          [Op.between]: [new Date(startdate), new Date(enddate)],
         }
        }
    }
    const event5 = await db.AduitService.findAndCountAll({
     where,offset,limit
    })
    
    return {
        sucess:true,
        statusCode: 200,
        totalCount:event5?.count,
         logs: event5?.rows,
        };    
  
    } catch (error) {
     console.log(error);
        return({ sucess:false, statusCode: 400, message:"meeting not found", error: error.message });
     }
     }


      
    //contextId  
    async function geterrorevents(OrgId,Contextid,startdate,enddate) {
      try {
        const error = await db.AduitService.findAndCountAll({
         where : {
            OrgId : OrgId ,
            Contextid : Contextid,
            type :'error',
            date: {
           [Op.between]: [new Date(startdate), new Date(enddate)],
          },
        },
        })
        return {
            sucess:true,
            statusCode: 200,
            message:"event created sucessfully",
            totalCount:error?.count,
             evnt2: error?.rows,
            };    
      
        } catch (error) {
         console.log(error);
            return({ sucess:false, statusCode: 400, message:"meeting not found", error: error.message });
         }
         }



  module.exports = {Createevent,getevents,geterrorevents}