const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let db = require("./models/db");
const auditserviceroute = require("./controller/service");
const eventroute = require("./controller/service");
require("dotenv").config();
const cors = require("cors");

const port = process?.env?.port || 7003;
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `db connected to  ${ process?.env?.SERVERHOST || "NA" } database "${process?.env?.DBNAME || "NA"}"`
      )
      db.sequelize.sync({ alert:true});
   //db.sequelize.sync({ force:true});
    })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
    });


    app.use("/wallet/api/v1/events", auditserviceroute),
    app.use("/wallet/api/v1/events/organisations", eventroute)
    

app.listen(7003, ()=> {
    console.log("server running at port 7003"); 
});