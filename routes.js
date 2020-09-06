~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js");
const trainermemberdashboard = require("./controllers/trainermemberdashboard.js");
const about = require("./controllers/about.js");
const settings = require("./controllers/settings.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.get("/settings", settings.index);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerdashboard/deleteMember/:id", trainerdashboard.deleteMember);
router.get("/trainermemberdashboard/:id", trainermemberdashboard.index);
router.post("/trainermemberdashboard/updatecomment/:id", trainermemberdashboard.updateComment);
router.get("/dashboard/deleteAssessment/:id", dashboard.deleteAssessment);
router.post("/dashboard/addAssessment", dashboard.addAssessment);
router.post("/dashboard/addGoal", dashboard.addGoal);
router.post("/trainermemberdashboard/addGoal/:id", trainermemberdashboard.addGoal); 
router.post("/trainermemberdashboard/changegoalstatus/:id", trainermemberdashboard.updateGoalStatus);
router.get("/trainermemberdashboard/deleteGoal/:id", trainermemberdashboard.deleteGoal);

router.post("/settings/updateName", settings.updateName);
router.post("/settings/updateEmail", settings.updateEmail);
router.post("/settings/updateGender", settings.updateGender);
router.post("/settings/updateAddress", settings.updateAddress);

router.get("/about", about.index);  


module.exports = router;
