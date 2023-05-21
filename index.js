// Content script code
const getExternalLinks = () => {
  const urls = Array.prototype.map.call(
    document.querySelectorAll("link, img, script, iframe, source, embed"),
    (tag) => {
      return tag.href || tag.src;
    }
  );

  const data = {
    urls: urls,
    length: urls.length,
  };

  return data;
};

// Background script code
browser.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.method === "localStorage") {
    sendResponse({
      data: Object.entries(localStorage),
    });
  } else if (request.method === "thirdPartyDomains") {
    const externalLinks = getExternalLinks();
    sendResponse({
      data: Object.entries(externalLinks),
    });
  }

  return true;
});