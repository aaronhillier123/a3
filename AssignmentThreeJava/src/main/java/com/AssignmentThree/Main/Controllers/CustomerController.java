package com.AssignmentThree.Main.Controllers;
import com.AssignmentThree.Main.Models.Customer;
import com.AssignmentThree.Main.Services.CustomerService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;

@RequestMapping("/customers")
@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    Gson g = new Gson();


    /**
     *
      * @param Criteria the customer who maps the criteria we are trying to get from the database
     * @return a list of customers who match the criteria requested
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    @RequestMapping(value="/similar", method = RequestMethod.GET)
    public @ResponseBody ArrayList<Customer> getSimilarCustomer(@RequestParam(value = "CriteriaString") String Criteria) throws SQLException, ClassNotFoundException {
        Customer customer = g.fromJson(Criteria, Customer.class);
        ArrayList<String> columns = new ArrayList<String>();
        ArrayList<Customer> customers = customerService.getSimilarCustomers(customer, false, columns);
        return (customers);
    }

    /**
     *
     * @param Criteria customer criteria that we are getting the opposite of
     * @return the list of customers who match the opposite of the criteria given
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    @RequestMapping(value="/different", method = RequestMethod.GET)
    public @ResponseBody ArrayList<Customer> getNonSimilarCustomer(@RequestParam(value = "CriteriaString") String Criteria) throws SQLException, ClassNotFoundException {
        Customer customer = g.fromJson(Criteria, Customer.class);
        ArrayList<String> columns = new ArrayList<String>();
        ArrayList<Customer> customers = customerService.getSimilarCustomers(customer, true, columns);
        return (customers);
    }

    /**
     *
     * @param body the text from a .txt file given from the front end
     * @throws SQLException
     */
    @RequestMapping(value="/uploadForm")
    public int[] uploadCustomersForm(@RequestBody String body) throws SQLException {
        try {
            return convertIntegers(customerService.addCustomersFromForm(body));
        } catch(SQLException e){
            return new int[]{e.getErrorCode()};
        }
    }

    /**
     *
     * @param response the stringifed version of a customer
     * @return POJO version of customer who was added to databsae
     * @throws SQLException
     */
    @RequestMapping(value="/addCustomer")
    public int addCustomer(@RequestBody String response) throws SQLException {
        try {
            Customer newCustomer = g.fromJson(response, Customer.class);
            newCustomer.addQuotes();
            return customerService.addCustomer(newCustomer);
        }catch(SQLException e){
            return e.getErrorCode();
        }
    }

    public static int[] convertIntegers(ArrayList<Integer> integers)
    {
        int[] ret = new int[integers.size()];
        Iterator<Integer> iterator = integers.iterator();
        for (int i = 0; i < ret.length; i++)
        {
            ret[i] = iterator.next().intValue();
        }
        return ret;
    }
}
