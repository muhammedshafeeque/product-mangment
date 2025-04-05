import express from "express";
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./Routes/index.js";
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });

});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
