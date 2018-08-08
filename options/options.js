function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
      imgZoom: document.querySelector("#imgZoom").checked,
      bgImgZoom: document.querySelector("#bgImgZoom").checked,
      delay: document.querySelector("#delay").value,
      maxWidth: document.querySelector("#maxWidth").value,
      maxHeight: document.querySelector("#maxHeight").value
    });
}
  
function restoreOptions() {
  
    function setCurrentChoice(result) {
        document.querySelector("#imgZoom").checked = result.imgZoom || true;
        document.querySelector("#bgImgZoom").checked = result.bgImgZoom || true;
        document.querySelector("#delay").value = result.delay || 1000;
        document.querySelector("#maxWidth").value = result.maxWidth || 98;
        document.querySelector("#maxHeight").value = result.maxHeight || 98;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get(["imgZoom", "bgImgZoom", "delay", "maxWidth", "maxHeight"]);
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);