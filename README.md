# captcha-solver-test

## Summary
This web application provides a comprehensive interface for testing and interacting with various captcha verification methods. It allows users to switch between different security challenges while tracking their performance through real-time session statistics.

Project Deployed at: https://Kr-Adarsh.github.io/captcha-solver-test/

## Features
*   **Multiple Captcha Modes**: Support for Math, Text-based Canvas, and Slider-based verification.
*   **Dynamic Switching**: A dropdown menu allows seamless transitions between captcha types without page reloads.
*   **Session Tracking**: Persistent counters for successful and failed attempts during the current user session.
*   **Security Simulations**: Includes visual noise and distortion for text captchas and tolerance ranges for slider captchas.
*   **Responsive Design**: Fully functional across desktop and mobile browsers.

## Setup
*   This application is a static web project consisting of HTML, CSS, and JavaScript.
*   To run the project locally, clone the repository to your machine.
*   Open the `index.html` file directly in any modern web browser.
*   No external dependencies, servers, or build tools are required.

## Usage
1.  Select the desired captcha type from the dropdown menu located at the top of the interface.
2.  **Math Captcha**: Calculate the result of the random arithmetic expression and enter it into the input field.
3.  **Text Captcha**: Observe the distorted alphanumeric string rendered on the canvas and type the characters exactly as shown.
4.  **Slider Captcha**: Click and drag the slider handle to the target position indicated on the track. Release it within the acceptable tolerance range.
5.  Click the "Verify" or "Submit" button to check your answer.
6.  View the "Success" and "Failure" counters at the bottom to track your session progress.

## Implementation Details
*   **Technical Stack**: Built using standard HTML5, CSS3, and Vanilla JavaScript.
*   **Logic**: The application uses a central state management system to track the current captcha type and session scores.
*   **Canvas Rendering**: The Text Captcha utilizes the HTML5 Canvas API to apply rotations, font variations, and random noise lines to prevent simple OCR bypass.
*   **Validation**: Each captcha type has a specific validation logic—mathematical equality for Math, string comparison for Text, and coordinate proximity for the Slider.

## Code Structure
*   **UI Layer**: HTML structure defines the containers for the three captcha types and the statistics dashboard.
*   **Styling**: CSS handles the layout, the visual "noise" of the canvas, and the interactive states of the slider.
*   **Core Logic**: JavaScript functions handle the generation of random challenges, the event listeners for user input, and the logic for updating session statistics.
*   **State Management**: Functions are used to reset and re-render the UI whenever the captcha type is changed or a verification attempt is completed.

## Evaluation Criteria
*   There are three captcha types selectable via dropdown
*   Math captcha works with random problems
*   Text captcha renders distorted text on a Canvas element
*   Slider captcha requires dragging to a target position
*   Session stats for success and failure counts are visible

## License
*This project is licensed under the MIT License*

> Note: Generated and automatically deployed using <a href="https://github.com/Kr-Adarsh/Automated-LLM-Code-Deployment/">Kr-Adarsh/Automated-LLM-Code-Deployment</a>.