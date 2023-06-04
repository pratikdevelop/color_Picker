var btn = document.getElementById('btn')
var colorGrid = document.getElementById('colorGrid')
let coloValue = document.getElementById('coloValue')
btn.addEventListener("click", async() => {
    let [tabs] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tabs.id },
        function: pickColor,
    }, async(injectionResult) => {
        const [data] = injectionResult;
        if (data.result) {
            colorGrid.style.backgroundColor = data.result.sRGBHex
            coloValue.innerHTML = data.result.sRGBHex
            try {
                await navigator.clipboard.writeText(data.result.sRGBHex)
            } catch (error) {
                console.error(error);
            }

        }
    })
})

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();

    } catch (error) {
        console.error(error);
    }
}