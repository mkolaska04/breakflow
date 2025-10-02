# breakflow

BreakFlow is an simple app designed to help users maintain a balanced lifestyle. It integrates features for tracking water intake and reminding users to take activity breaks during long work sessions, adapting recommendations based on individual body data.

## Features

*   **Body Data Input:** Users can input their height, weight, and age to personalize health metrics.
*   **Optimal Water Intake Calculation:** The application calculates an optimal daily water intake based on the user's weight.
*   **Water Consumption Tracker:** A visual interface allows users to track their daily water consumption in 250ml increments, with a notification upon reaching their daily goal.
*   **Activity Reminder:** BreakFlow provides an adjustable timer for work and activity intervals. It suggests optimal work/break ratios based on the user's Body Mass Index (BMI).
*   **Dark Mode Toggle:** A theme switch is available for users to alternate between light and dark modes.
*   **Local Storage:** User body data is saved locally to ensure persistence across sessions.

## Technologies Used

*   React
*   TypeScript
*   Tailwind CSS (for styling, implied by class names)
*   Material-UI Icons (for visual components)

## Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd BreakFlow
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

## Usage

1.  **Input Body Data:** On the main page, fill in your height, weight, and age in the provided form and submit. This data is used for calculating BMI and optimal water intake.
2.  **Track Water Intake:** Use the water cup icons to record your water consumption throughout the day. The goal is displayed and a modal notification will appear once the goal is met.
3.  **Manage Activity Reminders:** Adjust the session duration, work interval, and activity interval as needed. Start the session to begin the work/break timer. The timer will notify you when to switch between focused work and short activity breaks.
