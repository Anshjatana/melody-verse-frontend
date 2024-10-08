# MelodyVerse Frontend

Welcome to the MelodyVerse frontend repository! This project is the client-side application of the MelodyVerse music streaming platform. It features a sleek, modern design with a focus on usability and responsiveness.

## Live Site

You can view the live version of the website at: [MelodyVerse](https://melodyverse-ansh.netlify.app)

## Key Features

- **Homepage**: Includes a navigation bar with login and signup buttons.
- **Protected Routes**: Utilizes Next.js middleware to manage protected routes:
  - **Token Verification**: Ensures that tokens are present in cookies.
  - **Profile Route**: If a user tries to access the `/profile` route without a valid token, they are redirected to the `/login` page.
- **State Management**: Utilizes Zustand for efficient state management.
- **Validation**: Implemented validation for user input.
- **React Libraries**: Integrated several libraries including `react-hot-toast` for notifications.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Zustand**: A small, fast state management library for React.
- **React Libraries**: Various libraries to enhance functionality and user experience.

## Getting Started

To get started with the development of this project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/melodyverse-frontend.git
   cd melodyverse-frontend
   npm install
   npm run dev
