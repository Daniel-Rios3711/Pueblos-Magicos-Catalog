import { pueblos } from './pueblos-data.js';
// Gobal varibles
let pueblo1;
let pueblo2;
let leftCard;
let rightCard;
let currentPage = 1;
const pueblosPerPage =5;

// This function adds cards to the page to display the data in the array
function showCards(puebloList = pueblos) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

//calcuates the range for current page (in the catalog.html page)
  const startIndex = (currentPage -1) * pueblosPerPage;
  const endIndex = Math.min(startIndex + pueblosPerPage, puebloList.length);
    
  for(let i = startIndex; i< endIndex; i++){
    const pueblo = puebloList[i];
      const nextCard = templateCard.cloneNode(true);// Copy the template card
      editCardContent(nextCard, pueblo);// Edit title and image
      cardContainer.appendChild(nextCard); // Add new card to the container
    }
    //updates the visble page info
    document.getElementById("page-info").textContent = `Page ${currentPage}`;
  }


//This card informs users of what a Pueblo magico is and clones the same templateCard, so unused fields must be cleared.
function showIntroCard() {
    const templateCard = document.querySelector(".card");
    const introCard = templateCard.cloneNode(true); //makes a deep copy of templateCard and assigns it to introCard
    introCard.style.display ="block";
    
    //clears the unused text fields for the intro card
    introCard.querySelector(".state").textContent = "";
    introCard.querySelector(".food").textContent = "";
    introCard.querySelector(".population").textContent = "";
    introCard.querySelector(".founded").textContent = "";
    introCard.querySelector(".attractions").textContent = "";
    introCard.querySelector(".knownFor").textContent = "";
    
    introCard.querySelector("h2").textContent = "What Are Pueblos Magicos?";
    const introImage = introCard.querySelector("img");
    introImage.src = "https://laneisgoingplaces.com/wp-content/uploads/2021/05/Logo_Pueblo_Magicos.jpg";
    introImage.alt = "Pueblos Magicos Lopgo";
    introCard.querySelector(".description").textContent = "Pueblos Mágicos are special towns designated by the Mexican government for their historical significance, cultural richness, natural beauty, or unique traditions. They offer travelers a glimpse into Mexico’s diverse heritage, blending indigenous, colonial, and modern influences.";
    introCard.querySelector(".food").textContent = "Growing up, I spent most of my summers and winters in Mexico with my family, and it’s a big part of who I am. I’ve gotten to experience the beauty of Mexico at a local level, not just as a tourist. This website is meant to show people the beautiful magic of the Pueblos Mágicos of Mexico — to show that it’s not just what you see on the news, but a complex country rich with culture, traditions, and diversity.";
    const introSlot = document.querySelector(".intro-card");
    //removes button from templateCard
    const button = introCard.querySelector("button");
    if(button) button.remove();
    introSlot.appendChild(introCard);
}

function showTwoRandomPueblos(){
    //picks 2 distinct pueblos
    setRandomLeftPueblo();
    setRandomRightPueblo();
    
    //clones the template card twice once for each separate card
    const templateCard = document.querySelector(".card");
    const card1 = templateCard.cloneNode(true);
    const card2 = templateCard.cloneNode(true);
    
    // fill both cards
    editCardContent(card1, pueblo1);
    editCardContent(card2, pueblo2);
    
    // add each card to the left and right
    const leftSlot = document.querySelector(".left-card");
    const rightSlot = document.querySelector(".right-card");
     
    // adds a button to the left and right card
    const button1 = document.createElement("button");
    button1.textContent = "Show Me Another";
    button1.className = "refresh-btn";
    button1.onclick = refreshLeftCard;
    card1.querySelector(".card-content").appendChild(button1);
    
    
    const button2 = document.createElement("button");
    button2.textContent = "Show Me Another";
    button2.className = "refresh-btn";
    button2.onclick = refreshRightCard;
    card2.querySelector(".card-content").appendChild(button2);
    
    leftSlot.innerHTML = "";
    rightSlot.innerHTML = "";
    
    leftSlot.appendChild(card1);
    rightSlot.appendChild(card2);
    
    leftCard = card1;
    rightCard = card2;
}

// This function holds all my show functions, since document.addEventlistener only accepts one function as an argument
function ShowFunctions(){
    if(window.location.pathname.includes("catalog.html")){// 4 second page if I get a chance to implent it. show all of the pueblos in data list 10 by 10 with a previous and next button
        showCards();
    }else{
        showTwoRandomPueblos();
        showIntroCard();
    }
}



