"use strict";

const memberStore = require("../models/member-store");
const trainerStore = require("../models/trainer-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("assessment", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect("/");
  },

  //iterate through members and trainers to find a matching email and then check password 
  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);

    if (
      member &&
      memberStore.checkPassword(member, request.body.password) == true
    ) {
      response.cookie("assessment", member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect("/dashboard");
    } else if (
      trainer &&
      trainerStore.checkPassword(trainer, request.body.password) == true
    ) {
      response.cookie("assessment", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.assessment;
    return memberStore.getMemberByEmail(memberEmail);
  },

  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.assessment;
    return trainerStore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;
