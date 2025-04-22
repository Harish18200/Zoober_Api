/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.32-MariaDB : Database - zooberride
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `documents` */

DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ride_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `expired_date` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `documents` */

insert  into `documents`(`id`,`ride_id`,`name`,`photo`,`card_number`,`expired_date`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(1,1,'license',NULL,'JOK8907H','27-12-2040',NULL,'2025-04-22 15:19:06','2025-04-22 15:19:06',NULL),
(2,1,'aadharNo',NULL,'890987654566',NULL,NULL,'2025-04-22 15:19:47','2025-04-22 15:19:47',NULL);

/*Table structure for table `favourites` */

DROP TABLE IF EXISTS `favourites`;

CREATE TABLE `favourites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `favourites` */

insert  into `favourites`(`id`,`user_id`,`title`,`description`,`created_at`,`updated_at`,`deleted_at`) values 
(1,4,'New','New',NULL,NULL,'2025-04-21 14:10:22'),
(2,4,'demo',' testing',NULL,NULL,NULL),
(4,4,'Education','Welcome','2025-04-21 13:54:07','2025-04-21 13:54:07',NULL);

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) DEFAULT NULL,
  `firstname` text DEFAULT NULL,
  `lastname` text DEFAULT NULL,
  `mobile` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `gender` text DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `otp` text DEFAULT NULL,
  `deviceid` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  `updated_at` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `login` */

insert  into `login`(`id`,`user_type`,`firstname`,`lastname`,`mobile`,`email`,`gender`,`password`,`dob`,`img`,`otp`,`deviceid`,`status`,`created_at`,`updated_at`) values 
(8,NULL,'David','B','9089876544','test@gmail.com','Male','$2b$10$BmMkpXcWJc9/hSM8yoIawuyY89UCBrWSL1H2Q6eOhYDGTnEV6tfQG','09-08-2025',NULL,NULL,NULL,NULL,'2025-04-17 16:26:20','2025-04-17 16:26:20');

/*Table structure for table `order_details` */

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ride_id` int(11) DEFAULT NULL,
  `order_name` varchar(255) DEFAULT NULL,
  `cash_type` varchar(255) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `kilometer` varchar(255) DEFAULT NULL,
  `pickup` varchar(255) DEFAULT NULL,
  `dropoff` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `tripfare` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `order_details` */

insert  into `order_details`(`id`,`ride_id`,`order_name`,`cash_type`,`amount`,`kilometer`,`pickup`,`dropoff`,`note`,`tripfare`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(3,1,'parveen','googlepay','100','25','trichy','salem','active','testing',1,'2025-04-22 16:05:41','2025-04-22 16:05:41',NULL),
(4,1,'ravi','googlepay','100','25','trichy','salem','active','testing',1,'2025-04-22 16:20:10','2025-04-22 16:20:10',NULL),
(5,1,'suresh','googlepay','100','25','trichy','salem','active','testing',NULL,'2025-04-22 16:20:23','2025-04-22 16:20:23',NULL),
(6,1,'kumar','googlepay','100','25','trichy','salem','active','testing',NULL,'2025-04-22 16:20:32','2025-04-22 16:20:32',NULL);

/*Table structure for table `rides` */

DROP TABLE IF EXISTS `rides`;

CREATE TABLE `rides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_flag` int(11) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `rides` */

insert  into `rides`(`id`,`firstname`,`lastname`,`email`,`mobile`,`password`,`gender`,`dob`,`profile`,`created_at`,`updated_at`,`deleted_flag`,`deleted_at`) values 
(1,'Zoober',NULL,'godagoapp@gmail.com','9087678909','$2b$10$lsVXxm8pLEeRKP/Gka8Dwuw5Os13jN1JdIJtoDKy4ukHXNGp8Rhiu',NULL,NULL,NULL,'2025-04-22 14:22:36','2025-04-22 14:22:36',NULL,NULL),
(2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-04-22 14:50:30','2025-04-22 14:50:30',NULL,NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`firstname`,`lastname`,`email`,`mobile`,`password`,`gender`,`profile`,`dob`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(8,'Zoober',NULL,'godagoapp@gmail.com','9087678909','$2b$10$Ofu6gdNYmysySsYeNepFr.G./v59ClmTPfQFZTPw.4vMCHTu9oryW',NULL,NULL,NULL,1,'2025-04-22 19:33:02','2025-04-21 14:25:10','2025-04-22 14:03:02'),
(9,'Zoober',NULL,'godagoapp@gmail.com','9087678909','$2b$10$cc1lAQmu9W3M5OcH89gUme1omwLY48e6nRh2BtIrO/iFPk/3y8tVu',NULL,NULL,NULL,NULL,'2025-04-21 19:56:26','2025-04-21 14:26:26',NULL),
(10,'email',NULL,'email@gmail.com','1234567890','$2b$10$AVCrIbxXDxa4ADSr.y/EfuTZA5bDuNb173yqh1MeszfJQvu89fuHm',NULL,NULL,NULL,NULL,'2025-04-21 20:02:52','2025-04-21 14:32:52',NULL),
(11,'email',NULL,'email@gmail.com','1234567890','$2b$10$dFCXfg5DhLM5.3Pu6rbKZ./u5rmaKZ6Pyf0bUc96KNHEMrwJrn.mu',NULL,NULL,NULL,NULL,'2025-04-21 20:03:30','2025-04-21 14:33:30',NULL),
(12,'email',NULL,'email@gmail.com','1234567890','$2b$10$hgNR2gMNOCqyp4OgT5Z7eekOcPtetLmiRbxHFeyBaX1qdS9C7.rWi',NULL,NULL,NULL,NULL,'2025-04-21 20:04:43','2025-04-21 14:34:43',NULL),
(13,'email',NULL,'wmail@gmail.com','1234567892','$2b$10$rafhvNYbaSmEpDDUwr6kkuFBhWFr2nX8PsDsIMwaFuLLNIwKz1n0W',NULL,NULL,NULL,NULL,'2025-04-21 20:05:14','2025-04-21 14:35:14',NULL),
(14,'email',NULL,'email@gmail.com','1234567892','$2b$10$un9XCYTIfJnS.ugknMmMyeDnyfHwopHDH6qZiFqeTpWi56FhFxEcm',NULL,NULL,NULL,NULL,'2025-04-21 20:07:15','2025-04-21 14:37:15',NULL),
(15,'Zoober',NULL,'godagoapp@gmail.com','9087678909','$2b$10$CD6nsAxSmwEuatt4TqsY6.Cp7RGcpc3oE0ffA.CGxCDX0YBYs.5WG',NULL,NULL,NULL,NULL,'2025-04-22 18:58:49','2025-04-22 13:28:49',NULL),
(16,'Zoober',NULL,'godagoapp@gmail.com','9087678909','$2b$10$XTevEfdm1cstE.nTNKWj2eQu7KByq5R2OrER42FQKgz3c30.zQSUO',NULL,NULL,NULL,NULL,'2025-04-22 19:12:12','2025-04-22 13:42:12',NULL);

/*Table structure for table `vehicles` */

DROP TABLE IF EXISTS `vehicles`;

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ride_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `model_year` varchar(255) DEFAULT NULL,
  `license_plate` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `booking_type` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `vehicles` */

insert  into `vehicles`(`id`,`ride_id`,`brand`,`model`,`model_year`,`license_plate`,`color`,`booking_type`,`status`,`created_at`,`updated_at`,`deleted_at`) values 
(2,1,'Duke','200','2018','Active','Blue','offline',NULL,'2025-04-22 14:53:42','2025-04-22 14:53:42',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
