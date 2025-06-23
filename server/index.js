const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes"); 
const categoryRoutes = require("./routes/categoryRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subCategoryRoutes = require("./routes/subCategoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js")
dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
  crossOriginResourcePolicy: false
}));

app.use("/api/user",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/file",uploadRoutes);
app.use("/api/subCategory",subCategoryRoutes);
app.use("/api/product",productRoutes);
app.use("/api/cart",cartRoutes);

app.get("/", (req, res) => {
  res.json({ message: "server is running!" + PORT});
});

connectDB().then(() => {
  const PORT = process.env.PORT || 1010;
  app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`server started on : ${PORT}`);
  });
}); 
