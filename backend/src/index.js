import express from "express";
import "dotenv/config";

const app = express();

console.log("Db URL", process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on PORT: ", process.env.PORT);
});
