package models;

import play.db.jpa.Model;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import javax.persistence.Entity;

@Entity
public class Assessment extends Model {
  public double weight;
  public double chest;
  public double thigh;
  public double upperArm;
  public double waist;
  public double hips;
  public String comment;
  public String timestamp;

  public Assessment(double weight, double chest, double thigh, double upperArm, double waist, double hips) {
    this.weight = weight;
    this.chest = chest;
    this.thigh = thigh;
    this.upperArm = upperArm;
    this.waist = waist;
    this.hips = hips;

    /*The following code is used to create a timestamp string for each assessment. It creates an instance of the
    * DateTimeFormatter in order to format the timestamp and uses the ofPattern method to specify the required format.
    * It then creates an instance of the LocalDateTime class and uses the now() method of that class to find the current
    * date and time. It then uses the dtf object with its format() method to format the date and time and assign it to
    * the timestamp field of the assignment object. */
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    LocalDateTime time = LocalDateTime.now();
    this.timestamp = (dtf.format(time));

  }


}