CREATE DATABASE  IF NOT EXISTS `cmpe295` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cmpe295`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cmpe295
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ordertestreport`
--

DROP TABLE IF EXISTS `ordertestreport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ordertestreport` (
  `idorderTestReport` int(11) NOT NULL AUTO_INCREMENT,
  `testName` varchar(45) NOT NULL,
  `patientName` varchar(45) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `Pathologist` varchar(45) NOT NULL,
  `Diagnosis` varchar(45) NOT NULL,
  `doctorName` varchar(45) DEFAULT NULL,
  `Specifcations` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idorderTestReport`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordertestreport`
--

LOCK TABLES `ordertestreport` WRITE;
/*!40000 ALTER TABLE `ordertestreport` DISABLE KEYS */;
INSERT INTO `ordertestreport` VALUES (1,'test1','Woods',20,'M','Mrs.Mona','Heart Disorder',NULL,''),(2,'test1','Woods',30,'M','Mrs.Mona','Heart Disorder','weider.yu@sjsu.edu',''),(3,'test2','Woods',30,'M','Mrs.Mona','Heart Malfunction','weider.yu@sjsu.edu','asd'),(4,'test5','Woods Quincy',30,'M','Mr. Ken','Heart Malfunction','weider.yu@sjsu.edu',''),(5,'test5','Woods Quincy',30,'M','Mr. Ken','Heart Malfunction','weider.yu@sjsu.edu',''),(6,'test2','Woods',20,'M','Mr. Ken','Heart Disorder','weider.yu@sjsu.edu',''),(7,'test3','Nelson',20,'F','Mrs.Mona','mental disorder','weider.yu@sjsu.edu',''),(8,'test2','maaq',10,'M','Mrs.Mona','Lung Damage','weider.yu@sjsu.edu',''),(9,'test4','mark',20,'M','Mrs.Mona','Liver Pain','weider.yu@sjsu.edu',''),(10,'test1','Pam',30,'F','Mr. Ken','Lung Damage','weider.yu@sjsu.edu',''),(11,'test4','Pam',20,'M','Mrs.Mona','Heart Disorder','weider.yu@sjsu.edu',''),(12,'test4','Pam',20,'M','Mrs.Mona','Heart Disorder','weider.yu@sjsu.edu',''),(13,'test2','Peter',20,'M','Mr. Ken','Typhoid','weider.yu@sjsu.edu',''),(14,'test2','Peter',20,'M','Mr. Ken','Typhoid','weider.yu@sjsu.edu',''),(15,'test4','Mon',21,'M','Mrs.Mona','Cardiac','weider.yu@sjsu.edu',''),(16,'test1','Monroe',30,'M','Mrs.Gill','Throat Infection','weider.yu@sjsu.edu',''),(17,'test3','Pam',29,'F','Mrs.Micky','Lung Damage','weider.yu@sjsu.edu',''),(18,'test2','Woods Quincy',30,'M','Mrs.Mona','Heart Disorder','weider.yu@sjsu.edu',''),(19,'test1','Woods Quincy',30,'M','Mr. Ken','Heart Disorder','weider.yu@sjsu.edu','');
/*!40000 ALTER TABLE `ordertestreport` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-12 21:28:08
