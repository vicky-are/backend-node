-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2024 at 01:26 PM
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
-- Database: `backend_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `lz_chats`
--

CREATE TABLE `lz_chats` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `messages` text DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lz_chats`
--

INSERT INTO `lz_chats` (`id`, `conversation_id`, `user_id`, `messages`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 'Hi admin. could you help me for role access method', 1, '2024-08-19 07:41:12', '2024-08-19 07:41:12'),
(2, 1, 1, 'Sure.', 1, '2024-08-19 07:41:28', '2024-08-19 07:41:28');

-- --------------------------------------------------------

--
-- Table structure for table `lz_leads`
--

CREATE TABLE `lz_leads` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT '1',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lz_leads`
--

INSERT INTO `lz_leads` (`id`, `name`, `email`, `phone`, `address`, `image`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Sam', 'sam@gmail.com', '7887878777', 'address', '', '1', 1, '2024-08-18 16:40:17', '2024-08-19 05:51:19'),
(2, 'Henry', 'henry@gmil.com', '7987879787', 'no : 41 address', '6a8667c2fdc9b4654a1e821a52e813f8.jpeg', '1', 1, '2024-08-19 08:31:57', '2024-08-19 08:31:57');

-- --------------------------------------------------------

--
-- Table structure for table `lz_roles`
--

CREATE TABLE `lz_roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lz_roles`
--

INSERT INTO `lz_roles` (`id`, `role_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 1, '2024-08-18 16:36:53', '2024-08-18 16:36:53'),
(2, 'Team Leader', 1, '2024-08-18 16:37:02', '2024-08-18 16:37:02');

-- --------------------------------------------------------

--
-- Table structure for table `lz_role_permissions`
--

CREATE TABLE `lz_role_permissions` (
  `id` int(11) NOT NULL,
  `designation` int(11) DEFAULT NULL,
  `list_` int(11) DEFAULT 1,
  `save_` int(11) DEFAULT 1,
  `update_` int(11) DEFAULT 1,
  `delete_` int(11) DEFAULT 1,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lz_role_permissions`
--

INSERT INTO `lz_role_permissions` (`id`, `designation`, `list_`, `save_`, `update_`, `delete_`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 1, 1, '2024-08-18 16:36:53', '2024-08-18 16:36:53'),
(2, 2, 1, 1, 1, 1, 1, '2024-08-18 16:37:02', '2024-08-18 16:37:02'),
(3, 3, 1, 1, 1, 1, 1, '2024-08-19 09:08:15', '2024-08-19 09:08:15');

-- --------------------------------------------------------

--
-- Table structure for table `lz_user`
--

CREATE TABLE `lz_user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `designation` int(11) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lz_user`
--

INSERT INTO `lz_user` (`id`, `first_name`, `last_name`, `designation`, `phone`, `email`, `password`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'R', 1, 798978877, 'admin@demo.com', '$2b$10$SZ6LLzicjKJFNwucyTGNcOnIhQe6iG3q3G4EuZ.HyWUS7.4.t7D2a', '', 1, '2024-08-18 16:33:38', '2024-08-18 16:33:38'),
(2, 'Team leader', 'R', 2, 898989899, 'tl@demo.com', '$2b$10$SZ6LLzicjKJFNwucyTGNcOnIhQe6iG3q3G4EuZ.HyWUS7.4.t7D2a', '', 1, '2024-08-18 16:33:38', '2024-08-18 16:33:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lz_chats`
--
ALTER TABLE `lz_chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lz_leads`
--
ALTER TABLE `lz_leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lz_roles`
--
ALTER TABLE `lz_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lz_role_permissions`
--
ALTER TABLE `lz_role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lz_user`
--
ALTER TABLE `lz_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `lz_chats`
--
ALTER TABLE `lz_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lz_leads`
--
ALTER TABLE `lz_leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lz_roles`
--
ALTER TABLE `lz_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lz_role_permissions`
--
ALTER TABLE `lz_role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lz_user`
--
ALTER TABLE `lz_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
