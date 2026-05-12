# captcha-solver-test

## Summary
This web application provides a simple and effective math-based captcha verification system designed to distinguish human users from automated scripts. It generates random arithmetic challenges that users must solve to successfully verify their session.

Project Deployed at: https://Kr-Adarsh.github.io/captcha-solver-test/

## Features
*   **Dynamic Problem Generation:** Automatically creates a new math problem every time the page loads or resets.
*   **Instant Validation:** Provides immediate feedback upon clicking the verify button.
*   **Visual Feedback:** Uses color-coded messages (green for success, red for error) to communicate status.
*   **Auto-Reset Logic:** Automatically generates a new challenge following an incorrect submission to enhance security.
*   **Manual Refresh:** Includes a dedicated button to skip the current captcha and generate a new one without submitting.

## Setup
*   This application is a static HTML page and does not require any backend server or external dependencies.
*   To run the project locally, clone the repository or download the source files.
*   Open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, or Edge).

## Usage
1.  Navigate to the application URL to see a randomly generated math problem (e.g., "5 + 3 = ?").
2.  Type the correct numerical answer into the input field.
3.  Click the **Verify** button to check your answer.
4.  If the answer is correct, a green success message will be displayed.
5.  If the answer is incorrect, a red error message will appear, and the captcha will automatically refresh with a new problem.
6.  If the current problem is difficult to read or solve, click the **Refresh** button to generate a new math problem manually.

## Implementation Details
*   **Tech Stack:** Built using standard HTML5, CSS3 for styling, and Vanilla JavaScript for logic.
*   **Logic Flow:** The application uses JavaScript's `Math.random()` function to pick two integers between 1 and 10. The sum is calculated and stored as the "correct answer." When the user submits, the input is compared against this stored value.
*   **Styling:** Responsive CSS ensures the captcha interface is centered and usable on both desktop and mobile devices.

## Code Structure
*   **HTML Structure:** Contains the container for the math problem display, the text input for the user's answer, and the action buttons (Verify and Refresh).
*   **State Management:** JavaScript variables track the current numbers and the expected result.
*   **Event Handlers:** Functions are attached to the "Verify" button for validation logic and the "Refresh" button for re-triggering the generation logic.
*   **DOM Manipulation:** JavaScript is used to update the text content of the captcha display and the visibility/color of the feedback messages.

## Evaluation Criteria
*   Captcha generates a random math problem on page load
*   Correct answer shows a success message
*   Wrong answer shows an error and refreshes the captcha
*   There is a refresh button to get a new captcha

## License
This project is licensed under the MIT License - Kradarsh

> Note: Generated and automatically deployed using <a href="https://github.com/Kr-Adarsh/Automated-LLM-Code-Deployment/">Kr-Adarsh/Automated-LLM-Code-Deployment</a>.