//Faites l’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte.
async function getProjectsByArchitect(architectId) {
  const url = `http://localhost:5678/api/works`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
//Utilisez JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré.
function renderCards(projects){
  const galleryContainer = document.querySelector('.gallery')
  console.log(projects)
  projects.forEach((item,i) => {
    let figure = document.createElement('figure')
    , img = document.createElement('img')
    figure.setAttribute("data-categoryId", item.categoryId)
    

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
  const url = `http://localhost:5678/api/categories`;
  const response = await fetch(url);
  const data = await response.json();
  const div = document.createElement("div")
  const button = document.createElement("button")
  button.textContent = "Tous"
  div.append(button)
  const divcontainer = document.querySelector("#portfolio h2")
  divcontainer.append(div)
  //console.log(data)

  data.forEach(element => {

    // const categoryId = element.categoryId;
    const categoryId = element.id;
    const categoryBtn = document.createElement("button");
    categoryBtn.textContent = element.name
    categoryBtn.addEventListener ( "click",(event) => {
      alert (event.target)
    const worksItem = document.querySelectorAll(".gallery figure")
    worksItem.forEach(element2 => {
      console.log(element.name)
      console.log(element.id)
      console.log(element2.dataset.categoryId)
      if (element.id !== element2.dataset.categoryId){
        element2.style= "display : none"
      }
      
      
    });
    
    }

    )

    div.append(categoryBtn);
  });

  console.log(button)
}

//data.forEach(categoryId => {
  //const categoryId
//})
const cats = categories()
console.log(cats)







