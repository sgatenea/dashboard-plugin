// Open a new Dashboard tab when the icon was clicked
browser.browserAction.onClicked.addListener(function () {
  browser.tabs.create({
    'url': browser.extension.getURL('index.html')
  });
});

// when a tab is removed
browser.tabs.onRemoved.addListener(function (tabId, removeInfo){
  console.log(`[background.js][handleRemoved] TabId: ${tabId}`, removeInfo);
  browser.runtime.sendMessage({ 
    target: "index",
    action: "http-oauth2-tab-closed", 
    type: "boardcast",
    tabId: tabId
  });
});

