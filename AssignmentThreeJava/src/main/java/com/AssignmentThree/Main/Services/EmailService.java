package com.AssignmentThree.Main.Services;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.InternetAddress;
import java.util.Date;

public class EmailService {

    /**
     * Sends email to recipient from sender
     * @param message the message to be sent via email
     * @param to the address string that the message is to be sent to
     * @param from the address string that the message is the be sent from
     * @throws MessagingException
     */
    public void sendEmail(String message, String to, String from) throws MessagingException {
        try {
            Properties props = new Properties();
            props.put("mail.smtp.host", "exchange.heb.com");
            props.put("mail.debug", "true");
            Session mailSession = Session.getInstance(props);
            mailSession.setDebug(true);
            Message msg = new MimeMessage(mailSession);
            msg.setFrom(new InternetAddress(from));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            msg.setSentDate(new Date());
            msg.setSubject("Hello World!");
            msg.setText(message);
            Transport.send(msg);
        }
        catch(MessagingException e) {
        }
    }
}