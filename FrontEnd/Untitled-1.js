
async function getProjectsByArchitect(architectId) {
  const url = `http://localhost:5678/api/works`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
function renderCards(projects){
  //console.log("galleryContainer")
  const galleryContainer = document.querySelector('.gallery')
  //console.log(galleryContainer)
  console.log(projects)
  projects.forEach((item,i) => {
    let figure = document.createElement('figure')
    , img = document.createElement('img')
    

    img.src = item.imageUrl
    //console.log(galleryContainer)
    figure.append(img)
    galleryContainer.append(figure)

    //const reponse = await fetch("")
  })
}

// Exemple d'utilisation
const architectId = 123;
getProjectsByArchitect(architectId)
.then(projects => {
  //console.log(projects);
  renderCards(projects)
})
.catch(error => {
  console.log(error);
});

async function categories() {
  const url = `http://localhost:5678/api/works`;
  const response = await fetch(url);
  const data = await response.json();
  const div = document.createElement("div")

  const buttonTous = document.createElement("button")
  buttonTous.textContent = "Tous"
  div.append(buttonTous)
  buttonTous.addEventListener( "mouseover" , (event) => {
    event.target.style.color = "green";
  });

  buttonTous.addEventListener( "mouseout" , (event) => {
    event.target.style.color = "";
  });

  const buttonObjet = document.createElement("button");
  buttonObjet.textContent = "Objet";
  div.append(buttonObjet);
  buttonObjet.addEventListener( "mouseover" , (event) => {
    event.target.style.color = "green";
  });

  buttonObjet.addEventListener( "mouseout" , (event) => {
    event.target.style.color = "";
  });


  const buttonAppartements = document.createElement("button");
  buttonAppartements.textContent = "Appartements";
  div.append(buttonAppartements);
  buttonAppartements.addEventListener( "mouseover" , (event) => {
    event.target.style.color = "green";
  });

  buttonAppartements.addEventListener( "mouseout" , (event) => {
    event.target.style.color = "";
  });

  const buttonHotel = document.createElement("button");
  buttonHotel.textContent = "Hotel & Restaurants";
  div.append(buttonHotel);
  buttonHotel.addEventListener( "mouseover" , (event) => {
    event.target.style.color = "green";
  });

  buttonHotel.addEventListener( "mouseout" , (event) => {
    event.target.style.color = "";
  });

  const divcontainer = document.querySelector("#portfolio h2")
  divcontainer.append(div)
  data.forEach
}





const cats = categories()
console.log(cats)



