function createFirstModal() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "firstModalOverlay";
  document.body.appendChild(overlay);

  // Create modal box
  const box = document.createElement("div");
  box.className = "conversion-box";
  box.id = "firstModalBox";

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

  // Mark modal as active
  document.body.classList.add("modal-active");

  // Dismiss on overlay click
  overlay.addEventListener("click", () => {
    document.body.removeChild(overlay);
    document.body.removeChild(box);
    document.body.classList.remove("modal-active");

    // Show drawer only after modal is gone
    initFooterDrawer();
  });

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
    function createStep1() {
      const step1 = document.createElement("div");
      step1.className = "modal-step active";

      // --- NEW: Row for First Name and Last Name ---
      const nameRow = document.createElement("div");
      nameRow.className = "form-row";

      // --- First Name Group ---
      const firstNameGroup = document.createElement("div");
      firstNameGroup.className = "input-group";

      const firstNameLabel = document.createElement("label");
      firstNameLabel.htmlFor = "firstNameInput"; // Good practice for accessibility
      firstNameLabel.textContent = "First name";
      const firstNameRequired = document.createElement("span");
      firstNameRequired.className = "required-asterisk";
      firstNameRequired.textContent = "*";
      firstNameLabel.appendChild(firstNameRequired);

      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.id = "firstNameInput"; // Match with label's htmlFor
      nameInput.placeholder = "First name"; // Placeholder as in screenshot

      // NEW: Validation message for first name
      const firstNameError = document.createElement("div");
      firstNameError.className = "validation-message";
      firstNameError.id = "firstNameError";
      firstNameError.textContent = "Please complete this required field.";

      firstNameGroup.append(firstNameLabel, nameInput, firstNameError);

      // --- Last Name Group ---
      const lastNameGroup = document.createElement("div");
      lastNameGroup.className = "input-group";

      const lastNameLabel = document.createElement("label");
      lastNameLabel.htmlFor = "lastNameInput";
      lastNameLabel.textContent = "Last name";
      // No asterisk for last name as per screenshot

      const lastNameInput = document.createElement("input");
      lastNameInput.type = "text";
      lastNameInput.id = "lastNameInput";
      lastNameInput.placeholder = "Last name"; // Placeholder as in screenshot

      // NEW: Validation message for last name (optional, if you want one)
      // const lastNameError = document.createElement("div");
      // lastNameError.className = "validation-message";
      // lastNameError.id = "lastNameError";
      // lastNameError.textContent = "Please complete this required field.";

      lastNameGroup.append(
        lastNameLabel,
        lastNameInput /*, lastNameError (if added)*/
      );

      nameRow.append(firstNameGroup, lastNameGroup); // Add groups to the row

      // --- Email Group ---
      const emailGroup = document.createElement("div");
      emailGroup.className = "input-group"; // Use input-group for consistent spacing

      const emailLabel = document.createElement("label");
      emailLabel.htmlFor = "emailInput";
      emailLabel.textContent = "Work Email"; // Label text from screenshot
      const emailRequired = document.createElement("span");
      emailRequired.className = "required-asterisk";
      emailRequired.textContent = "*";
      emailLabel.appendChild(emailRequired);

      const emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.id = "emailInput";
      emailInput.placeholder = "Work email"; // Placeholder as in screenshot

      // NEW: Validation message for email
      const emailError = document.createElement("div");
      emailError.className = "validation-message";
      emailError.id = "emailError";
      emailError.textContent = "Please complete this required field."; // Or "Please enter a valid email."

      emailGroup.append(emailLabel, emailInput, emailError);

      // Next button (initially disabled)
      const next1 = document.createElement("button");
      next1.textContent = "Next";
      next1.className = "hero-button"; // Add class
      next1.disabled = true;
      next1.onclick = () => goToStep(1);

      // Validation function
      function validateStep1() {
        const nameValid = nameInput.value.trim() !== "";
        const lastNameValid = lastNameInput.value.trim() !== ""; // Keep this if last name is logically required, even if not marked with *
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

        // Show/Hide validation messages
        firstNameError.style.display = nameValid ? "none" : "block";
        // lastNameError.style.display = lastNameValid ? "none" : "block"; // If you add validation for last name
        emailError.style.display = emailValid ? "none" : "block";
        if (emailInput.value.trim() !== "" && !emailValid) {
          emailError.textContent = "Please enter a valid email address.";
        } else {
          emailError.textContent = "Please complete this required field.";
        }

        next1.disabled = !(nameValid && lastNameValid && emailValid);
      }

      // Attach input event listeners
      [nameInput, lastNameInput, emailInput].forEach((input) => {
        input.addEventListener("input", validateStep1);
      });

      // Append elements to step1
      step1.append(nameRow, emailGroup, next1);
      // steps.push(step1);
      return step1;
    }

    // Step 2
    function createStep2() {
      const step2 = document.createElement("div");
      step2.className = "modal-step";

      // --- Comment Group (NEW STRUCTURE) ---
      const commentGroup = document.createElement("div");
      commentGroup.className = "input-group"; // Use existing input-group class

      const commentLabel = document.createElement("label");
      commentLabel.htmlFor = "commentInput";
      commentLabel.textContent = "How can we help you?";
      // Assuming comments are required, add asterisk
      const commentRequiredAsterisk = document.createElement("span");
      commentRequiredAsterisk.className = "required-asterisk";
      commentRequiredAsterisk.textContent = "*";
      commentLabel.appendChild(commentRequiredAsterisk);

      const commentInput = document.createElement("textarea");
      commentInput.id = "commentInput"; // Link to label
      commentInput.placeholder = "Enter your comments or questions here..."; // Updated placeholder
      commentInput.rows = 4; // Optional: suggest a size

      // NEW: Validation message for comment
      const commentError = document.createElement("div");
      commentError.className = "validation-message";
      commentError.id = "commentError";
      commentError.textContent = "Please provide some details."; // Example message
      commentError.style.display = "none"; // Initially hidden

      commentGroup.append(commentLabel, commentInput, commentError);

      // --- Agreement Checkbox Group (SLIGHTLY REVISED STRUCTURE) ---
      const agreementGroup = document.createElement("div");
      agreementGroup.className = "input-group checkbox-group"; // Added checkbox-group for potential specific styling

      const agreeLabel = document.createElement("label");
      agreeLabel.className = "checkbox-label"; // Add class for specific styling
      agreeLabel.htmlFor = "agreeCheckbox"; // Associate label with checkbox input

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "agreeCheckbox"; // ID for the checkbox

      const agreeText = document.createElement("span"); // Wrap text in a span for better control
      agreeText.textContent = " I agree to the terms";

      // Add asterisk if agreement is mandatory for submission
      const agreeRequiredAsterisk = document.createElement("span");
      agreeRequiredAsterisk.className = "required-asterisk";
      agreeRequiredAsterisk.textContent = "*";

      agreeLabel.append(checkbox, agreeText, agreeRequiredAsterisk); // Checkbox, then text, then asterisk

      agreementGroup.append(agreeLabel);

      // Submit button (initially disabled)
      const next2 = document.createElement("button");
      next2.textContent = "Submit";
      next2.className = "hero-button"; // Assuming .hero-button styling is defined
      next2.disabled = true;

      // Validation function for Step 2
      function validateStep2() {
        const commentValid = commentInput.value.trim() !== "";
        const isChecked = checkbox.checked;
        commentError.style.display = commentValid ? "none" : "block";
        next2.disabled = !(commentValid && isChecked);
      }

      // Attach input event listeners
      commentInput.addEventListener("input", validateStep2);
      checkbox.addEventListener("change", validateStep2);

      // Submit action
      next2.onclick = () => {
        if (!next2.disabled) {
          // Assuming progressBar and goToStep are defined elsewhere
          if (
            typeof progressBar !== "undefined" &&
            progressBar.setProgressStep
          ) {
            progressBar.setProgressStep(steps.length); // Or the index of the "Thank You" step if it's fixed
          }
          goToStep(2); // Go to Step 3 (which is at index 2 if steps are 0, 1, 2)
        }
      };

      step2.append(commentGroup, agreementGroup, next2); // Append new groups
      // steps.push(step2);

      return step2;
    }

    // Step 3 (Thank You)
    function createStep3() {
      const step3 = document.createElement("div");
      step3.className = "modal-step";

      // Thank you message shown immediately
      const thankYouMessage = document.createElement("p");
      thankYouMessage.textContent = "🎉 Thank you for submitting the form!";
      const next3 = document.createElement("button");
      next3.textContent = "Close";

      // Close second model button
      next3.addEventListener("click", () => {

        // modal.style.display = "none";
        // resetModal(); // <-- reset on close

        modal.classList.remove("show");
  
        // Wait for animation to finish before hiding
        setTimeout(() => {
          modal.style.display = "none";
          resetModal();

          const overlay = document.getElementById("firstModalOverlay");
          const box = document.getElementById("firstModalBox");

          if (overlay && document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }

          if (box && document.body.contains(box)) {
            document.body.removeChild(box);
          }

          // document.body.removeChild(overlay);
          // document.body.removeChild(box);
          document.body.classList.remove("modal-active");
      
          // Show drawer only after modal is gone
          initFooterDrawer();

        }, 300);
      });

      step3.append(thankYouMessage, next3);

      // steps.push(step3);

      return step3;
    }

    // Append all steps
    const step1 = createStep1();
    steps.push(step1);

    const step2 = createStep2();
    steps.push(step2);

    const step3 = createStep3();
    steps.push(step3);

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
  // modal.addEventListener("click", (event) => {
  //   if (!content.contains(event.target)) {
  //     modal.style.display = "none";
  //     resetModal();
  //   }
  // });

  modal.addEventListener("click", (event) => {
    if (!content.contains(event.target)) {
      modal.classList.remove("show");
  
      // Wait for animation to finish before hiding
      setTimeout(() => {
        modal.style.display = "none";
        resetModal();
      }, 300); // same duration as in CSS
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

  document.body.classList.add("modal-active");

  // Show second modal on button click
  triggerButton.addEventListener("click", () => {
    secondModal.style.display = "flex";

    requestAnimationFrame(() => {
      secondModal.classList.add("show");
    });
  });
}

// Run the modal setup on page load
initModals();

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// FOOTER Drawer //
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// function initFooterDrawer() {
//   // const blogHeader = document.querySelector('.blog-header__title');
//   // if (!blogHeader) return;

//   const drawer = document.createElement('div');
//   drawer.className = 'footer-drawer';

//   const tab = document.createElement('div');
//   tab.className = 'drawer-tab';
//   tab.textContent = 'More Content';

//   const chevron = document.createElement('span');
//   chevron.className = 'chevron';
//   chevron.textContent = '⌃';
//   tab.appendChild(chevron);

//   const slider = document.createElement('div');
//   slider.className = 'slider-container';
//   slider.id = 'slider';

//   drawer.appendChild(tab);
//   drawer.appendChild(slider);
//   document.body.appendChild(drawer);

//   tab.addEventListener('click', () => {
//     drawer.classList.toggle('open');
//   });

//   window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//       drawer.classList.remove('open');
//     }
//   });

//   fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
//     .then(res => res.json())
//     .then(async data => {
//       for (let i = 0; i < data.results.length; i++) {
//         const poke = data.results[i];
//         const details = await fetch(poke.url).then(r => r.json());

//         const slide = document.createElement('div');
//         slide.className = 'slide';

//         const tooltip = document.createElement('div');
//         tooltip.className = 'tooltip';
//         tooltip.textContent = poke.name;

//         const title = document.createElement('h4');
//         title.textContent = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

//         const img = document.createElement('img');
//         img.src = details.sprites.front_default;
//         img.alt = poke.name;

//         const desc = document.createElement('p');
//         desc.textContent = `Height: ${details.height} | Weight: ${details.weight}`;

//         const button = document.createElement('button');
//         button.textContent = 'Flip Me';
//         button.addEventListener('click', () => alert(`You clicked on ${poke.name}!`));

//         slide.appendChild(tooltip);
//         slide.appendChild(title);
//         slide.appendChild(img);
//         slide.appendChild(desc);
//         slide.appendChild(button);

//         slider.appendChild(slide);
//       }
//     });
// }

// // Call the function manually in console
// initFooterDrawer();

// function initFooterDrawer() {
//   // const blogHeader = document.querySelector('.blog-header__title');
//   // if (!blogHeader) return;


//     if (document.body.classList.contains("modal-active")) return;

//     // Existing drawer creation code follows...
  

//   const drawer = document.createElement("div");
//   drawer.className = "footer-drawer";

//   const tab = document.createElement("div");
//   tab.className = "drawer-tab";
//   tab.textContent = "Sticky Drawer";

//   const chevron = document.createElement("span");
//   chevron.className = "chevron";
//   chevron.textContent = "⌃";
//   tab.appendChild(chevron);

//   const slider = document.createElement("div");
//   slider.className = "slider-container";
//   slider.id = "slider";

//   drawer.appendChild(tab);
//   drawer.appendChild(slider);
//   document.body.appendChild(drawer);

//   tab.addEventListener("click", () => {
//     drawer.classList.toggle("open");
//   });

//   window.addEventListener("scroll", () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//       drawer.classList.remove("open");
//     }
//   });

//   fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
//     .then((res) => res.json())
//     .then(async (data) => {
//       for (let i = 0; i < data.results.length; i++) {
//         const poke = data.results[i];
//         const details = await fetch(poke.url).then((r) => r.json());

//         const slide = document.createElement("div");
//         slide.className = "slide";

//         const tooltip = document.createElement("div");
//         tooltip.className = "tooltip";
//         tooltip.textContent = poke.name;

//         const title = document.createElement("h4");
//         title.textContent =
//           poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

//         const img = document.createElement("img");
//         img.src = details.sprites.front_default;
//         img.alt = poke.name;

//         const desc = document.createElement("p");
//         desc.textContent = `Height: ${details.height} | Weight: ${details.weight}`;

//         const button = document.createElement("button");
//         button.textContent = "Flip Me";
//         button.addEventListener("click", () =>
//           alert(`You clicked on ${poke.name}!`)
//         );

//         slide.appendChild(tooltip);
//         slide.appendChild(title);
//         slide.appendChild(img);
//         slide.appendChild(desc);
//         slide.appendChild(button);

//         slider.appendChild(slide);
//       }
//     });
// }

// Updated sticky drawer script with arrow navigation and pagination
function initFooterDrawer() {
  if (document.body.classList.contains("modal-active")) return;

  const drawer = document.createElement("div");
  drawer.className = "footer-drawer";

  const tab = document.createElement("div");
  tab.className = "drawer-tab";

  const title = document.createElement("span");
  title.className = "drawer-title";
  title.textContent = "Sticky Drawer";

  const nav = document.createElement("div");
  nav.className = "drawer-nav";

  const leftArrow = document.createElement("button");
  leftArrow.className = "nav-arrow left";
  leftArrow.textContent = "  \u2039  ";

  const pageInfo = document.createElement("span");
  pageInfo.className = "page-info";
  pageInfo.textContent = "1/1";

  const rightArrow = document.createElement("button");
  rightArrow.className = "nav-arrow right";
  rightArrow.textContent = "  \u203A  ";

  nav.appendChild(leftArrow);
  nav.appendChild(pageInfo);
  nav.appendChild(rightArrow);

  const chevron = document.createElement("span");
  chevron.className = "chevron";
  chevron.textContent = "\u2304";

  tab.appendChild(title);
  tab.appendChild(nav);
  tab.appendChild(chevron);

  const slider = document.createElement("div");
  slider.className = "slider-container";
  slider.id = "slider";

  drawer.appendChild(tab);
  drawer.appendChild(slider);

  const backdrop = document.createElement("div");
backdrop.className = "footer-backdrop";
document.body.appendChild(backdrop);


  document.body.appendChild(drawer);

  tab.addEventListener("click", () => {
    // drawer.classList.toggle("open");

    const isOpen = drawer.classList.toggle("open");
    backdrop.classList.toggle("visible", isOpen);
  });

  backdrop.addEventListener("click", () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("visible");
  });
  

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      drawer.classList.remove("open");
      backdrop.classList.remove("visible");
    }
  });

  let currentPage = 1;
  let totalPages = 1;

  function updatePagination() {
    totalPages = Math.ceil(slider.scrollWidth / slider.clientWidth);
    const scrollLeft = slider.scrollLeft;
    currentPage = Math.round(scrollLeft / slider.clientWidth) + 1;
    pageInfo.textContent = `${currentPage}/${totalPages}`;
  }

  leftArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
  });

  rightArrow.addEventListener("click", (e) => {
    e.stopPropagation();
    slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
  });

  slider.addEventListener("scroll", updatePagination);

  fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((res) => res.json())
    .then(async (data) => {
      for (let i = 0; i < data.results.length; i++) {
        const poke = data.results[i];
        const details = await fetch(poke.url).then((r) => r.json());

        const slide = document.createElement("div");
        slide.className = "slide";

        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = poke.name;

        const title = document.createElement("h4");
        title.textContent =
          poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

        const img = document.createElement("img");
        img.src = details.sprites.front_default;
        img.alt = poke.name;

        const desc = document.createElement("p");
        desc.textContent = `Height: ${details.height} | Weight: ${details.weight}`;

        const button = document.createElement("button");
        button.textContent = "Flip Me";
        button.addEventListener("click", () =>
          alert(`You clicked on ${poke.name}!`)
        );

        slide.appendChild(tooltip);
        slide.appendChild(title);
        slide.appendChild(img);
        slide.appendChild(desc);
        slide.appendChild(button);

        slider.appendChild(slide);
      }
      updatePagination();
    });
}

// initFooterDrawer();


// Call manually after load
// initFooterDrawer();
