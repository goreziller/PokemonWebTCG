-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 17. Okt 2024 um 12:37
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `spieler`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `ID` int(11) NOT NULL,
  `BenutzerName` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `Vorname` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `Nachname` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `Geburtstag` date NOT NULL,
  `Email` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `Passwort` varchar(128) COLLATE latin1_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Daten für Tabelle `benutzer`
--

INSERT INTO `benutzer` (`ID`, `BenutzerName`, `Vorname`, `Nachname`, `Geburtstag`, `Email`, `Passwort`) VALUES
(1, 'Test', 'Test', 'Test2', '2024-10-02', 'werwer@web.de', '$2y$10$YS4FWfX4T7W/NWnPRHbNiOcQv8Wq5S3r94ZFyRI9UP6SS4MuWV/eq'),
(2, 'Gamer', 'Patrick', 'Fuchs', '2024-09-06', 'aewqr@web.de', '$2y$10$D.5PVblp048SMaag9QfHWuLbYBouUxC3wPZn7gbfoZ5Us0a0EIcyq');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzerpokemonkarten`
--

CREATE TABLE `benutzerpokemonkarten` (
  `BenutzerNr` int(11) NOT NULL,
  `PokemonKartenNr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Daten für Tabelle `benutzerpokemonkarten`
--

INSERT INTO `benutzerpokemonkarten` (`BenutzerNr`, `PokemonKartenNr`) VALUES
(2, 15),
(2, 16),
(1, 17),
(1, 18),
(1, 19),
(2, 20);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pokemon`
--

CREATE TABLE `pokemon` (
  `ID` int(11) NOT NULL,
  `Name` varchar(32) COLLATE latin1_general_ci NOT NULL,
  `Bild` blob NOT NULL,
  `Hp` int(11) NOT NULL,
  `Attack` int(11) NOT NULL,
  `Defense` int(11) NOT NULL,
  `Speed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Daten für Tabelle `pokemon`
--

INSERT INTO `pokemon` (`ID`, `Name`, `Bild`, `Hp`, `Attack`, `Defense`, `Speed`) VALUES
(15, 'lickitung', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3130382e706e67, 90, 55, 75, 30),
(16, 'roserade', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3430372e706e67, 60, 70, 65, 90),
(17, 'steelix', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3230382e706e67, 75, 85, 200, 30),
(18, 'manectric', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3331302e706e67, 70, 75, 60, 105),
(19, 'combee', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3431352e706e67, 30, 30, 42, 70),
(20, 'skiploom', 0x68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f506f6b654150492f737072697465732f6d61737465722f737072697465732f706f6b656d6f6e2f3138382e706e67, 55, 45, 50, 80);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `BenutzerName` (`BenutzerName`);

--
-- Indizes für die Tabelle `benutzerpokemonkarten`
--
ALTER TABLE `benutzerpokemonkarten`
  ADD KEY `BenutzerNr` (`BenutzerNr`),
  ADD KEY `PokemonKartenNr` (`PokemonKartenNr`);

--
-- Indizes für die Tabelle `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `pokemon`
--
ALTER TABLE `pokemon`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `benutzerpokemonkarten`
--
ALTER TABLE `benutzerpokemonkarten`
  ADD CONSTRAINT `benutzerpokemonkarten_ibfk_1` FOREIGN KEY (`BenutzerNr`) REFERENCES `benutzer` (`ID`),
  ADD CONSTRAINT `benutzerpokemonkarten_ibfk_2` FOREIGN KEY (`PokemonKartenNr`) REFERENCES `pokemon` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
