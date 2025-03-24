# Conway's Game of Life 🧬

![Conway's Game of Life](client/src/assets/golgif.gif)

A cellular automaton devised by mathematician John Conway. This is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input.

## 🌐 Live Demo

https://gameoflife-sand.vercel.app/

## 🌟 Features

* 🎮 Interactive game board with clickable cells
* 🔄 Watch generations evolve in real-time
* 💾 Save and load your favorite patterns
* 🎲 Randomize board for unexpected patterns
* ⏯️ Control evolution with single steps or continuous streaming
* 📱 Responsive design for both desktop and mobile

## 🏗️ Architecture Overview

This application is a full-stack implementation of Conway's Game of Life with a clear separation of concerns:

* **🖥️ Frontend**: React SPA built with Vite
* **🖧 Backend**: Node.js with Express
* **📡 Data Flow**: Server-Sent Events (SSE) for real-time board evolution
* **🗄️ State Management**: File-based storage with React Query for client-side caching

## 🛠️ Technology Stack

### Frontend
* **⚛️ React 18** with Hooks
* **🔄 React Query** for data fetching and state management
* **🔌 Axios** for API requests
* **⚡ Vite** for build tooling

### Backend
* **🟢 Node.js** with Express
* **📶 Server-Sent Events** for streaming board evolution
* **📂 File-based state persistence** (with UUID generation)

## 🔄 Application Flow

### 🚀 Initialization
* User can create a custom board by toggling cells or use randomization
* Board initialization is sent to the server via POST request
* Server stores the initial board state

### ⏯️ Evolution
* User can either:
  * Request a single evolution step via the "Evolve" button
  * Request multiple generations via the "Start" button
* For single evolution, a simple POST request is made
* For multiple generations, an SSE connection is established

### 📡 Streaming Updates
* Server calculates each new generation
* Board state is streamed back to client (every 100ms)
* React Query efficiently updates the UI
* Evolution stops when max generations is reached or the board becomes stable

### 💾 Save & Load
* Game states can be saved with custom names or auto-generated UUIDs
* Saved games are persisted to the server's file system
* User can load previously saved games

## 🏗️ Project Structure

```
project/
├── client/            # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── assets/      # Static assets
│   │   └── utils/       # Helper functions
│   └── ...
└── server/            # Node.js backend
    ├── controllers/   # Request handlers
    ├── services/      # Game logic
    ├── routes/        # API endpoints
    ├── middleware/    # Express middleware
    ├── state/         # State management
    └── utils/         # Utility functions
```

## 🧩 Key Components

* **Board**: Displays the cellular grid
* **Controls**: Interface for game actions
* **GameLoadAndSaveControls**: Manages persistence
* **useGameBoard**: Custom hook for game logic

## 🎮 Game Logic

The Conway's Game of Life follows these simple rules:

```javascript
const evolveBoard = (currentBoard) => {
  // For each cell:
  // 1. Live cell with <2 neighbors dies (underpopulation)
  // 2. Live cell with 2-3 neighbors survives
  // 3. Live cell with >3 neighbors dies (overpopulation)
  // 4. Dead cell with exactly 3 neighbors becomes alive (reproduction)
}
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version v20.9.0 or higher)
- [Git](https://git-scm.com/)

### Installation

Follow these steps to clone the repository and install the necessary dependencies:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/michaelmichaeli/gameoflife.git
   cd gameoflife
   ```
   
2. **Go to server directory:**
   
   ```sh
   cd server
   npm install
   ```
   
3. **Go to client directory:**
   
   ```sh
   cd..
   cd client
   npm install
   ```

### Run

Follow these steps to run the app:

1. **In server directory:**
   ```sh
   node index.js
   ```
2. **In client directory:**
   ```sh
   npm run dev
   ```

## 🎯 How to Play

Enjoy playing with the board of the game:
   * 💾 Play with loading saved game boards and save new game boards.
   * 🎲 Randomize the board for unexpected patterns.
   * 🚀 Press the initialize button to send to the server your game board as generation 0.
   * ⏯️ Evolve the board, once or as many times as you wish.
   * 🎬 Get to watch your game board evolve in time.
