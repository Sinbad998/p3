// Variables
const gallery = document.querySelector(".gallery")
const h2 =  document.querySelector("#portfolio h2")

// fonction qui recupere les travaux de l'architecte qui se trouvent dans le fetch
async function getWorks(){
  const response = await fetch ("http://localhost:5678/api/works/")
  return await response.json()
}
getWorks();

// Affiche les travaux dans le DOM
async function previewWorks(){
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWorks(work)
  });
}
previewWorks()

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
  

  categorys.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    menu.appendChild(btn)
  });
}
previewCategoryBtn()