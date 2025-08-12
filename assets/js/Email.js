emailjs.init("mSiePQQEQ-83LNBaf"); //clé publique

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const spinner = document.getElementById("loading-spinner");
const submitButton = document.getElementById("submit-button");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Changement du texte et ajout du spinner dans le bouton
    submitButton.disabled = true;
    submitButton.innerHTML = `
        Envoi
        <svg width="20" height="20" viewBox="0 0 50 50" style="vertical-align: middle; margin-left: 8px;">
            <circle cx="25" cy="25" r="20" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="30 70">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" from="0 25 25" to="360 25 25" />
            </circle>
        </svg>
    `;
    status.textContent = "";

    emailjs.sendForm("service_r7k5fdk", "template_1qncn8e", this)
    .then(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = "Envoyer";
        status.textContent = "Message envoyé avec succès";
        status.style.color = "#0088aa";
        status.style.padding = '0.8em';
        status.style.borderRadius = "9999px";
        status.style.border = "1px #ffcc00 solid";
        status.style.boxShadow = "inset 0 0 12px rgba(245, 245, 245, 0.8)";
        form.reset();
    }, (error) => {
        submitButton.disabled = false;
        submitButton.innerHTML = "Envoyer";
        status.textContent = "Erreur : " + error.text;
        status.style.color = "#0088aa";
        status.style.padding = '0.8em';
        status.style.borderRadius = "9999px";
        status.style.boxShadow = "inset 0 0 2px #0088aa";
    });
});
