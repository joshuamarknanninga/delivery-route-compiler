# Delivery Route Compiler

![Delivery Route Compiler](https://via.placeholder.com/800x400?text=Delivery+Route+Compiler+Screenshot)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Obtain Google Maps API Key](#obtain-google-maps-api-key)
  - [Setup Server](#setup-server)
  - [Setup Client](#setup-client)
- [Usage](#usage)
  - [Running the Application Locally](#running-the-application-locally)
  - [Adding Addresses](#adding-addresses)
  - [Optimizing Routes](#optimizing-routes)
  - [Exporting to Spreadsheet](#exporting-to-spreadsheet)
  - [Using Voice Commands](#using-voice-commands)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Delivery Route Compiler** is a Progressive Web App (PWA) built with React that assists delivery personnel in compiling and optimizing delivery addresses. It generates the fastest delivery route, lists addresses in delivery order, allows audibly checking off delivered addresses, and exports the delivery list to a color-coded spreadsheet. The application is designed to be operable on mobile devices and supports voice commands for hands-free operation.

## Features

- **Address Management:**
  - Compile and manage delivery addresses.
  - Add new addresses via form or voice commands.
  - Update address status (delivered, not delivered, left notice).

- **Route Optimization:**
  - Generate the fastest delivery route using Google Maps Directions API.
  - Optimize the order of addresses for efficient delivery.

- **Audible Interaction:**
  - Use voice commands to add addresses and mark deliveries.
  - Receive audible confirmations for actions performed.

- **Export Functionality:**
  - Export the list of addresses to a spreadsheet (`.xlsx`).
  - Color-code addresses based on delivery status:
    - **Red:** Not delivered.
    - **Green:** Delivered.
    - **Yellow:** Left notice.

- **Map Integration:**
  - Visualize delivery routes on an interactive Google Map.
  - Display markers for each address with numbering.

- **Responsive Design:**
  - Optimized for both desktop and mobile devices.
  - Installable as a PWA for offline support and native app-like experience.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/) - JavaScript library for building user interfaces.
  - [Semantic UI React](https://react.semantic-ui.com/) - UI framework for styling components.
  - [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api) - Google Maps integration for React.
  - [XLSX](https://github.com/SheetJS/sheetjs) - Library for exporting data to spreadsheets.
  - [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Library for saving files on the client-side.
  
- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](https://expressjs.com/) - Web framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing addresses.
  - [Mongoose](https://mongoosejs.com/) - ODM for MongoDB.
  - [Axios](https://axios-http.com/) - HTTP client for making API requests.
  
- **APIs:**
  - [Google Maps API](https://developers.google.com/maps/documentation) - For geocoding, directions, and map rendering.

- **Others:**
  - [dotenv](https://github.com/motdotla/dotenv) - For managing environment variables.
  - [Nodemon](https://nodemon.io/) - Utility for automatically restarting the server during development.

## File Structure

```
delivery-route-compiler/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddressList.js
│   │   │   ├── AddressForm.js
│   │   │   ├── RouteMap.js
│   │   │   └── VoiceCommands.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── serviceWorker.js
│   ├── package.json
│   └── .env
├── server/
│   ├── controllers/
│   │   └── routeController.js
│   ├── models/
│   │   └── Address.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── utils/
│   │   └── routeOptimizer.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── README.md
└── .gitignore
```

## Installation

Follow these steps to set up the **Delivery Route Compiler** on your local machine.

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **Yarn**
- **MongoDB** instance (local or cloud-based, e.g., [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Google Maps API Key** with the following APIs enabled:
  - Maps JavaScript API
  - Geocoding API
  - Directions API

### Clone the Repository

```bash
git clone https://github.com/yourusername/delivery-route-compiler.git
cd delivery-route-compiler
```

### Obtain Google Maps API Key

1. **Create a Google Cloud Account:**
   - Visit the [Google Cloud Console](https://console.cloud.google.com/).
   - Sign up or log in with your Google account.
   
2. **Create a New Project:**
   - Click on the project dropdown and select "New Project."
   - Name your project (e.g., `DeliveryRouteCompiler`).
   - Click "Create."

3. **Enable Required APIs:**
   - Navigate to **APIs & Services** > **Library**.
   - Enable the following APIs:
     - Maps JavaScript API
     - Geocoding API
     - Directions API

4. **Generate API Key:**
   - Go to **APIs & Services** > **Credentials**.
   - Click **Create Credentials** > **API Key**.
   - Copy the generated API key.
   - **Restrict the API Key**:
     - **Application Restrictions**:
       - For **Client-Side**: HTTP referrers (e.g., `http://localhost:3000/*` for development, your production domain for deployment).
       - For **Server-Side**: IP addresses (your server's IP).
     - **API Restrictions**:
       - Restrict the key to the specific APIs enabled above.
   - **Note**: It's recommended to create separate API keys for client and server to apply appropriate restrictions.

### Setup Server

1. **Navigate to the Server Directory:**

   ```bash
   cd server
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```
   
   Or, using Yarn:
   
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `server/` directory:

   ```env
   PORT=5000
   GOOGLE_MAPS_API_KEY=your_server_side_google_maps_api_key
   MONGO_URI=your_mongodb_connection_string
   ```

   - **`GOOGLE_MAPS_API_KEY`**: Your server-side Google Maps API key.
   - **`MONGO_URI`**: Your MongoDB connection string (e.g., from MongoDB Atlas).

4. **Start the Server:**

   ```bash
   npm start
   ```
   
   Or, using Nodemon for development:
   
   ```bash
   npm run dev
   ```

   The server should now be running on `http://localhost:5000`.

### Setup Client

1. **Open a New Terminal Window/Tab.**

2. **Navigate to the Client Directory:**

   ```bash
   cd client
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```
   
   Or, using Yarn:
   
   ```bash
   yarn install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the `client/` directory:

   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_client_side_google_maps_api_key
   REACT_APP_SERVER_URL=http://localhost:5000
   ```

   - **`REACT_APP_GOOGLE_MAPS_API_KEY`**: Your client-side Google Maps API key.
   - **`REACT_APP_SERVER_URL`**: URL of your backend server.

5. **Start the Client:**

   ```bash
   npm start
   ```
   
   Or, using Yarn:
   
   ```bash
   yarn start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

Once the application is up and running, you can utilize its features as follows:

### Running the Application Locally

1. **Start Backend Server:**

   Ensure the backend server is running on `http://localhost:5000`.

   ```bash
   cd server
   npm start
   ```

2. **Start Frontend Client:**

   Ensure the frontend client is running on `http://localhost:3000`.

   ```bash
   cd client
   npm start
   ```

3. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000`.

### Adding Addresses

1. **Using the Address Form:**
   - Enter the delivery address in the input field.
   - Click the "Add" button to add the address to the list.

2. **Using Voice Commands:**
   - Click the microphone icon (if available) or ensure your browser supports voice commands.
   - Speak commands such as:
     - **"Add address 123 Main Street"** to add a new address.
     - **"Mark delivered 1"** to mark the first address as delivered.

### Optimizing Routes

- Click the "Optimize Route" button to generate the fastest delivery route based on the entered addresses. The optimized route will be displayed on the map, and addresses will be reordered accordingly.

### Exporting to Spreadsheet

- Click the "Export to Spreadsheet" button to download the list of addresses in a `.xlsx` file. The spreadsheet will include:
  - **Number:** Order of delivery.
  - **Address:** Delivery address.
  - **Status:** Delivery status with color-coding:
    - **Red:** Not delivered.
    - **Green:** Delivered.
    - **Yellow:** Left notice.

### Using Voice Commands

- **Adding Addresses:**
  - Say "Add address [Address]" (e.g., "Add address 456 Elm Street") to add a new address.

- **Marking Deliveries:**
  - Say "Mark delivered [Number]" (e.g., "Mark delivered 2") to mark the second address as delivered.

- **Audible Feedback:**
  - The application will provide audible confirmations for actions performed.

## Deployment

To deploy the application to a production environment, follow these steps:

### Backend Deployment

1. **Choose a Hosting Platform:**
   - Options include [Heroku](https://www.heroku.com/), [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/), [DigitalOcean](https://www.digitalocean.com/), etc.

2. **Configure Environment Variables:**
   - Set `PORT`, `GOOGLE_MAPS_API_KEY`, and `MONGO_URI` as environment variables on your hosting platform.

3. **Deploy the Server:**
   - Follow the hosting platform's instructions to deploy your Express server.

### Frontend Deployment

1. **Choose a Hosting Platform:**
   - Options include [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [GitHub Pages](https://pages.github.com/), etc.

2. **Build the React App:**

   ```bash
   cd client
   npm run build
   ```

   This will create an optimized production build in the `client/build` directory.

3. **Deploy the Build Folder:**
   - Follow the hosting platform's instructions to deploy the contents of the `build` folder.

4. **Configure Environment Variables:**
   - Ensure `REACT_APP_GOOGLE_MAPS_API_KEY` and `REACT_APP_SERVER_URL` are set appropriately for the production environment.

### Ensuring HTTPS

- For PWA features and voice functionalities, ensure your application is served over HTTPS.

## File Structure

```
delivery-route-compiler/
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddressList.js
│   │   │   ├── AddressForm.js
│   │   │   ├── RouteMap.js
│   │   │   └── VoiceCommands.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── serviceWorker.js
│   ├── package.json
│   └── .env
├── server/
│   ├── controllers/
│   │   └── routeController.js
│   ├── models/
│   │   └── Address.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── utils/
│   │   └── routeOptimizer.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── README.md
└── .gitignore
```

### Client Directory

- **public/**: Contains the HTML template and PWA manifest.
  - `index.html`: The main HTML file where the React app mounts.
  - `manifest.json`: Configuration for the PWA.

- **src/**: Contains the React application's source code.
  - **components/**: Reusable React components.
    - `AddressList.js`: Displays the list of addresses.
    - `AddressForm.js`: Form to add new addresses.
    - `RouteMap.js`: Displays the optimized route on Google Maps.
    - `VoiceCommands.js`: Handles voice interactions.
  - **services/**:
    - `api.js`: Handles API requests to the backend.
  - `App.js`: The main React component.
  - `index.js`: Entry point of the React application.
  - `serviceWorker.js`: Registers the service worker for PWA capabilities.

- **package.json**: Lists client dependencies and scripts.

- **.env**: Stores client-side environment variables (e.g., Google Maps API key).

### Server Directory

- **controllers/**:
  - `routeController.js`: Handles business logic for routes and addresses.

- **models/**:
  - `Address.js`: Mongoose schema for addresses.

- **routes/**:
  - `apiRoutes.js`: Defines API endpoints.

- **utils/**:
  - `routeOptimizer.js`: Contains functions for geocoding and route optimization using Google Maps API.

- `server.js`: Entry point of the backend server.

- **package.json**: Lists server dependencies and scripts.

- **.env**: Stores server-side environment variables (e.g., Google Maps API key, MongoDB URI).

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository:**

   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/yourusername/delivery-route-compiler.git
   cd delivery-route-compiler
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes:**

   Implement your feature or bug fix.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Create a Pull Request:**

   Navigate to the original repository and click "Compare & pull request."

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or suggestions, please contact:

- **Joshua Marknanninga**
- **Email:** [joshua.marknanninga@example.com](mailto:joshua.marknanninga@example.com)
- **LinkedIn:** [linkedin.com/in/joshuamarknanninga](https://linkedin.com/in/joshuamarknanninga)

---