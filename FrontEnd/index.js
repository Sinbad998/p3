//ne pas afficher ce quil ya dan la premiere modale pour afficher ce quil ya dans la seconde modale
//faudra juste chaange le contenu de la modale et garder le titre et le bouton ainsi que rajouter un bouton fleche 
//arriere pour revenir en arriere et une croix 

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


3


    // afficher le bandeau mode edition
    const template = `<div class="modeedition">
		<img src="/Vector.png" alt="">
		<span>mode édition</span>
	  </div>`
    document.body.insertAdjacentHTML("afterbegin", template)


    //changer le bouton en logout
    const BtnLogout = document.querySelector("li:nth-child(3)");
    BtnLogout.textContent = "Logout";
    //vide le localstorage et renvoi à la meme page
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

// variable qui integre du code html pour une modale et l'integres a l'index.html
const modal_template = `
<aside id="modal"> 
  <div class ="modal-wrapper">
    <h1>Galerie photo</h1>
    <div class="modal-galerie">
    </div>
  </div>
</aside>`

document.body.insertAdjacentHTML("beforeend", modal_template)
document.querySelector("#portfolio h2").innerHTML += `<img src="/Group.png" alt=""><span id="modal_btn">Modifier</span>`
document.querySelector("#portfolio h2 span").addEventListener("click", (item, i) => {
  modal.classList.add("on")
})
// evenement sur la modale au click qui on enleve la class "on"
modal.addEventListener('click', e => [
  e.target.classList.remove("on")
])

function renderModalCards(projects) {
  const imageTravauxWrapper = document.querySelector(".modal-wrapper div");

  projects.forEach((item, i) => {
    let figure = document.createElement('figure')
    img = document.createElement('img')
    const button = document.createElement('button');
    button.textContent = "\u{1F5D1}"
    button.classList.add('trash')

    button.addEventListener("click", () => {
      fetch("http://localhost:5678/api/works/" + item.id, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + localStorage.token },
      })

        .then(response => {
          if (response.ok) {
            console.log("Travaux supprimer correctement");
          } else {
            console.error("Erreur travaux non supprimer", response.status);
          }
        })
        .catch(error => {
          console.error("Erreur envoi de la requete DELETE", error);
        });
    })

    figure.setAttribute("data-categoryId", item.categoryId)

    img.src = item.imageUrl

    figure.append(button);
    figure.append(img)
    imageTravauxWrapper.append(figure)
  })
}



const ajoutBtn = document.createElement('button');
ajoutBtn.textContent = "Ajouter une photo";
ajoutBtn.classList.add('Ajout')
// faire disparaitre la modale pour ensuite en faire apparaitre une nouvelle
ajoutBtn.addEventListener("click", () => {
  const gallerieContainer = document.querySelector('.modal-galerie');
  //gallerieContainer.style = "display : none";
  //const formContainer = document.createElement("div")
  //formContainer.classList.add("modal-form")
  gallerieContainer.innerHTML= "";
  gallerieContainer.classList.add("nouveau")
  document.querySelector(".Ajout").addEventListener("click", (item, i) => {
    event.preventDefault();
    const titleH1 = document.querySelector('.modal-wrapper h1');
    titleH1.textContent = "Ajout photo";
    modal.classList.add("on")

    const flecheArriere = document.createElement("button");
    flecheArriere.classList.add('fleche')
    flecheArriere.textContent='<i class="fa-solid fa-arrow-left"></i>'

    const croix = document.createElement("button");
    croix.classList.add('croix')
    croix.textContent='<i class="fa-solid fa-x"></i>'

    const rechercheImages = document.createElement('div')
    rechercheImages.insertAdjacentElement("beforebegin", gallerieContainer)
    
    const form = document.createElement('form');

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Titre';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = '';
    form.appendChild(titleInput);
    
    const categoriesLabel = document.createElement('label');
    categoriesLabel.textContent = 'Categories';
    form.appendChild(categoriesLabel);
    
    const categoriesSelect = document.createElement('select');
    categoriesSelect.id = 'categoriesSelect';
    
    form.appendChild(categoriesLabel);
    form.appendChild(categoriesSelect);
    
    gallerieContainer.appendChild(form)
    const btnContainer = document.querySelector('.modal-wrapper')
    btnContainer.appendChild(rechercheImages)
    btnContainer.appendChild(flecheArriere)
    btnContainer.appendChild(croix)
  });

    //categories.forEach(category => {
    //const option = document.createElement('option');
    //option.value = category;
    //option.textContent = category;
    //categoriesSelect.appendChild(option);

    
    ajoutBtn.textContent = "Valider";
    
    
    //btnContainer.appendChild(flecheArriere)
    //btnContainer.appendChild(croix)
    //console.log(formContainer)
  //})
})

const buttonContainer = document.querySelector('.modal-wrapper');
buttonContainer.appendChild(ajoutBtn);

categories

  
  
  const modal_template2 = `
  <form id="FormulaireAjout">
  <label for="username">Titre :</label>
  <input type="text" id="Titre">
  
  <label for="Categories">Categories :</label>
  <input type="text" id="Categories">
      <button type="submit">Valider</button>     
    </form>
  `
  const modalContainer = document.createElement('div');
  modalContainer.insertAdjacentHTML('beforeend', modal_template2);

  document.body.appendChild(modalContainer);

  const form = document.getElementById('FormulaireAjout');
  form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const categories = document.getElementById('categories').value;

});



  //data.forEach(categoryId => {
  //const categoryId
  //})
  //const cats = categories()
  //console.log(cats)
  
// faut que j'essaie de supprimer ou mettre en commentaire ce que je'ai fais pour essayer de tout simplement reprendre la modaletemplate et la modifier comme par exemple gallery-wrapper je met form titre aisni de suite
// c'est chiant mais faisable faut juste que mon cerveau soit organiser ainsi que mes idees pour que j'y arrive parce que en faite j'ai trop d'idee dans la tete 
//  bref ce soir objectif faire apparaitre l'espace vide avec un titre prenom et l'espace vide avec les categories 
// normalement ce que j'ai fais ça marche mais ça s'ouvre pas dans la modale 
//document.body.insertAdjacentHTML("beforeend", modal_template2);