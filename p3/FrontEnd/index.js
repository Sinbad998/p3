// si l'utilisateur est connecter
window.addEventListener("load", (event) => {
  
  // afficher le bandeau mode edition dans l'en tete de la page
  if (localStorage.token) { 
    const template = `
      <div class="modeedition">
      <img src="Vector.png" alt="">
      <span>mode édition</span>
      </div>`
    document.body.insertAdjacentHTML("afterbegin", template)
    
    //changer le bouton en logout
    const BtnLogout = document.querySelector("li:nth-child(3)");
    BtnLogout.textContent = "Logout";
    BtnLogout.addEventListener("click", () => {
      localStorage.clear()
      location.href = ""
    })

    //// variable qui integre du code html pour la modale et l'integre a l'index.html
    const modal_template = `
    <aside class="modal" > 
    <div class ="modalProjet">
    <span><i class="fa-solid fa-xmark"></i></span>
    <h1>Galerie photo</h1>
    <div class="modalGalerie">
    </div>
    <button class="btnPhoto">Ajouter une photo</button> 
    </div>
    </aside>`
    
    document.body.insertAdjacentHTML("afterend", modal_template)
    document.querySelector("#portfolio h2").innerHTML += `<div class="btnModif"><img src="Group.png" alt=""><span id="modal_btn">Modifier</span></div>`
    
    // variables n²
    const btnModif =  document.querySelector(".btnModif");
    const aside = document.querySelector(".modal");
    const xmark = document.querySelector(".modal .fa-xmark");
    const modalGalerie = document.querySelector(".modalGalerie")
    
    // affichage de la modale au click sur modifier
    function parametersAsideModale(){
      btnModif.addEventListener("click", ()=>{
        aside.style.display = "flex"
      });
      
      xmark.addEventListener("click", ()=>{
        aside.style.display = "none"
      });
      
      aside.addEventListener("click", (e)=>{
        if (e.target.className == "modal"){
          aside.style.display = "none";
        }
      });
    }
    parametersAsideModale();
    
    //affichage des projets dans la galerie
    async function ProjetModal() {
      modalGalerie.innerHTML=""
      const projets = await getWorks()
      projets.forEach(projet => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = projet.id
        img.src = projet.imageUrl
        
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        modalGalerie.appendChild(figure)
      });
      deleteProjet()
    }
    ProjetModal()
    
    
    // supprimer les travaux de la modale
    function deleteProjet(){
      const trashs = document.querySelectorAll(".fa-trash-can")
      trashs.forEach(trash => {
        trash.addEventListener("click", (e)=>{
          fetch("http://localhost:5678/api/works/" + trash.id, {
            method: "DELETE",
            headers: { "Authorization": "Bearer " + localStorage.token },
          })
          .then(response => {
            if (response.ok) {
              console.log("Travaux supprimer correctement");
              const figure = trash.closest("figure");
              figure.remove();
            } else {
              console.error("Erreur travaux non supprimer", response.status);
            }
          })
          .catch(error => {
            console.error("Erreur envoi de la requete DELETE", error);
          });
        })
      });
    }
    
    //// variable qui integre du code html pour la modale² et l'integre a l'index.html
    const modal_templateAjout = `
     <aside class="modalAjout"> 
     <div class="Ajout">
     <span><i class="fa-solid fa-xmark"></i></span>
     <span><i class="fa-solid fa-arrow-left"></i></span>
     <h2>Ajout photo</h2>
     <form>
     <div class="fileInput">
     <span><i class="fa-regular fa-image" style="color: #b5b9bf"></i></span>
     <label for="file">+Ajouter photo</label>
     <input type= "file" id="file" name="image">
     <img src="#" alt="Apercu de l'image">
     <p>Jpg,png: 4 mo max
     </div>
     <label for="title">Titre</label>
     <input type ="text" id="title" name="title">
     <label for="category">Categorie</label> 
     <select name="category" id="category"></select>
     <button>Valider</button>
     </form>
     </div>
     </aside>`
    
    document.body.insertAdjacentHTML("beforeend", modal_templateAjout)
    
    // variable n3
    const btnAjoutPhoto = document.querySelector("button.btnPhoto");
    const modalTemplateAjout = document.querySelector(".modalAjout");
    const modalAside = document.querySelector(".modal");
    const arrowfleft = document.querySelector(".fa-arrow-left");
    const xmarkAjout = document.querySelector(".modalAjout .fa-xmark");
    
    
    
    // faire apparaitre la deuxieme modale 
    function previewModalAjout(){
      btnAjoutPhoto.addEventListener("click",()=>{
        modalTemplateAjout.style.display ="flex"
        modalAside.style.display ="none"
      })
      arrowfleft.addEventListener("click", ()=>{
        modalTemplateAjout.style.display="none"
        modalAside.style.display="flex"
      })
      xmarkAjout.addEventListener("click", ()=>{
        modalTemplateAjout.style.display ="none"
      })
      modalTemplateAjout.addEventListener("click", (e)=>{
        if (e.target.className == "modalAjout"){
          modalTemplateAjout.style.display = "none";
        }
      });
    }
    previewModalAjout()
    
    // previsu image dans l'input
    const previewImgco = document.querySelector(".fileInput img")
    const inputFile = document.querySelector(".fileInput input")
    const labelFile = document.querySelector(".fileInput label")
    const iconFile = document.querySelector(".fileInput .fa-image")
    const pFile = document.querySelector(".fileInput p")
    
    
    // ecouter les changelents sur l'input file
    function previewImg(){
      inputFile.addEventListener("change",()=>{
        const file = inputFile.files[0]
        if(file){
          const reader = new FileReader();
          reader.onload =function (e){
            previewImgco.src = e.target.result
            previewImgco.style.display ="flex"
            labelFile.style.display="none";
            iconFile.style.display="none";
            pFile.style.display="none";
          }
          reader.readAsDataURL(file);
        }
      })
    }
    previewImg()

    // ajouter la liste de categories dans le select
    async function selectCategory() {
      const select = document.querySelector(".modalAjout #category")
      const categorys = await getCategorys()
      categorys.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
      });
    }
    selectCategory()    
    
    // POST pour ajouter un projet
    const form = document.querySelector(".modalAjout form")
    const title =document.querySelector(".modalAjout #title")
    const category =document.querySelector(".modalAjout #category")
    
    form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      body: formData
    })
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      console.log("voici le projet ajouter", data)
      createWorks(data)
      ProjetModal()
      modalTemplateAjout.style.display ="none";
    })
    .catch(error =>{
      console.error("Erreur lors de l'ajout du projet", error);
    })
  })
  
  //fonction qui verifie que les input sont remplis
  function verifFormCompleted(){
    const btnValidForm = document.querySelector(".modalAjout button")
    console.log(btnValidForm);
    form.addEventListener("input", ()=>{
      if(!title.value =="" && !category.value == "" && !inputFile.value ==""){
        btnValidForm.classList.add("valid")
      } else {
        btnValidForm.classList.remove("valid")
      }
    })
  }
  verifFormCompleted()
    
  } else {
    getCategorys()
    document.querySelector("li:nth-child(3)").addEventListener("click", () => {
      location.href = "login.html"
    })
    menudiv = document.querySelector("#portfolio .Menu")
    menudiv.style.display="flex"
  }
})



