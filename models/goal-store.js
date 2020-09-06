"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const goalStore = {
  store: new JsonStore("./models/goal-store.json", {
    goalCollection: []
  }),
  collection: "goalCollection",
  
  addGoal(goal) {
    this.store.add(this.collection, goal);
    this.store.save();
  },
  
  removeGoal(id) {
    const goal = this.getGoalById(id);
    this.store.remove(this.collection, goal);
    this.store.save();
  },

  getGoalById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getMemberGoals(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  changeStatus(goal, status){
    goal.status = status;
    this.store.save();
  },
  
};

module.exports = goalStore;
