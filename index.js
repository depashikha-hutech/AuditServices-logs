const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let db = require("./models/db");
const auditserviceroute = require("./controller/service");
const eventroute = require("./controller/service");
const tenantroute = require("./controller/service");
require("dotenv").config();
const cors = require("cors");

const port = process?.env?.port || 7006;
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();
db.sequelize
  .authenticate()
  .then(() => {
    console.error(
      `db connected to  ${process?.env?.SERVERHOST || "NA"} database "${
        process?.env?.DBNAME || "NA"
      }"`
    );

    //db.sequelize.sync({ force: true });
  })
  .catch((err) => {
    console.error(
      `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
      err
    );
  });

app.use("/audit/api/v1.0/events", auditserviceroute),
  app.use("/audit/api/v1.0/events", eventroute);
app.use("/audit/api/v1.0s/events", tenantroute);

app.listen(port, () => {
  console.log(`server running at ${port} `);
});
