// Content script for GitHub Plus extension
// This script runs on GitHub PR pages and injects a "Hello World" button

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

(function() {
    'use strict';

    // Wait for the page to load
    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else {
            setTimeout(() => waitForElement(selector, callback), 100);
        }
    }

    // Function to create and inject the Hello World button
    function injectHelloWorldButton() {
        // Look for the comment form container
        const sidebar = document.getElementById('partial-discussion-sidebar');

        if (!sidebar) {
            logger.log('Sidebar not found, retrying...');
            setTimeout(injectHelloWorldButton, 1000);
            return;
        }

        // Check if button already exists
        if (document.querySelector('#github-plus-hello-button')) {
            return;
        }

        // Create the button
        const button = document.createElement('button');
        button.id = 'github-plus-hello-button';
        button.type = 'button';
        button.className = 'btn btn-outline github-plus-button';
        button.textContent = 'run e2e tests';
        button.style.marginTop = '8px';
        button.style.marginRight = '8px';

        // Add click handler to comment on PR
        button.addEventListener('click', function(e) {
            e.preventDefault();
            logger.log('run e2e tests button clicked!');
            addCommentToPR();
        });

        // Find the best insertion point (underneath the comment text field)

        const textArea = document.querySelector('#new_comment_field, textarea');
        if (!textArea) {
            logger.error('Textarea not found');
            return;
        }
        // Look for the parent container of the textarea

        // Create a container for our button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'github-plus-button-container';
        buttonContainer.appendChild(button);

        sidebar.appendChild(buttonContainer);
        logger.log('run e2e tests button injected successfully!');
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
                        setTimeout(injectHelloWorldButton, 100);
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
        setTimeout(injectHelloWorldButton, 1000);

        // Set up observer for dynamic content
        observePageChanges();

        // Also try again when the page seems fully loaded
        document.addEventListener('DOMContentLoaded', injectHelloWorldButton);
        window.addEventListener('load', injectHelloWorldButton);
    }

    // Start the extension
    init();
})();
