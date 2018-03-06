package com.AssignmentThree.Main.Services;

import com.AssignmentThree.Main.Models.Customer;
import com.AssignmentThree.Main.Dao.CustomerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import java.sql.SQLException;
import java.util.ArrayList;

@Controller
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    /**
     *
     * @param c an instance of type Customer that we want to add to the database
     * @return the customer that we added to the database
     * @throws SQLException
     */
    public int addCustomer(Customer c) throws SQLException {
        try {
            String query = "INSERT INTO customer (First_Name, Last_Name, Email_Address, Home_Address, City, State, Zip_Code) \n VALUES (";
            query += c.getFirstName() + ", ";
            query += c.getLastName() + ", ";
            query += c.getEmailAddress() + ", ";
            query += c.getHomeAddress() + ", ";
            query += c.getCity() + ", ";
            query += c.getState() + ", ";
            query += c.getZipCode() + ")";
            return customerDao.executeAddCustomer(query);
        }catch(SQLException e){
            return e.getErrorCode();
        }
    }

    /**
     * Get aan arrayList of customers from the database that have the same criteria as the specified customer
     *
     * @param inverse  if this customer is the criteria we do NOT want to match
     * @param criteria customer that fits the criteria we are looking for
     * @param fields   the names of the fields we want to receive from the database
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public ArrayList<Customer> getSimilarCustomers(Customer criteria, boolean inverse, ArrayList<String> fields) throws ClassNotFoundException, SQLException {
            Customer cus = new Customer();
            cus.setState("TX");
            ArrayList<Customer> customers = new ArrayList<Customer>();
            Class.forName("com.mysql.jdbc.Driver");
            String query = getCustomerQuery(criteria, inverse, fields);
            ArrayList<Customer> myCustomers = customerDao.executeGetCustomers(query);
            return myCustomers;
        }



    /**
     * Create and return query string
     *
     * @param exclude  if this customer is the criteria we do NOT want to match
     * @param criteria customer that fits the criteria we are looking for
     * @param columns  the names of the fields we want to receive from the database
     * @return total query string
     */
    public String getCustomerQuery(Customer criteria, boolean exclude, ArrayList<String> columns) {
        String colQuery = "";
        if (columns.size() == 0) colQuery = " * ";
        for (int i = 0; i < columns.size(); ++i) {
            colQuery += columns.get(i);
            colQuery = (i == columns.size() - 1) ? (colQuery + " ") : (colQuery + ", ");
        }
        String fullQuery = "select " + colQuery + "from customer";
        ArrayList<String> queryList = criteria.buildQueryList();
        fullQuery = (queryList.size() != 0) ? (fullQuery + " WHERE ") : fullQuery;
        String connector = (exclude) ? " OR " : " AND ";
        String innerQuery = "";
        for (int i = 0; i < queryList.size(); ++i) {
            if (i > 0) {
                innerQuery += connector;
            }
            innerQuery += queryList.get(i);
        }
        fullQuery = (exclude) ? (fullQuery + " NOT ( " + innerQuery + " )") : fullQuery + innerQuery;
        return fullQuery;
    }

    /**
     *
     * @param csvContent string that represents the content of a csv file for importing customers
     * @return returns if the csv file is correctly formatted to create a list of Customers
     */
    public int isValidCsvFile(String csvContent){
        String[] customersString = csvContent.split("\n");
        for(String s : customersString){
            String[] fieldsString = s.split(",");
            if(fieldsString.length != 7){
                System.out.println("LENGTH IS " + fieldsString.length);
                return 3;
            }
            if(!fieldsString[2].contains("@")){
                System.out.println("EMAIL WRONG");
                return 4;
            }
            if(fieldsString[5].length()!=2){
                System.out.println("STATE TOO LONG " + fieldsString[5] + "lenght is : " + fieldsString[5].length());
                return 5;
            }
        }
        return 0;
    }

    /**
     *
     * @param csvCustomer string that represents a single customer represented by a csv string
     * @return a instance of Customer class with the assigned values from the csv
     */
    public Customer createCustomerFromString(String csvCustomer){
        String[] customerFields = csvCustomer.split(",");
        Customer newCustomer = new Customer(customerFields[0],
        customerFields[1],
        customerFields[2],
        customerFields[3],
        customerFields[4],
        customerFields[5],
        customerFields[6]);
        System.out.println("NEW CUSTOMER: " + newCustomer.toString() + "\n");
        return newCustomer;
    }

    /**
     *
     * @param customersString a csv given that should represent a list of Customers
     * @return if the csv can be used to successfully add new customers the the database
     * @throws SQLException
     */
    public ArrayList<Integer> addCustomersFromForm(String customersString) throws SQLException {
        ArrayList<Integer> errorCodes = new ArrayList<Integer>();
        try {
            customersString = customersString.replace("\"", "");
            if (isValidCsvFile(customersString) == 0) {
                String[] customerStrings = customersString.split("\n");
                for (String customerString : customerStrings) {
                    Customer newCustomer = createCustomerFromString(customerString);
                    errorCodes.add(addCustomer(newCustomer));
                    }
            }
            errorCodes.add(isValidCsvFile(customersString));
        } catch(SQLException e) {
            errorCodes.add(e.getErrorCode());
        }
        return errorCodes;
    }
}

