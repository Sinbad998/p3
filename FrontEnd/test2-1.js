//ne pas afficher ce quil ya dan la premiere modale pour afficher ce quil ya dans la seconde modale
//faudra juste chaange le contenu de la modale et garder le titre et le bouton ainsi que rajouter un bouton fleche 
//arriere pour revenir en arriere et une croix 
console.log("hello tout le monde")
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
      
      modal.addEventListener('click', async () => {
        try {
          ouvrirmodal();
          await categories()
        } catch (error) {
          console.error('Erreur')
        }
      });
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
    categories()
    document.querySelector("li:nth-child(3)").addEventListener("click", () => {
      location.href = "login.html"
    })
    
    // pour la fonctionnalites du logout pour afficher les filtres
    modal_template.style= "display = none"
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
    const figure = document.createElement('figure')
    figure.setAttribute("data-categoryId", item.categoryId)
    const img = document.createElement('img')
    const figcaption = document.createElement('figcaption')
    img.src = item.imageUrl
    figcaption.textContent = item.title
    
    figure.append(img)
    figure.append(figcaption)
    galleryContainer.append(figure)
    
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
      element2.style = ""})
    })
    
    div.append(button)
    const divcontainer = document.querySelector("#portfolio h2")
    divcontainer.append(div)
    
    
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
    <aside id="modal" style="display : none"> 
    <div class ="modal-wrapper">
    <h1>Galerie photo</h1>
    <div class="modal-galerie">
    </div>
    </div>
    </aside>`
  
  document.body.insertAdjacentHTML("beforeend", modal_template)
  document.querySelector("#portfolio h2").innerHTML += `<div class="btnModif"><img src="/Group.png" alt=""><span id="modal_btn">Modifier</span></div>`
  const btnModif = document.querySelector(".btnModif")
  btnModif.addEventListener('click', () =>{
    const aside = document.getElementById('modal');
    aside.style.display = "flex" 
  })
  if (localStorage.token){
    // aside.style.display = "flex"
    //aside.style = "visibilty:visible"
  }else{
    btnModif.style = "display : none";
  }
  document.querySelector("#portfolio h2 span").addEventListener("click", (item, i) => {
    modal.classList.add("on")
  })
  
  function renderModalCards(projects) {
    const imageTravauxWrapper = document.querySelector(".modal-wrapper div");
    
    projects.forEach((item, i) => {
      let figure = document.createElement('figure')
      img = document.createElement('img')
      const button = document.createElement('button');
      button.className = 'fa-solid fa-trash-can'
      button.classList.add('trash')
      // evenement sur le bouton pour supprimer les images
      button.addEventListener("click", () => {
        fetch("http://localhost:5678/api/works/" + item.id, {
          method: "DELETE",
          headers: { "Authorization": "Bearer " + localStorage.token },
        })
        
        .then(response => {
          if (response.ok) {
            console.log("Travaux supprimer correctement");
            window.location.reload()
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

  // Faire disparaitre la modale au click en dehors du carré
  const containerModal = document.getElementById("modal");
  containerModal.addEventListener("click", (e)=>{
  
    if (e.target.id == "modal"){
      containerModal.style.display = "none"
    }
  })

  const ajoutBtn = document.createElement('button');
  ajoutBtn.textContent = "Ajouter une photo";
  ajoutBtn.classList.add('Ajout')

  // faire disparaitre la modale pour ensuite en faire apparaitre une nouvelle
  ajoutBtn.addEventListener("click", (item,) => {
    ajoutBtn.style = 'display : none';
    
    function ModifFor2Modale(){

    // Je vide le contenu de la div 
    const gallerieContainer = document.querySelector('.modal-galerie');
    gallerieContainer.innerHTML = "";
    

    // je donne une nouvelles classe pour separar avec l'ancienne modale
    // je modifie le contenu du h1
    gallerieContainer.classList.add("nouveau")
    event.preventDefault();
    const titleH1 = document.querySelector('.modal-wrapper h1');
    titleH1.textContent = "Ajout photo";

    // creation du bouton valider
    const btnValider = document.createElement('button');
    btnValider.textContent = "Valider"
    btnValider.id = "Valider"

    function retourPremiereModale() {
      titleH1.innerHTML = "Galerie photo";
      form.style.display = "none";
    
      const btnAjout = document.querySelector('.apresfleche');
    
      // Si le bouton n'existe pas on le cree
      if (!btnAjout) {
        const retourArrBtn = document.createElement('button');
        retourArrBtn.textContent = 'Ajouter une photo';
        retourArrBtn.classList.add('apresfleche');
        retourArrBtn.style.backgroundColor = '#1D6154';
    
        document.querySelector('.modal-wrapper').appendChild(retourArrBtn);
      }
    }

    // creation de l'icone fleche arriere ainsi que son fonctionnement
    const flecheArriere = document.createElement("div");
    flecheArriere.classList.add('fleche')
    flecheArriere.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
  
      flecheArriere.addEventListener("click", async() => {

        retourPremiereModale()

        const modalgalerie = document.querySelector(".modal-galerie.nouveau")
        modalgalerie.classList.remove("nouveau")
        modalgalerie.innerHTML = '';  
        

        const projects = await getProjectsByArchitect();

        modalgalerie.append(renderModalCards(projects));

        flecheArriere.style = "display : none"
      })
  


    // Creation de l'icone X et de son fonctionnement
    const croix = document.createElement("div");
    croix.classList.add('croix')
    croix.innerHTML = '<i class="fa-solid fa-x"></i>'

      croix.addEventListener("click", async() => {
        const containerModal = document.getElementById("modal");

        containerModal.style.display = "none"
      
        retourPremiereModale()
      
        const modalgalerie = document.querySelector(".modal-galerie.nouveau")
        modalgalerie.classList.remove("nouveau")
        modalgalerie.innerHTML = '';  
      
        const projects = await getProjectsByArchitect();

        modalgalerie.append(renderModalCards(projects));      

        flecheArriere.style = "display : none"

    })
    
    const rechercheImages = document.createElement('div')

    const ajoutPhotoTemplate = `
      <label id="menu"> 
      <img src="assets/icons/picture-svgrepo-com 1.png" alt="">
      <input type="file" id="file-input" accept="image/jpeg, image/png, image/4mo , image/jpg"/>
      <div class = divAjout >+ Ajouter photo</div>
      <span class = spanAjout>
        jpg, png : 4mo max
      </span>
      </label>`
    
    
    function previewFile() {
      // regex pour mettre en parametres jpeg et png
      const fileRegex = /\.(jpeg|jpg|png)$/i;
      
      if (this.files.length === 0 || !fileRegex.test(this.files[0].name)) {
        return;
      }
      
      const file = this.files[0];
      
      const file_reader = new FileReader();
      
      file_reader.readAsDataURL(file);
      
      file_reader.addEventListener('load', (event) =>
        displayImage(event, file));
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
    
    
    const _image = document.createElement('img');
    rechercheImages.appendChild(_image);
    
    const btnContainer = document.querySelector('.modal-wrapper')
    btnContainer.insertAdjacentElement('afterend', rechercheImages);
   
    const form = document.createElement('form');
    
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Titre';
    form.appendChild(titleLabel);
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = '';
    titleInput.name = 'title';
    titleInput.id =  "titre"

    form.appendChild(titleInput);
    
    const categoriesLabel = document.createElement('label');
    categoriesLabel.textContent = 'Categories';
    categoriesLabel.classList.add("Categories")
    
    form.appendChild(categoriesLabel);
    
    const categoriesSelect = document.createElement('select');
    categoriesSelect.id = 'categoriesSelect';
    categoriesSelect.name = 'category';
    
    form.appendChild(categoriesLabel);
    form.appendChild(categoriesSelect);
    form.appendChild(btnValider);
    

    // faire un POST pour ajouter un projet
    let title = form.title.value;
    let category = form.category.value;
    let image = form.image;
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let form = event.target
      let formData = new FormData(form);
      
      const bodyContent = JSON.stringify({
        image, title, category
      })
      
      fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        body: formData
      })
      .then(response => response.json())
      .then(data => {

        // const imageUrl = data.imageUrl;
        // console.log(imageUrl);
        
        // const galleryContainer = document.querySelector('.gallery');
        // let figure = document.createElement('figure');
        // let image = document.createElement('img');
        // image.src = imageUrl;
        
        // figure.appendChild(image);
        // galleryContainer.appendChild(figure);
        
        // const modalImg = document.querySelector('.modal-galerie');
        // figure = document.createElement('figure');
        // image = document.createElement('img');
        // image.src = imageUrl;
        
        // figure.appendChild(image);
        // modalImg.appendChild(figure);
        
        // console.log("Création effectuée");
        // console.log(data);
        console.log(data);
        console.log("Voici l'image ajouter", data)
        renderModalCards(projects)
        console.log(renderModalCards(projects))
        renderCards(projects)
      })      
      
    });

    // async function handleSubmit(event) {
    //   event.preventDefault();
    //   const form = event.target;
    
    //   // Récupération des données du formulaire
    //   const title = form.title.value;
    //   const category = form.category.value;
    //   const image = form.image.files[0]; // Récupérer le premier fichier sélectionné
    
    //   const formData = new FormData();
    //   formData.append('title', title);
    //   formData.append('category', category);
    //   formData.append('image', image);

    //   try {
    //     const response = await   
    //  fetch("http://localhost:5678/api/works/", {
    //       method: "POST",
    //       headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    //       body: formData
    //     });
    //     const data = await response.json();
    
    //     // Ajout de l'image à la galerie et à la modale
    //     const galleryContainer = document.querySelector('.gallery');
    //     const modalImg = document.querySelector('.modal-galerie');
    
    //     // Créer un template pour les figures
    //     const figureTemplate = document.createElement('template');
    //     figureTemplate.innerHTML = `
    //       <figure>
    //         <img src="${data.imageUrl}" alt="">
    //       </figure>
    //     `;
    
    //     // Cloner le template et l'ajouter aux conteneurs
    //     const figureClone = figureTemplate.content.cloneNode(true);
    //     galleryContainer.appendChild(figureClone);
    //     modalImg.appendChild(figureClone);
    
    //     console.log("Création effectuée");
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout de l'image :", error);
    //   }
    // }
    
    // form.addEventListener('submit', handleSubmit);


    // pour verifier si tout les input sont remplis et si c'est le cas mettre le btn en vert
    function verifFormCompleted(){
      btnValider
      console.log(btnValider)
      const btnValiderForm = document.getElementById("Valider")
      console.log(btnValiderForm)
      
      form.addEventListener("input", ()=>{
        if (title.value == "" && category.value =="" && fileInput.value == ""){
          btnValider.classList.remove("Valid")
          console.log(btnValider)
        } else {
          btnValider.classList.add("Valid")
          btnValider.style = "background-color :#1D6154 "
          console.log(btnValider)
        }
      })
    
    }

    verifFormCompleted()
    
    gallerieContainer.appendChild(form)
    btnContainer.appendChild(rechercheImages)
    btnContainer.appendChild(flecheArriere)
    btnContainer.appendChild(croix)
    
    
    document.querySelector('.modal-galerie.nouveau form').insertAdjacentHTML("afterbegin" ,ajoutPhotoTemplate)
    
    const fileInput = document.getElementById('file-input');
    fileInput.name="image"
    fileInput.addEventListener('change', previewFile);
    
    // Creer une liste de categories dns l'input select
    async function fillFormSelect(item, i) {
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
    
    }
    
    ModifFor2Modale()
  })
  
  const buttonContainer = document.querySelector('.modal-wrapper');
  buttonContainer.appendChild(ajoutBtn);
  
  //console.log(buttonContainer)
  
  
  
  
  //const modal_template2 = `
  //<form id="FormulaireAjout">
  //<label for="username">Titre :</label>
  //<input type="text" id="Titre" required>
  
  //<label for="Categories">Categories :</label>
  //<input type="text" id="Categories" required>
  //<button type="submit" class="Valider">Valider</button> 
  //</form>
  //`
  //const modalContainer = document.createElement('div');
  //modalContainer.setAttribute("hidden")
  //modalContainer.insertAdjacentHTML('beforeend', modal_template2);
  //console.log(modalContainer)
  //document.body.appendChild(modalContainer);
  
  // Gestion de l'événement Submit sur le formulaire
  //let form = document.getElementById('FormulaireAjout');
  //const btnValider = document.querySelector('.Valider');
  //form.appendChild(btnValider)
  
  
  // console.log(form)
  
  //btnValider = document.querySelector('.Valider')
  
  
  
  //data.forEach(categoryId => {
    //const categoryId
  //})
  //const cats = categories()
  //console.log(cats)
  
  // faut que j'essaie de supprimer ou mettre en commentaire ce que je'ai fais pour essayer de tout simplement reprendre la modaletemplate et la modifier comme par exemple gallery-wrapper je met form titre aisni de suite
  // c'est chiant mais faisable faut juste que mon cerveau soit organiser ainsi que mes idees pour que j'y arrive parce que en faite j'ai trop d'idee dans la tete 
  // bref ce soir objectif faire apparaitre l'espace vide avec un titre prenom et l'espace vide avec les categories 
  // normalement ce que j'ai fais ça marche mais ça s'ouvre pas dans la modale 
  //document.body.insertAdjacentHTML("beforeend", modal_template2);
