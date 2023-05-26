const getDoaminConnections = async (tabs) => {
  let tab = tabs.pop();
  const response = await browser.tabs.sendMessage(tab.id, {
    method: "tpDomains",
  });

  const parsedURL = new URL(tab.url);
  let domain = parsedURL.hostname;

  const parts = domain.split('www.');
  domain = parts.length > 1 ? parts[1].split('.')[0] : domain;

  const links = response.data[0][1];

  var domainConnectionsEl = document.getElementById("connections_url"); 

  let n = 0;
  for (const link of links) {
    if (link !== undefined && !link.includes(domain)) {
      let linkEl = document.createElement("li");
      let data = document.createTextNode(link);
      linkEl.appendChild(data);
      domainConnectionsEl.appendChild(linkEl);
      n++;
    }
  }

  var nConnectEl = document.getElementById("num_connections"); 
  nConnectEl.textContent = "Total third party connections:" + n;
}


function getTabs(){
    return browser.tabs.query({currentWindow: true, active: true});
}

getTabs().then(getDoaminConnections);