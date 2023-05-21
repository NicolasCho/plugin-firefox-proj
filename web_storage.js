const identifyLocalStorage = async (tabs) => {
  let tab = tabs.pop();
  isLocalStorageEnabled()
  .then(async (enabled) => {
    var isEnabled = document.getElementById("ls_enabled"); 
    isEnabled.textContent = "YES";

    const storage_list = document.getElementById("storage_data");
    const response = await browser.tabs.sendMessage(tab.id, {
      method: "localStorage",
    });
    const storage_len = response.data.length;
    if (storage_len > 0) {
      for (let localStorage of response.data) {
        let data_el = document.createElement("li");
        let data = document.createTextNode(localStorage[0]);
        data_el.appendChild(data);
        storage_list.appendChild(data_el);
      }
    }

  })
  .catch(error => {
    var isEnabled = document.getElementById("ls_enabled"); 
    isEnabled.textContent = "NO";
  });
    
}

async function isLocalStorageEnabled() {
  try {
    await browser.storage.local.set({ test: 'test' });
    await browser.storage.local.remove('test');
    return true;
  } catch (error) {
    return false;
  }
}

function getTabs(){
    return browser.tabs.query({currentWindow: true, active: true});
}

getTabs().then(identifyLocalStorage);