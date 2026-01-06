
const namesData = {
  wiilal: [
    { name: "Marwaan", meaning: "Aqli badan, dagan", description: "Marwaan waa magac wiil oo leh astaamo wanaagsan sida daganaansho iyo aqoon sare." },
    { name: "Ayaanle", meaning: "Nasiib badan, barako", description: "Ayaanle waa magac wiil oo ka turjumaya nasiib wanaag iyo barako badan." },
    { name: "Ahmed", meaning: "Magac caadi ah", description: "Ahmed waa magac wiil oo caadi ah laakiin qiimo weyn leh, inta badan dadku jecel yihiin." }
  ],
  gabdho: [
    { name: "Asmaa", meaning: "Xaasid la'aan", description: "Asmaa waa magac gabadh oo muujinaya dabeecad wanaagsan oo xaasid la'aan ah." },
    { name: "Naima", meaning: "Nasiib wanaag", description: "Naima waa magac gabadh oo tilmaamaya nasiib wanaag iyo farxad joogto ah." },
    { name: "Maariya", meaning: "Barako iyo nasiib", description: "Maariya waa magac gabadh oo tilmaamaya barako iyo nasiib wanaagsan oo nolosha ka buuxa.", language: "arabic" }
  ],
  wiilal_gabdho: [
    { name: "Ridwaan", meaning: "Raalli ahaansho", description: "Ridwaan waa magac guud oo ka turjumaya raalli ahaansho iyo kalsooni." },
    { name: "Ayman", meaning: "Barako iyo nasiib", description: "Ayman waa magac guud oo leh macne barako iyo nasiib wanaagsan." }
  ]
};


const searchInput = document.getElementById("search-input");
const genderSelect = document.getElementById("genderselect");
const resultsDiv = document.getElementById("results");
const bookmarksDiv = document.getElementById("bookmarks");
const clearButton = document.getElementById("clear-button");

let displayedCards = [];
let bookmarks = [];
let hasInteracted = false;

//  Events
searchInput.addEventListener("input", () => {
  hasInteracted = true;
  handleSearch();
});

genderSelect.addEventListener("change", () => {
  hasInteracted = true;
  handleSearch();
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";  
  handleSearch();          
});

//  Searching
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const category = genderSelect.value;

  if (!category) {
    displayedCards = [];
    renderResults();
    return;
  }

  let dataToSearch = category === "all" 
    ? namesData.wiilal.concat(namesData.gabdho, namesData.wiilal_gabdho)
    : namesData[category] || [];

  if (query) {
    dataToSearch = dataToSearch.filter(item => item.name.toLowerCase().includes(query));
  }

  displayedCards = dataToSearch;
  hasInteracted = true;
  renderResults();
}

//  Results 
function renderResults() {
  resultsDiv.innerHTML = "";

  if (!hasInteracted) {
    resultsDiv.innerHTML = "<p class='default-message'>Raadi magac ama dooro qeyb</p>";
    return;
  }

  if (displayedCards.length === 0) {
    resultsDiv.innerHTML = "<p class='no-results '>Weli wax lama helin</p>";
    return;
  }

  displayedCards.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const langText = item.language ? " (" + item.language + ")" : "";

    card.innerHTML = "<strong>" + item.name + "</strong> Macne:" + item.meaning +  "<br>" +   item.description;

    const saveBtn = document.createElement("button");
    saveBtn.className = "save";
    saveBtn.textContent = "Kaydi";
    saveBtn.addEventListener("click", () => addBookmark(item));

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "Ka Saar";
    removeBtn.addEventListener("click", () => {
      displayedCards = displayedCards.filter(c => c.name !== item.name);
      renderResults();
    });

    card.appendChild(saveBtn);
    card.appendChild(removeBtn);
    resultsDiv.appendChild(card);
  });
}

//  Bookmarks
function addBookmark(item) {
  if (bookmarks.some(b => b.name === item.name)) return;
  bookmarks.push({...item});
  renderBookmarks();
}

function renderBookmarks() {
  bookmarksDiv.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarksDiv.innerHTML = "<p class='no-bookmarks'>Weli wax lama kaydin</p>";
    return;
  }

  bookmarks.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const langText = item.language ? " (" + item.language + ")" : "";

    card.innerHTML = "<strong>" + item.name + "</strong> Macne:" + item.meaning +  "<br>" +   item.description;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove";
    removeBtn.textContent = "Ka Saar";
    removeBtn.addEventListener("click", () => {
      bookmarks = bookmarks.filter(b => b.name !== item.name);
      renderBookmarks();
    });

    card.appendChild(removeBtn);
    bookmarksDiv.appendChild(card);
  });
}

renderResults();
renderBookmarks();