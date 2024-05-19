package com.a508.studyservice.kafka;

import com.a508.studyservice.controller.NotificationController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements ApplicationRunner {

    private final NotificationController notificationController;

    @Autowired
    public StartupRunner(NotificationController notificationController) {
        this.notificationController = notificationController;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        notificationController.test();
    }
}