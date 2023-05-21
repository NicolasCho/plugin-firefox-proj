var thirdPartyDomains = [];
var baseDomain = document.domain;
function inspectNetworkTraffic() {
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var responseUrl = xhr.responseURL;
      var url = new URL(responseUrl);
      var domain = url.hostname;

      // Check if the domain is different from the base domain
      if (domain !== baseDomain && !thirdPartyDomains.includes(domain)) {
        thirdPartyDomains.push(domain);
      }
    }
  };
}

// Attach the event listener to intercept network traffic
window.addEventListener('XMLHttpRequest', inspectNetworkTraffic, true);
window.addEventListener('fetch', inspectNetworkTraffic, true);

console.log(thirdPartyDomains);