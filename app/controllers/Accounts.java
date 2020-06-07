package controllers;

import models.Member;
import models.Trainer;
import play.Logger;
import play.mvc.Controller;

public class Accounts extends Controller
{
    public static void signup()
    {
        render("signup.html");
    }

    public static void login()
    {
        render("login.html");
    }
    public static void register(String name, String gender, String email, String password, String address, float height, float startingWeight)
    {
        Logger.info("Registering new user " + email);
        Member member = new Member(name, gender, email, password, address, height, startingWeight);
        member.save();
        redirect("/");
    }

    /*I have one login page to take in email and password. The method first declares a potential member and a potatential
    * trainer and uses the findByEmail methods to populate them with any potential match. It then checks both varbles
    * to see if they have found a match and if so it uses the checkPassword() methods to authenticate the password.
    * It then begins a session by passing the member id into the session.put method */
    public static void authenticate(String email, String password)
    {
        Logger.info("Attempting to authenticate with " + email + ":" + password);

        Member member = Member.findByEmail(email.toLowerCase());
        Trainer trainer = Trainer.findByEmail(email.toLowerCase());
        if ((member != null) && (member.checkPassword(password) == true)) {
            Logger.info("Authentication successful");
            session.put("logged_in_Memberid", member.id);
            redirect ("/dashboard");
        } else if((trainer!=null)&&(trainer.checkPassword(password) == true)){
            Logger.info("Authentication successful");
            session.put("logged_in_Trainerid", trainer.id);
            redirect ("/trainerdashboard");
        }
        else
            {
            Logger.info("Authentication failed");
            redirect("/login");
        }
    }
    public static void logout()
    {
        session.clear();
        redirect ("/");
    }
    public static Member getLoggedInMember()
    {
        Member member = null;
        if (session.contains("logged_in_Memberid")) {
            String memberId = session.get("logged_in_Memberid");
            member = Member.findById(Long.parseLong(memberId));
        } else {
            login();
        }
        return member;
    }
    public static Trainer getLoggedInTrainer()
    {
        Trainer trainer = null;
        if (session.contains("logged_in_Trainerid")) {
            String trainerId = session.get("logged_in_Trainerid");
            trainer = Trainer.findById(Long.parseLong(trainerId));
        } else {
            login();
        }
        return trainer;
    }
}