exports.databaseAuth = (req, res, next) => {
    console.log("Config DB");
  
    const org_id = 2  
    if(org_id == 2) {

      return(
        module.exports = {
          DB_HOST: "localhost",
          DB_USER: "root",
          DB_PASS: "",
          DB_DATABASE: `backend_db`,
        }
      )
    }
};