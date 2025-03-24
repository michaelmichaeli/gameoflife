# Conway's Game of Life

![Conway's Game of Life](client/src/assets/golgif.gif)

A cellular automaton devised by mathematician John Conway. This is a zero-player game, meaning its evolution is determined by its initial state, requiring no further input.

# Live Demo

https://gameoflife-sand.vercel.app/

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
