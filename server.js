require("dotenv").config();
const path = require("path");
const compression = require("compression");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
const MongoStore = require("connect-mongo");
const db = require("./db/dbConnection");
const categoryRoute = require("./routes/categoryRoute");
const voucherRoute = require("./routes/voucherRoute");
const paymentRoute = require("./routes/paymentRoute");
const transactionRoute = require("./routes/transactionRoute");

//Default server port
const port = process.env.PORT || 5000;

//initialize express
const app = express();
// app.set("trust proxy", 1);
app.set("view engine", "ejs");

// miiddleawares
app.use(logger("dev"));
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_ID,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
      mongoUrl:
        process.env.NODE_ENV === "production"
          ? process.env.MONGO_URL
          : process.env.MONGO_URL_LOCAL,
    }),
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
app.use(compression());

//static folders

app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/vouchers", express.static(path.join(__dirname, "vouchers")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/category", categoryRoute);
app.use("/voucher", voucherRoute);
app.use("/payment", paymentRoute);
app.use("/transaction", transactionRoute);

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

//error handlers
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

db.asPromise()
  .then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
  })
  .catch((error) => {
    console.log("error connecting server", error.message);
  });
