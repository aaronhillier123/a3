package com.AssignmentThree.Main.Models;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.regex.Pattern;

@Entity
@Table(name = "customers")
public class Customer implements Serializable {

    @Id
    private int Id;
    @Column(name = "First_Name")
    private String firstName;
    @Column(name = "Last_Name")
    private String lastName;
    @Column(name = "Email_Address")
    private String emailAddress;
    @Column(name = "Home_Address")
    private String homeAddress;
    @Column(name = "City")
    private String city;
    @Column(name = "State")
    private String state;
    @Column(name = "Zip_Code")
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


    //override toString function for customer
    @Override
    public String toString() {
        return ("ID: " + getId() + "\nFirst Name: " + getFirstName() + "\nLast Name: " + getLastName() + "\nEmail Address: " + getEmailAddress() + "\nHome Address: " + getHomeAddress() + "\nCity: " + getCity() + "\nState: " + getState() + "\nZip Code: " + getZipCode());
    }
    //IDE generated accessor and mutator methods (getters and setters)

    /**
     * Checks state, zipCode, and email to make sure customer has proper formats for each
     * @return
     */
    public boolean valueCheck(){
        Pattern emailValid = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        if(this.emailAddress.length() > 0 && !emailValid.matcher(this.emailAddress).matches()){
            return false;
        }
        String[] stateList = new String[]{"AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"};
        ArrayList<String> stateArray = new ArrayList<String>(Arrays.asList(stateList));
        if((this.state.length() > 0 && !stateArray.contains(this.state))) {
            return false;
        }
        Pattern zipPattern = Pattern.compile("^[0-9]{5}(?:-[0-9]{4})?$");
        if(this.zipCode.length() > 0 && !zipPattern.matcher(this.zipCode).matches()){
            return false;
        }
        return true;
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

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        this.Id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(String homeAddress) {
        this.homeAddress = homeAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }


}