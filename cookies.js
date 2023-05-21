const getCookies = (tabs) => {
    let tab = tabs.pop();
    const parsedURL = new URL(tab.url);
    let domain = parsedURL.hostname;

    var AllCookies = browser.cookies.getAll({
        url: tab.url,
    });


    AllCookies.then((cookies) => {
        let cookieCount = cookies.length;

        //num total de cookies
        var numCookiesEl = document.getElementById("num_cookies"); 
        numCookiesEl.textContent = "Cookie count" + cookieCount;

        var fpCookies = document.getElementById("fp_cookies"); 
        var tpCookies = document.getElementById("tp_cookies"); 

        for (const cookie of cookies) {
            let cookieDescription = document.createElement("li");

            if (cookie.session){
                var cookie_type = "Session";
            }else{
                var cookie_type = "Navigation";
            }

            cookieDescription.appendChild(document.createTextNode
                (cookie.name + ": Cookie type =>" + cookie_type));

            if (cookie.domain == domain         ||
                cookie.domain == "www" + domain ||
                cookie.domain == "www."+ domain ||
                cookie.domain == "."   + domain ||
                "www" + cookie.domain == domain ||
                "www."+ cookie.domain == domain ||
                "."   + cookie.domain == domain) {
                fpCookies.appendChild(cookieDescription);
            } else {
                tpCookies.appendChild(cookieDescription);
            }
        }
    }); 
}

function getTabs(){
    return browser.tabs.query({currentWindow: true, active: true});
}

getTabs().then(getCookies);