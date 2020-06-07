package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

/* This is the controller for the profile view, where a member can view and edit some there stored details
It uses the getLoggedInMember to access the member object and then as the fields are public it can edit the fields
 directly with the various methods */

public class Profile extends Controller
{
    public static void index()
    {
        Member member = Accounts.getLoggedInMember();
        Logger.info("Rendering profile");
        render("profile.html", member);
    }
    public static void updateName(String newname)
    {
        Logger.info("Updating Name");
        Member member = Accounts.getLoggedInMember();
        member.name = newname;
        member.save();
        render("profile.html", member);
    }
    public static void updateGender(String newgender)
    {
        Logger.info("Updating Gender");
        Member member = Accounts.getLoggedInMember();
        member.gender = newgender;
        member.save();
        render("profile.html", member);
    }
    public static void updateEmail(String newemail)
    {
        Logger.info("Updating Email");
        Member member = Accounts.getLoggedInMember();
        member.email = newemail;
        member.save();
        render("profile.html", member);
    }
    public static void updateAddress(String newaddress)
    {
        Logger.info("Updating Address");
        Member member = Accounts.getLoggedInMember();
        member.address = newaddress;
        member.save();
        render("profile.html", member);
    }

}
