document.addEventListener('DOMContentLoaded', function() {
    // Get all question/term elements
    const questions = document.querySelectorAll('.question-term');

    // Add click listener to each question/term
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // Get the next sibling element (the answer div)
            const qaItem = question.parentElement; // Get the parent .qa-item div

            if (answer && answer.classList.contains('answer')) {
                // Toggle the 'visible' class on the answer
                answer.classList.toggle('visible');
                // Toggle the 'expanded' class on the parent for indicator styling
                qaItem.classList.toggle('expanded');
            }
        });

        // Make question elements focusable and trigger click on Enter/Space
        question.setAttribute('tabindex', '0'); // Make it focusable
        question.addEventListener('keydown', (event) => {
             if (event.key === 'Enter' || event.key === ' ') {
                 event.preventDefault(); // Prevent default spacebar scroll
                 question.click(); // Trigger the click event
             }
         });
    });

    // Get all "Toggle All" buttons
    const toggleAllButtons = document.querySelectorAll('.toggle-all');

    toggleAllButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-target-section');
            const section = document.getElementById(sectionId);
            if (!section) return;

            const answersInSection = section.querySelectorAll('.answer');
            const qaItemsInSection = section.querySelectorAll('.qa-item');

            // Check if any answer in the section is currently hidden
            // If at least one is hidden, we expand all. Otherwise, we collapse all.
            let shouldExpand = false;
            answersInSection.forEach(answer => {
                if (!answer.classList.contains('visible')) {
                    shouldExpand = true;
                }
            });

            // Expand or collapse all answers in this section
            answersInSection.forEach(answer => {
                const qaItem = answer.closest('.qa-item'); // Find parent qa-item more reliably
                if (shouldExpand) {
                    answer.classList.add('visible');
                    if (qaItem) qaItem.classList.add('expanded');
                } else {
                    answer.classList.remove('visible');
                     if (qaItem) qaItem.classList.remove('expanded');
                }
            });

             // Update button text (optional)
             // button.textContent = shouldExpand ? '全部收起' : '全部展开';
        });
    });

});