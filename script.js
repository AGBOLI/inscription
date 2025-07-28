javascript
document.getElementById("inscriptionForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const contact = this.contact.value;
  const naissance = this.naissance.value;
  const genre = this.genre.value;
  const avis = this.avis.value;
  const fichier = document.getElementById("fichier").files[0];

  if (!fichier || fichier.type !== "application/pdf") {
    document.getElementById("message").innerText = "Veuillez ajouter un fichier PDF.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const base64File = reader.result.split(',')[1]; // PDF encodé en base64

    emailjs.send("", "TON_TEMPLATE_ID", {
      Email ou numéro : {{contact}}
      Date de naissance : {{naissance}}
      Genre : {{genre}}
      Avis : {{avis}}

      Nom du fichier : {{fichier_nom}}
      (Le fichier est encodé en base64 ici : {{fichier_base64}})

    }).then(
      () => {
        document.getElementById("message").innerText = "Inscription envoyée avec succès !";
      },
      () => {
        document.getElementById("message").innerText = "Erreur lors de l'envoi.";
      }
    );
  };

  reader.readAsDataURL(fichier);
});
