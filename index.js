browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.method === "localStorage"){
    sendResponse({
      data: Object.entries(localStorage),
    });
  }

  if (request.method === "tpDomains"){
    sendResponse({
      data: Object.entries(getTPDomains()),
    });
  }

  return true;
});

const getTPDomains = () => {
  var links = Array.from(document.querySelectorAll("a, link, script, img"));
  var hrefs = links.map(function(link) {
    return link.href;
  });

  const data = {
    links: hrefs,
  };

  return data;
};