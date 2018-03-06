package com.AssignmentThree.Main.Models;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;

@Entity
public class Customer implements Serializable {

    private String firstName;
    private String lastName;
    private String emailAddress;
    private String homeAddress;
    private String city;
    private String state;
    private String zipCode;


    //Constructor with full information
    public Customer(String firstName, String lastName, String emailAddress, String homeAddress, String city, String state, String zipCode ){
        this.firstName = "'" + firstName + "'";
        this.lastName = "'" + lastName + "'";
        this.emailAddress = "'" + emailAddress + "'";
        this.homeAddress = "'" + homeAddress + "'";
        this.city = "'" + city + "'";
        this.state = "'" + state + "'";
        this.zipCode = "'" + zipCode + "'";
    }
    //Constructor with partial information (firstName, lastName, email)
    public Customer(String firstName, String lastName, String emailAddress) {
        this.firstName = "'" + firstName + "'";
        this.lastName = "'" + lastName + "'";
        this.emailAddress = "'" + emailAddress + "'";
        this.homeAddress = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
    }

    //Constructor with zero information
    public Customer(){
        this.firstName = "";
        this.lastName = "";
        this.emailAddress ="";
        this.homeAddress = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
    }

    /**
     * get all fields that have been initialized and return list of query statements for retrieving each field
     * @return vector of query statements
     */
    public ArrayList<String> buildQueryList(){
        ArrayList<String> customerList = new ArrayList<String>();
        if(!lastName.equals("")) customerList.add("Last_Name=" + lastName);
        if(!firstName.equals(""))customerList.add("First_Name=" + firstName);
        if(!emailAddress.equals(""))customerList.add("Email_Address=" + emailAddress);
        if(!homeAddress.equals(""))customerList.add("Home_Address=" + homeAddress);
        if(!city.equals(""))customerList.add("City=" + city);
        if(!state.equals(""))customerList.add("State=" + state);
        if(!zipCode.equals(""))customerList.add("Zip_Code=" + zipCode);
        return customerList;
    }

    //override toString function for customer
    @Override
    public String toString() {
        return ("First Name: " + getFirstName() + "\nLast Name: " + getLastName() + "\nEmail Address: " + getEmailAddress() + "\nHome Address: " + getHomeAddress() + "\nCity: " + getCity() + "\nState: " + getState() + "\nZip Code: " + getZipCode());
    }
    //IDE generated accessor and mutator methods (getters and setters)
    public String getFirstName() {
        // System.out.println("First Name is for sure " + firstName);
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setField(String fieldName, String value) {

        if(fieldName.equals("First_Name")) {
            setFirstName(value);
        }else if(fieldName.equals("Last_Name")) {
            setLastName(value);
        }else if(fieldName.equals("Email_Address")) {
            setEmailAddress(value);
        }else if(fieldName.equals("Home_Address")) {
            setHomeAddress(value);
        }else if(fieldName.equals("City")) {
            setCity(value);
        }else if(fieldName.equals("State")) {
            setState(value);
        }else if(fieldName.equals("Zip_Code")) {
            setZipCode(value);
        } else {
        }
    }

    public void addQuotes(){
        firstName.replace("\'", "");
        firstName = "'" + firstName + "'";

        lastName.replace("\'", "");
        lastName = "'" + lastName + "'";

        emailAddress.replace("\'", "");
        emailAddress = "'" + emailAddress + "'";

        homeAddress.replace("\'", "");
        homeAddress = "'" + homeAddress + "'";

        city.replace("\'", "");
        city = "'" + city + "'";

        state.replace("\'", "");
        state = "'" + state + "'";

        zipCode.replace("\'", "");
        zipCode = "'" + zipCode + "'";
    }

    public void setFirstName(String firstName) {
        this.firstName = "'" + firstName + "'";
    }

    public void setLastName(String lastName) {
        this.lastName = "'" + lastName + "'";
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = "'" + emailAddress + "'";
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = "'" + homeAddress + "'";
    }

    public void setCity(String city) {
        this.city = "'" + city + "'" ;
    }

    public void setState(String state) {
        this.state = "'" + state + "'";
    }

    public void setZipCode(String zipCode) {
        this.zipCode = "'" + zipCode + "'";
    }
}