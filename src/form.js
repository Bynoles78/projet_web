document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const prenom = document.getElementById("prenom");
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const prenomError = document.getElementById("prenomError");
  const nomError = document.getElementById("nomError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  form.addEventListener("submit", function (e) {
    let valid = true;
    prenomError.textContent = "";
    nomError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    // Prénom
    if (!prenom.value.trim()) {
      prenomError.textContent = "Veuillez entrer votre prénom.";
      valid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\- ]{2,}$/.test(prenom.value.trim())) {
      prenomError.textContent = "Prénom invalide.";
      valid = false;
    }

    // Nom
    if (!nom.value.trim()) {
      nomError.textContent = "Veuillez entrer votre nom.";
      valid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\- ]{2,}$/.test(nom.value.trim())) {
      nomError.textContent = "Nom invalide.";
      valid = false;
    }

    // Email
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      emailError.textContent = "Veuillez entrer votre email.";
      valid = false;
    } else if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Format d'email invalide.";
      valid = false;
    }

    // Sujet
    if (!subject.value.trim()) {
      subjectError.textContent = "Veuillez entrer un sujet.";
      valid = false;
    }

    // Message
    if (!message.value.trim()) {
      messageError.textContent = "Veuillez entrer un message.";
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();

    //mailto 

    const mail = "2017jeffrey2006@gmail.com";
    const mailSubject = encodeURIComponent(subject.value.trim());
    const mailBody = encodeURIComponent(`Prénom : ${prenom.value.trim()}\nNom : ${nom.value.trim()}\nEmail : ${emailValue}\n${message.value.trim()}`
);
window.location.href = `mailto:${mail}?subject=${mailSubject}&body=${mailBody}`;
   });
})