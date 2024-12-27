//Projet

const prompt = require("prompt-sync")()

const annuaire = [];

// Message de démarrage de l'appli
console.log("Liste de contacts initialisée avec succès : ", annuaire);
console.log("\n-----------------------------------------------------------");

//Fonction qui ajoute un contact dans l'annuaire de contacts
function ajouterContact(){
    const nom = prompt("Entrez votre nom : ");
    const prenom = prompt("Entrez votre prénom : ");
    const telephone = parseInt(prompt("Entrez votre téléphone : "));
    const email = prompt("Entrez votre adresse email : ");

    if (!nom || !prenom || !telephone || !email) { //Cette condition vérifié si le champ vide ou a la valeur attribue a fausse 
        console.error("Erreur : Tous les champs sont obligatoires doivent contenir un renseignement correct !");
        console.log("Aucune donnée n'a été ajouté a l'annuaire, données invalides");
        return false;
    }

    // Vérifier si la valeur attribuée a la variable téléphone n'est pas numérique et affiche une erreur dans ce cas
    if (isNaN(telephone) || telephone.length < 10) {
        console.error("Erreur : Vous avez entre un numéro de téléphone invalide !");
        return false;
    }

    // Vérifier si le format de l'email est correct selon la syntaxe : cedren@gmail.com
    const emailTeste = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTeste.test(email)) {
        console.error("Erreur : L'adresse e-mail n'est pas valide !");
        return false;
    }

    // Ajouter les informations du contact au tableau
    annuaire.push({nom: nom, prenom : prenom, telephone : telephone, email : email});
    console.log("Ajout de contact effectué vec succès !!!");
    console.log(`Le contact : nom: ${nom}, prénom: ${prenom}, téléphone: ${telephone}, email: ${email} a bien été ajouté dans l'annuaire`);
    console.log("------------------------------------------------------------------");
    return true;
}

//La fonction afficherAnnuaire() qui nous permettra d'afficher tous contacts stockés dans notre tableau d'objets
function afficherAnnuaire(){
    console.log("------------------------------------------------------------------");
    if( annuaire.length === 0){
        console.log("Vous n'avez aucun contact dans l'annuaire");
    } else {
        console.log("L'annuaire ou la liste des contacts :");
        for(let i=0; i < annuaire.length; i++){
            console.log(`${i + 1} - nom : ${annuaire[i].nom} prénom : ${annuaire[i].prenom} téléphone : ${annuaire[i].telephone} email: ${annuaire[i].email}`);
        }
    }
}

//La fonction supprimerContact(numéro) qui nous permettra de supprimer un contact se trouvant dans notre annuaire ou tableau
//Cette fonction prend en parametre la variable numéro qui est la position du contact que nous voulons de l'annuaire ou de notre tableau
function supprimerContact(numero){

    if(numero < 1 || numero > annuaire.length){
        console.log("Le numero d'ordre que vous avez entre est invalide");
        return
    } else {
        const suppCont = annuaire.splice(numero - 1, 1)[0];//stocke le contact supprime dans une variable que nous avons appele suppCont
        console.log(`Le contact ${suppCont.telephone} du nom : ${suppCont.nom} et prenom : ${suppCont.prenom} de a bien ete supprime avec succes !!! `);
    }
}

let positionContact = 0;//la variable positionContact nous servira plus tard 
//La fonction rechercheContact(telephone, nom) permet deretrouver un contact en fonction du téléphone ou du nom connu
//Nous emprofiterons pour réccuperer la position du contact recherche dans notre car elle nous servira pour la mise a jour d'un contact car
//il nous sera important de connaitre la position du contact auquel nous voulons faire une mise a jour
function rechercheContact(nom, telephone) {
    let contactTrouve = false; // Indicateur pour vérifier si un contact est trouvé

    for (let i = 0; i < annuaire.length; i++) {
        // Comparaison le nom et le téléphone données par l'utilisateur aux données de notre tableau tout en le parcourant  
        if (nom === annuaire[i].nom || telephone === annuaire[i].telephone) {
            positionContact = i;
            contactTrouve = true;
            console.log("---------------------------------------------------------------------------");
            console.log(`Le téléphone ou le nom est valide et le contact se trouve a la position numero ${i + 1} de l'annuaire.`);
            console.log(`Voici le contact trouvé : \n nom : ${annuaire[i].nom}, prenom : ${annuaire[i].prenom}, telephone : ${annuaire[i].telephone}, email : ${annuaire[i].email}`);
        }
    }

    // Si aucun contact n'a été trouvé
    if (!contactTrouve) {
        console.log("Aucun contact correspondant trouvé dans l'annuaire.");
    }
}

function miseAjour(){
    console.log("Veuillez entrer le nom ou le numero de telephone du contact que vous comptez modifier");
    const telephone = parseInt(prompt("Entrez le téléphone recherché : ")); // Conversion en entier
    const nom = prompt("Entrez le nom recherché : ");
    rechercheContact(nom, telephone); //Nous faisons appel a la fonction de recherche pour retrouver le contact

    console.log("Veuillez saisir suivre et saisir entrer les nouvelles informations que vous voulez apporter : ");
    annuaire[positionContact].nom = prompt("Veuillez entrer le nouveau nom : ");
    annuaire[positionContact].prenom = prompt("Veuillez entrer le nouveau prenom : ");
    annuaire[positionContact].telephone = prompt("Veuillez entrer le nouveau numero de telephone : ");
    annuaire[positionContact].email = prompt("Veuillez entrer la nouvelle adresse email : ");
    console.log("Mise a jour effectue avec succes informations sauvergardes");
    return


}

function menuPrincipal() {
    let UserChoix;
    do {
        console.log("\n-------------------------------- Menu Principal de l'application de gestion de contact --------------------------------\n");
        console.log("1. Ajouter un nouveau contact dans l'annuaire");
        console.log("2. Afficher les contacts de l'annuaire");
        console.log("3. Supprimer un contact de l'annuaire");
        console.log("4. Rechercher un contact dans l'annuaire");
        console.log("5. Mettre a jour un contact");
        console.log("6. Quitter l'application");

        UserChoix = parseInt(prompt("Quelle option choisissez- vous ? (1-6) : "))

        switch (UserChoix) {
            case 1:
                ajouterContact();
                break;
            case 2:
                afficherAnnuaire();
                break;
            case 3:
                const numero = parseInt(prompt("Veuillez supprimer"));
                supprimerContact(numero);
                break;
            case 4:
                console.log("Il n'est pas obligé de connaitre le nom et le téléphone pour la recherche, il vous faut juste une info entre les deux");
                const nom = prompt("Entrez le nom du contact recherché ou taper sur la touche ENTRER pour passer le nom et entrer le telephone : ");
                const telephone = parseInt(prompt("Entrez le numero de téléphone recherché ou taper sur la touche ENTRER pour passer(si le nom est deja entre): ")); // Conversion de la valeur entree en entier

                rechercheContact(nom,telephone);
                break;
            case 5:
                miseAjour();
                break;
                case 6:
                console.log("Merci d'avoir essayé notre appli, Bonne continuation !!!");
                break;
        
            default:
                console.log("Numero de choix invalide, veuillez saisir un nombre entre 1 et 6");
                break;
        }
        
    } while (UserChoix !== 6);
}
menuPrincipal(); //Appel de la fontion pour le menu

