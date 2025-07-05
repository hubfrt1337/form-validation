import './styles/style.css';
const form = document.querySelector('form');
const email = document.getElementById('mail');
const mailError = document.querySelector("#mail + span.error");
const countries = document.getElementById("t1");
const countriesError = document.querySelector(".errorCountries")
const postal = document.getElementById("postal");
const postalError = document.querySelector("#postal + span.error");
const password = document.getElementById("password");
const passError = document.querySelector("#password + span.error")
const confirm = document.getElementById("confirm");
const confError = document.querySelector("#confirm + span.error")


email.addEventListener('input', (event) => {
    if(email.validity.valid){
        validInputs(mailError);
    } else {
    showError()
    }

})

countries.addEventListener("input", (event) =>{
    if(countries.validity.valid){
        validInputs(countriesError)
    } else {
        showErrorCountries()
    }
})

postal.addEventListener("input", function(){
    if(!countries.validity.valid){
        postalError.textContent = "Choose Country first!";
        postalError.classList.add("active");
    } 
     if(countries.validity.valid) {
        checkPostalCode(countries.value.toLowerCase());
        showErrorPostal();
    } 
    if(postal.validity.valid){
        validInputs(postalError);
    }

})
password.addEventListener("input", () => {
    if(password.validity.valid){
        validInputs(passError)
    } else {
        passError.textContent = "Password must contain min 8 characters"
        passError.className = "error active"
    }
})
confirm.addEventListener("input", () =>{
    if(confirm.value !== password.value){
        confError.textContent = "Passwords must be the same";
        confError.className = "error active";
        console.log(confirm.validity.valid)
    } else if(confirm.value === password.value && confirm.value.length >= 8){
        validInputs(confError);
        confirm.style.backgroundColor = "light-green";
        confirm.style.color = "black";
    }
})

form.addEventListener("submit", (event) => {
    if(!email.validity.valid){
        showError();
        event.preventDefault();
    }
    else if(!countries.validity.valid){
        showErrorCountries();
        event.preventDefault();
    }
    else if(!postal.validity.valid){
        showErrorPostal();
        event.preventDefault();
    } else if(!password.validity.valid){
        passError.textContent = "Password must contain min 8 characters";
        passError.className = "error active";
        event.preventDefault();
    } else if(confirm.value !== password.value ){
        event.preventDefault();
        confError.textContent = "Passwords must be the same";
        passError.className = "error active"
    }
})

function showError(){
    if(email.validity.valueMissing){
        mailError.textContent = 'Insert e-mail adress';
    } else if(email.validity.typeMismatch){
        mailError.textContent = "Wrong email syntax"
    } else if(email.validity.tooShort){
        mailError.textContent = `Email is too short, please enter min ${email.minLength} characters, you entered ${email.value.length}`;
    }
    mailError.className = "error active";
}


function showErrorCountries(){
    if(countries.validity.valueMissing){
        countriesError.textContent = "Insert Country";
    }
    else if(countries.validity.patternMismatch){
        countriesError.textContent = "Poland / United States / German";

    }
    countriesError.classList.add("error", "active");
}


function validInputs(DOM){
    DOM.textContent = "";
    DOM.className = "error";
}
function showErrorPostal(){
    if(postal.validity.valueMissing){
        postalError.textContent = "Insert post Code"
    } else if(postal.validity.patternMismatch){
            postalError.textContent = `Use: 00-000 format for ${countries.value} postCode`;
        } 
     postalError.className = "error active";
}

function checkPostalCode(country){
  if(country === "poland"){
    postal.pattern = "^([0-9]{2}-[0-9]{3})$";
  } else if(country === "united states"){
    postal.pattern = "^\d{5}(-\d{4})?$"
  } else if(country === "german"){
    postal.pattern = "^\d{5}$";
  }
}
