-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2024 at 08:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `merch-shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT 0,
  `cost` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`ID`, `user_ID`, `is_paid`, `cost`) VALUES
(87, 33, 1, 100),
(88, 33, 1, 100),
(89, 33, 1, 25),
(91, 35, 0, 50);

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

CREATE TABLE `cart_item` (
  `ID` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `size` varchar(2) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`ID`, `cart_id`, `item_id`, `size`, `quantity`) VALUES
(237, 87, 5, 'L', 3),
(238, 87, 1, 'M', 1),
(239, 88, 2, 'M', 4),
(240, 89, 1, 'M', 1),
(242, 91, 1, 'M', 1),
(243, 91, 2, 'M', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `category` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID`, `category`) VALUES
(0, 'ostalo'),
(1, 'majice'),
(2, 'hlače');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `ID` int(11) NOT NULL,
  `image` varchar(200) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`ID`, `image`, `item_id`) VALUES
(1, 'assets/images/girlslovesbl.jpg', 1),
(2, 'assets/images/girlslovesbl1.jpeg', 1),
(3, 'assets/images/girlslovesbl2.jpeg', 1),
(4, 'assets/images/hocemojos.jpg', 2),
(5, 'assets/images/hocemojos1.jpg', 2),
(6, 'assets/images/hocemojos3.jpg', 2),
(7, 'assets/images/hocemojos2.jpg', 2),
(8, 'assets/images/baraka22.jpg', 3),
(9, 'assets/images/kset23.jpg', 5),
(10, 'assets/images/shpaolean.jpg', 6),
(11, 'assets/images/hlace.jpg', 7);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `ID` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `category_id` int(10) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`ID`, `name`, `price`, `category_id`, `description`) VALUES
(1, 'GIRLS <3 SBL', 25, 1, NULL),
(2, 'HOĆEMO JOŠ!', 25, 1, NULL),
(3, 'Baraka 2022', 25, 1, NULL),
(5, 'BAKS & SBL', 25, 1, NULL),
(6, 'Shpaolean', 25, 1, NULL),
(7, 'Pattern Hlače', 40, 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `ID` int(11) NOT NULL,
  `model` varchar(200) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`ID`, `model`, `item_id`) VALUES
(1, 'assets/models/girlslovesbl/scene.gltf', 1),
(2, 'assets/models/hocemojos/scene.gltf\r\n', 2),
(3, 'assets/models/baraka22/scene.gltf\r\n', 3),
(5, 'assets/models/kset23/scene.gltf', 5),
(6, 'assets/models/shpaolean/scene.gltf', 6),
(7, 'assets/models/hlace/scene.gltf\r\n', 7);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `cart_id`) VALUES
(16, 33, 87),
(17, 33, 88),
(18, 33, 89);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `address` varchar(200) NOT NULL,
  `city` varchar(85) NOT NULL,
  `postal_code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `email`, `firstname`, `lastname`, `password`, `role`, `address`, `city`, `postal_code`) VALUES
(21, 'admin@admin.hr', 'admin', 'admin', '$2b$10$nN21wItPwu75IFZLAUnqreGNd5ZXaoK7dq1gT6tx2mBMgrQmssOzC', 'admin', 'Frankopanska 106, Husain', 'Kutina', '44320'),
(33, 'mavvid44@gmail.com', 'David', 'Mikulić', '$2b$10$KwGrPD2pkNhfgCaT9Wn0hO4aRpPDTpHB0DLSn7pCd4niwK16kXpDC', '0', 'Frana Krste Frankopana 106, Husain', 'Kutina', '44320'),
(34, 'blanka.kt7@gmail.com', 'Blanka', 'Burigo-Mikulić', '$2b$10$LSTe1g05PGR.QILFBehVaOwZNd0YN1BSAMLiJaPEFmcztKXZ4mdWW', '0', 'Frana Krste Frankopana 106, Husain', 'Kutina', '44320'),
(35, 'imen@gmail.com', 'Imen', 'Prezimenović', '$2b$10$6fe6/QwsGjCfKvDigPkj6uoNBgPWmryAK/SefX9NgRquKzr93DNb.', '0', 'Ulica cara Hardijana 10b', 'Osijek', '31000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=244;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