function editCardContent(card,pueblo) {
    card.style.display = "block";
    
    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = pueblo.name;
    
    const cardImage = card.querySelector("img");
    cardImage.src = pueblo.image;
    cardImage.alt = pueblo.name + " Photo";
    
    const cardState = card.querySelector(".state");
    cardState.textContent = "State: " + pueblo.state;
    
    const cardDescription = card.querySelector(".description");
    cardDescription.textContent = "Description: " + pueblo.description;
    
    const cardFood = card.querySelector(".food");
    cardFood.textContent = "Food: " + pueblo.notableFood;
    
    const cardPopulation = card.querySelector(".population");
    cardPopulation.textContent = "Population: " + pueblo.population;
    
    const cardFounded = card.querySelector(".founded");
    cardFounded.textContent = "Founded: " + pueblo.founded;
    
    const cardKnownFor = card.querySelector(".knownFor");
    cardKnownFor.textContent = "Known For: " + pueblo.knownFor;
    
    const cardAttractions = card.querySelector(".attractions");
    cardAttractions.textContent = "Attractions: " + pueblo.attractions.join(",");

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", pueblo.name, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", ShowFunctions);

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}

//This function will pick a random pueblo
function getrandomPueblo() {
    let index = Math.floor(Math.random() * pueblos.length);
    return pueblos[index];
}

//This function choses a random pueblo from the list for Pueblo1
function setRandomLeftPueblo() {
    do {pueblo1 = getrandomPueblo();
    }while (pueblo1 == pueblo2)
}
//This function choses a random pueblo from the list for Pueblo2 (seprate functions needed in order for buttons to work)
function setRandomRightPueblo() {
    do {pueblo2 = getrandomPueblo();
    }while (pueblo2 == pueblo1)
}

//button function for left card
function refreshLeftCard() {
    setRandomLeftPueblo();
    editCardContent(leftCard, pueblo1);
}

//button function for right card
function refreshRightCard() {
    setRandomRightPueblo();
    editCardContent(rightCard, pueblo2);
}

//controls if you can move to next page
function nextPage(){
    const totalPages = Math.ceil(pueblos.length / pueblosPerPage);
    if(currentPage < totalPages){
        currentPage++;
        showCards();
    }
}
//controls if you can move to prev page
function prevPage(){
    if(currentPage > 1) {
        currentPage--;
        showCards();
    }
}

// This Fucntion handles the Search looking for a right match
function handleSearch() {
    const input = document.getElementById("search-input").value.trim().toLowerCase();
    const matchingPueblos = [];
    for (let i = 0; i < pueblos.length; i++) {
        const puebloName = pueblos[i].name.toLowerCase();
        if (puebloName.includes(input)) {
            matchingPueblos.push(pueblos[i]);
        }
    }
    showCards(matchingPueblos);
}

// This function filters list by state only showing pueblos in a state
function filter(){
    const state = document.getElementById("state-filter").value;
    
    if (state == "") {
        showCards();
        return;
    }
    const filteredPueblos = [];
    for (let i = 0; i < pueblos.length; i++) {
        if (pueblos[i].state == state) {
            filteredPueblos.push(pueblos[i]);
        }
    }
    showCards(filteredPueblos);
}

//this function resets filter, Search, and the Sort
function resetFilters(){
    document.getElementById("search-input").value = "";
    document.getElementById("state-filter").value = "";
    document.getElementById("sort-select").value = "";
    showCards();
}

//this function calls the right sorting function to avoid clutter in this funnction if we added each case
function sort(){
    const sortOption = document.getElementById("sort-select").value;
    
    if (sortOption == "population") {
        sortByPopulation();
    } else if (sortOption == "alphabetical"){
        sortAlphabetically();
    } else if (sortOption == "founded"){
        sortByFounded();
    }
}

//this function sorts by population
function sortByPopulation(){
    const sortedPueblos = [...pueblos];
    sortedPueblos.sort((a,b) => a.population -b.population);
    showCards(sortedPueblos);
}

//this function sorts by Alphabetical order using their names
function sortAlphabetically(){
    const sortedPueblos = [...pueblos];
    sortedPueblos.sort((a,b) =>a.name.localeCompare(b.name));
    showCards(sortedPueblos);
}

//this function sorts by the year the pueblo was founded
function sortByFounded(){
        const sortedPueblos = [...pueblos];
        sortedPueblos.sort((a,b) => a.founded-b.founded);
    showCards(sortedPueblos);
}

//fix for global issue between files (not defined at HTMLButtonElement... eror)
window.filter = filter;
window.handleSearch =  handleSearch;
window.sort = sort;
window.resetFilters = resetFilters;
window.nextPage = nextPage;
window.prevPage = prevPage;
