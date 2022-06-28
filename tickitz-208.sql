-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 25, 2022 at 01:45 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz-208`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `schedule_id` int(20) NOT NULL,
  `total_ticket` int(11) NOT NULL,
  `total_payment` bigint(20) NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `status_payment` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booking_seat`
--

CREATE TABLE `booking_seat` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `seat` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `release_date` datetime NOT NULL,
  `director` varchar(255) NOT NULL,
  `synopsis` varchar(1000) NOT NULL,
  `casts` varchar(255) NOT NULL,
  `duration` varchar(200) NOT NULL,
  `categories` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `cover`, `release_date`, `director`, `synopsis`, `casts`, `duration`, `categories`, `created_at`, `updated_at`) VALUES
(1, 'Spirited Away', 'lionkin.pgn', '2022-04-20 00:00:00', 'haha', 'Studio gibli', 'Kaonashi', '125 minutes', 'Animation', '2022-06-24 05:22:25', NULL),
(2, 'Train to Busan', 'lionkin.pgn', '2022-05-20 00:00:00', 'haha', 'zombie', 'Gong Yoo', '125 minutes', 'action', '2022-06-24 07:12:08', NULL),
(3, 'Lion King', 'lionkin.pgn', '2022-01-20 00:00:00', 'haha', 'zombie', 'Simba', '90 minutes', 'Animation', '2022-06-24 07:12:39', NULL),
(4, 'Lion King', 'lionkin.pgn', '2022-02-20 00:00:00', 'haha', 'zombie', 'Simba', '90 minutes', 'Animation', '2022-06-24 07:13:06', NULL),
(5, 'Jigsaw', 'lionkin.pgn', '2022-02-20 00:00:00', 'haha', 'Psikopat', 'Simba', '100 minutes', 'Thiller', '2022-06-24 07:15:09', NULL),
(6, 'Wrong Turn', 'lionkin.pgn', '2022-02-20 00:00:00', 'haha', 'Psikopat', 'Simba', '100 minutes', 'Thiller', '2022-06-24 07:15:23', NULL),
(7, 'Divergent', 'tenet.png', '2022-02-15 00:00:00', 'Jacob', 'Dunia yang dibagi menjadi lima faksi yang dipercaya dapat menjaga kedamaian.', 'Four', '100 minutes', 'Action, Adventure', '2022-06-24 07:16:28', '2022-06-24 08:17:16'),
(8, 'Divergent', 'tenet.png', '2022-02-02 00:00:00', 'Louis', 'Dunia yang dibagi menjadi lima faksi yang dipercaya dapat menjaga kedamaian.', 'Four', '100 minutes', 'Action, Adventure', '2022-06-24 08:30:34', '2022-06-24 08:33:56');

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `id` int(11) NOT NULL,
  `county` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`id`, `county`) VALUES
(1, 'Purwokerto'),
(2, 'Solo'),
(3, 'Jogja');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` bigint(20) NOT NULL,
  `movie_id` int(20) NOT NULL,
  `cinema` varchar(255) NOT NULL,
  `location` int(255) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `movie_id`, `cinema`, `location`, `date`, `time`, `price`, `created_at`, `updated_at`) VALUES
(1, 5, 'hiflix', 1, '2022-06-20', '10:00,13:00,15:00', 10, '2022-06-24 14:33:29', NULL),
(2, 1, 'ebu.id', 1, '2022-06-19', '09:00,11:30,13:00', 10, '2022-06-24 14:36:19', '2022-06-24 17:02:44'),
(3, 5, 'ebu.id', 2, '2022-06-20', '09:00,11:30,13:00', 10, '2022-06-24 15:52:24', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `movie_id` (`movie_id`),
  ADD KEY `location` (`location`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`location`) REFERENCES `place` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
