"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");
const assessmentStore = require("../models/assessment-store.js");


const memberStore = {
  store: new JsonStore("./models/member-store.json", { members: [] }),
  collection: "members",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },
  
  removeMember(id) {
    const member = this.getMemberById(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  changeName(id, name){
    this.getMemberById(id).name = name;
    this.store.save();
  },
  
  changeGender(id, gender){
    this.getMemberById(id).gender = gender;
    this.store.save();
  },

  changeAddress(id, address){
    this.getMemberById(id).address = address;
    this.store.save();
  },
  
  checkPassword(member, password)
  {
    return member.password === password;
  }, 
  
  getBMICategory(member){
    var bmiCategory = "";
    const bmi = this.getBMI(member);
    if (bmi < 18.5){
        bmiCategory = "Underweight"; }
    else if((bmi >= 18.5) && (bmi < 25)){
        bmiCategory = "Healthy Weight";}
    else if((bmi >=25)&&(bmi<30)){
        bmiCategory = "Overweight";}
    else if((bmi >=30)&&(bmi<35)){
        bmiCategory = "Obese (Class I)";}
    else if((bmi>=35)&&(bmi<40)){
        bmiCategory = "Severely Obese (Class II)";}
    else if((bmi>=40)&&(bmi<50)){
        bmiCategory = "Morbidly Obese (Class III)";}
    else {bmiCategory = "Super Obese (Class IV)";}
    return bmiCategory;
    },
  
  getBMI(member) {
    var BMI = 0;

    const assessmentList = assessmentStore.getMemberAssessments(member.id);

    if (assessmentList.length > 0) {
      const assessment = assessmentList[0];
      BMI = assessment.weight / (member.height * member.height);
    } else {
      BMI = member.startingWeight / (member.height * member.height);
    }
    return this.toTwoDecimalPlaces(BMI);
  },

  getIdealBodyWeight(member) {
    var idealWeight = 22 * (member.height * member.height);
    return this.toTwoDecimalPlaces(idealWeight);
  },

  toTwoDecimalPlaces(num) {
    return Math.round(num * 100) / 100.0;
  }
  
};


module.exports = memberStore;
