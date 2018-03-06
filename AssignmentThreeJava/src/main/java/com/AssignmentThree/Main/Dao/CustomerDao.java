package com.AssignmentThree.Main.Dao;
import com.AssignmentThree.Main.Models.Customer;
import org.springframework.stereotype.Controller;
import java.sql.*;
import java.util.ArrayList;

@Controller
public class CustomerDao {

    Connection con = null;


    public CustomerDao() throws SQLException {
        try {
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/assignmentone", "h796849", "texas210");
        }
        catch(SQLException e){
        }
    }


    public int executeAddCustomer(String query) throws SQLException {
        try {
            PreparedStatement prepQuery = con.prepareStatement(query);
            prepQuery.execute();
            return 0;
        } catch(SQLException e){
            System.out.println(e.getErrorCode());
            return e.getErrorCode();
        }
    }

    public ArrayList<Customer> executeGetCustomers(String query) throws SQLException {
        ArrayList<Customer> returnCustomers = new ArrayList<Customer>();
        try {
            PreparedStatement prepQuery = con.prepareStatement(query);
            ResultSet rs = prepQuery.executeQuery();
            while (rs.next()) {
                ResultSetMetaData rsmd = rs.getMetaData();
                final int colNumber = rsmd.getColumnCount();
                Customer newCustomer = new Customer();
                for (int i = 1; i <= colNumber; i++) {
                    String colName = rsmd.getColumnName(i);
                    if (colName.equals("Email_Address")) {
                        UpdateCustomerWithTime(rs.getString(colName));
                    }
                    newCustomer.setField(colName, rs.getString(colName));
                }
                returnCustomers.add(newCustomer);
            }
            prepQuery.close();
        }
    catch(SQLException e) {

    }
    return returnCustomers;
    }



    /**
     * Updates the 'TimeStamp' field of a customer with the time of right now
     * @param email email address of the customer being updated (unique key)
     * @throws SQLException
     */
    public void UpdateCustomerWithTime(String email) throws SQLException {
        try {
            String updateQuery = "UPDATE customers SET TimeStamp=now() WHERE Email='" + email + "'";
            PreparedStatement prep = con.prepareStatement(updateQuery);
            prep.executeUpdate();
        }
        catch(SQLException e) {
        }
    }
}
