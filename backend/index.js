import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import userRoute from "./Routes/userRoute.js";
import employeeRoute from "./Routes/employeeRoute.js";
import salaryRoute from "./Routes/salaryRoute.js";
import connectToDatabase from "./db/database.js";
import cors from "cors";
import User from "./Models/userModel.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log(`app is listening on port ${PORT}`);
});

connectToDatabase();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(fileUpload())

// Session middleware

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
})

store.on("error", () => {
  console.log("ERROR in mongo session store", err)
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  },
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// Passport authentication setup
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const corsOptions = {
  origin:'http://localhost:5173', 
  credentials:true,            // access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use("/", userRoute);
app.use("/", employeeRoute);
app.use("/", salaryRoute);
