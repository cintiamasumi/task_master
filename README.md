# Template API

A basic API template pre-configured with essential libraries and tools.

## 📦 Includes:
- Node
- Typescript
- Eslint
- CommitZen
- Husky
- Jest
- SuperTest


## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 22.11 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed



## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### 1️⃣  Install dependencies

#### Run the following command to install all required dependencies:
    
    npm install  


Alternatively, you can use yarn:
    
    yarn install
    

        
#### 2️⃣ Configure the environment variables

Create a .env file in the project's root directory. If you don't specify a PORT in the .env file, the default port will be set to 3000. Example:
    
    # Example .env file
    PORT=3000

#### 3️⃣  Start the development server

Run the following command to start the server in development mode:

    npm run dev

Test the default route by accessing:

    
    GET http://localhost:3000/

### 🧪 Running Tests

Run the following command to execute the test suite:

    npm test

The setup includes Jest for testing and SuperTest for API testing.

### 🛠️ Available Scripts

- npm run dev: Start the server in development mode

- npm run build: Compile the TypeScript files into the dist folder

- npm run start: Start the server in production mode (after building)

- npm run lint: Check and fix code style issues using ESLint

- npm run test: Run unit and integration tests using Jest

## 🤝 Contribution
Feel free to fork the repository and submit pull requests to improve this template. All contributions are welcome!