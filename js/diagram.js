document.addEventListener('DOMContentLoaded', () => {

    const diagramBoxes = document.querySelectorAll('.diagram-box');
    const infoDisplay = document.getElementById('diagram-info-display');

    if (diagramBoxes.length > 0 && infoDisplay) {
        diagramBoxes.forEach(box => {
            box.addEventListener('click', () => {
                // Get the information from the 'data-info' attribute of the clicked box
                const infoText = box.getAttribute('data-info');
                
                // Display the information in the info-display div
                infoDisplay.textContent = infoText;
            });
        });
    }
});