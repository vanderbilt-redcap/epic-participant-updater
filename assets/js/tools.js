var Tools = {
    /**
     * copy a string to the clipboard
     * 
     * @param {string} str 
     */
    copyToClipboard: function(str) {
        var el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof               
        // make it invisible
        el.style.width = 0;                 
        el.style.height = 0;                 
        el.style.position = 'absolute';
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        var selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
    },
}