-- Initialisation de la base de données iaexamen
CREATE DATABASE IF NOT EXISTS iaexamen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE iaexamen;

-- Table des utilisateurs (membres)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  avatar_url VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des examens passés par les utilisateurs
CREATE TABLE IF NOT EXISTS user_exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id VARCHAR(50) NOT NULL,
  module_id VARCHAR(50) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  total_questions INT NOT NULL,
  correct_answers_count INT NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT FALSE,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  answers JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_exams_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_course (user_id, course_id, module_id),
  INDEX idx_user_passed (user_id, passed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table de configuration globale du système
CREATE TABLE IF NOT EXISTS system_settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  setting_value VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


