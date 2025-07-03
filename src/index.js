import './styles/style.css';
const email = document.getElementById('mail');

email.addEventListener("input", () => {
    if (email.validity.typeMismatch){
        console.log('yolo')
        email.setCustomValidity("adres e-mail expecting");
    } else {
      email.setCustomValidity('ok');
    }
})