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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `favourites` */

insert  into `favourites`(`id`,`user_id`,`title`,`description`,`created_at`,`updated_at`,`deleted_at`) values 
(1,4,'home','Welcome',NULL,NULL,NULL),
(2,4,'work',' Welcome',NULL,NULL,NULL),
(4,4,'gym','Welcome','2025-04-21 13:54:07','2025-04-21 13:54:07',NULL),
(5,5,'college','Welcome','2025-04-23 17:27:03','2025-04-23 17:27:03',NULL),
(6,5,'hostel','Welcome','2025-04-23 17:27:04','2025-04-23 17:27:04',NULL);

/*Table structure for table `order_details` */

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `pickup_type_id` int(11) DEFAULT NULL,
  `user_ride_type_id` int(11) DEFAULT NULL,
  `amount` varchar(255) DEFAULT NULL,
  `kilometer` varchar(255) DEFAULT NULL,
  `pickup_start_datetime` datetime DEFAULT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `drop_location` varchar(255) DEFAULT NULL,
  `suggestion_id` int(11) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `order_details` */

insert  into `order_details`(`id`,`user_id`,`pickup_type_id`,`user_ride_type_id`,`amount`,`kilometer`,`pickup_start_datetime`,`pickup_location`,`drop_location`,`suggestion_id`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(7,19,1,1,'250','23','2025-04-24 15:30:00','123 Main Street, Cityname','456 Market Road, Destination City',2,NULL,'2025-04-24 10:07:12','2025-04-24 10:07:12',NULL);

/*Table structure for table `pickup_types` */

DROP TABLE IF EXISTS `pickup_types`;

CREATE TABLE `pickup_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pickup_types` */

insert  into `pickup_types`(`id`,`name`,`description`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'pickup now',NULL,NULL,'2025-04-24 11:01:21','2025-04-24 11:01:21',NULL),
(2,'Later',NULL,NULL,'2025-04-24 11:01:41','2025-04-24 11:01:41',NULL);

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

/*Table structure for table `suggestions` */

DROP TABLE IF EXISTS `suggestions`;

CREATE TABLE `suggestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `suggestions` */

insert  into `suggestions`(`id`,`name`,`description`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'Auto',NULL,NULL,'2025-04-24 11:10:16','2025-04-24 11:10:16',NULL),
(2,'Moto',NULL,NULL,'2025-04-24 11:10:20','2025-04-24 11:10:20',NULL),
(3,'Trip',NULL,NULL,'2025-04-24 11:10:24','2025-04-24 11:10:24',NULL),
(4,'Intercity',NULL,NULL,'2025-04-24 11:10:39','2025-04-24 11:10:39',NULL);

/*Table structure for table `user_locations` */

DROP TABLE IF EXISTS `user_locations`;

CREATE TABLE `user_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `device_location` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user_locations` */

insert  into `user_locations`(`id`,`user_id`,`device_location`,`created_at`,`updated_at`,`deleted_at`) values 
(2,19,'Trichy','2025-04-24 07:19:41','2025-04-24 07:19:41',NULL);

/*Table structure for table `user_ride_types` */

DROP TABLE IF EXISTS `user_ride_types`;

CREATE TABLE `user_ride_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user_ride_types` */

insert  into `user_ride_types`(`id`,`name`,`description`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(1,'For Me',NULL,NULL,'2025-04-24 11:05:39','2025-04-24 11:05:39',NULL),
(2,'A group',NULL,NULL,'2025-04-24 11:06:21','2025-04-24 11:06:21',NULL);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `mobile_otp` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `deleted_flag` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`firstname`,`lastname`,`email`,`mobile`,`mobile_otp`,`password`,`gender`,`profile`,`dob`,`deleted_flag`,`created_at`,`updated_at`,`deleted_at`) values 
(19,'Zoober','S','godagoapp@gmail.com','9087678909',NULL,'$2b$10$7DNVfzBdqGY9U.LZenFHY.wyjMFIqndaM9ejka/o8Vz2DQodIF.ZK','Male',NULL,'12-12-2002',NULL,'2025-04-24 12:26:41','2025-04-24 06:56:41',NULL);

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
