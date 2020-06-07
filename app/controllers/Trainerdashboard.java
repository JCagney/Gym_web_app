package controllers;

import models.*;
import play.Logger;
import play.mvc.Controller;

import java.util.ArrayList;
import java.util.List;

/* This is the controller for the dashboard that the trainer sees once they log in. It uses the getLoggedInTrainer()
* to find the current trainer, Member.findAll() method to pass all members to the view and also there is a method
* to delete members which takes in an member id from the button in the view   */

public class Trainerdashboard extends Controller
{
    public static void index()
    {
        Logger.info("Rendering  Trainer Dashboard");

        Trainer trainer = Accounts.getLoggedInTrainer();
        List<Member> members = Member.findAll();
        render("trainerdashboard.html", trainer, members);
    }
    public static void deleteMember(Long id)
    {
        Member member = Member.findById(id);
        member.delete();
        Logger.info("Deleting member");
        redirect("/trainerdashboard");
    }

    }