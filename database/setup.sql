-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2019 at 11:16 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_manager`
--
CREATE DATABASE IF NOT EXISTS `task_manager` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `task_manager`;

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `alias` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province_id` int(11) DEFAULT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `address_type` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `alias`, `address_1`, `address_2`, `zip`, `state_code`, `city`, `province_id`, `country_id`, `customer_id`, `status`, `created_at`, `updated_at`, `deleted_at`, `address_type`) VALUES
(1021, '', 'billing1', 'billing2', 'billing3', NULL, 'billing4', NULL, 225, 19319, 1, '2019-12-05 22:04:26', '2019-12-05 22:04:26', NULL, 1),
(1022, '', 'shipping1', 'shipping2', 'shipping3', NULL, 'shipping4', NULL, 225, 19319, 1, '2019-12-05 22:04:26', '2019-12-05 22:04:26', NULL, 2),
(1023, '', 'test', NULL, NULL, NULL, NULL, NULL, 225, 13183, 1, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `website` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_1` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_2` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `town` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `postcode` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country_id` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `company_logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `industry_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `created_at`, `updated_at`, `website`, `phone_number`, `email`, `address_1`, `address_2`, `town`, `city`, `postcode`, `country_id`, `currency_id`, `company_logo`, `industry_id`) VALUES
(482, 'test mike', '2019-10-03 12:08:37', '2019-10-18 21:04:51', 'test website', '01425 629322', 'test@yahoo.com', 'test address', 'test', 'town', 'city', 'postcode', 225, 2, '', NULL),
(1129, 'lexie', '2019-10-25 17:47:41', '2019-10-25 17:47:41', 'lexie.com', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 225, 2, '', NULL),
(4403, 'test logo', '2019-11-28 20:06:10', '2019-11-28 20:17:55', 'testlogo.com', 'test', 'test@yahoo.com', 'test', 'test', 'tedst', 'tedst', 'test', 1, 1, 'C:\\xampp3\\tmp\\php7483.tmp', NULL),
(4716, 'test industry', '2019-11-30 20:07:25', '2019-11-30 20:08:54', 'test industry', 'test', 'test', 'test', 'teat', 'test', 'test', 'test', 208, 1, 'null', 6);

-- --------------------------------------------------------

--
-- Table structure for table `brand_user`
--

DROP TABLE IF EXISTS `brand_user`;
CREATE TABLE `brand_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_admin` int(11) NOT NULL,
  `is_owner` int(11) NOT NULL,
  `is_locked` int(11) NOT NULL,
  `permissions` text COLLATE utf8_unicode_ci NOT NULL,
  `settings` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `brand_user`
--

INSERT INTO `brand_user` (`id`, `company_id`, `user_id`, `created_at`, `updated_at`, `is_admin`, `is_owner`, `is_locked`, `permissions`, `settings`) VALUES
(13, 4716, 9874, NULL, NULL, 1, 1, 0, '[]', '[]'),
(14, 4716, 9874, NULL, NULL, 1, 1, 0, '[]', '[]');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `_lft` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `_rgt` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `parent_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `cover`, `status`, `created_at`, `updated_at`, `_lft`, `_rgt`, `parent_id`) VALUES
(1354, 'Loans', 'loans', 'Nulla pellentesque mi non laoreet eleifend. Integer porttitor mollisar lorem, at molestie arcu pulvinar ut. Proin ac fermentum est. Cras mi ipsum', NULL, 1, '2019-10-05 16:29:31', '2019-10-05 16:29:31', 1, 8, NULL),
(1355, 'Mortgages', 'mortgages', 'Nulla pellentesque mi non laoreet eleifend. Integer porttitor mollisar lorem, at molestie arcu pulvinar ut. Proin ac fermentum est. Cras mi ipsum', NULL, 1, '2019-10-05 16:29:53', '2019-10-05 16:29:53', 9, 16, NULL),
(1356, 'Bridging', 'bridging', 'Nulla pellentesque mi non laoreet eleifend. Integer porttitor mollisar lorem, at molestie arcu pulvinar ut. Proin ac fermentum est. Cras mi ipsum', NULL, 1, '2019-10-05 16:30:09', '2019-10-05 16:30:09', 17, 24, NULL),
(1357, 'Homeowner Loan', 'homeowner-loan', '£10,000 to £10 million <br>\nLarger loans for homeowners only', NULL, 1, '2019-10-05 18:03:11', '2019-10-05 18:03:11', 2, 3, 1354),
(1358, 'Personal Loan', 'personal-loan', '£100 to £35,000 <br>\nNo need to be a homeowner', NULL, 1, '2019-10-05 18:03:40', '2019-10-05 18:03:40', 4, 5, 1354),
(1359, 'Guarantoor Loans', 'guarantoor-loans', '£500 to £15,000 <br>\nAn option if you have poor credit or other problems', NULL, 1, '2019-10-05 18:04:10', '2019-10-05 18:04:10', 6, 7, 1354),
(1360, 'Mortgage New Property', 'mortgage-new-property', 'First time buyers, purchasing a property or land', NULL, 1, '2019-10-05 18:04:39', '2019-10-05 18:04:39', 10, 11, 1355),
(1361, '(Re)mortgage Owned property', 'remortgage-owned-property', 'Reduce monthly payments, change of property or home improvements', NULL, 1, '2019-10-05 18:05:05', '2019-10-05 18:05:05', 12, 13, 1355),
(1362, 'Buy to Let (Re)mortgage', 'buy-to-let-remortgage', 'Investment in another property both residential and commercial', NULL, 1, '2019-10-05 18:05:30', '2019-10-05 18:05:30', 14, 15, 1355),
(1363, 'Bridging Loan New Property', 'bridging-loan-new-property', 'For new property purchase or land', NULL, 1, '2019-10-05 18:06:03', '2019-10-05 18:06:03', 18, 19, 1356),
(1364, 'Bridging Loan Owned Property', 'bridging-loan-owned-property', 'Bridging Loan Owned Property', NULL, 1, '2019-10-05 18:06:29', '2019-10-05 18:06:29', 20, 21, 1356),
(1365, 'Bridging Loan Commercial or Development', 'bridging-loan-commercial-or-development', 'Bridging Loan Commercial or Development', NULL, 1, '2019-10-05 18:06:53', '2019-10-05 18:06:53', 22, 23, 1356);

-- --------------------------------------------------------

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
CREATE TABLE `category_product` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category_product`
--

INSERT INTO `category_product` (`id`, `category_id`, `product_id`) VALUES
(36, 244, 609),
(38, 243, 609),
(362, 1354, 1312),
(363, 1354, 1313),
(364, 1354, 1314),
(365, 1355, 1315),
(367, 1355, 1317),
(368, 1356, 1318),
(369, 1356, 1319),
(370, 1356, 1320),
(371, 1361, 1316),
(372, 1365, 1320),
(373, 1355, 1316),
(374, 1363, 1318),
(375, 1364, 1319),
(376, 1362, 1317),
(377, 1359, 1314),
(378, 1357, 1312),
(379, 1360, 1315),
(380, 1358, 1313),
(828, 1361, 2257),
(829, 1356, 2257),
(1204, 1361, 3254);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state_code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `province_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`name`, `state_code`, `province_id`) VALUES
('New Milton', 'NM', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `comment` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `parent_id` int(11) DEFAULT NULL,
  `parent_type` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `user_id`, `created_at`, `updated_at`, `is_active`, `parent_id`, `parent_type`) VALUES
