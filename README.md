# Video Game Collection Manager

Welcome to the **Video Game Collection Manager** repository! This project is dedicated to creating a web application that helps video game collectors manage their collections efficiently.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)
6. [Development Status](#development-status)
7. [Contribution Guidelines](#contribution-guidelines)

---

## Overview

This project is part of a two-repository system:

- **Frontend (this repo):** The main user interface for managing video game collections.
- **Backend (separate repo):** Provides API services. For more details, visit [Backend Repository](https://github.com/Alfredofh/game-collector).

The application aims to solve the common problems collectors face when inventorying their video game collections by automating data entry and providing an intuitive interface.

## Features

- **Collection Management:** Create and manage multiple collections.
- **Game Addition:** Add games to collections using:
  - Predictive search via a third-party API (currently integrated with IGDB, with plans to support additional APIs in the future).
  - Barcode scanning.
- **Data Import/Export:**
  - Import existing inventories from Excel files.
  - Export collections for backup or sharing.
- **Market Valuation:** (In development) Display the market value of collections.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-repo/video-game-collection-frontend.git
   cd video-game-collection-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the necessary keys (e.g., API keys for third-party services like IGDB).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Development Mode:**
  ```bash
  npm run dev
  ```
- **Run Tests:**
  ```bash
  npm run test
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## Technologies Used

- **Frontend Framework:** [Vite](https://vitejs.dev/)
- **State Management:** TBD
- **Third-party API Integration:** Currently using IGDB for game data retrieval (future plans to integrate additional APIs).
- **Barcode Scanning:** Using [QuaggaJS](https://github.com/serratus/quaggaJS) for barcode scanning

## Development Status

- **Current Progress:**
  - Collection management and game addition are functional.
- **In Progress:**
  - Market valuation is under development.
- **Not Yet Implemented:**
  - Import/export features.
- **Planned Enhancements:****
  - Add user authentication.
  - Enhance predictive search and barcode scanning capabilities.
  - Expand API integrations beyond IGDB.

---

If you have any suggestions or ideas, feel free to open an issue or reach out directly!

---

Happy collecting!

