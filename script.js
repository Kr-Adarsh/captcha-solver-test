document.addEventListener('DOMContentLoaded', () => {
    // State
    let successCount = 0;
    let failureCount = 0;
    let currentCaptchaData = null;
    let sliderPosition = 0;
    let isDragging = false;

    // DOM Elements
    const typeSelector = document.getElementById('captchaTypeSelector');
    const displayArea = document.getElementById('captchaDisplayArea');
    const inputArea = document.getElementById('inputArea');
    const captchaInput = document.getElementById('captchaInput');
    const verifyBtn = document.getElementById('verifyBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const feedback = document.getElementById('feedback');
    const successDisplay = document.getElementById('successCount');
    const failureDisplay = document.getElementById('failureCount');

    // Initialize
    initCaptcha();

    // Event Listeners
    typeSelector.addEventListener('change', initCaptcha);
    refreshBtn.addEventListener('click', initCaptcha);
    verifyBtn.addEventListener('click', verifyCaptcha);
    captchaInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyCaptcha();
    });

    function initCaptcha() {
        const type = typeSelector.value;
        displayArea.innerHTML = '';
        feedback.textContent = '';
        feedback.className = 'feedback-message';
        captchaInput.value = '';
        
        if (type === 'slider') {
            inputArea.style.display = 'none';
            setupSliderCaptcha();
        } else {
            inputArea.style.display = 'block';
            if (type === 'math') setupMathCaptcha();
            else if (type === 'text') setupTextCaptcha();
        }
    }

    // --- MATH CAPTCHA ---
    function setupMathCaptcha() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        
        let answer;
        switch(op) {
            case '+': answer = num1 + num2; break;
            case '-': answer = num1 - num2; break;
            case '*': answer = num1 * num2; break;
        }

        currentCaptchaData = { type: 'math', answer: answer.toString() };
        
        const mathEl = document.createElement('div');
        mathEl.id = 'mathQuestion';
        mathEl.textContent = `${num1} ${op} ${num2} = ?`;
        displayArea.appendChild(mathEl);
    }

    // --- TEXT CAPTCHA (CANVAS) ---
    function setupTextCaptcha() {
        const canvas = document.createElement('canvas');
        canvas.width = 250;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
        let text = '';
        for (let i = 0; i < 6; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        currentCaptchaData = { type: 'text', answer: text };

        // Background noise
        ctx.fillStyle = '#f0f2f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add lines
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255}, 0.5)`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Render text with distortion
        ctx.font = 'bold 30px Courier New';
        ctx.textBaseline = 'middle';
        
        for (let i = 0; i < text.length; i++) {
            const x = 30 + (i * 32);
            const y = 40 + (Math.random() * 10 - 5);
            const angle = (Math.random() * 0.4) - 0.2;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.fillStyle = '#333';
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
        }

        // Add dots
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
            ctx.fill();
        }

        displayArea.appendChild(canvas);
    }

    // --- SLIDER CAPTCHA ---
    function setupSliderCaptcha() {
        const container = document.createElement('div');
        container.className = 'slider-container';
        
        const targetPos = Math.floor(Math.random() * 150) + 50; // 50 to 200px
        const target = document.createElement('div');
        target.className = 'slider-target';
        target.style.left = targetPos + 'px';
        
        const handle = document.createElement('div');
        handle.className = 'slider-handle';
        handle.innerHTML = '<i class="fas fa-arrow-right"></i>';
        handle.style.left = '0px';

        container.appendChild(target);
        container.appendChild(handle);
        displayArea.appendChild(container);

        currentCaptchaData = { type: 'slider', target: targetPos, current: 0 };

        // Drag Logic
        const startDrag = (e) => {
            isDragging = true;
            handle.style.transition = 'none';
        };

        const moveDrag = (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let x = clientX - rect.left - 20; // center handle
            
            // Bounds
            x = Math.max(0, Math.min(x, rect.width - 40));
            handle.style.left = x + 'px';
            currentCaptchaData.current = x;
        };

        const endDrag = () => {
            isDragging = false;
        };

        handle.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', moveDrag);
        window.addEventListener('mouseup', endDrag);

        // Touch support
        handle.addEventListener('touchstart', startDrag);
        window.addEventListener('touchmove', moveDrag);
        window.addEventListener('touchend', endDrag);
    }

    // --- VALIDATION ---
    function verifyCaptcha() {
        let isCorrect = false;
        const type = currentCaptchaData.type;

        if (type === 'math' || type === 'text') {
            const userInput = captchaInput.value.trim();
            if (type === 'text') {
                // Case insensitive for text
                isCorrect = userInput.toLowerCase() === currentCaptchaData.answer.toLowerCase();
            } else {
                isCorrect = userInput === currentCaptchaData.answer;
            }
        } else if (type === 'slider') {
            const tolerance = 7; // pixels
            const diff = Math.abs(currentCaptchaData.current - currentCaptchaData.target);
            isCorrect = diff <= tolerance;
        }

        if (isCorrect) {
            successCount++;
            successDisplay.textContent = successCount;
            showFeedback('Verification Successful!', 'success');
            setTimeout(initCaptcha, 1500);
        } else {
            failureCount++;
            failureDisplay.textContent = failureCount;
            showFeedback('Verification Failed. Try again.', 'error');
            if (type !== 'slider') captchaInput.value = '';
            // For slider, we don't necessarily reset immediately to let them try to adjust
            // but for a fresh start, we can refresh on failure after a delay
            if (type === 'slider') setTimeout(initCaptcha, 1000);
        }
    }

    function showFeedback(msg, type) {
        feedback.textContent = msg;
        feedback.className = `feedback-message ${type}`;
    }
});