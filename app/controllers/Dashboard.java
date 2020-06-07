package controllers;

import models.*;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

public class Dashboard extends Controller
{

  /*This is the member dashobard. It finds the currently logged in member using the getLoggedInMember() method,
  * and passess that member and that member's assessmentList to the view*/
  public static void index()
  {
    Logger.info("Rendering Dashboard");

    Member member = Accounts.getLoggedInMember();
    List<Assessment> assessmentlist = member.assessmentList;
    render("dashboard.html", member, assessmentlist);
  }

  /* This method uses the assessment constructor to create a new assessment with the parameters passed into the method.
  * It then adds the assessment to the assessmentList array list of the currently logged in member */
  public static void addAssessment(double weight, double chest, double thigh, double upperArm, double waist, double hips)
  {
    Logger.info("Adding a Assessment");
    Member member = Accounts.getLoggedInMember();
    Assessment assessment = new Assessment(weight, chest, thigh, upperArm, waist, hips);
    /*Below I am using the the overloaded add(int index, E element) arraylist method to add the assesment
    * to index 0 in the arraylist. This is so when I want to get the latest assessment I know it will be at index 0*/
    member.assessmentList.add(0, assessment);
    member.save();
    redirect ("/dashboard");
  }


  /*The delete method finds the assessment with the id passed in. It is then removed from the logged in member's
  * assessment arraylist before being deleted   */
  public static void deleteAssessment(Long id)
  {
    Logger.info("Deleting an Assessment");
    Member member = Accounts.getLoggedInMember();
    Assessment assessment = Assessment.findById(id);
    member.assessmentList.remove(assessment);
    member.save();
    assessment.delete();
    redirect ("/dashboard");
  }
}
