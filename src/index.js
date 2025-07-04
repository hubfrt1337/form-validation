import './styles/style.css';
const form = document.querySelector('form');
const email = document.getElementById('mail');
const mailError = document.querySelector("#mail + span.error");
const countries = document.getElementById("t1");
const countriesError = document.querySelector(".errorCountries")

email.addEventListener('input', (event) => {
    if(email.validity.valid){
        validInputs(mailError);
    } else {
    showError()
    }

})

countries.addEventListener("input", (event) =>{
    if(!countries.validity.patternMismatch){
        validInputs(countriesError)
    } else {
        showErrorCountries()
    }
})

form.addEventListener("submit", (event) => {
    if(!email.validity.valid){
        showError();
        event.preventDefault();
    }
    if(countries.validity.patternMismatch){
        showErrorCountries();
        event.preventDefault();
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
    if(countries.validity.value){
        countriesError.textContent = "Insert Country";
        console.log('pusto');
        console.log(countries.validity)
    }
    else if(countries.validity.patternMismatch){
        countriesError.textContent = "Wrong Country name";

    }
    countriesError.classList.add("error", "active");
}


function validInputs(DOM){
    DOM.textContent = "";
    DOM.className = "error";
}

function checkPostalCode(postCode, country){
    if(country == "PL"){
        const postCodeRegexPL = /^([0-9]{2}-[0-9]{3})$/;
    }
    const postCodeRegex = /^([A-Z]{1,2}[0-9][0-9A-Z]? ?[0-9][A-Z]{2}|GIR ?0AA)$/;
    
    return postCodeRegex.test(postCode);
}
console.log(checkPostalCode("62-600"));