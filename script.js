const accessKey = "DXsuCftys3FsuYsyioLjO7H3wZGq6N-pKtUifwhYg0U";

const formEl = document.querySelector('form');
const inputEl = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.querySelector('#show-more-button');


let inputData = "";
let page = 1;


async function searchImages() {
    console.log(page)
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if (page === 1) {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('search-result')
        const img = document.createElement('img')
        img.src = result.urls.small
        img.alt = result.alt_description
        const imgLink = document.createElement('a')
        imgLink.href = result.links.html
        img.target = "_blank";
        img.textContent = result.alt_description;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imgLink);
        searchResults.appendChild(imageWrapper)

    })

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }

}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages()
})