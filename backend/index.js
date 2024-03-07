import app from "./src/app.js";
import dotenv from "dotenv";
import connect from "./src/conn/conn.js";
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`application is running on port no ${process.env.PORT}`);
  connect()
    .then((res) => {

      console.log("database connecton successful",res.connection.host);
    })
    .catch((res) => {
      console.log(res);
    });
});
