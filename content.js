// Content script for GitHub Plus extension
// This script injects a "run e2e tests" button into the GitHub PR comment section
const logger = {
    log: function(message) {
        if (typeof console !== 'undefined' && console.log) {
            console.log(`GitHub Plus: ${message}`);
        }
    },
    error: function(message) {
        if (typeof console !== 'undefined' && console.error) {
            console.error(`GitHub Plus Error: ${message}`);
        }
    }
};

function createButton({id, textContent}) {
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.className = 'btn btn-outline github-plus-button';
    button.textContent = textContent;
    button.style.marginTop = '8px';
    button.style.marginRight = '8px';
    return button;
}

(function() {
    'use strict';
    function injectButton() {
        // Look for the comment form container
        const sidebar = document.getElementById('partial-discussion-sidebar');

        if (!sidebar) {
            logger.log('Sidebar not found, retrying...');
            setTimeout(injectButton, 1000);
            return;
        }

        // Check if button already exists
        if (document.querySelector('#github-plus-e2e-button')) {
            return;
        }

        // Create the button
        const button = createButton({id:"github-plus-e2e-button", textContent: 'Run e2e Tests'});

        // Add click handler to comment on PR
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logger.log('run e2e tests button clicked!');
            addCommentToPR();
        });
        // Create a container for our button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'github-plus-button-container';
        buttonContainer.appendChild(button);
        sidebar.appendChild(buttonContainer);
    }

    // Function to add comment to PR
    function addCommentToPR() {
        // Find the comment textarea
        const textarea = document.querySelector('#new_comment_field, textarea[name="comment[body]"]');
        if (!textarea) {
            logger.error('Comment textarea not found');
            return;
        }

        // Set the comment text
        textarea.value = 'run e2e';
        textarea.focus();

        // Trigger input event to ensure GitHub recognizes the change
        const inputEvent = new Event('input', { bubbles: true });
        textarea.dispatchEvent(inputEvent);

        // Find and click the submit button
        const submitButton = document.querySelector('button[type="submit"][data-disable-with="Commenting..."], button.js-quick-submit-alternative');
        if (submitButton && !submitButton.disabled) {
            submitButton.click();
            logger.log('Comment "run e2e" added to PR');
        } else {
            logger.error('Submit button not found or disabled');
        }
    }

    // Function to handle dynamic content loading (GitHub uses AJAX)
    function observePageChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if new comment form was added
                    const hasCommentForm = Array.from(mutation.addedNodes).some(node => {
                        return node.nodeType === Node.ELEMENT_NODE &&
                               (node.querySelector && node.querySelector('#new_comment_field, textarea'));
                    });

                    if (hasCommentForm) {
                        setTimeout(injectButton, 100);
                    }
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Initialize the extension
    function init() {
        logger.log('Content script loaded on PR page');

        // Initial injection attempt
        setTimeout(injectButton, 1000);

        // Set up observer for dynamic content
        observePageChanges();

        // Also try again when the page seems fully loaded
        document.addEventListener('DOMContentLoaded', injectButton);
        window.addEventListener('load', injectButton);
    }
    init();
})();
