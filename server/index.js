const express = require("express");
const connectDb = require("./config/dataBase");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const { globalRateLimit } = require("./authMiddleWare/rateLimit.middleWare");
const {
  globalErrorHandler,
} = require("./authMiddleWare/errorHandle.middleWare");
const { notFound } = require("./authMiddleWare/notFound.middleWare");

dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(globalRateLimit);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/category", categoryRouter);

app.use(notFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
