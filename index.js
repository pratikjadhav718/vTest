// Function to create the first modal
function createFirstModal() {
  const box = document.createElement("div");
  box.className = "conversion-box";

  const heading = document.createElement("h1");
  heading.textContent = "Hello Conversion!";
  box.appendChild(heading);

  const para = document.createElement("p");
  para.textContent = "Click on the button below to contact us";
  box.appendChild(para);

  const button = document.createElement("button");
  button.className = "cta-button";
  button.textContent = "Click here";
  box.appendChild(button);

  document.body.appendChild(box);

  return button; // Return the button for event binding
}

// Function to create the second modal
function createSecondModal() {
  function createProgressBar() {
    const steps = [
      { icon: getUserInfoIconSVG(), label: "Info" },
      { icon: getInquiryIconSVG(), label: "Inquiry" },
      { icon: getCartIconSVG(), label: "Complete" },
    ];

    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";

    const stepElements = []; // To track icon steps

    steps.forEach((step, index) => {
      const stepContainer = document.createElement("div");
      stepContainer.className = "step";

      const circle = document.createElement("div");
      circle.className = "icon-circle";
      circle.appendChild(step.icon);

      const label = document.createElement("div");
      label.className = "step-label";
      label.textContent = step.label;

      stepContainer.appendChild(circle);
      stepContainer.appendChild(label);
      progressBar.appendChild(stepContainer);

      stepElements.push(stepContainer);

      if (index < steps.length - 1) {
        const connector = document.createElement("div");
        connector.className = "connector";
        progressBar.appendChild(connector);
      }
    });

    progressBar.setProgressStep = function (index) {
      stepElements.forEach((el, i) => {
        el.classList.toggle("active", i === index);
        el.classList.toggle("completed", i < index);
      });

      // Special case: if index === stepElements.length, mark all completed
      if (index === stepElements.length) {
        stepElements.forEach((el) => el.classList.add("completed"));
      }
    };

    return progressBar;
  }

  function createFormSteps() {
    // Create step containers

    function goToStep(index) {
      steps.forEach((s, i) => {
        s.classList.toggle("active", i === index);
      });
      progressBar.setProgressStep(index);
    }

    const steps = [];

    // Step 1
    const step1 = document.createElement("div");
    step1.className = "modal-step active";

    // Name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Enter your first name";
    // Last Name
    const lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.placeholder = "Enter your last name";
    // Email
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Enter your email";

    // Next button (initially disabled)
    const next1 = document.createElement("button");
    next1.textContent = "Next";
    next1.className = "hero-button"; // Add class
    next1.disabled = true;
    next1.onclick = () => goToStep(1);

    // Validation function
    function validateStep1() {
      const nameValid = nameInput.value.trim() !== "";
      const lastNameValid = lastNameInput.value.trim() !== "";
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
      next1.disabled = !(nameValid && lastNameValid && emailValid);
    }

    // Attach input event listeners
    [nameInput, lastNameInput, emailInput].forEach((input) => {
      input.addEventListener("input", validateStep1);
    });

    step1.append(nameInput, lastNameInput, emailInput, next1);
    steps.push(step1);

    // Step 2
    const step2 = document.createElement("div");
    step2.className = "modal-step";

    // Textarea for comment
    const commentInput = document.createElement("textarea");
    commentInput.placeholder = "How can we help you?";

    // Checkbox for agreement
    const agreeLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    agreeLabel.append(
      checkbox,
      document.createTextNode(" I agree to the terms")
    );

    // Submit button (initially disabled)
    const next2 = document.createElement("button");
    next2.textContent = "Submit";
    next2.className = "hero-button";
    next2.disabled = true;

    // Validation function
    function validateStep2() {
      const commentValid = commentInput.value.trim() !== "";
      const isChecked = checkbox.checked;
      next2.disabled = !(commentValid && isChecked);
    }

    // Attach input event listeners
    commentInput.addEventListener("input", validateStep2);
    checkbox.addEventListener("change", validateStep2);

    // Submit action
    next2.onclick = () => {
      if (!next2.disabled) {
        progressBar.setProgressStep(steps.length);
        goToStep(2);
      }
    };

    step2.append(commentInput, agreeLabel, next2);
    steps.push(step2);

    // Step 3 (Thank You)
    const step3 = document.createElement("div");
    step3.className = "modal-step";

    // Thank you message shown immediately
    const thankYouMessage = document.createElement("p");
    thankYouMessage.textContent = "🎉 Thank you for submitting the form!";
    const next3 = document.createElement("button");
    next3.textContent = "Close";

    // Close second model button
    next3.addEventListener("click", () => {
      modal.style.display = "none";
      resetModal(); // <-- reset on close
    });

    step3.append(thankYouMessage, next3);

    steps.push(step3);

    // Append all steps
    return steps;
  }

  const modal = document.createElement("div");
  modal.className = "second-modal";
  modal.style.display = "none";

  const content = document.createElement("div");
  content.className = "second-modal-content";

  const progressBar = createProgressBar();
  const steps = createFormSteps();
  progressBar.setProgressStep(0);

  // Append all elements

  content.appendChild(progressBar);

  steps.forEach((step) => content.appendChild(step));

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Close modal when clicking outside the modal content
  modal.addEventListener("click", (event) => {
    if (!content.contains(event.target)) {
      modal.style.display = "none";
      resetModal();
    }
  });

  // Close handler
  // Reset modal to initial state
  function resetModal() {
    // Reset all inputs
    modal.querySelectorAll("input, textarea").forEach((el) => {
      if (el.type === "checkbox" || el.type === "radio") {
        el.checked = false;
      } else {
        el.value = "";
      }
    });

    // Hide all steps and show only first
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === 0);
    });

    // Reset progress bar
    progressBar.setProgressStep(0);
  }

  return modal;
}

// Helper inside secon model
function getCartIconSVG() {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const template = document.createElement("template");
  template.innerHTML = svgString.trim(); // trim to avoid unwanted whitespace nodes
  return template.content.firstChild;
}

function getUserInfoIconSVG() {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M9 2H6a2 2 0 00-2 2v14a2 2 0 002 2h3M15 6h3a2 2 0 012 2v12a2 2 0 01-2 2h-3M9 2h6v4H9V2zM9 2v4" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  const template = document.createElement("template");
  template.innerHTML = svgString.trim();
  return template.content.firstChild;
}

function getInquiryIconSVG() {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-3.8-11.4M22 4l-10 10" 
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="10" y="16" font-size="7" font-family="Arial" fill="currentColor">EX</text>
    </svg>
  `;
  const template = document.createElement("template");
  template.innerHTML = svgString.trim();
  return template.content.firstChild;
}

// Initialize both modals
function initModals() {
  const triggerButton = createFirstModal();
  const secondModal = createSecondModal();

  // Show second modal on button click
  triggerButton.addEventListener("click", () => {
    secondModal.style.display = "flex";
  });
}

// Run the modal setup on page load
initModals();
