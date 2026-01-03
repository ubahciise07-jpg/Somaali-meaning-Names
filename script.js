const namesData = {
  wiilal: [
    { name: "Marwaan", meaning: "Aqli badan, dagan", description: "Marwaan waa magac wiil oo leh astaamo wanaagsan sida daganaansho iyo aqoon sare."},
    { name: "Ayaanle", meaning: "Nasiib badan, barako", description: "Ayaanle waa magac wiil oo ka turjumaya nasiib wanaag iyo barako badan."},
    { name: "Ahmed", meaning: "Magac caadi ah", description: "Ahmed waa magac wiil oo caadi ah laakiin qiimo weyn leh, inta badan dadku jecel yihiin." }
  ],
  gabdho: [
    { name: "Asmaa", meaning: "Xaasid la'aan", description: "Asmaa waa magac gabadh oo muujinaya dabeecad wanaagsan oo xaasid la'aan ah." },
    { name: "Naima", meaning: "Nasiib wanaag", description: "Naima waa magac gabadh oo tilmaamaya nasiib wanaag iyo farxad joogto ah.",  },
    { name: "Maariya", meaning: "Barako iyo nasiib", description: "Maariya waa magac gabadh oo tilmaamaya barako iyo nasiib wanaagsan oo nolosha ka buuxa.", language: "arabic" }
  ],
  wiilal_gabdho: [
    { name: "Ridwaan", meaning: "Raalli ahaansho", description: "Ridwaan waa magac guud oo ka turjumaya raalli ahaansho iyo kalsooni." },
    { name: "Ayman", meaning: "Barako iyo nasiib", description: "Ayman waa magac guud oo leh macne barako iyo nasiib wanaagsan." }
  ]
}

const searchInput  = document.getElementById("search-input")
const genderSelect = document.getElementById("genderselect")
const resultsDiv   = document.getElementById("results")
const bookmarksDiv = document.getElementById("bookmarks")
const clearButton  = document.getElementById("clear-button")

let displayedCards = []
let bookmarks = []


searchInput.addEventListener("input", handleSearch)
genderSelect.addEventListener("change", handleSearch)


clearButton.addEventListener("click", () => {
  searchInput.value = ""
})

//search
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim()
  const category = genderSelect.value
  if (!query || !category) return

  const match = namesData[category].find(
    item => item.name.toLowerCase() === query
  )

  if (match && !displayedCards.some(c => c.name === match.name)) {
    displayedCards.push(match)
    renderResults()
  }
}

//result
function renderResults() {
  resultsDiv.innerHTML = ""

  displayedCards.forEach(item => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <strong>${item.name}</strong> Macne: ${item.meaning}<br>
      ${item.description} (${item.language})
    `

    // button Save  
    const saveBtn = document.createElement("button")
    saveBtn.className = "save"
    saveBtn.textContent = "Kaydi"
    saveBtn.onclick = () => addBookmark(item)

    // button Ka Saar RESULTS 
    const removeBtn = document.createElement("button")
    removeBtn.className = "remove"
    removeBtn.textContent = "Ka Saar"
    removeBtn.onclick = () => {
      displayedCards = displayedCards.filter(c => c.name !== item.name)
      renderResults()
    }

    card.append(saveBtn, removeBtn)
    resultsDiv.appendChild(card)
  })
}

//bookmarks

function addBookmark(item) {
  if (bookmarks.some(b => b.name === item.name)) return

  bookmarks.push({
    name: item.name,
    meaning: item.meaning,
    description: item.description,
    language: item.language
  })

  renderBookmarks()
}

function renderBookmarks() {
  bookmarksDiv.innerHTML = ""

  bookmarks.forEach(item => {
    const card = document.createElement("div")
    card.className = "card"

    card.innerHTML = `
      <strong>${item.name}</strong> - ${item.meaning}<br>
      ${item.description} (${item.language})
    `

    // button Ka Saar BOOKMARKS 
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Ka Saar Bookmarks"
    removeBtn.onclick = () => {
      bookmarks = bookmarks.filter(b => b.name !== item.name)
      renderBookmarks()
    }

    card.appendChild(removeBtn)
    bookmarksDiv.appendChild(card)
  })
}