// Variables
const gallery = document.querySelector(".gallery")
const h2 =  document.querySelector("#portfolio h2")

// fonction qui recupere les travaux de l'architecte qui se trouvent dans le fetch
async function getWorks(){
  const response = await fetch ("http://localhost:5678/api/works/")
  return await response.json()
}
getWorks();

// creation des travaux sous forme HTML
function createWorks(work){
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  
  img.src = work.imageUrl;
  figcaption.textContent = work.title;
  
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Affiche les travaux dans le DOM
async function previewWorks(){
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWorks(work)
  });
}
previewWorks()


//**********************Affichage des boutons par categories************************** */


// Fonction qui recupere les differentes categories.(fonction qui est rappeller dans la fonction "previewCategoryBtn")
async function getCategorys(){
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// fonction qui crée un bouton pour chaque categories qui se trouvent dans le fetch
async function previewCategoryBtn(){
  const categorys = await getCategorys();
  const menu = document.createElement("div");
  menu.classList.add("Menu");
  h2.insertAdjacentElement('afterend', menu);
  
  const tousBtn = document.createElement("button");
  tousBtn.textContent = "Tous";
  tousBtn.classList.add("filtres");
  tousBtn.id = "0"
  menu.appendChild(tousBtn);
  
  categorys.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add("filtres")
    menu.appendChild(btn)
  });
}
previewCategoryBtn()

// evenement sur les boutons pour filtrer par categorie

async function filterCategory() {
  const projet = await getWorks();
  const btns = document.querySelectorAll(".filtres");
  btns.forEach(btn => {
    btn.addEventListener("click", (e)=>{
      const btnId = e.target.id;
      gallery.innerHTML = "";
      if(btnId !== "0"){
        const projetCategoryTri = projet.filter((work) => {
          return work.categoryId == btnId;
        });
        
        projetCategoryTri.forEach(work => {
          createWorks(work)
        });
      } else {
        previewWorks()
      }
      console.log(btnId)
    })
  });
}
filterCategory()


