
# User Management Dashboard - Frontend

This is the frontend repository for the User Management Dashboard, built using React.js and Tailwind CSS.

## Tech Stack

- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Declarative routing for React.js applications.

## Project Structure

The project follows a simple structure:

- **src/components/AccountCreation**: Contains components related to the Account Creation tab.
- **src/components/UserDetails**: Components for the User Details tab.
  - **userModals**: Popups/modals for user-related actions.
  - **userDetails**: Components to display user information.
- **src/components/MainDash**: Main dashboard components.

## Implementation Details

### 1. User Details Tab

- User information is fetched from a placeholder database.
- A searchable table displays user information, including Username, Email, Phone, ID, and Creation date.
- Clicking on a user opens a popup/modal with a button to generate a report for the selected user.

### 2. Account Creation Tab

- A form with fields for username and password is implemented.
- Dummy request handling is in place upon form submission.

### 3. Dashboard Interface

- The dashboard features two tabs: User Details and Account Creation.
- The layout is designed to be clean and intuitive.

### 4. Search Functionality

- Efficient search functionality is implemented using `useMemo`.
- React Router is utilized for navigation between tabs.

### 5. Styling

- Styling is done using Tailwind CSS, ensuring a responsive and visually appealing user interface.

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd frontend

2. install dependencies:

   npm install


3. Run the development server:

    npm start


Open your browser and navigate to http://localhost:3000.

(if facing error in installing dependencies use npm i --force)
