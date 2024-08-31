var accessKey = "ZczvGKew_zJliEcm6Wcr_bdSuy_h8znzuA30hy9DaWQ";
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchbtn");
let showData = document.querySelector(".showData");
let moreBtn = document.getElementById("moreBtn");
let page = 1;

const getData = async (searchValue, pageNo) => {
  let fetching = await fetch(
    `https://api.unsplash.com/search/photos?query=${searchValue}&per_page=28&page=${pageNo}&client_id=${accessKey}`
  );
  let jsonData = await fetching.json();

  if (jsonData.results.length === 0) {
    showData.innerHTML = `<h1>No results found</h1>`;
    document.querySelector(".loadMore").style.display = "none";
    return;
  }

  if (pageNo == 1) {
    showData.innerHTML = "";
  }

  jsonData.results.forEach(function (data) {
    let div = document.createElement("div");
    div.classList.add("card");
    showData.appendChild(div);
    div.innerHTML = `
      <img src=${data.urls.small} alt="${data.alt_description}">
      <a href="#">${data.alt_description || "No description available"}</a>
      <a href=${data.links.html} target="_blank">Download</a>`;
  });

  if (jsonData.results.length < 28) {
    document.querySelector(".loadMore").style.display = "none";
  } else {
    document.querySelector(".loadMore").style.display = "block";
  }
};

searchBtn.addEventListener("click", function () {
  let searchValue = searchInput.value.trim();
  if (searchValue !== "") {
    page = 1;
    getData(searchValue, page);
  } else {
    showData.innerHTML = `<h1>Please enter a search term</h1>`;
  }
});

moreBtn.addEventListener("click", function () {
  let searchValue = searchInput.value.trim();
  if (searchValue !== "") {
    getData(searchValue, ++page);
  }
});
