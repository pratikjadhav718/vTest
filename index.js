// Create a floating button
const button = document.createElement('button');
button.innerText = 'Click Me!';
button.className = 'my-floating-button';
document.body.appendChild(button);

// Add click event
button.addEventListener('click', () => {
  alert('Hello from the console!');
});
