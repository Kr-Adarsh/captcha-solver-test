document.addEventListener('DOMContentLoaded', () => {
    const captchaText = document.getElementById('captcha-text');
    const userInput = document.getElementById('user-input');
    const verifyBtn = document.getElementById('verify-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const messageDisplay = document.getElementById('message');

    let currentAnswer = 0;

    /**
     * Generates a random math problem and updates the UI
     */
    function generateCaptcha() {
        // Generate two random numbers between 1 and 20
        const num1 = Math.floor(Math.random() * 15) + 1;
        const num2 = Math.floor(Math.random() * 15) + 1;
        
        // Randomly choose an operator (+, -, or *)
        const operators = ['+', '-', '*'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let problemText = '';
        
        switch (operator) {
            case '+':
                currentAnswer = num1 + num2;
                problemText = `${num1} + ${num2}`;
                break;
            case '-':
                // Ensure result isn't negative for simplicity, though not strictly required
                const max = Math.max(num1, num2);
                const min = Math.min(num1, num2);
                currentAnswer = max - min;
                problemText = `${max} - ${min}`;
                break;
            case '*':
                // Keep multiplication numbers smaller for user convenience
                const smallNum1 = Math.floor(Math.random() * 10) + 1;
                const smallNum2 = Math.floor(Math.random() * 10) + 1;
                currentAnswer = smallNum1 * smallNum2;
                problemText = `${smallNum1} × ${smallNum2}`;
                break;
        }

        captchaText.textContent = `${problemText} = ?`;
        userInput.value = '';
    }

    /**
     * Displays a message to the user
     * @param {string} text - The message text
     * @param {string} type - 'success' or 'error'
     */
    function showMessage(text, type) {
        messageDisplay.textContent = text;
        messageDisplay.className = `message ${type}`;
    }

    /**
     * Validates the user's input
     */
    function verifyCaptcha() {
        const val = userInput.value.trim();
        
        if (val === '') {
            showMessage('Please enter an answer.', 'error');
            return;
        }

        const userValue = parseInt(val, 10);

        if (userValue === currentAnswer) {
            showMessage('Verification Successful! You are human.', 'success');
            // Optional: disable inputs after success
            userInput.disabled = true;
            verifyBtn.disabled = true;
            refreshBtn.disabled = true;
        } else {
            showMessage('Incorrect answer. Please try again.', 'error');
            // Refresh captcha on wrong answer as per requirements
            generateCaptcha();
            userInput.focus();
        }
    }

    // Event Listeners
    verifyBtn.addEventListener('click', verifyCaptcha);

    refreshBtn.addEventListener('click', () => {
        generateCaptcha();
        messageDisplay.className = 'message'; // Hide message
        userInput.focus();
    });

    // Allow pressing "Enter" to submit
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyCaptcha();
        }
    });

    // Initial generation
    generateCaptcha();
});