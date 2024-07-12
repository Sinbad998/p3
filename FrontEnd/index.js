window.addEventListener("load", (event) => {
  //si le token du localstorage est vrai alors effacer le menu
  if (localStorage.token) {

    //alert("connecter")
    //const mesProjets = document.querySelector("#contact h2")
    // mesProjets.textContent = "Mes Projets"
    //categories.style = "display : none"
    //const categoryBtn.style = "display : none"
    //const toutCategoryBtn = document.querySelectorAll(".categoryBtn")
    //document.querySelector(".Menu").innerHTML = "";
    //document.querySelector("divcontainer").innerHTML = "";
    //document.q
    //function cacherMenu(){
    //toutCategoryBtn.forEach(button =>{
    //button.style.display = "none"
    //})
    //}
    // Afficher le bouton modifier
    //const mesProjets = document.querySelector('#portfolio h2');
    //const ModifBtn = document.createElement("button");
    //ModifBtn.textContent = "Modifier";
    //mesProjets.appendChild(ModifBtn)

    //afficher le bouton modifier avec le contenu de la modale


    //const imageTravauxWrapper = document.querySelector(".modal-wrapper div");
    
    // Fonction pour afficher la modale et ajout d'evenement
    const ouvrirmodal = function (e) {
      e.preventDefault()
      const target = document.querySelector(e.target.getAttribute("href"))
      target.style.display = null
      target.setAttribute("aria-hidden", false)
      modal = target
      console.log(modal)
      // modal.addEventListener("click", closemodal)

      //modal.querySelector("js-modal-close").addEventListener("click", closemodal)
      //const modalBtn = document.querySelector("js-modal-close");
      modal.addEventListener('click', async () => {
        try {
          ouvrirmodal();
          await categories()
        } catch (error) {
          console.error('Erreur')
        }
      });
      //modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    }

    // Fonction pour fermer la modale et suppression des evenements
    const closemodal = function (e) {
      if (modal === null) return
      e.preventDefault()
      modal.style.display = "none"
      modal.setAttribute("aria-hidden", true)
      modal.removeEventListener("click", closemodal)
      modal = null
    }
    // pour bloquer la propagation de l'evenement
    // const stopPropagation = function (e) {
    //   e.stopPropagation()
    // }

    //
    // document.querySelectorAll(".js-modal").forEach(a => {
    //   a.addEventListener("click", ouvrirmodal)

    // })
    // evements sur la page qui ecoute le clavier 
    // window.addEventListener("keydown", function (e) {
    //   if (e.key === "Escape") {
    //     closemodal(e)
    //   }
    // })





    // afficher le bandeau mode edition
    const template = `<div class="modeedition">
		<i class="fa">	
		</i>
		<span>mode edition</span>
	  </div>`
    document.body.insertAdjacentHTML("afterbegin", template)


    //changer le bouton en logout
    const BtnLogout = document.querySelector("li:nth-child(3)");
    BtnLogout.textContent = "Logout";
    BtnLogout.addEventListener("click", () => {
      localStorage.clear()
      location.href = ""
    })

  } else {
    alert("pas connecter")
    categories()
    document.querySelector("li:nth-child(3)").addEventListener("click", () => {
      location.href = "login.html"
    })


  }
})
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
    renderModalCards(projects)
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
  div.classList.add('Menu');
  const button = document.createElement("button")
  button.textContent = "Tous"
  button.addEventListener("click", (event) => {
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

const modal_template = `
<aside id="modal"> 
  <div class ="modal-wrapper">
    <h1>Galerie photo</h1>
    <div class="modal-galerie">
    </div>
  </div>
</aside>`
// document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", ModifBtn)
document.body.insertAdjacentHTML("beforeend", modal_template)
document.querySelector("#portfolio h2").innerHTML += `<span id="modal_btn">Modifier</span>`
document.querySelector("#portfolio h2 span").addEventListener("click", (item, i) => {
modal.classList.add("on")
})
modal.addEventListener('click', e => [
e.target.classList.remove("on")
])

function renderModalCards(projects) {
  const imageTravauxWrapper = document.querySelector(".modal-wrapper div");
 
  projects.forEach((item, i) => {
    let figure = document.createElement('figure')
      , img = document.createElement('img')

    figure.setAttribute("data-categoryId", item.categoryId)

    img.src = item.imageUrl

    figure.append(img)
    imageTravauxWrapper.append(figure)

  })
}


//data.forEach(categoryId => {
//const categoryId
//})
//const cats = categories()
//console.log(cats)
