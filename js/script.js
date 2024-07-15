const button = document.getElementById("btn");
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const loadingBarContainer = document.getElementById("loading-bar-container");
const loadingBar = document.getElementById("loading-bar");
const token = "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";

async function query(data) {
    loadingBarContainer.style.display = "block";
    loadingBar.style.width = "0%";

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += 10;
            loadingBar.style.width = width + "%";
        }
    }, 500);

    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify({ inputs: inputTxt.value }),
        }
    );

    const result = await response.blob();
    loadingBarContainer.style.display = "none";
    image.style.display = "block";
    return result;
}

button.addEventListener("click", async function () {
    query().then((response) => {
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    });
});
