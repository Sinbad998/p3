const form = document.getElementById('FormulaireLogin')

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let formData = new FormData(form);

    const email = form.email.value
    const password = form.password.value

    console.log(email);
    console.log(password);

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email, password
        })
    })
        .then(r => r.json())
        .then(data => {

            console.log(data)
            if (data.token) {
                
                localStorage.token = data.token
                //renvoie vers la page index.html si le token est bon
                location.href = "index.html"
            }
            // si le token n'est pas bon envoi un message d'erreur
            else alert("erreur: mauvaise authentification")
        })
    //.catch(e=>{alert("erreur: mauvaise authentification")})

})

