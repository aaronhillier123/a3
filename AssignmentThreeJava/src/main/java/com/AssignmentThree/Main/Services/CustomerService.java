package com.AssignmentThree.Main.Services;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import com.AssignmentThree.Main.Dao.CustomerDao;
import com.AssignmentThree.Main.Models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao dao;


    /**
     *
     * @param pageable the page format that i want to return
     * @return a page of all customers
     */
    public Page<Customer> findAll(Pageable pageable){
        return dao.findAll(pageable);
    }

    /**
     *
     * @param page the page number i want to return
     * @param order the order in which i want to return them
     * @param sortField the field to sort by
     * @return a page request with the give criteria
     */
    public Pageable createPageRequest(int page, int order, String sortField){
        Sort.Direction sd = (order==0) ? Sort.Direction.ASC : Sort.Direction.DESC;
        return new PageRequest(page, 10, new Sort(sd, sortField));
    }

    /**
     *
     * @param c the customer with the criteria I want to return
     * @param pageable a page to put the customers on
     * @return a page of customers that match the criteria
     */
    public Page<Customer> findByCriteria(Customer c, Pageable pageable){

        return dao.findByCustomer(c.getFirstName(), c.getLastName(), c.getEmailAddress(), c.getHomeAddress(),
                c.getCity(), c.getState(), c.getZipCode(), pageable);
    }

    /**
     *
     * @param c a customer I want to add to database
     * @return the customer that has been added to the database
     */
    public Customer addCustomer(Customer c){
        if(c.valueCheck()) {
            return dao.save(c);
        } else {
            System.out.println("VALUE CHECK FAILED");
            return new Customer();
        }
    }

    /**
     *
     * @param c customer I want to remove from database
     * @return
     */
    public int removeCustomer(Customer c){
       dao.delete(c);
       return 1;
    }

    public Customer editCustomer(Customer c){
        return dao.save(c);
    }

    /**
     *
     * @param customerString a JSON string of an array of ids that i want to get the customers for
     * @return
     */
    public Customer[] findAllById(String customerString){
        Gson g = new Gson();
        ArrayList<Double> doubleIds = g.fromJson(customerString, ArrayList.class);
        ArrayList<Integer> ids = new ArrayList<Integer>();
        for(Double d : doubleIds){
            ids.add(d.intValue());
        }
        ArrayList<Customer> listCustomers = new ArrayList<>();
        for (Integer c : ids){
            listCustomers.add(dao.findOne(c));
        }
        return convertCustomers(listCustomers);
    }

    /**
     *
     * @param customers an array list of customers
     * @return an array of customers
     */
    public static Customer[] convertCustomers(ArrayList<Customer> customers)
    {
        Customer[] ret = new Customer[customers.size()];
        Iterator<Customer> iterator = customers.iterator();
        for (int i = 0; i < ret.length; i++)
        {
            ret[i] = iterator.next();
        }
        return ret;
    }

}

