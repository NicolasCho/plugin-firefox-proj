const detectHijacking = (tabs) => {
    const frameCount = window.frames.length;
    if (frameCount > 1){
        var hijackingEl = document.getElementById("click_vuln"); 
        hijackingEl.textContent = "WARNING: Clickjacking vulnerability found. Proceed with caution";
    } else {
        var hijackingEl = document.getElementById("click_vuln"); 
        hijackingEl.textContent = "No Hijacking vulnerability found";
    }
}


function getTabs(){
    return browser.tabs.query({currentWindow: true, active: true});
}

getTabs().then(detectHijacking);