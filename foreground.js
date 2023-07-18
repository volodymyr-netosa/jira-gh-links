// Replace the pattern with a link

function insertIcon() {
    const pattern = /^\[[a-zA-Z]+-\d+\]/gi;
    const bdis = document.getElementsByTagName('bdi');
    const as = document.getElementsByTagName('a');
    const elements = [...bdis, ...as];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const match = element.textContent.match(pattern)?.[0];
        if (match) {
            const iconLink = document.createElement("a");
            iconLink.href = `https://jira.bini.games/browse/${match.replace(/[\[\]]/g, '')}`; // Replace this with the desired link URL
            iconLink.target = "_blank"; // To open the link in a new tab
            iconLink.classList.add("jira-icon-link"); // Use a CSS class for styling the link

            const icon = document.createElement("img");
            icon.src = chrome.runtime.getURL("img/jira.png");
            icon.alt = match; // Use the matched text as the alt attribute for accessibility

            iconLink.appendChild(icon);
            clearIcoms(element.parentElement);
            element.parentElement.prepend(iconLink);
        }
    }
}

function clearIcoms(node) {
    const iconLinks = Array.from(node?.childNodes || []).filter(node => node.classList?.contains("jira-icon-link"));
    for (link of iconLinks) {
        link.remove();
    }
}

clearIcoms();
insertIcon();