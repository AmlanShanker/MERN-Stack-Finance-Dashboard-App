import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/*CONFIGURATIONS*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // Security middleware
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Security middleware
app.use(morgan("common")); // Logging middleware
app.use(bodyParser.json()); // Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // CORS middleware

/*ROUTES*/
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
    /*ADD DATA ONE TIME ONLY*/
    //await mongoose.connection.db.dropDatabase(); // Drop the database before seeding
    // KPI.insertMany(kpis); // Insert the kpis data into the database
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
