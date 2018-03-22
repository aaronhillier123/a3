package com.AssignmentThree.Main.Controllers;
import com.AssignmentThree.Main.Services.CustomerService;
import com.AssignmentThree.Main.Services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.sql.SQLException;


@RequestMapping("/email")
@RestController

public class EmailController {

    @Autowired
    private CustomerService customerService;

    /**
     *
     * @param message the message to be sent via email
     * @param sendAddress the email address of the sender
     * @param recieveAddress the email address of the reciever
     * @return
     * @throws SQLException
     * @throws ClassNotFoundException
     * @throws MessagingException
     */
    @RequestMapping(value = "/send")
    public @ResponseBody
    String sendEmail(@RequestParam(value = "message") String message, @RequestParam(value = "sendAddress") String sendAddress, @RequestParam(value = "recieveAddress") String recieveAddress,
                     @RequestParam(value="subject") String subject, @RequestParam(value="smtpAddress") String smtpAddress) throws SQLException, ClassNotFoundException, MessagingException {
        System.out.println("GOT EMAIL REQUEST");
        EmailService eServe = new EmailService();
        eServe.sendEmail(message, sendAddress, recieveAddress, subject, smtpAddress);
        return "SUCCESS";
    }
}
