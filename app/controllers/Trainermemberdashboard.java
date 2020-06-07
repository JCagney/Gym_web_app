package controllers;

import models.*;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

/* This is the controller for the Trainer's view of the Member Dashboard. There is a link from the Trainer's dashboard
* into this view for each member. */

public class Trainermemberdashboard extends Controller
{
    /*The index method passes the logged in trainer, the member which is found by the ID passed from the trainer dashboard,
    * and the member's assessmentlist all to the view */
    public static void index(Long id)
    {
        Logger.info("Rendering Trainer Member Dashboard");

        Trainer trainer = Accounts.getLoggedInTrainer();
        Member member = Member.findById(id);
        List<Assessment> assessmentlist = member.assessmentList;
        render("trainermemberdashboard.html", trainer, member, assessmentlist);
    }

    /*The method allows the trainer to update a comment on each asessment. It takes in the relevant member id, the
    * relevant assesment id and the comment string from the form in the view. It then adds the comment to the
    * assessment and renders the view again, passing back in the trainer, member and assessment */
    public static void updateComment(Long id, Long assessmentid, String comment)
    {
        Logger.info("Updating Comment");
        Assessment assessment = Assessment.findById(assessmentid);
        assessment.comment = comment;
        assessment.save();
        Trainer trainer = Accounts.getLoggedInTrainer();
        Member member = Member.findById(id);
        List<Assessment> assessmentlist = member.assessmentList;
        render("trainermemberdashboard.html", trainer, member, assessmentlist);
    }





}
