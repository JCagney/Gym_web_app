"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const dashboard = require("./dashboard.js");
const memberStore = require("../models/member-store");
const assessmentStore = require("../models/assessment-store.js");
const goalStore = require("../models/goal-store.js");
const uuid = require("uuid");

const trainermemberdashboard = {
  index(request, response) {
    logger.info("trainer member dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const member = memberStore.getMemberById(request.params.id);
    const assessments = assessmentStore.getMemberAssessments(member.id);
    
    const viewData = {
      title: "Trainer Dashboard",
      trainer: loggedInTrainer,
      member: member,
      bmi: memberStore.getBMI(member),
      assessments: assessments,
      category: memberStore.getBMICategory(member),
      goals: goalStore.getMemberGoals(member.id),
    };
    response.render("trainermemberdashboard", viewData);
  }, 
  
  // adds or updates a comment on an assessment 
  updateComment(request, response)
    {
        logger.info("Updating Comment");
        const assessment = assessmentStore.getAssessment(request.params.id);
        assessmentStore.updateComment(assessment.id, request.body.comment);
        const trainer = accounts.getCurrentTrainer(request);
        const member = memberStore.getMemberById(assessment.userid);
        const assessments = assessmentStore.getMemberAssessments(member.id);
        
        const viewData = {
          title: "Trainer Dashboard",
          trainer: trainer,
          member: member,
          bmi: memberStore.getBMI(member),
          assessments: assessments,
          category: memberStore.getBMICategory(member),
          goals: goalStore.getMemberGoals(member.id)
    };
    response.render("trainermemberdashboard", viewData);
    },
  
  addGoal(request, response){
    const memberid  = request.params.id;
    const member = memberStore.getMemberById(memberid);
    const assessments = assessmentStore.getMemberAssessments(member.id);
    const trainer = accounts.getCurrentTrainer(request);
    const newGoal = {
      id: uuid.v1(),
      date: request.body.date,
      userid: memberid,
      weight: request.body.weight,
      setter: trainer.name,
      status: "open"
      
    };
    logger.debug("Creating a new Goal", newGoal);
    goalStore.addGoal(newGoal);
    const viewData = {
          title: "Trainer Dashboard",
          trainer: trainer,
          member: member,
          bmi: memberStore.getBMI(member),
          assessments: assessments,
          category: memberStore.getBMICategory(member),
          goals: goalStore.getMemberGoals(member.id)
    };
    response.render("trainermemberdashboard", viewData);
  },
  
  //the trainer has access to edit the status of a goal, which is default set to "open"
  updateGoalStatus(request, response){
    const goal = goalStore.getGoalById(request.params.id);
    const member = memberStore.getMemberById(goal.userid);
    const assessments = assessmentStore.getMemberAssessments(member.id);
    const trainer = accounts.getCurrentTrainer(request);
    const newstatus = request.body.newstatus; 
      
  
    goalStore.changeStatus(goal, newstatus);
    const viewData = {
          title: "Trainer Dashboard",
          trainer: trainer,
          member: member,
          bmi: memberStore.getBMI(member),
          assessments: assessments,
          category: memberStore.getBMICategory(member),
          goals: goalStore.getMemberGoals(member.id)
    };
    response.render("trainermemberdashboard", viewData);
  },
  
  //the trainer sees all the goals, whereas the member only sees the current goal. The trainer can delete old goals to clear them out 
  deleteGoal(request, response){
    const goal = goalStore.getGoalById(request.params.id);
    const member = memberStore.getMemberById(goal.userid);
    const assessments = assessmentStore.getMemberAssessments(member.id);
    const trainer = accounts.getCurrentTrainer(request);

    goalStore.removeGoal(request.params.id);
    const viewData = {
          title: "Trainer Dashboard",
          trainer: trainer,
          member: member,
          bmi: memberStore.getBMI(member),
          assessments: assessments,
          category: memberStore.getBMICategory(member),
          goals: goalStore.getMemberGoals(member.id)
    };
    response.render("trainermemberdashboard", viewData);
  }
  
  
  
}

module.exports = trainermemberdashboard;