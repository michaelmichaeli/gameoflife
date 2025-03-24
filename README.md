# Conway's Game of Life

![Conway's Game of Life](client/src/assets/golgif.gif)

A cellular automaton devised by mathematician John Conway. This is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input.

# Live Demo

https://gameoflife-sand.vercel.app/

## Project Overview

This application is a full-stack implementation of Conway's Game of Life. It features a React frontend with a Node.js/Express backend that handles the game's logic and state management.

### Architecture

- **Frontend**: React SPA built with Vite
- **Backend**: Node.js with Express
- **Data Flow**: Server-Sent Events (SSE) for real-time board evolution
- **State Management**: File-based storage with React Query for client-side caching

### Technology Stack

#### Frontend
- React 18 with Hooks
- React Query for data fetching and state management
- Axios for API requests
- Vite for build tooling

#### Backend
- Node.js with Express
- Server-Sent Events for streaming board evolution
- File-based state persistence (with UUID generation)

### Application Flow

1. **Board Creation**: Create a custom board by toggling cells or use randomization
2. **Initialization**: Send the board to the server to start the game
3. **Evolution**: 
   - Request single evolution steps or
   - Stream multiple generations with real-time updates
4. **Save & Load**: Persist and retrieve game states

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

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
   
4. **Go to client directory:**
   
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

### Have Fun
Enjoy playing with the board of the game:
   * Play with loading saved game boards and save new game borads.
   * Randomize the board.
   * Press the initialize button to send to the server your game board as generation 0.
   * Evolve the board, once or as many times as you wish.
   * Get to watch your game board evolve in time.
