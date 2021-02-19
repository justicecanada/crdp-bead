const unsupportedBrowserMessageBlockId = "browserSupportMessage";
const unsupportedBrowserMessageBlockClasses = "alert alert-warning";
const unsupportedBrowserMessage = {
    "en": "Your browser doesn't support the functionality on this form. Please use a current version of Firefox, Safari, Chrome, or Microsoft Edge.",
    "fr": "Votre fureteur Web ne supporte pas les fonctionnalités de ce formulaire. Veuillez utiliser une version courante de Firefox, Safari, Chrome, ou Microsoft Edge."
};

function isUnsupportedBrowser() {
    /*
     * Currently the only known unsupported browser is IE.
     * In the future, this code should be modified to use feature detection instead of targetting IE specifically
     */
    // @cc_on @ statements are only supported in IE prior to IE11: https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/Microsoft_Extensions/at-cc-on
    // document.documentMode is only supported in IE8 and above to detect IE render mode: https://www.w3schools.com/jsref/prop_doc_documentmode.asp
    return (/*@cc_on!@*/false || !!document.documentMode);
}

function warnUnsupportedBrowserUsers() {
    const browserSupportMessageBlock = document.createElement("div");
    browserSupportMessageBlock.setAttribute("class", unsupportedBrowserMessageBlockClasses)
    browserSupportMessageBlock.setAttribute("id", unsupportedBrowserMessageBlockId);

    const browserSupportMessageParagraph = document.createElement("p");
    browserSupportMessageParagraph.textContent = unsupportedBrowserMessage[document.documentElement.lang];
    
    browserSupportMessageBlock.appendChild(browserSupportMessageParagraph);

    document.getElementById("wb-cont").insertAdjacentElement('afterend', browserSupportMessageBlock);
}

function scrollToUnsupportedBrowserMessageBlock() {
    if (isUnsupportedBrowser()) {
        document.getElementById(unsupportedBrowserMessageBlockId).scrollIntoView();
    }
}

if (isUnsupportedBrowser()) {
    warnUnsupportedBrowserUsers();
    document.getElementById("PrintForm").onclick = scrollToUnsupportedBrowserMessageBlock;
}