(483, 'test comment', 9874, '2019-10-20 18:16:40', '2019-10-20 18:16:40', 1, 0, 1),
(484, 'testmkke', 9874, '2019-10-20 18:22:56', '2019-10-20 18:22:56', 1, 0, 1),
(523, 'test comment', 9874, '2019-10-30 20:50:00', '2019-10-30 20:50:00', 1, 0, 2),
(524, 'test task comment', 9874, '2019-10-30 20:50:43', '2019-10-30 20:50:43', 1, 0, 1),
(525, 'test new message layout', 9874, '2019-11-02 13:31:20', '2019-11-02 13:31:20', 1, 0, 2),
(529, 'test comment', 9874, '2019-11-02 13:52:35', '2019-11-02 13:52:35', 1, 525, 2),
(530, 'test again 2', 9874, '2019-11-02 13:56:00', '2019-11-02 13:56:00', 1, 525, 2),
(711, 'test 22', 9874, '2019-11-22 21:28:06', '2019-11-22 21:28:06', 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comment_task`
--

DROP TABLE IF EXISTS `comment_task`;
CREATE TABLE `comment_task` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `comment_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comment_type`
--

DROP TABLE IF EXISTS `comment_type`;
CREATE TABLE `comment_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comment_type`
--

INSERT INTO `comment_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Comment', NULL, NULL),
(2, 'Task', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `iso` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `iso3` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numcode` int(11) DEFAULT NULL,
  `phonecode` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `iso`, `iso3`, `numcode`, `phonecode`, `status`, `created_at`, `updated_at`) VALUES
(1, 'AFGHANISTAN', 'AF', 'AFG', 4, 93, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(2, 'ALBANIA', 'AL', 'ALB', 8, 355, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(3, 'ALGERIA', 'DZ', 'DZA', 12, 213, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(4, 'AMERICAN SAMOA', 'AS', 'ASM', 16, 1684, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(5, 'ANDORRA', 'AD', 'AND', 20, 376, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(6, 'ANGOLA', 'AO', 'AGO', 24, 244, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(7, 'ANGUILLA', 'AI', 'AIA', 660, 1264, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(8, 'ANTARCTICA', 'AQ', NULL, NULL, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(9, 'ANTIGUA AND BARBUDA', 'AG', 'ATG', 28, 1268, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(10, 'ARGENTINA', 'AR', 'ARG', 32, 54, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(11, 'ARMENIA', 'AM', 'ARM', 51, 374, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(12, 'ARUBA', 'AW', 'ABW', 533, 297, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(13, 'AUSTRALIA', 'AU', 'AUS', 36, 61, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(14, 'AUSTRIA', 'AT', 'AUT', 40, 43, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(15, 'AZERBAIJAN', 'AZ', 'AZE', 31, 994, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(16, 'BAHAMAS', 'BS', 'BHS', 44, 1242, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(17, 'BAHRAIN', 'BH', 'BHR', 48, 973, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(18, 'BANGLADESH', 'BD', 'BGD', 50, 880, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(19, 'BARBADOS', 'BB', 'BRB', 52, 1246, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(20, 'BELARUS', 'BY', 'BLR', 112, 375, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(21, 'BELGIUM', 'BE', 'BEL', 56, 32, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(22, 'BELIZE', 'BZ', 'BLZ', 84, 501, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(23, 'BENIN', 'BJ', 'BEN', 204, 229, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(24, 'BERMUDA', 'BM', 'BMU', 60, 1441, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(25, 'BHUTAN', 'BT', 'BTN', 64, 975, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(26, 'BOLIVIA', 'BO', 'BOL', 68, 591, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(27, 'BOSNIA AND HERZEGOVINA', 'BA', 'BIH', 70, 387, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(28, 'BOTSWANA', 'BW', 'BWA', 72, 267, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(29, 'BOUVET ISLAND', 'BV', NULL, NULL, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(30, 'BRAZIL', 'BR', 'BRA', 76, 55, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(31, 'BRITISH INDIAN OCEAN TERRITORY', 'IO', NULL, NULL, 246, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(32, 'BRUNEI DARUSSALAM', 'BN', 'BRN', 96, 673, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(33, 'BULGARIA', 'BG', 'BGR', 100, 359, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(34, 'BURKINA FASO', 'BF', 'BFA', 854, 226, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(35, 'BURUNDI', 'BI', 'BDI', 108, 257, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(36, 'CAMBODIA', 'KH', 'KHM', 116, 855, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(37, 'CAMEROON', 'CM', 'CMR', 120, 237, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(38, 'CANADA', 'CA', 'CAN', 124, 1, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(39, 'CAPE VERDE', 'CV', 'CPV', 132, 238, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(40, 'CAYMAN ISLANDS', 'KY', 'CYM', 136, 1345, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(41, 'CENTRAL AFRICAN REPUBLIC', 'CF', 'CAF', 140, 236, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(42, 'CHAD', 'TD', 'TCD', 148, 235, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(43, 'CHILE', 'CL', 'CHL', 152, 56, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(44, 'CHINA', 'CN', 'CHN', 156, 86, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(45, 'CHRISTMAS ISLAND', 'CX', NULL, NULL, 61, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(46, 'COCOS (KEELING) ISLANDS', 'CC', NULL, NULL, 672, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(47, 'COLOMBIA', 'CO', 'COL', 170, 57, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(48, 'COMOROS', 'KM', 'COM', 174, 269, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(49, 'CONGO', 'CG', 'COG', 178, 242, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(50, 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'CD', 'COD', 180, 242, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(51, 'COOK ISLANDS', 'CK', 'COK', 184, 682, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(52, 'COSTA RICA', 'CR', 'CRI', 188, 506, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(53, 'COTE D\'IVOIRE', 'CI', 'CIV', 384, 225, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(54, 'CROATIA', 'HR', 'HRV', 191, 385, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(55, 'CUBA', 'CU', 'CUB', 192, 53, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(56, 'CYPRUS', 'CY', 'CYP', 196, 357, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(57, 'CZECH REPUBLIC', 'CZ', 'CZE', 203, 420, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(58, 'DENMARK', 'DK', 'DNK', 208, 45, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(59, 'DJIBOUTI', 'DJ', 'DJI', 262, 253, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(60, 'DOMINICA', 'DM', 'DMA', 212, 1767, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(61, 'DOMINICAN REPUBLIC', 'DO', 'DOM', 214, 1809, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(62, 'ECUADOR', 'EC', 'ECU', 218, 593, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(63, 'EGYPT', 'EG', 'EGY', 818, 20, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(64, 'EL SALVADOR', 'SV', 'SLV', 222, 503, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(65, 'EQUATORIAL GUINEA', 'GQ', 'GNQ', 226, 240, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(66, 'ERITREA', 'ER', 'ERI', 232, 291, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(67, 'ESTONIA', 'EE', 'EST', 233, 372, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(68, 'ETHIOPIA', 'ET', 'ETH', 231, 251, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(69, 'FALKLAND ISLANDS (MALVINAS)', 'FK', 'FLK', 238, 500, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(70, 'FAROE ISLANDS', 'FO', 'FRO', 234, 298, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(71, 'FIJI', 'FJ', 'FJI', 242, 679, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(72, 'FINLAND', 'FI', 'FIN', 246, 358, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(73, 'FRANCE', 'FR', 'FRA', 250, 33, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(74, 'FRENCH GUIANA', 'GF', 'GUF', 254, 594, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(75, 'FRENCH POLYNESIA', 'PF', 'PYF', 258, 689, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(76, 'FRENCH SOUTHERN TERRITORIES', 'TF', NULL, NULL, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(77, 'GABON', 'GA', 'GAB', 266, 241, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(78, 'GAMBIA', 'GM', 'GMB', 270, 220, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(79, 'GEORGIA', 'GE', 'GEO', 268, 995, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(80, 'GERMANY', 'DE', 'DEU', 276, 49, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(81, 'GHANA', 'GH', 'GHA', 288, 233, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(82, 'GIBRALTAR', 'GI', 'GIB', 292, 350, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(83, 'GREECE', 'GR', 'GRC', 300, 30, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(84, 'GREENLAND', 'GL', 'GRL', 304, 299, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(85, 'GRENADA', 'GD', 'GRD', 308, 1473, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(86, 'GUADELOUPE', 'GP', 'GLP', 312, 590, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(87, 'GUAM', 'GU', 'GUM', 316, 1671, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(88, 'GUATEMALA', 'GT', 'GTM', 320, 502, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(89, 'GUINEA', 'GN', 'GIN', 324, 224, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(90, 'GUINEA-BISSAU', 'GW', 'GNB', 624, 245, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(91, 'GUYANA', 'GY', 'GUY', 328, 592, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(92, 'HAITI', 'HT', 'HTI', 332, 509, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(93, 'HEARD ISLAND AND MCDONALD ISLANDS', 'HM', NULL, NULL, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(94, 'HOLY SEE (VATICAN CITY STATE)', 'VA', 'VAT', 336, 39, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(95, 'HONDURAS', 'HN', 'HND', 340, 504, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(96, 'HONG KONG', 'HK', 'HKG', 344, 852, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(97, 'HUNGARY', 'HU', 'HUN', 348, 36, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(98, 'ICELAND', 'IS', 'ISL', 352, 354, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(99, 'INDIA', 'IN', 'IND', 356, 91, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(100, 'INDONESIA', 'ID', 'IDN', 360, 62, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(101, 'IRAN, ISLAMIC REPUBLIC OF', 'IR', 'IRN', 364, 98, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(102, 'IRAQ', 'IQ', 'IRQ', 368, 964, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(103, 'IRELAND', 'IE', 'IRL', 372, 353, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(104, 'ISRAEL', 'IL', 'ISR', 376, 972, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(105, 'ITALY', 'IT', 'ITA', 380, 39, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(106, 'JAMAICA', 'JM', 'JAM', 388, 1876, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(107, 'JAPAN', 'JP', 'JPN', 392, 81, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(108, 'JORDAN', 'JO', 'JOR', 400, 962, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(109, 'KAZAKHSTAN', 'KZ', 'KAZ', 398, 7, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(110, 'KENYA', 'KE', 'KEN', 404, 254, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(111, 'KIRIBATI', 'KI', 'KIR', 296, 686, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(112, 'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF', 'KP', 'PRK', 408, 850, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(113, 'KOREA, REPUBLIC OF', 'KR', 'KOR', 410, 82, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(114, 'KUWAIT', 'KW', 'KWT', 414, 965, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(115, 'KYRGYZSTAN', 'KG', 'KGZ', 417, 996, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(116, 'LAO PEOPLE\'S DEMOCRATIC REPUBLIC', 'LA', 'LAO', 418, 856, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(117, 'LATVIA', 'LV', 'LVA', 428, 371, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(118, 'LEBANON', 'LB', 'LBN', 422, 961, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(119, 'LESOTHO', 'LS', 'LSO', 426, 266, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(120, 'LIBERIA', 'LR', 'LBR', 430, 231, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(121, 'LIBYAN ARAB JAMAHIRIYA', 'LY', 'LBY', 434, 218, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(122, 'LIECHTENSTEIN', 'LI', 'LIE', 438, 423, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(123, 'LITHUANIA', 'LT', 'LTU', 440, 370, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(124, 'LUXEMBOURG', 'LU', 'LUX', 442, 352, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(125, 'MACAO', 'MO', 'MAC', 446, 853, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(126, 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', 'MK', 'MKD', 807, 389, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(127, 'MADAGASCAR', 'MG', 'MDG', 450, 261, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(128, 'MALAWI', 'MW', 'MWI', 454, 265, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(129, 'MALAYSIA', 'MY', 'MYS', 458, 60, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(130, 'MALDIVES', 'MV', 'MDV', 462, 960, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(131, 'MALI', 'ML', 'MLI', 466, 223, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(132, 'MALTA', 'MT', 'MLT', 470, 356, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(133, 'MARSHALL ISLANDS', 'MH', 'MHL', 584, 692, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(134, 'MARTINIQUE', 'MQ', 'MTQ', 474, 596, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(135, 'MAURITANIA', 'MR', 'MRT', 478, 222, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(136, 'MAURITIUS', 'MU', 'MUS', 480, 230, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(137, 'MAYOTTE', 'YT', NULL, NULL, 269, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(138, 'MEXICO', 'MX', 'MEX', 484, 52, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(139, 'MICRONESIA, FEDERATED STATES OF', 'FM', 'FSM', 583, 691, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(140, 'MOLDOVA, REPUBLIC OF', 'MD', 'MDA', 498, 373, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(141, 'MONACO', 'MC', 'MCO', 492, 377, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(142, 'MONGOLIA', 'MN', 'MNG', 496, 976, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(143, 'MONTSERRAT', 'MS', 'MSR', 500, 1664, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(144, 'MOROCCO', 'MA', 'MAR', 504, 212, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(145, 'MOZAMBIQUE', 'MZ', 'MOZ', 508, 258, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(146, 'MYANMAR', 'MM', 'MMR', 104, 95, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(147, 'NAMIBIA', 'NA', 'NAM', 516, 264, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(148, 'NAURU', 'NR', 'NRU', 520, 674, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(149, 'NEPAL', 'NP', 'NPL', 524, 977, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(150, 'NETHERLANDS', 'NL', 'NLD', 528, 31, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(151, 'NETHERLANDS ANTILLES', 'AN', 'ANT', 530, 599, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(152, 'NEW CALEDONIA', 'NC', 'NCL', 540, 687, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(153, 'NEW ZEALAND', 'NZ', 'NZL', 554, 64, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(154, 'NICARAGUA', 'NI', 'NIC', 558, 505, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(155, 'NIGER', 'NE', 'NER', 562, 227, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(156, 'NIGERIA', 'NG', 'NGA', 566, 234, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(157, 'NIUE', 'NU', 'NIU', 570, 683, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(158, 'NORFOLK ISLAND', 'NF', 'NFK', 574, 672, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(159, 'NORTHERN MARIANA ISLANDS', 'MP', 'MNP', 580, 1670, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(160, 'NORWAY', 'NO', 'NOR', 578, 47, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(161, 'OMAN', 'OM', 'OMN', 512, 968, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(162, 'PAKISTAN', 'PK', 'PAK', 586, 92, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(163, 'PALAU', 'PW', 'PLW', 585, 680, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(164, 'PALESTINIAN TERRITORY, OCCUPIED', 'PS', NULL, NULL, 970, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(165, 'PANAMA', 'PA', 'PAN', 591, 507, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(166, 'PAPUA NEW GUINEA', 'PG', 'PNG', 598, 675, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(167, 'PARAGUAY', 'PY', 'PRY', 600, 595, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(168, 'PERU', 'PE', 'PER', 604, 51, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(169, 'PHILIPPINES', 'PH', 'PHL', 608, 63, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(170, 'PITCAIRN', 'PN', 'PCN', 612, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(171, 'POLAND', 'PL', 'POL', 616, 48, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(172, 'PORTUGAL', 'PT', 'PRT', 620, 351, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(173, 'PUERTO RICO', 'PR', 'PRI', 630, 1787, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(174, 'QATAR', 'QA', 'QAT', 634, 974, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(175, 'REUNION', 'RE', 'REU', 638, 262, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(176, 'ROMANIA', 'RO', 'ROM', 642, 40, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(177, 'RUSSIAN FEDERATION', 'RU', 'RUS', 643, 70, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(178, 'RWANDA', 'RW', 'RWA', 646, 250, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(179, 'SAINT HELENA', 'SH', 'SHN', 654, 290, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(180, 'SAINT KITTS AND NEVIS', 'KN', 'KNA', 659, 1869, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(181, 'SAINT LUCIA', 'LC', 'LCA', 662, 1758, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(182, 'SAINT PIERRE AND MIQUELON', 'PM', 'SPM', 666, 508, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(183, 'SAINT VINCENT AND THE GRENADINES', 'VC', 'VCT', 670, 1784, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(184, 'SAMOA', 'WS', 'WSM', 882, 684, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(185, 'SAN MARINO', 'SM', 'SMR', 674, 378, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(186, 'SAO TOME AND PRINCIPE', 'ST', 'STP', 678, 239, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(187, 'SAUDI ARABIA', 'SA', 'SAU', 682, 966, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(188, 'SENEGAL', 'SN', 'SEN', 686, 221, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(189, 'SERBIA AND MONTENEGRO', 'CS', NULL, NULL, 381, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(190, 'SEYCHELLES', 'SC', 'SYC', 690, 248, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(191, 'SIERRA LEONE', 'SL', 'SLE', 694, 232, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(192, 'SINGAPORE', 'SG', 'SGP', 702, 65, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(193, 'SLOVAKIA', 'SK', 'SVK', 703, 421, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(194, 'SLOVENIA', 'SI', 'SVN', 705, 386, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(195, 'SOLOMON ISLANDS', 'SB', 'SLB', 90, 677, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(196, 'SOMALIA', 'SO', 'SOM', 706, 252, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(197, 'SOUTH AFRICA', 'ZA', 'ZAF', 710, 27, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(198, 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'GS', NULL, NULL, 0, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(199, 'SPAIN', 'ES', 'ESP', 724, 34, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(200, 'SRI LANKA', 'LK', 'LKA', 144, 94, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(201, 'SUDAN', 'SD', 'SDN', 736, 249, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(202, 'SURINAME', 'SR', 'SUR', 740, 597, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(203, 'SVALBARD AND JAN MAYEN', 'SJ', 'SJM', 744, 47, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(204, 'SWAZILAND', 'SZ', 'SWZ', 748, 268, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(205, 'SWEDEN', 'SE', 'SWE', 752, 46, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(206, 'SWITZERLAND', 'CH', 'CHE', 756, 41, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(207, 'SYRIAN ARAB REPUBLIC', 'SY', 'SYR', 760, 963, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(208, 'TAIWAN, PROVINCE OF CHINA', 'TW', 'TWN', 158, 886, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(209, 'TAJIKISTAN', 'TJ', 'TJK', 762, 992, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(210, 'TANZANIA, UNITED REPUBLIC OF', 'TZ', 'TZA', 834, 255, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(211, 'THAILAND', 'TH', 'THA', 764, 66, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(212, 'TIMOR-LESTE', 'TL', NULL, NULL, 670, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(213, 'TOGO', 'TG', 'TGO', 768, 228, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(214, 'TOKELAU', 'TK', 'TKL', 772, 690, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(215, 'TONGA', 'TO', 'TON', 776, 676, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(216, 'TRINIDAD AND TOBAGO', 'TT', 'TTO', 780, 1868, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(217, 'TUNISIA', 'TN', 'TUN', 788, 216, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(218, 'TURKEY', 'TR', 'TUR', 792, 90, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(219, 'TURKMENISTAN', 'TM', 'TKM', 795, 7370, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(220, 'TURKS AND CAICOS ISLANDS', 'TC', 'TCA', 796, 1649, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(221, 'TUVALU', 'TV', 'TUV', 798, 688, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(222, 'UGANDA', 'UG', 'UGA', 800, 256, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(223, 'UKRAINE', 'UA', 'UKR', 804, 380, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(224, 'UNITED ARAB EMIRATES', 'AE', 'ARE', 784, 971, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(225, 'UNITED KINGDOM', 'GB', 'GBR', 826, 44, 1, '2019-09-12 23:00:00', NULL),
(226, 'UNITED STATES OF AMERICA', 'US', 'USA', 840, 1, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(227, 'UNITED STATES MINOR OUTLYING ISLANDS', 'UM', NULL, NULL, 1, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(228, 'URUGUAY', 'UY', 'URY', 858, 598, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(229, 'UZBEKISTAN', 'UZ', 'UZB', 860, 998, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(230, 'VANUATU', 'VU', 'VUT', 548, 678, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(231, 'VENEZUELA', 'VE', 'VEN', 862, 58, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(232, 'VIET NAM', 'VN', 'VNM', 704, 84, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(233, 'VIRGIN ISLANDS, BRITISH', 'VG', 'VGB', 92, 1284, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(234, 'VIRGIN ISLANDS, U.S.', 'VI', 'VIR', 850, 1340, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(235, 'WALLIS AND FUTUNA', 'WF', 'WLF', 876, 681, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(236, 'WESTERN SAHARA', 'EH', 'ESH', 732, 212, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(237, 'YEMEN', 'YE', 'YEM', 887, 967, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(238, 'ZAMBIA', 'ZM', 'ZMB', 894, 260, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44'),
(239, 'ZIMBABWE', 'ZW', 'ZWE', 716, 263, 1, '2019-11-23 13:45:44', '2019-11-23 13:45:44');

-- --------------------------------------------------------

--
-- Table structure for table `credits`
--

DROP TABLE IF EXISTS `credits`;
CREATE TABLE `credits` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `amount` decimal(13,2) NOT NULL,
  `balance` decimal(13,2) NOT NULL,
  `credit_date` date DEFAULT NULL,
  `credit_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `private_notes` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
CREATE TABLE `currencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `symbol` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `precision` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thousand_separator` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `decimal_separator` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `swap_currency_symbol` int(11) NOT NULL,
  `exchange_rate` decimal(13,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `name`, `symbol`, `precision`, `thousand_separator`, `decimal_separator`, `code`, `swap_currency_symbol`, `exchange_rate`, `created_at`, `updated_at`) VALUES
(1, 'US Dollar', '$', '2', ',', '.', 'USD', 0, '0.00', '2019-11-24 19:53:49', '2019-11-24 19:53:49'),
(2, 'British Pound', '£', '2', ',', '.', 'GBP', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(3, 'Euro', '€', '2', '.', ',', 'EUR', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(4, 'South African Rand', 'R', '2', ',', '.', 'ZAR', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(5, 'Danish Krone', 'kr', '2', '.', ',', 'DKK', 1, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(6, 'Israeli Shekel', 'NIS ', '2', ',', '.', 'ILS', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(7, 'Swedish Krona', 'kr', '2', '.', ',', 'SEK', 1, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(8, 'Kenyan Shilling', 'KSh ', '2', ',', '.', 'KES', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(9, 'Canadian Dollar', 'C$', '2', ',', '.', 'CAD', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(10, 'Philippine Peso', 'P ', '2', ',', '.', 'PHP', 0, '0.00', '2019-11-24 19:53:50', '2019-11-24 19:53:50'),
(11, 'Indian Rupee', 'Rs. ', '2', ',', '.', 'INR', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(12, 'Australian Dollar', '$', '2', ',', '.', 'AUD', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(13, 'Singapore Dollar', '', '2', ',', '.', 'SGD', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(14, 'Norske Kroner', 'kr', '2', '.', ',', 'NOK', 1, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(15, 'New Zealand Dollar', '$', '2', ',', '.', 'NZD', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(16, 'Vietnamese Dong', '', '0', '.', ',', 'VND', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(17, 'Swiss Franc', '', '2', '\'', '.', 'CHF', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(18, 'Guatemalan Quetzal', 'Q', '2', ',', '.', 'GTQ', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(19, 'Malaysian Ringgit', 'RM', '2', ',', '.', 'MYR', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(20, 'Brazilian Real', 'R$', '2', '.', ',', 'BRL', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(21, 'Thai Baht', '', '2', ',', '.', 'THB', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(22, 'Nigerian Naira', '', '2', ',', '.', 'NGN', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(23, 'Argentine Peso', '$', '2', '.', ',', 'ARS', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(24, 'Bangladeshi Taka', 'Tk', '2', ',', '.', 'BDT', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(25, 'United Arab Emirates Dirham', 'DH ', '2', ',', '.', 'AED', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(26, 'Hong Kong Dollar', '', '2', ',', '.', 'HKD', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(27, 'Indonesian Rupiah', 'Rp', '2', ',', '.', 'IDR', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(28, 'Mexican Peso', '$', '2', ',', '.', 'MXN', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(29, 'Egyptian Pound', 'E£', '2', ',', '.', 'EGP', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(30, 'Colombian Peso', '$', '2', '.', ',', 'COP', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(31, 'West African Franc', 'CFA ', '2', ',', '.', 'XOF', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(32, 'Chinese Renminbi', 'RMB ', '2', ',', '.', 'CNY', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(33, 'Rwandan Franc', 'RF ', '2', ',', '.', 'RWF', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(34, 'Tanzanian Shilling', 'TSh ', '2', ',', '.', 'TZS', 0, '0.00', '2019-11-24 19:53:51', '2019-11-24 19:53:51'),
(35, 'Netherlands Antillean Guilder', '', '2', '.', ',', 'ANG', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(36, 'Trinidad and Tobago Dollar', 'TT$', '2', ',', '.', 'TTD', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(37, 'East Caribbean Dollar', 'EC$', '2', ',', '.', 'XCD', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(38, 'Ghanaian Cedi', '', '2', ',', '.', 'GHS', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(39, 'Bulgarian Lev', '', '2', ' ', '.', 'BGN', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(40, 'Aruban Florin', 'Afl. ', '2', ' ', '.', 'AWG', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(41, 'Turkish Lira', 'TL ', '2', '.', ',', 'TRY', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(42, 'Romanian New Leu', '', '2', ',', '.', 'RON', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(43, 'Croatian Kuna', 'kn', '2', '.', ',', 'HRK', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(44, 'Saudi Riyal', '', '2', ',', '.', 'SAR', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(45, 'Japanese Yen', '¥', '0', ',', '.', 'JPY', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(46, 'Maldivian Rufiyaa', '', '2', ',', '.', 'MVR', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(47, 'Costa Rican Colón', '', '2', ',', '.', 'CRC', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(48, 'Pakistani Rupee', 'Rs ', '0', ',', '.', 'PKR', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(49, 'Polish Zloty', 'zł', '2', ' ', ',', 'PLN', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(50, 'Sri Lankan Rupee', 'LKR', '2', ',', '.', 'LKR', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(51, 'Czech Koruna', 'Kč', '2', ' ', ',', 'CZK', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(52, 'Uruguayan Peso', '$', '2', '.', ',', 'UYU', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(53, 'Namibian Dollar', '$', '2', ',', '.', 'NAD', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(54, 'Tunisian Dinar', '', '2', ',', '.', 'TND', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(55, 'Russian Ruble', '', '2', ',', '.', 'RUB', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(56, 'Mozambican Metical', 'MT', '2', '.', ',', 'MZN', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(57, 'Omani Rial', '', '2', ',', '.', 'OMR', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(58, 'Ukrainian Hryvnia', '', '2', ',', '.', 'UAH', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(59, 'Macanese Pataca', 'MOP$', '2', ',', '.', 'MOP', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(60, 'Taiwan New Dollar', 'NT$', '2', ',', '.', 'TWD', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(61, 'Dominican Peso', 'RD$', '2', ',', '.', 'DOP', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(62, 'Chilean Peso', '$', '0', '.', ',', 'CLP', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(63, 'Icelandic Króna', 'kr', '2', '.', ',', 'ISK', 1, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(64, 'Papua New Guinean Kina', 'K', '2', ',', '.', 'PGK', 0, '0.00', '2019-11-24 19:53:52', '2019-11-24 19:53:52'),
(65, 'Jordanian Dinar', '', '2', ',', '.', 'JOD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(66, 'Myanmar Kyat', 'K', '2', ',', '.', 'MMK', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(67, 'Peruvian Sol', 'S/ ', '2', ',', '.', 'PEN', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(68, 'Botswana Pula', 'P', '2', ',', '.', 'BWP', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(69, 'Hungarian Forint', 'Ft', '0', '.', ',', 'HUF', 1, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(70, 'Ugandan Shilling', 'USh ', '2', ',', '.', 'UGX', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(71, 'Barbadian Dollar', '$', '2', ',', '.', 'BBD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(72, 'Brunei Dollar', 'B$', '2', ',', '.', 'BND', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(73, 'Georgian Lari', '', '2', ' ', ',', 'GEL', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(74, 'Qatari Riyal', 'QR', '2', ',', '.', 'QAR', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(75, 'Honduran Lempira', 'L', '2', ',', '.', 'HNL', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(76, 'Surinamese Dollar', 'SRD', '2', '.', ',', 'SRD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(77, 'Bahraini Dinar', 'BD ', '2', ',', '.', 'BHD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(78, 'Venezuelan Bolivars', 'Bs.', '2', '.', ',', 'VES', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(79, 'South Korean Won', 'W ', '2', '.', ',', 'KRW', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(80, 'Moroccan Dirham', 'MAD ', '2', ',', '.', 'MAD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(81, 'Jamaican Dollar', '$', '2', ',', '.', 'JMD', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(82, 'Angolan Kwanza', 'Kz', '2', '.', ',', 'AOA', 0, '0.00', '2019-11-24 19:53:53', '2019-11-24 19:53:53'),
(83, 'Haitian Gourde', 'G', '2', ',', '.', 'HTG', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(84, 'Zambian Kwacha', 'ZK', '2', ',', '.', 'ZMW', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(85, 'Nepalese Rupee', 'Rs. ', '2', ',', '.', 'NPR', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(86, 'CFP Franc', '', '2', ',', '.', 'XPF', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(87, 'Mauritian Rupee', 'Rs', '2', ',', '.', 'MUR', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(88, 'Cape Verdean Escudo', '', '2', '.', '$', 'CVE', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(89, 'Kuwaiti Dinar', 'KD', '2', ',', '.', 'KWD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(90, 'Algerian Dinar', 'DA', '2', ',', '.', 'DZD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(91, 'Macedonian Denar', 'ден', '2', ',', '.', 'MKD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(92, 'Fijian Dollar', 'FJ$', '2', ',', '.', 'FJD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(93, 'Bolivian Boliviano', 'Bs', '2', ',', '.', 'BOB', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(94, 'Albanian Lek', 'L ', '2', '.', ',', 'ALL', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(95, 'Serbian Dinar', 'din', '2', '.', ',', 'RSD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(96, 'Lebanese Pound', 'LL ', '2', ',', '.', 'LBP', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(97, 'Armenian Dram', '', '2', ',', '.', 'AMD', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(98, 'Azerbaijan Manat', '', '2', ',', '.', 'AZN', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(99, 'Bosnia and Herzegovina Convertible Mark', '', '2', ',', '.', 'BAM', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(100, 'Belarusian Ruble', '', '2', ',', '.', 'BYN', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54'),
(101, 'Gibraltar Pound', 'GIP', '2', ',', '.', '', 0, '0.00', '2019-11-24 19:53:54', '2019-11-24 19:53:54');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `customer_type` int(11) NOT NULL DEFAULT 1,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `default_payment_method` bigint(20) UNSIGNED NOT NULL DEFAULT 1,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `currency_id` int(11) NOT NULL DEFAULT 225,
  `paid_to_date` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `balance` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `settings` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `credit_balance` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `assigned_user` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `status`, `deleted_at`, `created_at`, `updated_at`, `job_title`, `phone`, `customer_type`, `company_id`, `default_payment_method`, `remember_token`, `password`, `currency_id`, `paid_to_date`, `balance`, `settings`, `credit_balance`, `assigned_user`, `user_id`) VALUES
(13183, 'Phoebe', 'Hampton', 'phoebe.hampton@yahoo.com', 1, '2019-12-05 22:07:44', '2019-10-12 14:14:05', '2019-12-05 22:07:44', NULL, '07851624051', 1, 482, 1, NULL, '', 2, '0.0000', '0.0000', '{\"invoice_number_counter\":3,\"counter_padding\":6,\"counter_pattern\":null}', '0.0000', NULL, NULL),
(19319, 'Michael', 'Hampton', 'michaelhamptondesign@yahoo.com', 1, NULL, '2019-12-05 21:58:47', '2019-12-05 22:02:31', 'test job', '01590 677428', 1, 1129, 1, NULL, '', 2, '0.0000', '0.0000', '{\"payment_terms\":30,\"counter_padding\":6,\"counter_pattern\":null}', '0.0000', NULL, 9874);

-- --------------------------------------------------------

--
-- Table structure for table `customer_type`
--

DROP TABLE IF EXISTS `customer_type`;
CREATE TABLE `customer_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer_type`
--

INSERT INTO `customer_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Won/Customer', NULL, NULL),
(2, 'Deal/Potential', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer_types`
--

DROP TABLE IF EXISTS `customer_types`;
CREATE TABLE `customer_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_types`
--

INSERT INTO `customer_types` (`id`, `name`) VALUES
(1, 'Customer'),
(2, 'Lead Customer');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_manager` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `_lft` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `_rgt` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `parent_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_manager`, `name`, `created_at`, `updated_at`, `_lft`, `_rgt`, `parent_id`) VALUES
(681, 9874, 'test department without parent', '2019-10-03 13:14:28', '2019-10-03 13:14:28', 1, 4, NULL),
(682, 9874, 'test with parent', '2019-10-03 13:19:59', '2019-10-03 13:26:52', 2, 3, 681),
(683, 9874, 'test number 2', '2019-10-03 13:20:19', '2019-10-03 13:23:16', 5, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department_user`
--

DROP TABLE IF EXISTS `department_user`;
CREATE TABLE `department_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `department_user`
--

INSERT INTO `department_user` (`id`, `department_id`, `user_id`, `created_at`, `updated_at`) VALUES
(24, 683, 9874, NULL, NULL),
(63, 682, 12703, NULL, NULL),
(68, 681, 12989, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `beginDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `customer_id` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_by` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `event_type` int(11) NOT NULL DEFAULT 1,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `beginDate`, `endDate`, `customer_id`, `location`, `created_by`, `title`, `created_at`, `updated_at`, `event_type`, `description`) VALUES
(525, '2019-10-29 00:00:00', '2019-10-30 00:00:00', 14886, 'test mike', 9874, 'test mike22', '2019-10-03 15:47:22', '2019-11-07 21:30:43', 2, 'test description'),
(820, '2019-11-01 00:00:00', '2019-11-02 00:00:00', 13184, 'test location', 9874, 'test new event', '2019-10-18 20:14:01', '2019-11-07 21:30:34', 1, NULL),
(851, '2019-10-28 13:00:00', '2019-10-30 20:00:00', 10949, 'datepciker', 9874, 'test datepicker', '2019-10-29 15:10:28', '2019-10-29 15:28:03', 1, NULL),
(884, '2019-11-20 00:00:00', '2019-11-30 00:00:00', 13184, 'test service 2', 9874, 'test service 2', '2019-11-05 20:31:13', '2019-11-05 20:31:13', 2, 'test service 2');

-- --------------------------------------------------------

--
-- Table structure for table `event_status`
--

DROP TABLE IF EXISTS `event_status`;
CREATE TABLE `event_status` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event_status`
--

INSERT INTO `event_status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Accepted', NULL, NULL),
(2, 'Declined', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_task`
--

DROP TABLE IF EXISTS `event_task`;
CREATE TABLE `event_task` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event_task`
--

INSERT INTO `event_task` (`id`, `task_id`, `event_id`, `created_at`, `updated_at`) VALUES
(1, 4105, 525, NULL, NULL),
(4, 1060, 243, NULL, NULL),
(5, 0, 251, NULL, NULL),
(6, 0, 252, NULL, NULL),
(7, 0, 253, NULL, NULL),
(8, 1496, 254, NULL, NULL),
(94, 0, 525, NULL, NULL),
(137, 4789, 820, NULL, NULL),
(142, 0, 851, NULL, NULL),
(146, 0, 873, NULL, NULL),
(147, 0, 874, NULL, NULL),
(148, 0, 875, NULL, NULL),
(150, 0, 883, NULL, NULL),
(151, 0, 884, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_types`
--

DROP TABLE IF EXISTS `event_types`;
CREATE TABLE `event_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event_types`
--

INSERT INTO `event_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Event', NULL, NULL),
(2, 'Call', NULL, NULL),
(3, 'Meeting', NULL, NULL),
(4, 'Task', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_user`
--

DROP TABLE IF EXISTS `event_user`;
CREATE TABLE `event_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `event_user`
--

INSERT INTO `event_user` (`id`, `user_id`, `event_id`, `created_at`, `updated_at`, `status`) VALUES
(13, 56, 2, NULL, NULL, 0),
(20, 56, 4, NULL, NULL, 0),
(22, 56, 90, NULL, NULL, 0),
(23, 56, 91, NULL, NULL, 0),
(24, 56, 92, NULL, NULL, 0),
(25, 56, 93, NULL, NULL, 0),
(26, 56, 94, NULL, NULL, 0),
(32, 56, 95, NULL, NULL, 0),
(41, 56, 240, NULL, NULL, 0),
(42, 356, 240, NULL, NULL, 0),
(46, 56, 243, NULL, NULL, 0),
(183, 9874, 851, NULL, NULL, 0),
(188, 9874, 874, NULL, NULL, 0),
(194, 9874, 884, NULL, NULL, 0),
(197, 9874, 820, NULL, NULL, 0),
(198, 9874, 525, NULL, NULL, 0),
(199, 12703, 525, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `file_path` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finance_type`
--

DROP TABLE IF EXISTS `finance_type`;
CREATE TABLE `finance_type` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `finance_type`
--

INSERT INTO `finance_type` (`id`, `name`) VALUES
(1, 'Invoice'),
(2, 'Quote'),
(3, 'Order');

-- --------------------------------------------------------

--
-- Table structure for table `form_category`
--

DROP TABLE IF EXISTS `form_category`;
CREATE TABLE `form_category` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `form_category`
--

INSERT INTO `form_category` (`id`, `category_id`, `form_id`) VALUES
(1, 1363, 1);

-- --------------------------------------------------------

--
-- Table structure for table `frequencies`
--

DROP TABLE IF EXISTS `frequencies`;
CREATE TABLE `frequencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date_interval` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `frequencies`
--

INSERT INTO `frequencies` (`id`, `name`, `date_interval`, `created_at`, `updated_at`) VALUES
(1, 'Weekly', '1 week', NULL, NULL),
(2, 'Two weeks', '2 weeks', NULL, NULL),
(3, 'Four weeks', '4 weeks', NULL, NULL),
(4, 'Monthly', '1 month', NULL, NULL),
(5, 'Two months', '2 months', NULL, NULL),
(6, 'Three months', '3 months', NULL, NULL),
(7, 'Four months', '4 months', NULL, NULL),
(8, 'Six months', '6 months', NULL, NULL),
(9, 'Annually', '1 year', NULL, NULL),
(10, 'Two years', '2 years', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `industries`
--

DROP TABLE IF EXISTS `industries`;
CREATE TABLE `industries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `industries`
--

INSERT INTO `industries` (`id`, `name`) VALUES
(1, 'Accounting & Legal'),
(2, 'Advertising'),
(3, 'Aerospace'),
(4, 'Agriculture'),
(5, 'Automotive'),
(6, 'Banking & Finance'),
(7, 'Biotechnology'),
(8, 'Broadcasting'),
(9, 'Business Services'),
(10, 'Commodities & Chemicals'),
(11, 'Communications'),
(12, 'Computers & Hightech'),
(13, 'Defense'),
(14, 'Energy'),
(15, 'Entertainment'),
(16, 'Government'),
(17, 'Healthcare & Life Sciences'),
(18, 'Insurance'),
(19, 'Manufacturing'),
(20, 'Marketing'),
(21, 'Media'),
(22, 'Nonprofit & Higher Ed'),
(23, 'Pharmaceuticals'),
(24, 'Professional Services & Consulting'),
(25, 'Real Estate'),
(26, 'Retail & Wholesale'),
(27, 'Sports'),
(28, 'Transportation'),
(29, 'Travel & Luxury'),
(30, 'Other'),
(31, 'Photography'),
(32, 'Construction'),
(33, 'Restaurant & Catering');

-- --------------------------------------------------------

--
-- Table structure for table `invitations`
--

DROP TABLE IF EXISTS `invitations`;
CREATE TABLE `invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `invoice_id` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `sent_date` timestamp NULL DEFAULT NULL,
  `invitation_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `invitations`
--

INSERT INTO `invitations` (`id`, `customer_id`, `created_at`, `updated_at`, `invoice_id`, `deleted_at`, `message_id`, `sent_date`, `invitation_key`) VALUES
(44, 13184, '2019-11-30 19:46:50', '2019-11-30 19:46:50', 2, NULL, NULL, NULL, 'iUtHzqUoYwhC'),
(45, 13184, '2019-11-30 19:49:33', '2019-11-30 19:49:33', 3, NULL, NULL, NULL, 'JtK8o11qkupU'),
(46, 13184, '2019-12-02 09:30:59', '2019-12-02 09:30:59', 4, NULL, NULL, NULL, 'uetuIjYpYYtf'),
(47, 13184, '2019-12-02 09:31:58', '2019-12-02 09:31:58', 5, NULL, NULL, NULL, '2JWQWhPNhFYC'),
(48, 13184, '2019-12-02 09:33:16', '2019-12-02 09:33:16', 6, NULL, NULL, NULL, 'Cu8b4bGEOKA2'),
(49, 13184, '2019-12-02 09:36:51', '2019-12-02 09:36:51', 7, NULL, NULL, NULL, 'AW7rvnnKvZ9p'),
(50, 13184, '2019-12-02 09:37:13', '2019-12-02 09:37:13', 8, NULL, NULL, NULL, 't2M6OllObQOi'),
(51, 13184, '2019-12-02 09:38:43', '2019-12-02 09:38:43', 9, NULL, NULL, NULL, 'fbDAt864AdYk'),
(52, 13184, '2019-12-02 09:39:19', '2019-12-02 09:39:19', 10, NULL, NULL, NULL, '4X2J8jdAhQZN'),
(53, 13184, '2019-12-02 09:39:44', '2019-12-02 09:39:44', 11, NULL, NULL, NULL, 'YY0YkkdphOos'),
(54, 13184, '2019-12-02 09:41:08', '2019-12-02 09:41:08', 12, NULL, NULL, NULL, '9cVVdbOGo1rS'),
(55, 13184, '2019-12-02 09:41:57', '2019-12-02 09:41:57', 13, NULL, NULL, NULL, 'CTuu5VFAORhn'),
(56, 13184, '2019-12-02 09:42:19', '2019-12-02 09:42:19', 14, NULL, NULL, NULL, 'JmiPI3kul4DL'),
(57, 13184, '2019-12-02 09:48:02', '2019-12-02 09:48:02', 15, NULL, NULL, NULL, '0AFagnAOwlhj'),
(58, 13184, '2019-12-02 09:49:13', '2019-12-02 09:49:13', 16, NULL, NULL, NULL, 'MXd4IyjBlj57'),
(59, 13184, '2019-12-02 09:50:07', '2019-12-02 09:50:07', 17, NULL, NULL, NULL, 'AEvDmnyCCCs3'),
(60, 13184, '2019-12-02 09:50:29', '2019-12-02 09:50:29', 18, NULL, NULL, NULL, 'yYOAaWernxkA'),
(61, 13184, '2019-12-02 09:52:44', '2019-12-02 09:52:44', 19, NULL, NULL, NULL, 'N9IbEHFI4PX4'),
(62, 13184, '2019-12-02 09:53:09', '2019-12-02 09:53:09', 20, NULL, NULL, NULL, 'HOBqQL4TGsx9'),
(63, 13184, '2019-12-02 09:53:40', '2019-12-02 09:53:40', 21, NULL, NULL, NULL, 'O8otkzC3Obwl'),
(64, 13184, '2019-12-02 09:54:06', '2019-12-02 09:54:06', 22, NULL, NULL, NULL, 'hMMTpXM7FnPI'),
(65, 13184, '2019-12-02 09:54:24', '2019-12-02 09:54:24', 23, NULL, NULL, NULL, 'W6ZHDgsphAF5'),
(66, 13184, '2019-12-02 09:54:42', '2019-12-02 09:54:42', 24, NULL, NULL, NULL, 'LytjeNXn43L4'),
(67, 13184, '2019-12-02 09:55:31', '2019-12-02 09:55:31', 25, NULL, NULL, NULL, 'GMhafgDf5CXJ'),
(68, 13184, '2019-12-02 09:55:48', '2019-12-02 09:55:48', 26, NULL, NULL, NULL, '6lyb7pir0Pf8'),
(69, 13184, '2019-12-02 09:56:06', '2019-12-02 09:56:06', 27, NULL, NULL, NULL, 'KQh8FxiuzYM9'),
(70, 13184, '2019-12-02 09:56:18', '2019-12-02 09:56:18', 28, NULL, NULL, NULL, 'fwBEmiSH3LzC'),
(71, 13184, '2019-12-02 09:56:28', '2019-12-02 09:56:28', 29, NULL, NULL, NULL, '5RoHzBLqSkMb'),
(72, 13184, '2019-12-02 09:56:52', '2019-12-02 09:56:52', 30, NULL, NULL, NULL, '3o6wWlJYvOau'),
(73, 13184, '2019-12-02 09:57:12', '2019-12-02 09:57:12', 31, NULL, NULL, NULL, 'A0FwFqGvWGVw'),
(74, 13184, '2019-12-02 09:57:25', '2019-12-02 09:57:25', 32, NULL, NULL, NULL, '0v4a5OBu1vgL'),
(75, 13184, '2019-12-02 09:57:51', '2019-12-02 09:57:51', 33, NULL, NULL, NULL, '8b1EfwaALNJI'),
(76, 13184, '2019-12-02 09:58:13', '2019-12-02 09:58:13', 34, NULL, NULL, NULL, 'DfxZwxu71XI9'),
(77, 13184, '2019-12-02 09:58:42', '2019-12-02 09:58:42', 35, NULL, NULL, NULL, 'VXEzNX474Bdk'),
(78, 13184, '2019-12-02 09:59:29', '2019-12-02 09:59:29', 36, NULL, NULL, NULL, 'aZPdfjfETj9t'),
(79, 13184, '2019-12-02 10:02:13', '2019-12-02 10:02:13', 37, NULL, NULL, NULL, '8Pu1fCZOUe8B'),
(80, 13184, '2019-12-02 10:02:50', '2019-12-02 10:02:50', 38, NULL, NULL, NULL, 'nYVC7hrTOfiF'),
(81, 13184, '2019-12-02 10:03:28', '2019-12-02 10:03:28', 39, NULL, NULL, NULL, '7Cu4Fm9tWrOo'),
(82, 13184, '2019-12-02 10:27:52', '2019-12-02 10:27:52', 40, NULL, NULL, NULL, 'QjXPsG2kIZVC'),
(83, 13184, '2019-12-02 16:49:12', '2019-12-02 16:49:12', 157, NULL, NULL, NULL, 'WEX3ROhFyxdx'),
(84, 13184, '2019-12-03 21:33:35', '2019-12-03 21:33:35', 158, NULL, NULL, NULL, 'uDeF2XnYsl2W'),
(85, 13184, '2019-12-03 21:34:24', '2019-12-03 21:34:24', 159, NULL, NULL, NULL, 'B8KeWXpXPTrM'),
(86, 13184, '2019-12-03 21:34:42', '2019-12-03 21:34:42', 160, NULL, NULL, NULL, 'nIQ8GPucn0zR'),
(87, 13184, '2019-12-03 21:35:17', '2019-12-03 21:35:17', 161, NULL, NULL, NULL, 'JcXCFr6rsJTa'),
(88, 13183, '2019-12-05 20:27:53', '2019-12-05 20:27:53', 162, NULL, NULL, NULL, 'zulv3mxhsIUd'),
(89, 13183, '2019-12-05 20:42:01', '2019-12-05 20:42:01', 163, NULL, NULL, NULL, 'twDKBw9ndAWN');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
CREATE TABLE `invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `recurring_id` int(10) UNSIGNED DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_amount_discount` tinyint(1) NOT NULL DEFAULT 0,
  `is_recurring` int(11) DEFAULT NULL,
  `po_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `recurring_due_date` date DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `line_items` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `backup` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `footer` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `terms` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `total` decimal(16,4) NOT NULL,
  `sub_total` decimal(16,4) NOT NULL,
  `tax_total` decimal(16,4) NOT NULL,
  `discount_total` decimal(16,4) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `frequency` int(11) DEFAULT NULL,
  `balance` decimal(16,4) NOT NULL,
  `partial` decimal(16,4) DEFAULT NULL,
  `partial_due_date` datetime DEFAULT NULL,
  `last_viewed` datetime DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `customer_id`, `user_id`, `assigned_user_id`, `status`, `recurring_id`, `number`, `is_amount_discount`, `is_recurring`, `po_number`, `date`, `due_date`, `start_date`, `end_date`, `recurring_due_date`, `is_deleted`, `line_items`, `backup`, `footer`, `notes`, `terms`, `total`, `sub_total`, `tax_total`, `discount_total`, `parent_id`, `frequency`, `balance`, `partial`, `partial_due_date`, `last_viewed`, `created_at`, `updated_at`, `deleted_at`) VALUES
(163, 13183, 9874, NULL, 1, NULL, '000002', 0, NULL, NULL, '2019-12-05', '2019-12-05 00:00:00', NULL, NULL, NULL, 0, '[{\"unit_discount\":\"5\",\"unit_tax\":\"17.50\",\"quantity\":\"2\",\"unit_price\":\"800.00\",\"product_id\":\"1316\",\"sub_total\":1786,\"tax_total\":266,\"is_amount_discount\":false}]', NULL, NULL, NULL, NULL, '1786.0000', '1600.0000', '266.0000', '80.0000', NULL, NULL, '1786.0000', '0.0000', NULL, NULL, '2019-12-05 20:42:01.000000', '2019-12-05 20:42:03.000000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices_backup`
--

DROP TABLE IF EXISTS `invoices_backup`;
CREATE TABLE `invoices_backup` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(11) NOT NULL,
  `payment_type` int(11) NOT NULL,
  `total` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `due_date` datetime NOT NULL,
  `finance_type` int(11) NOT NULL,
  `sub_total` decimal(8,2) NOT NULL,
  `tax_total` decimal(8,2) NOT NULL,
  `discount_total` decimal(8,2) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_recurring` int(11) NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `recurring_due_date` date NOT NULL,
  `frequency` int(11) NOT NULL,
  `notes` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `partial` decimal(8,2) NOT NULL,
  `balance` decimal(8,2) NOT NULL,
  `partial_due_date` date DEFAULT NULL,
  `terms` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `footer` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Pending', NULL, NULL),
(2, 'Sent', NULL, NULL),
(3, 'Paid', NULL, NULL),
(4, 'Approved', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_task`
--

DROP TABLE IF EXISTS `invoice_task`;
CREATE TABLE `invoice_task` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
CREATE TABLE `languages` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `locale`) VALUES
(1, 'English', 'en'),
(2, 'Italian', 'it'),
(3, 'German', 'de'),
(4, 'French', 'fr'),
(5, 'Portuguese - Brazilian', 'pt_BR'),
(6, 'Dutch', 'nl'),
(7, 'Spanish', 'es'),
(8, 'Norwegian', 'nb_NO'),
(9, 'Danish', 'da'),
(10, 'Japanese', 'ja'),
(11, 'Swedish', 'sv'),
(12, 'Spanish - Spain', 'es_ES'),
(13, 'French - Canada', 'fr_CA'),
(14, 'Lithuanian', 'lt'),
(15, 'Polish', 'pl'),
(16, 'Czech', 'cs'),
(17, 'Croatian', 'hr'),
(18, 'Albanian', 'sq'),
(19, 'Greek', 'el'),
(20, 'English - United Kingdom', 'en_GB'),
(21, 'Portuguese - Portugal', 'pt_PT'),
(22, 'Slovenian', 'sl'),
(23, 'Finnish', 'fi'),
(24, 'Romanian', 'ro'),
(25, 'Turkish - Turkey', 'tr_TR'),
(26, 'Thai', 'th'),
(27, 'Macedonian', 'mk_MK'),
(28, 'Chinese - Taiwan', 'zh_TW');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `has_seen` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `direction` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `customer_id`, `message`, `has_seen`, `created_at`, `updated_at`, `direction`) VALUES
(274, 9874, 13183, 'test first message', 1, '2019-10-26 14:52:23', '2019-10-26 14:52:23', 1),
(275, 9874, 13183, 'test lexie', 1, '2019-10-26 19:31:25', '2019-10-26 19:31:25', 1),
(276, 9874, 13183, 'test lexie 2', 1, '2019-10-26 19:32:23', '2019-10-26 19:32:23', 1),
(277, 9874, 13183, 'test lexie 34', 1, '2019-10-26 19:33:18', '2019-10-26 19:33:18', 1),
(278, 9874, 13183, 'test lexie 4', 1, '2019-10-26 19:34:38', '2019-10-26 19:34:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2019_09_09_124810_add_status_to_tasks', 1),
(48, '2014_10_12_000000_create_users_table', 2),
(49, '2014_10_12_100000_create_password_resets_table', 2),
(50, '2019_09_06_173332_create_tasks_table', 2),
(51, '2019_09_06_173500_create_projects_table', 2),
(52, '2019_09_09_135317_create_task_statuses_table', 2),
(53, '2019_09_11_114217_create_files_table', 2),
(54, '2019_09_11_114302_create_comments_table', 2),
(55, '2019_09_13_104249_add_active_column_to_statuses', 2),
(56, '2019_09_13_110330_add_email_column_to_users_table', 2),
(57, '2019_09_13_110625_add_active_column_to_tasks_table', 2),
(58, '2019_09_13_110834_add_active_column_to_files_table', 2),
(59, '2019_09_13_110951_add_active_column_to_comments_table', 2),
(60, '2019_09_13_111215_add_password_column_to_users_table', 2),
(61, '2019_09_13_111327_add_active_column_to_users_table', 2),
(62, '2019_09_13_113618_add_status_column_to_tasks_table', 3),
(63, '2019_09_13_113843_add_creator_column_to_tasks_table', 4),
(64, '2019_09_13_121317_create_customers_table', 5),
(65, '2019_09_13_121636_create_country_table', 6),
(66, '2019_09_13_121636_create_countries_table', 7),
(67, '2019_09_13_121319_create_customers_table', 8),
(68, '2019_09_13_121638_create_countries_table', 8),
(69, '2019_09_13_121448_create_addresses_table', 9),
(70, '2019_09_13_121550_create_provinces_table', 10),
(71, '2019_09_13_121859_add_phone_number_in_address_table', 10),
(72, '2019_09_13_121958_create_states_table', 10),
(73, '2019_09_13_121802_create_cities_table', 11),
(74, '2019_09_14_081151_add_customer_colummn_to_projects', 12),
(75, '2019_09_14_082451_add_role_colummn_to_users', 12),
(76, '2019_09_14_082515_create_role_table', 12),
(77, '2019_09_14_114708_add_task_type_to_tasks', 13),
(78, '2019_09_14_115316_create_leads_table', 14),
(79, '2019_09_14_120450_drop_project_id_from_tasks', 15),
(80, '2019_09_14_132201_add_type_to_status', 16),
(81, '2019_09_14_154528_create_invoice_table', 17),
(82, '2019_09_14_154529_create_invoice_table', 18),
(83, '2019_09_14_160400_create_invoice_lines_table', 19),
(84, '2019_09_15_090932_add_status_to_invoices', 20),
(85, '2019_09_15_091052_add_due_date_to_invoices', 21),
(86, '2019_09_15_091143_create_status_table', 22),
(87, '2019_09_15_202604_add_status_to_invoice_line', 23),
(88, '2019_09_17_100845_create_events_table', 24),
(89, '2019_09_17_101056_create_user_event_table', 25),
(90, '2019_09_18_133333_add_rating_column_to_tasks', 26),
(91, '2019_09_18_133614_add_customer_column_to_tasks', 26),
(97, '2019_09_19_130718_laratrust_setup_tables', 27),
(98, '2019_09_21_170244_create_messages_table', 27),
(99, '2019_09_21_173043_add_foreign_keys_to_messages', 27),
(100, '2019_09_22_100457_add_foreign_keys_to_tasks', 28),
(101, '2019_09_22_102146_add_direction_column_to_messages', 29),
(102, '2019_09_22_114639_rating_column_nullable_tasks_table', 30),
(103, '2019_09_23_101550_drop_roles_from_users', 31),
(105, '2019_09_23_124946_soft_deletes_addresses', 32),
(106, '2019_09_23_125443_add_columns_to_customers', 33),
(107, '2019_09_23_135535_create_products_table', 34),
(108, '2019_09_24_094245_create_product_task_table', 35),
(109, '2019_09_24_102147_add_valued_at_column_to_tasks', 36),
(112, '2019_09_24_164216_make_valued_nullable', 37),
(113, '2019_09_25_122414_add_parent_id_to_tasks', 38),
(114, '2019_09_25_122947_change_parent_id_default', 39),
(115, '2019_09_26_164641_create_invoice_task_table', 40),
(121, '2019_09_27_103014_create_source_type_table', 41),
(122, '2019_09_27_104121_add_source_type_to_tasks', 42),
(123, '2019_09_27_192933_create_notifications_table', 43),
(124, '2019_09_28_125602_add_parent_id_to_comments', 44),
(128, '2019_09_30_113006_add_fields_to_users', 45),
(129, '2019_10_01_085430_add_columns_to_task_table', 45),
(130, '2019_10_01_085849_add_columns_to_files_table', 46),
(131, '2019_10_01_090152_add_color_to_status_table', 47),
(132, '2019_10_01_112358_create_task_user_table', 48),
(134, '2019_10_01_195505_create_departments_table', 49),
(135, '2019_10_02_105152_add_created_by_column_to_events', 50),
(136, '2019_10_02_120155_create_category_product_table', 51),
(137, '2019_10_02_120241_create_categories_table', 51),
(138, '2019_10_02_120558_create_brands_table', 52),
(139, '2019_10_02_120635_add_company_id_in_products_table', 52),
(140, '2019_10_02_132145_create_department_user', 53),
(141, '2019_10_04_120241_create_categories_table', 54),
(142, '2019_10_04_195505_create_departments_table', 55),
(143, '2019_10_03_114430_add_fields_to_brand', 56),
(144, '2019_10_03_161035_create_payment_methods_table', 57),
(145, '2019_10_06_093900_create_product_attributes_table', 58),
(148, '2019_10_12_171337_change_attribute_columns', 59),
(149, '2019_10_12_173227_drop_full_price_column', 60),
(150, '2019_10_13_133145_add_columns_to_product_task', 61),
(151, '2019_10_17_194500_create_task_type_table', 62),
(152, '2019_10_17_200336_delete_permission_column', 63),
(153, '2019_10_18_180600_add_token_column_to_users', 64),
(154, '2019_12_15_090932_remove_task_from_comments', 65),
(155, '2019_12_18_180600_create_task_comment_table', 65),
(156, '2019_10_20_185747_add_has_task_column', 66),
(157, '2019_10_20_191432_rename_comment_task_table', 67),
(158, '2019_10_21_201934_add_customer_type_column', 68),
(159, '2019_10_21_202616_create_customer_type_table', 69),
(160, '2019_10_21_205209_add_company_id', 70),
(161, '2019_10_30_200940_create_event_type_table', 71),
(162, '2019_10_30_201204_add_event_type_column_to_events', 72),
(163, '2019_10_30_201318_drop_has_task_column_from_comments', 73),
(164, '2019_10_30_202735_rename_event_type_table', 74),
(165, '2019_10_30_202925_add_description_column_to_events', 75),
(166, '2019_11_02_113132_create_comment_type_table', 76),
(167, '2019_11_02_121210_add_status_column', 77),
(168, '2019_11_02_121342_create_event_status_table', 78),
(169, '2019_11_05_212721_create_product_images_table', 79),
(170, '2019_11_07_213711_add_column_password_resets', 80),
(171, '2019_11_08_214749_add_finance_type_to_invoices', 81),
(172, '2019_11_08_214921_drop_description_invoice_lines', 82),
(173, '2019_11_08_215022_add_columns_invoice_lines', 83),
(174, '2019_11_09_092415_finance_type_table', 84),
(175, '2019_11_09_095701_add_columns_invoices_table', 85),
(176, '2019_11_09_122046_add_cover_to_products', 86),
(177, '2019_11_10_152656_add_quote_id_to_invoices', 87),
(178, '2019_11_10_153252_add_deleted_column_to_invoices', 88),
(179, '2019_11_10_155831_create_tax_rates_table', 89),
(180, '2019_11_10_170938_create_invitations_table', 90),
(181, '2019_11_10_171110_add_invoice_id_to_invitations', 91),
(182, '2019_11_10_171157_add_delete_column_to_invitations', 92),
(183, '2019_11_10_171720_add_columns_to_invitations', 93),
(184, '2019_11_10_172030_add_credits_to_customer', 94),
(185, '2019_11_10_174333_create_payments_table', 95),
(186, '2019_11_10_181100_add_invitation_key_to_invitations', 96),
(187, '2019_11_12_224731_add_columns_to_invoice', 97),
(188, '2019_11_12_231040_add_columns_to_invoice', 98),
(189, '2019_11_12_231950_add_columns_to_invoice', 99),
(190, '2019_11_15_205613_credit_table', 100),
(191, '2019_11_16_115023_add_default_payment_type_to_customers', 101),
(192, '2019_11_16_154206_remove_credits_column', 102),
(193, '2019_11_19_195035_add_columns_to_invoices', 103),
(194, '2019_11_19_195135_address_type', 104),
(195, '2019_11_19_195403_nullable_invoice_fields', 105),
(196, '2019_11_22_202345_password_field_customers', 106),
(197, '2019_11_23_141651_add_country_to_brands', 107),
(198, '2019_11_24_194922_create_currencies_table', 108),
(199, '2019_11_24_200708_add_currency_id', 109),
(200, '2019_11_24_202001_add_currency_id', 110),
(201, '2019_11_26_194734_create_payment_statuses_table', 111),
(202, '2019_11_26_194924_create_frequencies_table', 112),
(203, '2019_11_26_195247_add_payment_status_to_payments_table', 113),
(204, '2019_11_26_200813_add_refunded_column_to_payments', 114),
(205, '2019_11_26_204249_add_timelog_column_to_tasks', 115),
(206, '2019_11_26_204549_change_is_running_column', 116),
(207, '2019_11_26_220037_create_brand_user_table', 117),
(208, '2019_11_26_222133_add_company_user_fields', 118),
(209, '2019_11_28_200047_add_invoice_logo_to_brands', 119),
(210, '2019_11_28_212637_add_paid_to_date_customers', 120),
(211, '2019_11_29_224425_create_languages_table', 121),
(212, '2019_11_30_185448_create_quotes_table', 122),
(213, '2019_11_30_193343_create_invoices_table_2', 123),
(214, '2019_11_30_193450_create_invoices_table', 124),
(215, '2019_11_30_195704_add_balance_to_customers', 125),
(216, '2019_11_30_200645_add_industry_id_to_brands', 126),
(217, '2019_12_02_094016_add_settings_to_customers', 127),
(218, '2019_12_02_094245_create_recurring_invoices_table', 128),
(219, '2019_12_02_095156_add_due_date_recurring_invoices', 129),
(220, '2019_12_02_100450_drop_invoice_from_payments', 130),
(221, '2019_12_02_164238_create_recurring_quotes_table', 131),
(222, '2019_12_02_164439_add_partial_date_recurring_quotes', 132),
(223, '2019_12_02_170156_add_credit_balance_customers', 133),
(224, '2019_12_03_205215_assigned_users_to_customers', 134),
(225, '2019_12_03_213800_add_quantity_to_products', 135);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `notifiable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('0519d0c3-41ce-468c-bea2-f09854040ecf', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":201,\"message\":\"A new comment was added\",\"comment\":\"test number 4\"}', NULL, '2019-09-28 12:30:26', '2019-09-28 12:30:26'),
('0661609b-d1c2-4386-90ef-a033fd488ef8', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1500,\"title\":\"test subtask\",\"message\":\"New Task created\"}', NULL, '2019-10-01 13:50:10', '2019-10-01 13:50:10'),
('06bfa9a3-4cfc-484d-94b8-f0af7dbe958b', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":475,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 18:04:29', '2019-10-20 18:04:29'),
('0b4d33f2-6453-4de1-85cf-3832ea38db31', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":474,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 18:03:56', '2019-10-20 18:03:56'),
('0d3545d5-9c6f-49af-94a3-35519dce6228', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":528,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-11-02 13:51:24', '2019-11-02 13:51:24'),
('0e18ba6c-7116-46b4-95c8-ba3dbb010b52', 'App\\Notifications\\PasswordResetRequest', 'App\\User', 9874, '[]', NULL, '2019-11-07 21:39:10', '2019-11-07 21:39:10'),
('140b37fe-feea-400b-9bfc-74d860e40f9a', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":195,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-09-27 19:17:27', '2019-09-27 19:17:27'),
('19a62a95-1c02-4965-80f2-ce57c5456475', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3333,\"message\":\"A new invoice was created\"}', NULL, '2019-11-18 16:42:56', '2019-11-18 16:42:56'),
('1b4ba2cb-e5b7-4849-ad3b-867ce419809f', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":851,\"title\":\"test datepicker\",\"beginDate\":\"2019-10-29 14:00:00\",\"endDate\":\"2019-10-31 18:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-29 15:10:28', '2019-10-29 15:10:28'),
('1b5a778e-6b16-4b6a-a27e-9613a65c8009', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2871,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 22:00:47', '2019-11-08 22:00:47'),
('1cf8097c-cbf7-4b5b-a89e-86bb17fe3ee7', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5209,\"title\":\"test email\",\"message\":\"New Task created\"}', NULL, '2019-10-20 17:19:33', '2019-10-20 17:19:33'),
('1d099221-9b02-4e6b-a340-143428139fe8', 'App\\Notifications\\AttachmentCreated', 'App\\User', 9874, '{\"id\":349,\"message\":\"A new file has been uploaded\",\"filename\":\"download.png\"}', NULL, '2019-10-18 21:35:09', '2019-10-18 21:35:09'),
('1d246d01-a80d-46b0-9b5c-10f77c276ad8', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":461,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 17:49:42', '2019-10-20 17:49:42'),
('2143d393-79f1-40f3-ac96-c5b7e1d5dc56', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6401,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:10:13', '2019-11-26 21:10:13'),
('214c7cb8-11b9-440c-9c6a-d83d14aca01f', 'App\\Notifications\\AttachmentCreated', 'App\\User', 9874, '{\"id\":164,\"message\":\"A new file has been uploaded\",\"filename\":\"lexie homework.png\"}', NULL, '2019-09-27 19:17:58', '2019-09-27 19:17:58'),
('242735a3-2959-4a97-8592-e7fd4de96343', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5210,\"title\":\"test email\",\"message\":\"New Task created\"}', NULL, '2019-10-20 17:21:20', '2019-10-20 17:21:20'),
('267f60ec-4bdf-46e2-9fa9-8b1c0b2bf842', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":757,\"message\":\"A new invoice was created\"}', NULL, '2019-09-27 19:18:47', '2019-09-27 19:18:47'),
('2a982755-584f-4282-af6b-b68b09b799b5', 'App\\Notifications\\PasswordResetRequest', 'App\\User', 9874, '[]', NULL, '2019-11-07 21:41:06', '2019-11-07 21:41:06'),
('2afd6a04-d698-440f-a5ee-bb55db0382e3', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6403,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:10:43', '2019-11-26 21:10:43'),
('2ce5b4b1-4cc2-4f14-a5f1-b51f74f2e320', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6400,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:09:34', '2019-11-26 21:09:34'),
('2d4e0f09-2347-4ac4-8867-a97f6ed2cbeb', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2154,\"message\":\"A new invoice was created\"}', NULL, '2019-10-03 14:54:11', '2019-10-03 14:54:11'),
('2e5f3903-b951-466a-bad6-f7e1606da16a', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6392,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:52:47', '2019-11-26 20:52:47'),
('2e943e7a-e558-457b-8522-ba0e358457a5', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":476,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 18:06:14', '2019-10-20 18:06:14'),
('2f88dff2-9ae0-4fc5-a619-44f3e0050f6d', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3048,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 14:15:47', '2019-11-09 14:15:47'),
('30711e99-f177-4387-805d-933e1ec9c94b', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5242,\"title\":\"test comment\",\"message\":\"New Task created\"}', NULL, '2019-10-20 17:49:26', '2019-10-20 17:49:26'),
('31cb89b1-3d78-4b03-a744-4227b1768c01', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":202,\"message\":\"A new comment was added\",\"comment\":\"test refresh\"}', NULL, '2019-09-28 12:35:22', '2019-09-28 12:35:22'),
('353ef0ed-2264-42f5-81ab-d28404fbfc2d', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":203,\"message\":\"A new comment was added\",\"comment\":\"test delete message\"}', NULL, '2019-09-28 12:35:48', '2019-09-28 12:35:48'),
('36c3eb97-bc20-49a2-8ed3-51a1eb106e9f', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6397,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:08:19', '2019-11-26 21:08:19'),
('3b7b02f5-a315-4761-9c6a-4d0e198e7f52', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6390,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:52:04', '2019-11-26 20:52:04'),
('45e86230-51fd-44cb-a281-1aab8a46c63f', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":526,\"message\":\"A new comment was added\",\"comment\":\"test commen\"}', NULL, '2019-11-02 13:46:59', '2019-11-02 13:46:59'),
('4c2876ed-a2e2-41b7-8495-e9eba10c1a73', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2902,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:01:45', '2019-11-09 10:01:45'),
('4caef97e-1698-4611-9fcb-02610ab800c5', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2864,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:56:41', '2019-11-08 21:56:41'),
('4dafe900-2fb9-425f-bbab-3eabc334d247', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5484,\"title\":\"test service\",\"message\":\"New Task created\"}', NULL, '2019-11-05 19:37:39', '2019-11-05 19:37:39'),
('5489a0d4-b3cb-4676-987a-15ac446dfa13', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6396,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:08:04', '2019-11-26 21:08:04'),
('576cd4fc-9881-46c3-9cd9-bf92813fa06f', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1496,\"title\":\"test notification\",\"message\":\"New Task created\"}', NULL, '2019-09-27 19:16:39', '2019-09-27 19:16:39'),
('589b6988-7a71-4cac-a32d-fbd56fb338c4', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":525,\"title\":\"test mike\",\"beginDate\":\"2019-10-11 00:00:00\",\"endDate\":\"2019-10-15 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-03 14:47:23', '2019-10-03 14:47:23'),
('5a173a7f-511b-4264-bc62-0942275543ad', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3050,\"message\":\"A new invoice was created\"}', NULL, '2019-11-10 14:32:35', '2019-11-10 14:32:35'),
('5b96a8d4-a3a8-4b72-8a04-57939927f5d3', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3152,\"message\":\"A new invoice was created\"}', NULL, '2019-11-12 23:00:53', '2019-11-12 23:00:53'),
('5bd5fd22-a8ca-424b-a8f7-f64182d07a64', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":883,\"title\":\"test service\",\"beginDate\":\"2019-11-28 00:00:00\",\"endDate\":\"2019-12-06 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-11-05 20:25:19', '2019-11-05 20:25:19'),
('5ed013cf-e61d-4cd5-aef9-6b4e24a64ef8', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3340,\"message\":\"A new invoice was created\"}', NULL, '2019-11-19 20:05:28', '2019-11-19 20:05:28'),
('64cbb459-6973-4b5b-9b38-5985b5b5dd9d', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6398,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:08:40', '2019-11-26 21:08:40'),
('692d9275-e869-439e-98b6-7be0e26d2b60', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2867,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:58:31', '2019-11-08 21:58:31'),
('6d512590-62e0-414b-848b-44f3e6b57e69', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":523,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-10-30 20:50:01', '2019-10-30 20:50:01'),
('727a1e81-0013-4300-b5c3-1f41605a9791', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":197,\"message\":\"A new comment was added\",\"comment\":\"test reply\"}', NULL, '2019-09-28 12:01:45', '2019-09-28 12:01:45'),
('739b14a7-1a36-4df6-b160-3db3a079af19', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5485,\"title\":\"test subtask\",\"message\":\"New Task created\"}', NULL, '2019-11-05 20:03:06', '2019-11-05 20:03:06'),
('76406df6-2066-453b-ad91-299d9ee16a82', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":525,\"message\":\"A new comment was added\",\"comment\":\"test new message layout\"}', NULL, '2019-11-02 13:31:21', '2019-11-02 13:31:21'),
('764ff372-86ac-42da-9103-c4711e999173', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":200,\"message\":\"A new comment was added\",\"comment\":\"test number 3\"}', NULL, '2019-09-28 12:29:56', '2019-09-28 12:29:56'),
('77845615-f39d-4cfb-b9ce-8334bb8f433f', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":873,\"title\":\"test event type\",\"beginDate\":\"2019-10-30 16:00:00\",\"endDate\":\"2019-11-02 18:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-30 20:34:20', '2019-10-30 20:34:20'),
('77b187e5-448a-4caa-9934-91a9087e1af2', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1499,\"title\":\"test contributors\",\"message\":\"New Task created\"}', NULL, '2019-10-01 10:59:19', '2019-10-01 10:59:19'),
('7b55af06-e280-4565-b518-59c85e82ea7a', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":483,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-10-20 18:16:41', '2019-10-20 18:16:41'),
('7e04637a-a858-49ae-bb30-c9b05d0f8f42', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":874,\"title\":\"test event type\",\"beginDate\":\"2019-10-30 16:00:00\",\"endDate\":\"2019-11-02 18:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-30 20:37:28', '2019-10-30 20:37:28'),
('7f9298f2-0db5-43d0-998f-a906dd09182a', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5241,\"title\":\"test email\",\"message\":\"New Task created\"}', NULL, '2019-10-20 17:47:20', '2019-10-20 17:47:20'),
('81763d42-deaa-4c22-8981-df0f3b2253fc', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2905,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:10:18', '2019-11-09 10:10:18'),
('84f75fd8-85c4-4deb-86c5-779dfdd6347c', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2906,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:11:36', '2019-11-09 10:11:36'),
('8713367a-1800-41a7-9088-8999739ea78b', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2904,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:07:25', '2019-11-09 10:07:25'),
('8cf600fe-6a1c-4980-916d-5447583559a0', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":254,\"title\":\"test delete\",\"beginDate\":\"2019-09-29 00:00:00\",\"endDate\":\"2019-09-29 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-09-28 14:07:47', '2019-09-28 14:07:47'),
('8e9f0adc-1d44-4691-96b4-bb4dce9dd875', 'App\\Notifications\\PasswordResetSuccess', 'App\\User', 9874, '[]', NULL, '2019-11-07 21:51:34', '2019-11-07 21:51:34'),
('918419d1-9fd5-4f37-81d5-d552d75c999e', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5207,\"title\":\"test mike\",\"message\":\"New Task created\"}', NULL, '2019-10-18 21:34:52', '2019-10-18 21:34:52'),
('932eb386-0e2b-48ae-acd2-35152850af68', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":463,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 17:52:46', '2019-10-20 17:52:46'),
('96a6fc5d-9513-4511-b91a-e8941776ed0a', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":527,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-11-02 13:50:05', '2019-11-02 13:50:05'),
('9c4ed53b-4fb7-4eda-9e18-b4bd39aa75b6', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":529,\"message\":\"A new comment was added\",\"comment\":\"test comment\"}', NULL, '2019-11-02 13:52:35', '2019-11-02 13:52:35'),
('9e9f0069-dde8-418b-904a-888a8513e435', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3337,\"message\":\"A new invoice was created\"}', NULL, '2019-11-18 16:49:52', '2019-11-18 16:49:52'),
('a01a6715-de2c-4f91-97bd-ad0ad59a665e', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2903,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:03:17', '2019-11-09 10:03:17'),
('a2923e04-8d7f-4f3b-8f81-9f0a76e35c4d', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6388,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:48:11', '2019-11-26 20:48:11'),
('a2ab5d52-9e25-4190-b931-e0ed6bcb3564', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1498,\"title\":\"test start date\",\"message\":\"New Task created\"}', NULL, '2019-10-01 09:47:32', '2019-10-01 09:47:32'),
('a42f1295-8801-40ae-9fb4-425d976a8fbd', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":252,\"title\":\"test notification\",\"beginDate\":\"2019-09-20 00:00:00\",\"endDate\":\"2019-09-28 00:00:00\"}', NULL, '2019-09-27 18:46:41', '2019-09-27 18:46:41'),
('a6d52b29-450a-4237-b6c2-92e2eb4aa5b4', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3343,\"message\":\"A new invoice was created\"}', NULL, '2019-11-28 20:39:38', '2019-11-28 20:39:38'),
('a906c041-c267-4d63-8948-65f52d63a67a', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3336,\"message\":\"A new invoice was created\"}', NULL, '2019-11-18 16:49:32', '2019-11-18 16:49:32'),
('a9477774-4fb0-480b-90e2-911eef1a107b', 'App\\Notifications\\AttachmentCreated', 'App\\User', 9874, '{\"id\":348,\"message\":\"A new file has been uploaded\",\"filename\":\"download.png\"}', NULL, '2019-10-18 20:43:05', '2019-10-18 20:43:05'),
('aa8f46b1-4936-4341-ae20-cd73cab9729f', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3341,\"message\":\"A new invoice was created\"}', NULL, '2019-11-24 21:23:37', '2019-11-24 21:23:37'),
('ad11df7b-3b95-4932-845c-1a3e8127cd27', 'App\\Notifications\\PasswordResetRequest', 'App\\User', 9874, '[]', NULL, '2019-11-07 21:42:20', '2019-11-07 21:42:20'),
('ad57c2b8-71b6-40ea-b560-857d58dd06b2', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3049,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 18:12:04', '2019-11-09 18:12:04'),
('b10e2508-34fb-4730-b57a-172151c2cae7', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":468,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 17:59:21', '2019-10-20 17:59:21'),
('b1da2e52-a870-4490-b429-02859e11d864', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2872,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 22:01:55', '2019-11-08 22:01:55'),
('b488b608-91bc-4af4-937e-cdcc14f591b9', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6391,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:52:36', '2019-11-26 20:52:36'),
('b497681e-b251-4075-abbb-dda62ce66ad4', 'App\\Notifications\\AttachmentCreated', 'App\\User', 9874, '{\"id\":165,\"message\":\"A new file has been uploaded\",\"filename\":\"download.png\"}', NULL, '2019-10-01 09:53:26', '2019-10-01 09:53:26'),
('b4a5e2f7-cf65-4b82-b406-878cfe81e859', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":884,\"title\":\"test service 2\",\"beginDate\":\"2019-11-20 00:00:00\",\"endDate\":\"2019-11-30 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-11-05 20:31:14', '2019-11-05 20:31:14'),
('b4bc413d-e462-43e9-a161-d9e68b8cc98d', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6394,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:56:10', '2019-11-26 20:56:10'),
('b8600b56-ff54-49a7-b7f3-fc0c8365bc53', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":758,\"message\":\"A new invoice was created\"}', NULL, '2019-09-30 16:13:21', '2019-09-30 16:13:21'),
('bae31a00-4500-4ed4-83c2-245f55e8698b', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6402,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:10:32', '2019-11-26 21:10:32'),
('bd29c6fc-b00c-4210-85ec-78c4babb6521', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2866,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:58:21', '2019-11-08 21:58:21'),
('be53d31c-65e0-4c98-ae48-e39b46b3be37', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2873,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 22:02:53', '2019-11-08 22:02:53'),
('bf0a9169-4205-462d-acf0-a0097d0e710a', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5206,\"title\":\"test\",\"message\":\"New Task created\"}', NULL, '2019-10-18 21:02:08', '2019-10-18 21:02:08'),
('bf9d4e2d-88b3-4fe9-ab9d-a5f205972443', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6395,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:07:38', '2019-11-26 21:07:38'),
('c13ff099-1778-463a-8982-095c2155a20b', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":875,\"title\":\"test event type\",\"beginDate\":\"2019-10-30 16:00:00\",\"endDate\":\"2019-11-02 18:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-30 20:42:36', '2019-10-30 20:42:36'),
('c1f98fc1-b0f0-430a-8be2-acec886c7fbc', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1497,\"title\":\"test delete\",\"message\":\"New Task created\"}', NULL, '2019-09-28 14:18:17', '2019-09-28 14:18:17'),
('c1ffc9bb-c2a9-43a8-b852-5424d0851fd7', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5362,\"title\":\"test project task\",\"message\":\"New Task created\"}', NULL, '2019-10-26 14:22:00', '2019-10-26 14:22:00'),
('c31fc682-0d72-4d6f-aca7-17c0d0cf15bb', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6389,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:49:40', '2019-11-26 20:49:40'),
('c49dc354-d0c6-40f9-afd0-52b7c8da522c', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":820,\"title\":\"test new event\",\"beginDate\":\"2019-12-12 00:00:00\",\"endDate\":\"2019-12-29 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-10-18 19:14:01', '2019-10-18 19:14:01'),
('c4dc47d6-115e-4138-82ed-72a4ca83dbea', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":711,\"message\":\"A new comment was added\",\"comment\":\"test 22\"}', NULL, '2019-11-22 21:28:07', '2019-11-22 21:28:07'),
('ca823494-1b13-4513-8abf-564506c08582', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":1495,\"title\":\"test notification\",\"message\":\"New Task created\"}', NULL, '2019-09-27 19:16:13', '2019-09-27 19:16:13'),
('d056ae32-269f-40ef-aeed-7b698ec725e4', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3339,\"message\":\"A new invoice was created\"}', NULL, '2019-11-19 19:59:47', '2019-11-19 19:59:47'),
('d5912ead-cf22-4c42-a9f1-fb33d84895de', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2865,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:58:06', '2019-11-08 21:58:06'),
('d750c02e-f7d7-4938-b305-5f377ed456a7', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":460,\"message\":\"A new comment was added\",\"comment\":\"test lexie 22\"}', NULL, '2019-10-18 19:10:37', '2019-10-18 19:10:37'),
('d87b05dd-5aa3-4d89-aefa-99786381c868', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6393,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 20:54:14', '2019-11-26 20:54:14'),
('db04a03c-00a3-4fcc-b3a4-e1cd8dc051be', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":464,\"message\":\"A new comment was added\",\"comment\":\"test mike\"}', NULL, '2019-10-20 17:53:37', '2019-10-20 17:53:37'),
('dbd3daed-8f29-44de-839d-8290365e2a1d', 'App\\Notifications\\EventCreated', 'App\\User', 9874, '{\"id\":253,\"title\":\"test notification\",\"beginDate\":\"2019-09-20 00:00:00\",\"endDate\":\"2019-09-28 00:00:00\",\"message\":\"New Event created\"}', NULL, '2019-09-27 18:50:46', '2019-09-27 18:50:46'),
('e094aa5c-44a0-49d8-bb38-e215a36e06f4', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2907,\"message\":\"A new invoice was created\"}', NULL, '2019-11-09 10:13:57', '2019-11-09 10:13:57'),
('e24cadc0-0fe3-4978-8872-3ce3ebc7b230', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":198,\"message\":\"A new comment was added\",\"comment\":\"test reply\"}', NULL, '2019-09-28 12:02:53', '2019-09-28 12:02:53'),
('e2cbf048-035d-47b9-9df0-7cbdd511d94b', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2868,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:58:50', '2019-11-08 21:58:50'),
('e35cd845-b8e5-41a3-87d3-403820fcd914', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3335,\"message\":\"A new invoice was created\"}', NULL, '2019-11-18 16:46:51', '2019-11-18 16:46:51'),
('e8becca6-e922-4d3d-ae03-f571f3607282', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":199,\"message\":\"A new comment was added\",\"comment\":\"test reply 2\"}', NULL, '2019-09-28 12:27:52', '2019-09-28 12:27:52'),
('e9562755-7649-4b71-a484-ed25fb09269f', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2153,\"message\":\"A new invoice was created\"}', NULL, '2019-10-03 14:53:03', '2019-10-03 14:53:03'),
('eb289355-ed1b-4b01-9164-de17b38bf9d4', 'App\\Notifications\\AttachmentCreated', 'App\\User', 9874, '{\"id\":347,\"message\":\"A new file has been uploaded\",\"filename\":\"download.png\"}', NULL, '2019-10-18 19:12:24', '2019-10-18 19:12:24'),
('ecbcf0de-33fb-4bd0-b9a6-8399fe0ac52b', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":196,\"message\":\"A new comment was added\",\"comment\":\"test new message\"}', NULL, '2019-09-28 10:38:46', '2019-09-28 10:38:46'),
('ef7de9c1-856a-436f-938e-bc78cbda0ff5', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":524,\"message\":\"A new comment was added\",\"comment\":\"test task comment\"}', NULL, '2019-10-30 20:50:43', '2019-10-30 20:50:43'),
('f2772a66-cd9b-4b75-b544-d5b23438c177', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3342,\"message\":\"A new invoice was created\"}', NULL, '2019-11-26 21:12:40', '2019-11-26 21:12:40'),
('f7f93153-0d5b-417c-97a5-672f116ebac4', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":530,\"message\":\"A new comment was added\",\"comment\":\"test again 2\"}', NULL, '2019-11-02 13:56:00', '2019-11-02 13:56:00'),
('f9425a6f-e585-41ea-86ea-c3308545b1f8', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":5363,\"title\":\"test dates\",\"message\":\"New Task created\"}', NULL, '2019-10-29 15:52:34', '2019-10-29 15:52:34'),
('fac4f8e5-d4e1-4d28-b1c8-ea4432fd0d31', 'App\\Notifications\\TaskCreated', 'App\\User', 9874, '{\"id\":6399,\"title\":\"test task time 2\",\"message\":\"New Task created\"}', NULL, '2019-11-26 21:09:09', '2019-11-26 21:09:09'),
('fcf0e8aa-26f9-4f66-b96e-70ffac86107e', 'App\\Notifications\\CommentCreated', 'App\\User', 9874, '{\"id\":484,\"message\":\"A new comment was added\",\"comment\":\"testmkke\"}', NULL, '2019-10-20 18:22:56', '2019-10-20 18:22:56'),
('fd1eb431-16c2-4358-8ed3-289993d5c3fe', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3334,\"message\":\"A new invoice was created\"}', NULL, '2019-11-18 16:45:12', '2019-11-18 16:45:12'),
('fd25ef33-1f38-4ba2-8099-135693196e73', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3329,\"message\":\"A new invoice was created\"}', NULL, '2019-11-13 20:58:38', '2019-11-13 20:58:38'),
('fe5646ff-745b-4708-a96d-cd3cd44b2d4c', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2869,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:59:39', '2019-11-08 21:59:39'),
('fe7db77a-d6cd-410e-ae71-829ba3d639f2', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":3338,\"message\":\"A new invoice was created\"}', NULL, '2019-11-19 19:55:25', '2019-11-19 19:55:25'),
('fee3048c-0cd8-4c38-aa89-ccbadff54116', 'App\\Notifications\\InvoiceCreated', 'App\\User', 9874, '{\"id\":2870,\"message\":\"A new invoice was created\"}', NULL, '2019-11-08 21:59:53', '2019-11-08 21:59:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paymentables`
--

DROP TABLE IF EXISTS `paymentables`;
CREATE TABLE `paymentables` (
  `payment_id` int(10) UNSIGNED NOT NULL,
  `paymentable_id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `paymentable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `paymentables`
--

INSERT INTO `paymentables` (`payment_id`, `paymentable_id`, `amount`, `paymentable_type`) VALUES
(101, 3467, '1786.0000', 'App\\Invoice'),
(102, 39, '0.0000', 'App\\Invoice'),
(103, 39, '0.0000', 'App\\Invoice'),
(104, 39, '0.0000', 'App\\Invoice'),
(105, 39, '0.0000', 'App\\Invoice'),
(106, 39, '0.0000', 'App\\Invoice'),
(107, 39, '0.0000', 'App\\Invoice'),
(108, 39, '0.0000', 'App\\Invoice'),
(109, 39, '1786.0000', 'App\\Invoice'),
(110, 39, '1786.0000', 'App\\Invoice'),
(111, 40, '1000.0000', 'App\\Invoice'),
(112, 40, '1000.0000', 'App\\Invoice'),
(113, 40, '1000.0000', 'App\\Invoice'),
(114, 40, '1000.0000', 'App\\Invoice'),
(115, 40, '0.0000', 'App\\Invoice'),
(116, 40, '1000.0000', 'App\\Invoice'),
(117, 40, '1000.0000', 'App\\Invoice'),
(118, 40, '1000.0000', 'App\\Invoice'),
(119, 40, '1000.0000', 'App\\Invoice'),
(120, 40, '1000.0000', 'App\\Invoice'),
(142, 157, '1786.0000', 'App\\Invoice'),
(143, 157, '1786.0000', 'App\\Invoice'),
(151, 157, '1786.0000', 'App\\Invoice');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_status_id` int(11) NOT NULL DEFAULT 1,
  `refunded` decimal(13,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `type_id`, `customer_id`, `amount`, `created_at`, `updated_at`, `payment_status_id`, `refunded`) VALUES
(151, 2, 13184, '1786.00', '2019-12-02 17:44:05', '2019-12-02 17:44:05', 1, '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
CREATE TABLE `payment_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`, `created_at`, `updated_at`, `type_id`) VALUES
(1, 'Paypal', NULL, NULL, 1),
(2, 'Credit', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment_statuses`
--

DROP TABLE IF EXISTS `payment_statuses`;
CREATE TABLE `payment_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payment_statuses`
--

INSERT INTO `payment_statuses` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Pending', '2019-11-26 19:52:15', '2019-11-26 19:52:15'),
(2, 'Voided', '2019-11-26 19:52:15', '2019-11-26 19:52:15'),
(3, 'Failed', '2019-11-26 19:52:15', '2019-11-26 19:52:15'),
(4, 'Completed', '2019-11-26 19:52:15', '2019-11-26 19:52:15'),
(5, 'Partially Refunded', '2019-11-26 19:52:15', '2019-11-26 19:52:15'),
(6, 'Refunded', '2019-11-26 19:52:16', '2019-11-26 19:52:16');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1801, 'test permission', 'test', NULL, NULL),
(1834, 'create-tasks', 'Create Tasks', '2019-10-19 16:51:27', '2019-10-19 16:51:27'),
(1835, 'edit-users', 'Edit Users', '2019-10-19 16:51:27', '2019-10-19 16:51:27'),
(1836, 'create-invoice', 'Create Invoice', NULL, NULL),
(1837, 'view-invoice', 'View Invoices', NULL, NULL),
(1844, 'losure.closure', NULL, '2019-10-19 18:22:17', '2019-10-19 18:22:17'),
(1845, 'taskstatuscontroller.index', NULL, '2019-10-19 18:22:17', '2019-10-19 18:22:17'),
(1846, 'dashboardcontroller.index', NULL, '2019-10-19 18:22:17', '2019-10-19 18:22:17'),
(1847, 'activitycontroller.index', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1848, 'messagecontroller.getcustomers', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1849, 'messagecontroller.index', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1850, 'messagecontroller.store', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1851, 'invoicecontroller.store', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1852, 'invoicecontroller.index', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1853, 'invoicelinecontroller.getinvoicelinesfortask', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1854, 'invoicecontroller.show', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1855, 'invoicelinecontroller.destroyline', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1856, 'invoicelinecontroller.updateline', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1857, 'invoicecontroller.update', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1858, 'customercontroller.dashboard', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1859, 'customercontroller.index', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1860, 'customercontroller.show', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1861, 'customercontroller.update', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1862, 'customercontroller.store', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1863, 'customercontroller.destroy', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1864, 'taskcontroller.update', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1865, 'taskcontroller.store', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1866, 'taskcontroller.gettasksforproject', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1867, 'taskcontroller.markascompleted', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1868, 'taskcontroller.destroy', NULL, '2019-10-19 18:22:18', '2019-10-19 18:22:18'),
(1869, 'taskcontroller.filtertasks', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1870, 'taskcontroller.updatestatus', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1871, 'taskcontroller.getleads', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1872, 'taskcontroller.getdeals', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1873, 'taskcontroller.createdeal', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1874, 'taskcontroller.index', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1875, 'taskcontroller.getsubtasks', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1876, 'taskcontroller.addproducts', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1877, 'taskcontroller.getproducts', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1878, 'taskcontroller.gettaskswithproducts', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1879, 'taskcontroller.getsourcetypes', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1880, 'permissioncontroller.index', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1881, 'permissioncontroller.store', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1882, 'permissioncontroller.destroy', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1883, 'permissioncontroller.edit', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1884, 'permissioncontroller.update', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1885, 'rolecontroller.index', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1886, 'rolecontroller.store', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1887, 'rolecontroller.destroy', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1888, 'rolecontroller.edit', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1889, 'rolecontroller.update', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1890, 'departmentcontroller.index', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1891, 'departmentcontroller.store', NULL, '2019-10-19 18:22:19', '2019-10-19 18:22:19'),
(1892, 'departmentcontroller.destroy', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1893, 'departmentcontroller.edit', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1894, 'departmentcontroller.update', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1895, 'brandcontroller.index', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1896, 'brandcontroller.store', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1897, 'brandcontroller.destroy', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1898, 'brandcontroller.edit', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1899, 'brandcontroller.update', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1900, 'categorycontroller.index', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1901, 'categorycontroller.store', NULL, '2019-10-19 18:22:20', '2019-10-19 18:22:20'),
(1902, 'categorycontroller.destroy', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1903, 'categorycontroller.edit', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1904, 'categorycontroller.update', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1905, 'categorycontroller.getcategory', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1906, 'categorycontroller.getrootcategories', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1907, 'categorycontroller.getchildcategories', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1908, 'productcontroller.getproductsforcategory', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1909, 'categorycontroller.getform', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1910, 'commentcontroller.index', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1911, 'commentcontroller.destroy', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1912, 'commentcontroller.update', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1913, 'commentcontroller.store', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1914, 'usercontroller.destroy', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1915, 'usercontroller.store', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1916, 'usercontroller.dashboard', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1917, 'usercontroller.edit', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1918, 'usercontroller.update', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1919, 'usercontroller.index', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1920, 'usercontroller.upload', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1921, 'usercontroller.profile', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1922, 'usercontroller.filterusersbydepartment', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1923, 'eventcontroller.index', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1924, 'eventcontroller.destroy', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1925, 'eventcontroller.update', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1926, 'eventcontroller.show', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1927, 'eventcontroller.store', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1928, 'eventcontroller.geteventsfortask', NULL, '2019-10-19 18:22:21', '2019-10-19 18:22:21'),
(1929, 'eventcontroller.geteventsforuser', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1930, 'productcontroller.index', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1931, 'productcontroller.store', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1932, 'productcontroller.destroy', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1933, 'productcontroller.update', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1934, 'productcontroller.getproductsfortask', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1935, 'productcontroller.filterproducts', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1936, 'productcontroller.getproduct', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1937, 'projectcontroller.index', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1938, 'projectcontroller.store', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1939, 'projectcontroller.show', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1940, 'projectcontroller.update', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1941, 'uploadcontroller.store', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1942, 'uploadcontroller.index', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1943, 'uploadcontroller.destroy', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1944, 'taskstatuscontroller.search', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1945, 'taskstatuscontroller.store', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1946, 'taskstatuscontroller.update', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1947, 'taskstatuscontroller.destroy', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1948, 'logincontroller.showlogin', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1949, 'logincontroller.dologin', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1950, 'logincontroller.dologout', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(1951, 'illuminate\\routing\\viewcontroller.\\illuminate\\routing\\viewcontroller', NULL, '2019-10-19 18:22:22', '2019-10-19 18:22:22'),
(2002, 'test tamara', 'test', '2019-10-25 17:38:23', '2019-10-25 17:38:23');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1801, 113),
(1801, 1797),
(1834, 1810),
(1835, 1809),
(1836, 1810),
(1837, 1810),
(1844, 1810),
(1845, 1810),
(1846, 1810),
(1847, 1810),
(1848, 1810),
(1849, 1810),
(1850, 1810),
(1851, 1810),
(1852, 1810),
(1853, 1810),
(1854, 1810),
(1855, 1810),
(1856, 1810),
(1857, 1810),
(1858, 1810),
(1859, 1810),
(1860, 1810),
(1861, 1810),
(1862, 1810),
(1863, 1810),
(1864, 1810),
(1865, 1810),
(1866, 1810),
(1867, 1810),
(1868, 1810),
(1869, 1810),
(1870, 1810),
(1871, 1810),
(1872, 1810),
(1873, 1810),
(1874, 1810),
(1875, 1810),
(1876, 1810),
(1877, 1810),
(1878, 1810),
(1879, 1810),
(1880, 1810),
(1881, 1810),
(1882, 1810),
(1883, 1810),
(1884, 1810),
(1885, 1810),
(1886, 1810),
(1887, 1810),
(1888, 1810),
(1889, 1810),
(1890, 1810),
(1891, 1810),
(1892, 1810),
(1893, 1810),
(1894, 1810),
(1895, 1810),
(1896, 1810),
(1897, 1810),
(1898, 1810),
(1899, 1810),
(1900, 1810),
(1901, 1810),
(1902, 1810),
(1903, 1810),
(1904, 1810),
(1905, 1810),
(1906, 1810),
(1907, 1810),
(1908, 1810),
(1909, 1810),
(1910, 1810),
(1911, 1810),
(1912, 1810),
(1913, 1810),
(1914, 1810),
(1915, 1810),
(1916, 1810),
(1917, 1810),
(1918, 1810),
(1919, 1810),
(1920, 1810),
(1921, 1810),
(1922, 1810),
(1923, 1810),
(1924, 1810),
(1925, 1810),
(1926, 1810),
(1927, 1810),
(1928, 1810),
(1929, 1810),
(1930, 1810),
(1931, 1810),
(1932, 1810),
(1933, 1810),
(1934, 1810),
(1935, 1810),
(1936, 1810),
(1937, 1810),
(1938, 1810),
(1939, 1810),
(1940, 1810),
(1941, 1810),
(1942, 1810),
(1943, 1810),
(1944, 1810),
(1945, 1810),
(1946, 1810),
(1947, 1810),
(1948, 1810),
(1949, 1810),
(1950, 1810),
(1951, 1810);

-- --------------------------------------------------------

--
-- Table structure for table `permission_user`
--

DROP TABLE IF EXISTS `permission_user`;
CREATE TABLE `permission_user` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission_user`
--

INSERT INTO `permission_user` (`permission_id`, `user_id`, `user_type`) VALUES
(1836, 9874, '');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `quantity` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `cost` decimal(16,4) NOT NULL DEFAULT 0.0000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `company_id`, `sku`, `name`, `slug`, `description`, `price`, `status`, `created_at`, `updated_at`, `cover`, `assigned_user_id`, `quantity`, `cost`) VALUES
(1, 1129, 'TEST', 'test', 'test', 'test', '12.99', 1, NULL, NULL, NULL, NULL, '0.0000', '0.0000'),
(5, 482, 'abcd', 'test add product', 'test-add-product', 'test add product', '200.00', 1, '2019-09-23 14:17:29', '2019-09-23 14:52:36', NULL, NULL, '0.0000', '0.0000'),
(148, 482, 'last', 'last test', 'last-test', 'last test', '99.00', 1, '2019-09-23 15:36:15', '2019-09-23 18:20:15', NULL, NULL, '0.0000', '0.0000'),
(609, 482, 'test', 'test category', 'test-category', 'test category', '12.99', 1, '2019-10-02 15:06:02', '2019-10-02 15:06:02', NULL, NULL, '0.0000', '0.0000'),
(1312, 482, 'test1', 'Homeowner Loan', 'homeowner-loan', '£10,000 to £10 million <br>\nLarger loans for homeowners only', '10000.00', 1, '2019-10-05 16:44:38', '2019-10-05 16:48:19', NULL, NULL, '0.0000', '0.0000'),
(1313, 482, 'test2', 'Personal Loan', 'personal-loan', '£100 to £35,000 <br>\nNo need to be a homeowner', '100.00', 1, '2019-10-05 16:48:04', '2019-10-05 16:48:04', NULL, NULL, '0.0000', '0.0000'),
(1314, 482, 'test4', 'Guarantoor Loans', 'guarantoor-loans', '£500 to £15,000 <br>\nAn option if you have poor credit or other problems', '500.00', 1, '2019-10-05 16:49:42', '2019-10-05 16:49:42', NULL, NULL, '0.0000', '0.0000'),
(1315, 482, 'test5', 'Mortgage New Property', 'mortgage-new-property', 'First time buyers, purchasing a property or land', '1800.00', 1, '2019-10-05 16:50:41', '2019-10-05 16:50:41', NULL, NULL, '0.0000', '0.0000'),
(1316, 482, 'test9', '(Re)mortgage Owned property', 'remortgage-owned-property', 'Reduce monthly payments, change of property or home improvements', '800.00', 1, '2019-10-05 16:51:10', '2019-11-07 21:30:13', NULL, NULL, '0.0000', '0.0000'),
(1317, 482, 'test14', 'Buy to Let (Re)mortgage', 'buy-to-let-remortgage', 'Investment in another property both residential and commercial', '1000.00', 1, '2019-10-05 16:51:39', '2019-10-12 14:20:56', NULL, NULL, '0.0000', '0.0000'),
(1318, 482, 'test49', 'Bridging Loan New Property', 'bridging-loan-new-property', 'For new property purchase or land', '1200.00', 1, '2019-10-05 16:52:24', '2019-10-05 16:52:24', NULL, NULL, '0.0000', '0.0000'),
(1319, 482, 'test48', 'Bridging Loan Owned Property', 'bridging-loan-owned-property', 'For bridging a property purchase, raising extra funds or saving a chain', '9000.00', 1, '2019-10-05 16:53:10', '2019-10-05 16:53:10', NULL, NULL, '0.0000', '0.0000'),
(1320, 482, 'test65', 'Bridging Loan Commercial or Development', 'bridging-loan-commercial-or-development', 'Investment in another property both residential and commercial', '1200.00', 1, '2019-10-05 16:53:45', '2019-10-05 16:53:45', NULL, NULL, '0.0000', '0.0000'),
(2257, 1129, 'testt', 'multiple upload', 'multiple-upload', 'multiple upload', '12.99', 1, '2019-11-09 11:00:23', '2019-11-09 12:26:58', 'products/0S5uhDxv26s4tzmtqPgvJ1n8cOfsKzXK9tDowJvC.jpeg', NULL, '0.0000', '0.0000'),
(3254, 1129, 'testt', 'test quantity', 'test-quantity', 'test quantity', '12.99', 1, '2019-12-03 21:40:56', '2019-12-03 21:42:56', 'undefined', NULL, '2.0000', '0.0000');

-- --------------------------------------------------------

--
-- Table structure for table `product_attributes`
--

DROP TABLE IF EXISTS `product_attributes`;
CREATE TABLE `product_attributes` (
  `id` int(10) UNSIGNED NOT NULL,
  `range_from` decimal(8,2) NOT NULL,
  `range_to` decimal(8,2) NOT NULL,
  `interest_rate` decimal(8,2) DEFAULT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `minimum_downpayment` double(8,2) DEFAULT 0.00,
  `payable_months` double(8,2) NOT NULL DEFAULT 12.00,
  `number_of_years` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_attributes`
--

INSERT INTO `product_attributes` (`id`, `range_from`, `range_to`, `interest_rate`, `product_id`, `created_at`, `updated_at`, `minimum_downpayment`, `payable_months`, `number_of_years`) VALUES
(49, '2000.00', '3000.00', '2.22', 1318, '2019-10-06 10:06:09', '2019-10-06 10:06:09', 0.00, 12.00, 0),
(87, '0.00', '0.00', '0.00', 1317, '2019-10-12 14:20:56', '2019-10-12 14:20:56', 0.00, 12.00, 0),
(89, '682000.00', '685000.00', '2.89', 1315, '2019-10-12 16:58:15', '2019-10-12 16:58:15', 10.00, 12.00, 25),
(90, '600.00', '1000.00', '2.20', 1313, NULL, NULL, 12.00, 12.00, 1),
(91, '20.00', '30.00', '10.00', 1320, NULL, NULL, 10.00, 12.00, 1),
(92, '500.00', '800.00', '2.40', 1312, NULL, NULL, 5.00, 12.00, 1),
(170, '9.99', '2000.00', '2.99', 1316, '2019-11-07 21:30:13', '2019-11-07 21:30:13', 0.00, 12.00, 0),
(181, '20.00', '40.00', '2.20', 2257, '2019-11-09 12:26:58', '2019-11-09 12:26:58', 10.00, 12.00, 2),
(302, '0.00', '0.00', '0.00', 3254, '2019-12-03 21:42:56', '2019-12-03 21:42:56', 0.00, 12.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `src` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `src`) VALUES
(15, 2257, 'products/VKYuXf0VRdtpWdsTPEHIC2N0vIgTq1xgLVTcGmXG.jpeg'),
(17, 2257, 'products/IBlmccwNsgVsywO6soGhdTC8VZmPALAApeI9tarx.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `product_task`
--

DROP TABLE IF EXISTS `product_task`;
CREATE TABLE `product_task` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `minimum_downpayment` double(8,2) DEFAULT 0.00,
  `interest_rate` double(8,2) DEFAULT 0.00,
  `payable_months` double(8,2) NOT NULL DEFAULT 12.00,
  `number_of_years` int(11) DEFAULT 0,
  `range_from` int(11) DEFAULT 0,
  `range_to` int(11) DEFAULT 0,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sku` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `created_by` text COLLATE utf8_unicode_ci NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `created_by`, `is_completed`, `created_at`, `updated_at`, `customer_id`) VALUES
(6, 'First Project update', 'test first project update', '', 0, '2019-09-12 23:00:00', '2019-10-01 09:44:21', 10949),
(7, 'test project customer', 'test project customer', 'mike', 0, '2019-09-14 08:12:38', '2019-09-14 08:12:38', 10949);

-- --------------------------------------------------------

--
-- Table structure for table `project_task`
--

DROP TABLE IF EXISTS `project_task`;
CREATE TABLE `project_task` (
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project_task`
--

INSERT INTO `project_task` (`task_id`, `project_id`, `id`) VALUES
(5362, 7, 16),
(5484, 7, 17),
(5485, 7, 18),
(6387, 6, 19),
(6388, 6, 20),
(6389, 6, 21),
(6390, 6, 22),
(6391, 6, 23),
(6392, 6, 24),
(6393, 6, 25),
(6394, 6, 26),
(6395, 6, 27),
(6396, 6, 28),
(6397, 6, 29),
(6398, 6, 30),
(6399, 6, 31),
(6400, 6, 32),
(6401, 6, 33),
(6402, 6, 34),
(6403, 6, 35);

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
CREATE TABLE `provinces` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `country_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Hampshire', 225, 1, '2019-09-12 23:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
CREATE TABLE `quotes` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `status` int(10) UNSIGNED NOT NULL,
  `recurring_id` int(10) UNSIGNED DEFAULT NULL,
  `number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount` double(8,2) NOT NULL DEFAULT 0.00,
  `is_amount_discount` tinyint(1) NOT NULL DEFAULT 0,
  `po_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `recurring_due_date` date DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `line_items` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `backup` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `footer` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `private_notes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `terms` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `sub_total` decimal(16,4) NOT NULL,
  `tax_total` decimal(16,4) NOT NULL,
  `discount_total` decimal(16,4) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `frequency` int(11) DEFAULT NULL,
  `is_recurring` int(11) DEFAULT NULL,
  `total` decimal(16,4) NOT NULL,
  `balance` decimal(16,4) NOT NULL,
  `partial` decimal(16,4) DEFAULT NULL,
  `partial_due_date` datetime DEFAULT NULL,
  `last_viewed` datetime DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quote_task`
--

DROP TABLE IF EXISTS `quote_task`;
CREATE TABLE `quote_task` (
  `id` int(11) NOT NULL,
  `quote_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quote_task`
--

INSERT INTO `quote_task` (`id`, `quote_id`, `task_id`) VALUES
(23, 26, 6403);

-- --------------------------------------------------------

--
-- Table structure for table `recurring_invoices`
--

DROP TABLE IF EXISTS `recurring_invoices`;
CREATE TABLE `recurring_invoices` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `number` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount` double(8,2) NOT NULL DEFAULT 0.00,
  `sub_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `tax_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `discount_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `is_amount_discount` tinyint(1) NOT NULL DEFAULT 0,
  `po_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `line_items` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `footer` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `terms` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `total` decimal(16,4) NOT NULL,
  `balance` decimal(16,4) NOT NULL,
  `partial` decimal(16,4) DEFAULT NULL,
  `last_viewed` datetime DEFAULT NULL,
  `frequency_id` int(10) UNSIGNED NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `last_sent_date` datetime DEFAULT NULL,
  `next_send_date` datetime DEFAULT NULL,
  `remaining_cycles` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `partial_due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recurring_quotes`
--

DROP TABLE IF EXISTS `recurring_quotes`;
CREATE TABLE `recurring_quotes` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `assigned_user_id` int(10) UNSIGNED DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `number` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount` double(8,2) NOT NULL DEFAULT 0.00,
  `sub_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `tax_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `discount_total` decimal(16,4) NOT NULL DEFAULT 0.0000,
  `is_amount_discount` tinyint(1) NOT NULL DEFAULT 0,
  `po_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `line_items` mediumtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `footer` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `terms` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `total` decimal(16,4) NOT NULL,
  `balance` decimal(16,4) NOT NULL,
  `partial` decimal(16,4) DEFAULT NULL,
  `last_viewed` datetime DEFAULT NULL,
  `frequency_id` int(10) UNSIGNED NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `last_sent_date` datetime DEFAULT NULL,
  `next_send_date` datetime DEFAULT NULL,
  `remaining_cycles` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `partial_due_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(112, 'test role', NULL, 'test role', '2019-09-22 16:19:01', '2019-09-23 19:28:11'),
(113, 'test again', NULL, 'test again', NULL, NULL),
(1797, 'test mike 2', NULL, 'test mike 2', '2019-10-16 18:29:03', '2019-10-16 18:29:03'),
(1809, 'Manager', NULL, 'Front-end Developer', '2019-10-19 16:50:34', '2019-10-19 16:50:34'),
(1810, 'Admin', NULL, 'Assistant Manager', '2019-10-19 16:50:34', '2019-10-19 16:50:34');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `user_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`role_id`, `user_id`, `user_type`) VALUES
(1809, 9874, ''),
(1810, 9874, ''),
(1810, 12703, ''),
(1810, 12989, '');

-- --------------------------------------------------------

--
-- Table structure for table `source_type`
--

DROP TABLE IF EXISTS `source_type`;
CREATE TABLE `source_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `source_type`
--

INSERT INTO `source_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Website', NULL, NULL),
(2, 'Personal Contact', NULL, NULL),
(3, 'Call', NULL, NULL),
(4, 'Email', NULL, NULL),
(5, 'Other', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
CREATE TABLE `states` (
  `state` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `country_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `task_color` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `due_date` datetime NOT NULL,
  `is_completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `task_status` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `task_type` int(11) NOT NULL DEFAULT 1,
  `rating` int(10) UNSIGNED DEFAULT NULL,
  `customer_id` int(10) UNSIGNED NOT NULL,
  `valued_at` decimal(8,2) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `source_type` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `start_date` datetime NOT NULL,
  `time_log` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_running` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_comment`
--

DROP TABLE IF EXISTS `task_comment`;
CREATE TABLE `task_comment` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `comment_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task_statuses`
--

DROP TABLE IF EXISTS `task_statuses`;
CREATE TABLE `task_statuses` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `task_type` int(11) NOT NULL DEFAULT 1,
  `column_color` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `task_statuses`
--

INSERT INTO `task_statuses` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`, `is_active`, `task_type`, `column_color`) VALUES
(1, 'TODO', 'You can do what you want to do with this column', 'fa-bars', NULL, NULL, 1, 1, '#FF0000'),
(2, 'Blocked', 'You can do what you want to do with this column', 'fa-lightbulb', NULL, NULL, 1, 1, '#66CC00'),
(3, 'In Progress', 'You can do what you want to do with this column', 'fa-spinner', NULL, NULL, 1, 1, '#0080FF'),
(4, 'Done', 'You can do what you want to do with this column', 'fa-check', NULL, NULL, 1, 1, '#FF00FF'),
(5, 'Unassigned', 'Description 1', 'fa-bars', NULL, NULL, 1, 2, '#4C0099'),
(6, 'Partner Leads', 'Description 2', 'fa-lightbulb', NULL, NULL, 1, 2, '#FF66FF'),
(7, 'Responsible Assigned', 'Description 3', 'fa-spinner', NULL, NULL, 1, 2, '#FF0000'),
(8, 'Waiting For Details', 'Description 4', 'fa-check', NULL, NULL, 1, 2, '#66CC00'),
(9, 'Opened', 'test 1', '', NULL, NULL, 1, 3, '#0080FF'),
(10, 'Lost', 'test 2', '', NULL, NULL, 1, 3, '#FF00FF'),
(19, 'Contacted', 'Contacted', '', NULL, NULL, 1, 3, '#4C0099'),
(20, 'Won', 'Won', '', NULL, NULL, 1, 3, '#FF0000'),
(21, 'No Show', 'No Show', '', NULL, NULL, 1, 3, '#66CC00'),
(22, 'Demo', 'Demo', '', NULL, NULL, 1, 3, '#0080FF'),
(114, 'test mike 22', 'test mike', 'test', '2019-10-16 18:42:27', '2019-10-16 18:50:09', 1, 1, 'red');

-- --------------------------------------------------------

--
-- Table structure for table `task_type`
--

DROP TABLE IF EXISTS `task_type`;
CREATE TABLE `task_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `task_type`
--

INSERT INTO `task_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Task', NULL, NULL),
(2, 'Lead', NULL, NULL),
(3, 'Deal', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_user`
--

DROP TABLE IF EXISTS `task_user`;
CREATE TABLE `task_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tax_rates`
--

DROP TABLE IF EXISTS `tax_rates`;
CREATE TABLE `tax_rates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rate` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tax_rates`
--

INSERT INTO `tax_rates` (`id`, `name`, `rate`, `created_at`, `updated_at`) VALUES
(1, 'Basic', '17.50', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `profile_photo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_token` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 1,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `job_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `profile_photo`, `username`, `created_at`, `updated_at`, `email`, `password`, `auth_token`, `is_active`, `deleted_at`, `gender`, `phone_number`, `dob`, `job_description`) VALUES
(9874, 'Michael', 'Hampton', NULL, 'michael.hampton', NULL, '2019-12-05 21:20:24', 'michaelhamptondesign@yahoo.com', '$2y$10$3037InjhBYPB8ZfS8RaWpuRLxzfwRgeLQ.qDbYjqGIjOTlNYGzvlq', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90YXNrbWFuMi5kZXZlbG9', 1, NULL, 'male', '01425 629322', '1985-12-04', 'job description'),
(12703, 'Paul', 'Hampton', NULL, 'paul.hampton', '2019-10-25 17:45:16', '2019-11-07 21:29:45', 'paul.hampton@yahoo.com', '$2y$10$4FthN.STsri8MFL2aqjFgOODdyQTT/RrJJWhq6xU40Izj3BMj7XAy', NULL, 1, NULL, 'male', '01590 677428', '1985-12-04', 'test'),
(12989, 'Test update', 'Service update', NULL, 'test.service update', '2019-11-05 20:43:03', '2019-11-05 20:59:31', 'test.service@yahoo.com', '$2y$10$X4YjBePnsF6cWqLKH7TdOOOm0FJUdycF5cDDKp6y5gNgnCPqgU7Ni', NULL, 1, '2019-11-05 20:59:31', 'male', '01590 677428', '1985-12-04', 'test job');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_country_id_index` (`country_id`),
  ADD KEY `addresses_customer_id_index` (`customer_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `brand_user`
--
ALTER TABLE `brand_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`),
  ADD KEY `categories__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`);

--
-- Indexes for table `category_product`
--
ALTER TABLE `category_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_product_category_id_index` (`category_id`),
  ADD KEY `category_product_product_id_index` (`product_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD KEY `cities_province_id_foreign` (`province_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`);

--
-- Indexes for table `comment_task`
--
ALTER TABLE `comment_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_comment_task_id_foreign` (`task_id`),
  ADD KEY `task_comment_comment_id_foreign` (`comment_id`);

--
-- Indexes for table `comment_type`
--
ALTER TABLE `comment_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_name_unique` (`name`),
  ADD UNIQUE KEY `countries_iso_unique` (`iso`);

--
-- Indexes for table `credits`
--
ALTER TABLE `credits`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `credits_company_id_unique` (`company_id`),
  ADD KEY `credits_user_id_foreign` (`user_id`),
  ADD KEY `credits_company_id_index` (`company_id`),
  ADD KEY `credits_customer_id_index` (`customer_id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`),
  ADD KEY `customers_default_payment_method_foreign` (`default_payment_method`),
  ADD KEY `customers_company_id_index` (`company_id`);

--
-- Indexes for table `customer_type`
--
ALTER TABLE `customer_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_types`
--
ALTER TABLE `customer_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `departments_department_manager_foreign` (`department_manager`),
  ADD KEY `departments__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`);

--
-- Indexes for table `department_user`
--
ALTER TABLE `department_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_status`
--
ALTER TABLE `event_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_task`
--
ALTER TABLE `event_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_types`
--
ALTER TABLE `event_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_user`
--
ALTER TABLE `event_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_task_id_foreign` (`task_id`),
  ADD KEY `files_user_id_foreign` (`user_id`);

--
-- Indexes for table `finance_type`
--
ALTER TABLE `finance_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `form_category`
--
ALTER TABLE `form_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `frequencies`
--
ALTER TABLE `frequencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_number_unique` (`number`),
  ADD KEY `invoices_user_id_foreign` (`user_id`),
  ADD KEY `invoices_customer_id_index` (`customer_id`);

--
-- Indexes for table `invoices_backup`
--
ALTER TABLE `invoices_backup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_task`
--
ALTER TABLE `invoice_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_task_invoice_id_foreign` (`invoice_id`),
  ADD KEY `invoice_task_task_id_foreign` (`task_id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_customer_id_foreign` (`customer_id`),
  ADD KEY `messages_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_statuses`
--
ALTER TABLE `payment_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD PRIMARY KEY (`user_id`,`permission_id`,`user_type`),
  ADD KEY `permission_user_permission_id_foreign` (`permission_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_company_id_index` (`company_id`);

--
-- Indexes for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_attributes_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_index` (`product_id`);

--
-- Indexes for table `product_task`
--
ALTER TABLE `product_task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_task_product_id_foreign` (`product_id`),
  ADD KEY `product_task_task_id_foreign` (`task_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_task`
--
ALTER TABLE `project_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provinces_country_id_index` (`country_id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quotes_number_unique` (`number`),
  ADD KEY `quotes_user_id_foreign` (`user_id`),
  ADD KEY `quotes_customer_id_index` (`customer_id`);

--
-- Indexes for table `quote_task`
--
ALTER TABLE `quote_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recurring_invoices`
--
ALTER TABLE `recurring_invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recurring_invoices_user_id_foreign` (`user_id`),
  ADD KEY `recurring_invoices_customer_id_index` (`customer_id`),
  ADD KEY `recurring_invoices_status_id_index` (`status_id`);

--
-- Indexes for table `recurring_quotes`
--
ALTER TABLE `recurring_quotes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recurring_quotes_user_id_foreign` (`user_id`),
  ADD KEY `recurring_quotes_customer_id_index` (`customer_id`),
  ADD KEY `recurring_quotes_status_id_index` (`status_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`,`user_type`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `source_type`
--
ALTER TABLE `source_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD KEY `states_country_id_foreign` (`country_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_customer_id_foreign` (`customer_id`),
  ADD KEY `tasks_source_type_foreign` (`source_type`);

--
-- Indexes for table `task_comment`
--
ALTER TABLE `task_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_statuses`
--
ALTER TABLE `task_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_type`
--
ALTER TABLE `task_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_user`
--
ALTER TABLE `task_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_user_user_id_foreign` (`user_id`),
  ADD KEY `task_user_task_id_foreign` (`task_id`);

--
-- Indexes for table `tax_rates`
--
ALTER TABLE `tax_rates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `users_api_token_unique` (`auth_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1056;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6122;

--
-- AUTO_INCREMENT for table `brand_user`
--
ALTER TABLE `brand_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4000;

--
-- AUTO_INCREMENT for table `category_product`
--
ALTER TABLE `category_product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1237;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=820;

--
-- AUTO_INCREMENT for table `comment_task`
--
ALTER TABLE `comment_task`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `comment_type`
--
ALTER TABLE `comment_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `credits`
--
ALTER TABLE `credits`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19663;

--
-- AUTO_INCREMENT for table `customer_type`
--
ALTER TABLE `customer_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customer_types`
--
ALTER TABLE `customer_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2258;

--
-- AUTO_INCREMENT for table `department_user`
--
ALTER TABLE `department_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1223;

--
-- AUTO_INCREMENT for table `event_status`
--
ALTER TABLE `event_status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_task`
--
ALTER TABLE `event_task`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200;

--
-- AUTO_INCREMENT for table `event_types`
--
ALTER TABLE `event_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_user`
--
ALTER TABLE `event_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=574;

--
-- AUTO_INCREMENT for table `finance_type`
--
ALTER TABLE `finance_type`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `form_category`
--
ALTER TABLE `form_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `frequencies`
--
ALTER TABLE `frequencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT for table `invoices_backup`
--
ALTER TABLE `invoices_backup`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3468;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `invoice_task`
--
ALTER TABLE `invoice_task`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6404;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=432;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=226;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_statuses`
--
ALTER TABLE `payment_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2515;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3355;

--
-- AUTO_INCREMENT for table `product_attributes`
--
ALTER TABLE `product_attributes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=315;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=498;

--
-- AUTO_INCREMENT for table `product_task`
--
ALTER TABLE `product_task`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1186;

--
-- AUTO_INCREMENT for table `project_task`
--
ALTER TABLE `project_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `quote_task`
--
ALTER TABLE `quote_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `recurring_invoices`
--
ALTER TABLE `recurring_invoices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `recurring_quotes`
--
ALTER TABLE `recurring_quotes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2428;

--
-- AUTO_INCREMENT for table `source_type`
--
ALTER TABLE `source_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6936;

--
-- AUTO_INCREMENT for table `task_comment`
--
ALTER TABLE `task_comment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task_statuses`
--
ALTER TABLE `task_statuses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=403;

--
-- AUTO_INCREMENT for table `task_type`
--
ALTER TABLE `task_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `task_user`
--
ALTER TABLE `task_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT for table `tax_rates`
--
ALTER TABLE `tax_rates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16314;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `addresses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comment_task`
--
ALTER TABLE `comment_task`
  ADD CONSTRAINT `task_comment_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_comment_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `credits`
--
ALTER TABLE `credits`
  ADD CONSTRAINT `credits_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `credits_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `credits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customers_default_payment_method_foreign` FOREIGN KEY (`default_payment_method`) REFERENCES `payment_methods` (`id`);

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_department_manager_foreign` FOREIGN KEY (`department_manager`) REFERENCES `users` (`id`);

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `files_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `invoices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_task`
--
ALTER TABLE `invoice_task`
  ADD CONSTRAINT `invoice_task_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices_backup` (`id`),
  ADD CONSTRAINT `invoice_task_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `messages_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD CONSTRAINT `permission_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_attributes`
--
ALTER TABLE `product_attributes`
  ADD CONSTRAINT `product_attributes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_task`
--
ALTER TABLE `product_task`
  ADD CONSTRAINT `product_task_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `product_task_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `provinces`
--
ALTER TABLE `provinces`
  ADD CONSTRAINT `provinces_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `quotes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quotes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recurring_invoices`
--
ALTER TABLE `recurring_invoices`
  ADD CONSTRAINT `recurring_invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recurring_invoices_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `recurring_quotes`
--
ALTER TABLE `recurring_quotes`
  ADD CONSTRAINT `recurring_quotes_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recurring_quotes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `states`
--
ALTER TABLE `states`
  ADD CONSTRAINT `states_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `tasks_source_type_foreign` FOREIGN KEY (`source_type`) REFERENCES `source_type` (`id`);

--
-- Constraints for table `task_user`
--
ALTER TABLE `task_user`
  ADD CONSTRAINT `task_user_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `task_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
