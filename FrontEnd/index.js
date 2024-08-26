//ne pas afficher ce quil ya dan la premiere modale pour afficher ce quil ya dans la seconde modale
//faudra juste chaange le contenu de la modale et garder le titre et le bouton ainsi que rajouter un bouton fleche 
//arriere pour revenir en arriere et une croix 

window.addEventListener("load", (event) => {
  //si le token du localstorage est vrai alors effacer le menu
  if (localStorage.token) {
    
    
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
    
    modal_template.style.display = "none"
    // pour la fonctionnalites du logout pour afficher les filtres
    
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
    button.className = 'fa-solid fa-trash-can'
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
ajoutBtn.addEventListener("click", (item,) => {
  ajoutBtn.textContent = "Valider";
  ajoutBtn.style = "background-color : #A7A7A7 ; border : white"
  ajoutBtn.style = 'display : none';
  
  
  
  const gallerieContainer = document.querySelector('.modal-galerie');
  gallerieContainer.innerHTML= "";
  // j"essaie de rendre la galleriecntainer non visible plutot que de supprimer le contenu pour pouvoir le faire reapparaitre en cliquant sur la fleche
  //gallerieContainer.style = "display : none"
  gallerieContainer.classList.add("nouveau")
  //document.querySelector(".Ajout").addEventListener("click", (item, i) => {
    event.preventDefault();
  const titleH1 = document.querySelector('.modal-wrapper h1');
  titleH1.textContent = "Ajout photo";
  modal.classList.add("on")
  
  const btnValider = document.createElement('button');
  btnValider.textContent = "Valider" 
  btnValider.classList.add("Valider")
  btnValider.addEventListener("click", ()=>{
    console.log("j'ai cliquer");
    function champsValides(){
      validerTitle()
      validerCategories()
    }
    
    function validerTitle(title) {
      let titleRegExp = new RegExp("[a-z0-9._-]")
      if (!titleRegExp.test(title)) {
        throw new Error("Le titre n'est pas valide.")
      }
    }

    function validerCategories(categories){
      if(!categoriesSelect.value)
        throw new Error("la category n'as pas été selectioneer")
    }

    if (!champsValides()) {
      console.log('Veuillez remplir tous les champs correctement.');
      return;
    }
    else{

    }
  })
  
  const flecheArriere = document.createElement("div");
  flecheArriere.classList.add('fleche')
  flecheArriere.innerHTML='<i class="fa-solid fa-arrow-left"></i>'
  flecheArriere.addEventListener("click", ()=>{
    
    const modal2 = document.getElementById('menu')
    modal2.remove()
    document.querySelector(".nouveau form").remove()
    document.querySelector(".nouveau").classList.remove("nouveau")
    ajoutBtn.textContent = "Ajouter une photo";
    titleH1.innerHTML = "Galerie photo"

  })
  
  const croix = document.createElement("div");
  croix.classList.add('croix')
  croix.innerHTML='<i class="fa-solid fa-x"></i>'
  croix.addEventListener("click", ()=>{
    const modalFermer = document.getElementById('modal');
    modalFermer.classList.remove("on")
    
    flecheArriere.click()
  })
  
  
  const rechercheImages = document.createElement('div')
  //rechercheImages.insertAdjacentElement("beforebegin", gallerieContainer)
  const ajoutPhotoTemplate = `
    <label id="menu"> 
      <img src="assets/icons/picture-svgrepo-com 1.png" alt="">
      <input type="file" id="file-input" accept="image/jpeg, image/png, image/4mo , image/jpg"/>
      <div class = divAjout >+ Ajouter photo</div>
      <span class = spanAjout>
        jpg, png : 4mo max
      </span>
    </label>`
  
  document.querySelector('.modal-wrapper h1').insertAdjacentHTML("afterend" ,ajoutPhotoTemplate)
  
  const fileInput =  document.getElementById('file-input');
  fileInput.addEventListener('change', previewFile);
  
  function previewFile () {
    // regex pour mettre en parametres jpeg et png
    const fileRegex = /\.(jpeg|jpg|png)$/i;
    
    if (this.files.length === 0  || !fileRegex.
      test(this.files[0].name)) {
        return;
      }
      
      const file = this.files[0];
      
      const file_reader = new FileReader();
      
      file_reader.readAsDataURL(file);
      
      file_reader.addEventListener('load', (event) =>
        displayImage(event,file));
      const divAjout = document.querySelector('.divAjout');
      divAjout.style = 'display : none';
      const spanAjout = document.querySelector('.spanAjout')
      spanAjout.style = 'display:none'
      
    } 
    
    function displayImage(event, file) {
      const figureElement = document.createElement('figure');
      figureElement.id = "image_selectionner";
      
      const imageElement = document.createElement('img');
      imageElement.src = event.target.result;
      
      figureElement.appendChild(imageElement);
      document.body.querySelector('label#menu').classList.add("loaded")
      document.body.querySelector('label#menu img').src = event.target.result;
      
      
    }
    
    const image = document.createElement('img');
    rechercheImages.appendChild(image);
    
    const btnContainer = document.querySelector('.modal-wrapper')
    btnContainer.insertAdjacentElement('afterend', rechercheImages);
    //const modalForm = document.createElement('div')
    //modalForm.classList.add("form")
    //console.log(mod)
    //document.querySelector('.modal-wrapper label').insertAdjacentHTML("afterend" ,modalForm)
    
    const form = document.createElement('form');
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Titre';
    form.appendChild(titleLabel);
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = '';
    titleInput.name = 'title';
    form.appendChild(titleInput);
    
    const categoriesLabel = document.createElement('label');
    categoriesLabel.textContent = 'Categories';
    
    form.appendChild(categoriesLabel);
    
    const categoriesSelect = document.createElement('select');
    categoriesSelect.id = 'categoriesSelect';
    categoriesSelect.name = 'categories';
    
    
    
    
    form.appendChild(categoriesLabel);
    form.appendChild(categoriesSelect);
    form.appendChild(btnValider);
    
    let title = form.title.value;
    let categories = form.categories.value;
    let imageForm = form.image;
    console.log(categories)

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let formData = new FormData(form);
     // formData.append("title", title);
      //formData.append("category", categories);
     // formData.append("image", image);

      
      console.log(imageForm)
      console.log(categories)
      console.log(title)

      const bodyContent = JSON.stringify({
        image,title,categories
      })
      
      fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {"Authorization": "Bearer " +  localStorage.getItem("token")},
        body: bodyContent
    })
    .then(response => response.json())
    .then(response => {
      console.log(response.status);
      console.log(response.statusText);
      return response.json();
    })
    .then(data => {
        console.log(data);
        // si la data est ok, création d'image et implémentation dans le DOM
        if (data.success) {
            const imageUrl = imageForm;
            console.log(imageUrl);

            const galleryContainer = document.querySelector('.gallery');
            let figure = document.createElement('figure');
            let image = document.createElement('img');
            image.src = imageUrl;
    
            figure.appendChild(image);
            galleryContainer.appendChild(figure);
    
            const modalImg = document.querySelector('.modal-galerie');
            figure = document.createElement('figure');
            image = document.createElement('img');
            image.src = imageUrl;
    
            figure.appendChild(image);
            modalImg.appendChild(figure);
    
            console.log("Création effectuée");
            console.log(data);
        } else {
            console.error("Erreur");
        }
    })
    .catch(error => {
        console.error("Une erreur s'est produite");
        alert("Une erreur s'est produite");
    });
    
      
      
    });
    
    gallerieContainer.appendChild(form)
    btnContainer.appendChild(rechercheImages)
    btnContainer.appendChild(flecheArriere)
    btnContainer.appendChild(croix)
    
    
    
    async function fillFormSelect(item,i){
      const url = `http://localhost:5678/api/categories`;
      const response = await fetch(url);
      const data = await response.json();
      const defaultOption = `<option value="0"></option>`
      console.log(categoriesSelect)
      categoriesSelect.innerHTML = defaultOption;
      
      data.forEach(category => {
        console.log(category)
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categoriesSelect.appendChild(option);
      })
    }
    fillFormSelect()
    
    
  })
  
  const buttonContainer = document.querySelector('.modal-wrapper');
  buttonContainer.appendChild(ajoutBtn);
  //console.log(buttonContainer)
  
  
  
  
  const modal_template2 = `
  <form id="FormulaireAjout">
  <label for="username">Titre :</label>
  <input type="text" id="Titre" required>
  
  <label for="Categories">Categories :</label>
  <input type="text" id="Categories" required>
      <button type="submit" class="Valider">Valider</button>     
  </form>
  `
  const modalContainer = document.createElement('div');
  modalContainer.insertAdjacentHTML('beforeend', modal_template2);
  //console.log(modalContainer)
  document.body.appendChild(modalContainer);
  
  // Gestion de l'événement Submit sur le formulaire
  let form = document.getElementById('FormulaireAjout');
  const btnValider = document.querySelector('.Valider');
  //form.appendChild(btnValider)
  console.log(btnValider)
  
  // console.log(form)
  
  //btnValider = document.querySelector('.Valider')
  console.log(btnValider)
  
  
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