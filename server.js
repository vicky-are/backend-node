const express = require("express");
const cors = require("cors");

const app = express();
const session = require('express-session');
const path = require("path");


global.__basedir = __dirname;

const cors_ = require("./app/source/orgConfig/orgCors.config");
var corsOptions = {
  origin: cors_.allowed_origins
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({ extended: true })
);
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'nothing'
}));

// const db = require("./app/models");
const db2 = require("./app/source/orgModel/orgIndex");

async function testConnection1() {
  try {
    await db2.sequelize.authenticate();

    await db2.sequelize.sync();

    // drop the table if it already exists
    // db.sequelize.sync({ force: true }).then(() => {
    //   console.log("Drop and re-sync db.");
    // });

    console.log("Organization Database Connected.");

  } catch (e) {
    console.log(e.message);
  }
}

testConnection1();

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});


// Org
require("./app/source/orgRoutes/orgAuth.routes")(app);
require("./app/source/orgRoutes/orgUser.routes")(app);
require("./app/source/orgRoutes/orgRoles.routes")(app);
require("./app/source/orgRoutes/orgLeads.routes")(app);
require("./app/source/orgRoutes/chatConversation.routes")(app);

// require("./app/routes/app.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});