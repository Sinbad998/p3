const form = document.getElementById('FormulaireLogin')
//formData.append("email")
//formData.append("password")
//console.log(formData)

form.addEventListener("submit" , (event) =>{
    event.preventDefault()
    let formData = new FormData(form); 
    //console.log(FormData)
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    console.log(email.value);
    console.log(password.value);
})


