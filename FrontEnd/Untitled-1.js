//Faites l’appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte.
async function getProjectsByArchitect(architectId) {
  const url = `http://localhost:5678/api/works`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
//Utilisez JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré.
function renderCards(projects) {
  const galleryContainer = document.querySelector('.gallery')
  console.log(projects)
//boucle pour creer une figure et une image pour chaque item dans projects
  projects.forEach((item, i) => {
    let figure = document.createElement('figure')
      , img = document.createElement('img')
//
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

    renderCards(projects)
  })
  .catch(error => {
    console.log(error);
  });

//Appel à l’API avec fetch afin de récupérer dynamiquement les differentes categories.
async function categories() {
  const url = `http://localhost:5678/api/categories`;
  const response = await fetch(url);
  const data = await response.json();
  const div = document.createElement("div")
  const button = document.createElement("button")
  button.textContent = "Tous"
  button.addEventListener("click", (event) =>{
    const worksItem = document.querySelectorAll(".gallery figure")
//boucle pour que chaque element de workItem est supprime chaque style
      worksItem.forEach(element2 => {
        element2.style = ""
      })
  })
  div.append(button)
  const divcontainer = document.querySelector("#portfolio h2")
  divcontainer.append(div)
  //console.log(data)

//boucle pour recuperer chaque id dans le tableau data puis creation de bouton associer
  data.forEach(element => {
    const categoryId = element.id;
    const categoryBtn = document.createElement("button");
    categoryBtn.textContent = element.name
//creation d'evenement click qui selectionne toutes les figure dans .figure
    categoryBtn.addEventListener("click", (event) => {
      //alert (event.target)
      const worksItem = document.querySelectorAll(".gallery figure")
//boucle pour que chaque element de workItem est supprime chaque style
      worksItem.forEach(element => {
        element.style = ""
      })
//Boucle qui regarde tout les element de workItem
      worksItem.forEach(element2 => {
//condition si l'element.id n'est pas égal à element2.dataset.categoryId ceci ne s'affiche pas 
        if (element.id !== parseInt(element2.dataset.categoryid)) {
          element2.style = "display : none"
        }
      });
   })
   
    div.append(categoryBtn);
  });

  console.log(button)
}

//data.forEach(categoryId => {
//const categoryId
//})
const cats = categories()
console.log(cats)







