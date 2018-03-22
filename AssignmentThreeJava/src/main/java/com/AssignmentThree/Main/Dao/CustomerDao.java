package com.AssignmentThree.Main.Dao;
import com.AssignmentThree.Main.Models.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDao extends PagingAndSortingRepository<Customer, Integer> {


    void delete(Customer deleted);
    Page<Customer> findAll();
    Customer findOne(int id);
    void flush();
    Customer save(Customer persisted);

    @Query(value = "SELECT c " +
            "FROM Customer c where First_Name like %?1% and" +
            " Last_Name like %?2% and Email_Address like %?3% " +
            "and Home_Address like %?4% and City like %?5% and State like %?6% " +
            "and Zip_Code like %?7%")
    Page<Customer> findByCustomer(String firstName, String lastName, String emailAddress,
                                  String homeAddress, String City, String State, String zipCode, Pageable pageable);

}
