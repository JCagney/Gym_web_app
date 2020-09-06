"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: []
  }),
  collection: "assessmentCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addAssessment(assessment, member) {
    this.store.add(this.collection, assessment);
    member.assessments = this.getMemberAssessments(member.id).length;
    this.store.save();
  },

  removeAssessment(id, member) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    member.assessments = this.getMemberAssessments(member.id).length;
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  updateComment(id, comment){
    this.getAssessment(id).comment = comment;
    this.store.save();
    
  }

  


};

module.exports = assessmentStore;
