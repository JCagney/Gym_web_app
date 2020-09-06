"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const goalStore = require("../models/goal-store.js");
const uuid = require("uuid");


const dashboard = {
  index(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    //this.updateGoals(request);
    
    const viewData = {
      title: "Assesment Dashboard",
      assessments: assessmentStore.getMemberAssessments(loggedInMember.id),
      goal: goalStore.getMemberGoals(loggedInMember.id)[0],
      member: loggedInMember,
      bmi: memberStore.getBMI(loggedInMember),
      idealWeight: memberStore.getIdealBodyWeight(loggedInMember),
      bmiCategory: memberStore.getBMICategory(loggedInMember),
    
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
  },

  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    const loggedInMember = accounts.getCurrentMember(request);
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId, loggedInMember);
    response.redirect("/dashboard");
  },

  //creates a variable called "trend" which is passed to the view as a atring and used to determine the colour of the "trend" icon for the assessment
  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    var trend = "";
    if (assessmentStore.getMemberAssessments(loggedInMember.id).length>0){
    if (Number(request.body.weight)>Number(assessmentStore.getMemberAssessments(loggedInMember.id)[0].weight)){
    trend="red";  
    }else{
      trend="green";
    }}
    else if (Number(request.body.weight)>Number(loggedInMember.startingWeight)){
      trend="red";  
    }else{
      trend="green";
    }
          
    const newAssessment = {
      id: uuid.v1(),
      date: (new Date()).toLocaleString(),
      userid: loggedInMember.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: trend
    };
    logger.debug("Creating a new Assessment", newAssessment);
    assessmentStore.addAssessment(newAssessment, loggedInMember);
    response.redirect("/dashboard");
  },
  
  addGoal(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    
    const newGoal = {
      id: uuid.v1(),
      date: request.body.date,
      userid: loggedInMember.id,
      weight: request.body.weight,
      setter: loggedInMember.name,
      status: "open"
    };
    logger.debug("Creating a new Goal", newGoal);
    goalStore.addGoal(newGoal);
    response.redirect("/dashboard");
  }
  
  
};

module.exports = dashboard;
