"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const memberStore = require("../models/member-store.js");

const settings = {
  index(request, response) {
    logger.info("settings rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Settings",
      member: loggedInMember     
    };
    response.render("settings", viewData);
  },
  
  updateName(request, response)
    {
        logger.info("Updating Name");
        const member = accounts.getCurrentMember(request);
        const name = request.body.newname;
        memberStore.changeName(member.id, name);
        response.redirect("/settings");
    },
  
    updateGender(request, response)
    {
        logger.info("Updating Gender");
        const member = accounts.getCurrentMember(request);
        const gender = request.body.newgender;
        memberStore.changeGender(member.id, gender);
        response.redirect("/settings");
    },
  
    updateEmail(request, response)
    {
        logger.info("Updating Email");
        const member = accounts.getCurrentMember(request);
        const email = request.body.newemail;
        memberStore.changeEmail(member.id, email);
        response.redirect("/settings");
    },
  
    updateAddress(request, response)
    {
        logger.info("Updating Address");
        const member = accounts.getCurrentMember(request);
        const address = request.body.newaddress;
        memberStore.changeAddress(member.id, address);
        response.redirect("/settings");
    }
};
  module.exports = settings;