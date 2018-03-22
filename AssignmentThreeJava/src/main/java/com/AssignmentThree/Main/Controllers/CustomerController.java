package com.AssignmentThree.Main.Controllers;
import com.AssignmentThree.Main.Models.Customer;
import com.AssignmentThree.Main.Services.CustomerService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.ArrayList;

@RequestMapping("/customers")
@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    Gson g = new Gson();
    /**
     *
     * @return a list of customers who match the criteria requested
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    @RequestMapping(value="/all", method = RequestMethod.GET)
    public @ResponseBody
    Page<Customer> getSimilarCustomer(@RequestParam(value = "Customer") String customerString, @RequestParam(value="page") String pageString,
                                      @RequestParam(value = "order") String orderString, @RequestParam(value="sortField") String sortField) throws SQLException, ClassNotFoundException {

        Customer myCustomer = g.fromJson(customerString, Customer.class);
        int page = Integer.parseInt(pageString);
        int order = Integer.parseInt(orderString);
        Pageable pageRequest = customerService.createPageRequest(page, order, sortField);
        Page<Customer> myPage = customerService.findByCriteria(myCustomer, pageRequest);
       return myPage;
    }

    @PostMapping(value="/add")
    public Customer addCustomer(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }

    @PostMapping(value="/edit")
    public Customer editCustomer(@RequestBody Customer customer){
        return customerService.editCustomer(customer);
    }

    @PostMapping(value="/remove")
    public int removeCustomer(@RequestBody Customer customer){
        return customerService.removeCustomer(customer);
    }

    @RequestMapping(value="/one", method = RequestMethod.GET)
    public @ResponseBody
    Customer[] getCustomerById(@RequestParam(value = "ids") String idString) throws SQLException, ClassNotFoundException {
        Customer[] newCustomer = customerService.findAllById(idString);
        return newCustomer;
    }


}
