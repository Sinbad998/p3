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
    const ModifBtn = `<div class = "modal1">
    <a href = #modal1 class="js-modal">Modifier</a>
    <aside id="modal1" class="modal" aria-hidden="true" role="dialog" style="display:none"> 
    <div class ="modal-wrapper">
    <button class="js-modal-close">Fermer la boite modale</button>
    <h1>Our love isn't any different from yours, except it's hotter, because I'm involved.</h1>
    <p>I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. You lived before you met me?! Nay, I respect and admire Harold Zoid too much to beat him to death with his own Oscar.</p>
    <p>I wish! It's a nickel. We don't have a brig. I am the man with no name, Zapp Brannigan! <strong> Shinier than yours, meatbag.</strong> <em> I didn't ask for a completely reasonable excuse!</em> I asked you to get busy!</p>
    <h2>I decline the title of Iron Cook and accept the lesser title of Zinc Saucier, which I just made up. Uhh… also, comes with double prize money.</h2>
    <p>No, she'll probably make me do it. We'll need to have a look inside you with this camera. We can't compete with Mom! Her company is big and evil! Ours is small and neutral! With gusto.</p>
    <ol>
    <li>No! The kind with looting and maybe starting a few fires!</li><li>All I want is to be a monkey of moderate intelligence who wears a suit… that's why I'm transferring to business school!</li><li>Take me to your leader!</li>
    </ol>

    <input type="text>

    <h3>I'm just glad my fat, ugly mama isn't alive to see this day.</h3>
    <p>Our love isn't any different from yours, except it's hotter, because I'm involved. Then we'll go with that data file! This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry!</p>
    <ul>
    <li>Shut up and take my money!</li><li>Who said that? SURE you can die! You want to die?!</li><li>WINDMILLS DO NOT WORK THAT WAY! GOOD NIGHT!</li>
    </ul>

    
    <p>Fry, you can't just sit here in the dark listening to classical music. You can crush me but you can't crush my spirit! OK, if everyone's finished being stupid. Oh, you're a dollar naughtier than most.</p>
    <p>This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! When I was first asked to make a film about my nephew, Hubert Farnsworth, I thought "Why should I?" Then later, Leela made the film. But if I did make it, you can bet there would have been more topless women on motorcycles. Roll film!</p>
    <p>I just told you! You've killed me! Hey! I'm a porno-dealing monster, what do I care what you think? You mean while I'm sleeping in it? No argument here. You wouldn't. Ask anyway!</p>
    <p>File not found. Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife holding up? …To shreds, you say. I suppose I could part with 'one' and still be feared…</p>
    <p>I found what I need. And it's not friends, it's things. And until then, I can never die? Oh, I always feared he might run off like this. Why, why, why didn't I break his legs? Is the Space Pope reptilian!?</p>
    <p>I am Singing Wind, Chief of the Martians. Fry, you can't just sit here in the dark listening to classical music. Guess again. Check it out, y'all. Everyone who was invited is here. Why did you bring us here?</p>
    <p>No! I want to live! There are still too many things I don't own! Aww, it's true. I've been hiding it for so long. Fry! Quit doing the right thing, you jerk! Man, I'm sore all over. I feel like I just went ten rounds with mighty Thor.</p>
    <p>Quite possible. We live long and are celebrated poopers. Kif might! Now Fry, it's been a few years since medical school, so remind me. Disemboweling in your species: fatal or non-fatal? Now Fry, it's been a few years since medical school, so remind me. Disemboweling in your species: fatal or non-fatal?</p>
    <p>Oh right. I forgot about the battle. There's one way and only one way to determine if an animal is intelligent. Dissect its brain! Hey, guess what you're accessories to. Bender, I didn't know you liked cooking. That's so cute.</p>
    <p>No, she'll probably make me do it. We're rescuing ya. Oh dear! She's stuck in an infinite loop, and he's an idiot! Well, that's love for you. You can see how I lived before I met you. Now, now. Perfectly symmetrical violence never solved anything.</p>
    <p>Oh, I think we should just stay friends. Good news, everyone! I've taught the toaster to feel love! They're like sex, except I'm having them! Fetal stemcells, aren't those controversial?</p>
    <a href="#">test667</a>
    </div>
    </aside>`
    document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", ModifBtn)
    
    // Fonction pour afficher la modale et ajout d'evenement
    const ouvrirmodal = function (e) {
      e.preventDefault()
      const target = document.querySelector(e.target.getAttribute("href"))
      target.style.display = null
      target.setAttribute("aria-hidden", false)
      modal = target
      modal.addEventListener("click" , closemodal)
      modal.querySelector("js-modal-close").addEventListener("click", closemodal)
      modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    }

  // Fonction pour fermer la modale et suppression des evenements
    const closemodal = function (e) {
      if (modal === null) return
      e.preventDefault()
      modal.style.display = "none"
      modal.setAttribute("aria-hidden", true)
      modal.removeEventListener("click" , closemodal)
      modal = null
      modal.querySelector("js-modal-close").removeEventListener("click", closemodal)
      modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
      
    }

    const stopPropagation = function (e) {
      e;stopPropagation()
    }


    document.querySelectorAll(".js-modal").forEach(a => {
      a.addEventListener("click", ouvrirmodal)

    })



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



//data.forEach(categoryId => {
//const categoryId
//})
//const cats = categories()
//console.log(cats)








