// src/utils/huginnTools.js

/* =========================================
   1. LOGGING UTILS
   ========================================= */

// Makes logging data more visible in the console
export function devLog(...args) {
    console.log(
        "%cDev Log:", 
        "color: #3b82f6; text-decoration: underline; font-weight: bold; font-size: 12px;", 
        ...args
    );
}

// The new React-friendly Echo. 
// This sends a signal to your <DebugConsole /> component instead of attacking the document body.
export function devEcho(...args) {
    // Dispatch the custom event
    const event = new CustomEvent('huginn-echo', { detail: args });
    window.dispatchEvent(event);
    
    // Also log it to the browser console just in case
    devLog("Echo dispatched:", args);
}

/* =========================================
   2. DOM MANIPULATION (Use with Caution in React!)
   ========================================= */

// Helper to safely find elements even if React is being slow
export function select(selector) {
    const selected = document.querySelector(selector);
    if (!selected) {
        console.warn(`Huginn Warning: Could not find element with selector "${selector}"`);
        return null;
    }
    // devLog(selector, "<--->", selected);
    return selected;
}

/* A function to hide an element */
export function elementVanish(elementId) {
    const element = select(`#${elementId}`);
    if (element) {
        element.classList.add('hidden'); // 'hidden' is the standard Tailwind class
        console.log(`%c${elementId} => Has Vanished!`, "color: red;");
    }
}

/* A function to show an element */
export function elementAppear(elementId) {
    const element = select(`#${elementId}`);
    if (element) {
        element.classList.remove('hidden'); 
        console.log(`%c${elementId} => Has Appeared!`, "color: green;");
    }
}

/* The Toggle Function */
export function elementToggle(elementId) {
    const element = select(`#${elementId}`);
    
    if (element) {
        // .toggle returns true if added, false if removed
        const isNowHidden = element.classList.toggle('hidden');
        
        if (isNowHidden) {
             console.log(`%c${elementId} => Has Vanished!`, "color: red;");
        } else {
             console.log(`%c${elementId} => Has Appeared!`, "color: green;");
        }
    }
}

/* Highlight Helper */
export function toggleHighlight(selector) {
    const element = select(selector);
    if (element) {
        // Assuming you have a CSS class called 'highlighted' or 'ring-4' (Tailwind)
        element.classList.toggle("ring-4"); 
        element.classList.toggle("ring-yellow-400");
        console.log(`%c${selector} has been highlighted`, "background-color: #FFFAA0; color: black;");
    }
}