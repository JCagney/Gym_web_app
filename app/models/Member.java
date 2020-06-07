package models;
import controllers.*;
import java.text.*;

import play.db.jpa.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Member extends Model
{
    public String name;
    public String gender;
    public String email;
    public String password;
    public String address;
    public float height;
    public float startingWeight;

    @OneToMany(cascade = CascadeType.ALL)
    public List<Assessment> assessmentList = new ArrayList<Assessment>();

    public Member(String name, String gender, String email, String password, String address, float height, float startingWeight)
    {
        this.name = name;
        this.gender = gender;
        this.email = email.toLowerCase();
        this.password = password;
        this.address = address;
        this.height = height;
        this.startingWeight = startingWeight;
    }

    /* To get the BMI the method first checks that there are assessments in the assessment arraylist. If so it gets the
    * latest one which will always be at index 0 (see dashboard.addassessment()). It then calculates and returns the BMI.
    * If there is no assessment then it calculates using the starting weight. */
    public double getBMI(){
        double BMI;
        //
        if (assessmentList.size()>0) {
            Assessment assessment = assessmentList.get(0);
            BMI = assessment.weight / (height * height);
        }
        else{BMI = startingWeight / (height * height);;};
        return toTwoDecimalPlaces(BMI);
    }

    //this method iterates through the BMI categories to find a match for the BMI value
    public String getBMICategory(){
        String bmiCategory = "";
        double bmi = getBMI();
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
    }

    /*the ideal weight is caLculated bt determining 22 as the ideal BMI and muliplying that by the member's weight
    squared */
    public double getIdealBodyWeight(){
        double idealWeight = (22 * (height * height));
        return toTwoDecimalPlaces(idealWeight);
}



    public static Member findByEmail(String email)
    {
        return find("email", email).first();
    }

    public boolean checkPassword(String password)
    {
        return this.password.equals(password);
    }

    private double toTwoDecimalPlaces(double num) {
        return (int) (num * 100) / 100.0;
    }

}