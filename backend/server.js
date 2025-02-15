const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
const authRoutes = require("./routes/auth");
const passport = require("./config/passport");
const session = require("express-session");

//?Load config file
dotenv.config({ path: "./config/.env" });

//? Connect to our database
connectDB();

//? App set to express()
const app = express();

//?Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//? Add session middleware before routes
const sessionConfig = {
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: false,
  proxy: true, // Required for Cloudflare Pages
  cookie: {
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};
app.use(session(sessionConfig));

//? Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//?CORS configuration
app.use(
  cors({
    origin: ["http://localhost:4444", "http://localhost:5173"], // Allow these sites
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//? Routes
app.use("/api/resources", resourceRoutes);
app.use("/api/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 3000;

//? Listening for our PORT
app.listen(PORT, console.log(`Server RUNNING 🏃🏾‍♀️ on port ${PORT}`));
