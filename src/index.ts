import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database";
import docs from "./docs/route";
import cors from "cors";

async function init() {
  try {
    const result = await db();
    console.log(result);
    const app = express();

    const PORT = 3000;
    //middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server jalan",
        data: null,
      });
    });
    app.use("/api", router);
    docs(app);
    app.listen(PORT, () => {
      console.log(`Server is running on http:://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
