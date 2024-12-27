//
function aleatChar(chars, count){
    const arrayChar = [];
    const arrayNbTypeCheck = [];

    //Rechercher les cases cochees
    if(firstCase.checked){     
        arrayNbTypeCheck[0] = 1;
    } else {
        arrayNbTypeCheck[0] = 0;
    }

    if(secondCase.checked){   
        arrayNbTypeCheck[1] = 1;
    } else {
        arrayNbTypeCheck[1] = 0;
    }
    
    if(thirdCase.checked){    
        arrayNbTypeCheck[2] = 1;
    } else {
        arrayNbTypeCheck[2] = 0;
    }
    
    if(fourthCase.checked){   
        arrayNbTypeCheck[3] = 1;
    } else {
        arrayNbTypeCheck[3] = 0;
    }
    console.log(arrayNbTypeCheck);

    for(let i = 0; i < count; i++){
        let aleatIndex = Math.floor(Math.random() * chars.length);
        let charElement = chars[aleatIndex];
        let countOccurence = 0;

        //arrayChar.push(charElement);
    //Verifier si la case chiffre n'est que la seule case cochee
        if((arrayNbTypeCheck[0] === 0) && (arrayNbTypeCheck[1] === 0) && (arrayNbTypeCheck[2] === 1) && (arrayNbTypeCheck[3] === 0) && (count > 8)){
            arrayChar.push(charElement);
        } else {
            for(Elm of arrayChar){
                if(Elm === charElement){
                    countOccurence++;
                }
            }
    
            if(countOccurence === 0){
                arrayChar.push(charElement);
            } else {
                aleatIndex = Math.floor(Math.random() * chars.length);
            }
    
            if(i !== (arrayChar.length - 1)){
                i = i - 1;
            }
        }

    }

    return arrayChar;

}


//Fonction melange de caractere
//Algorithme de Ficher-yates
function melangeChar(array){

    for(let i = array.length - 1; i > 0; i--){
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}


//fonction qui cherche le nommbre de caracteres du mot de passe
function selectDropdown(){
    const selectDrop = document.querySelector('#nbchar'); //le dropdown de choix de la longueur du mot de passe
    const passwordSize = Number(selectDrop.options[selectDrop.selectedIndex].value);

    return passwordSize;
}


//Generer un mot de passe de maniere aleatoire
function generPassword(){

    let nombre = 0; //A declarer en global
    let nombreType = 0;
    let chaine = '';
    let countCharType = 0;
    const nbChar = selectDropdown();  //Le nombre de caracteres du mot de passe
    const firstCase = document.querySelector('#case1');
    const secondCase = document.querySelector('#case2');
    const thirdCase = document.querySelector('#case3');
    const fourthCase = document.querySelector('#case4');

    let majNChar = '';
    let minNChar = '';
    let numNChar = '';
    let symbNChar = '';

    let charMaj = '';
    let charMin = '';
    let charNum = '';
    let charSymb = '';

    let restArray = [];

    //Compter le nombre de chexbox en checked
    if(firstCase.checked){      //Majuscule
        charMaj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        countCharType++;
    }

    if(secondCase.checked){     //Minuscule
        charMin = "abcdefghijklmnopqrstuvwxyz";
        countCharType++;
    }
    
    if(thirdCase.checked){      //Chiffre
        charNum = "0123456789";
        countCharType++;
    }
    
    if(fourthCase.checked){     //Symbole
        charSymb = `!@#$%<^{&*()]-_=+[}|;:'",>./?~`;
        countCharType++;
    }

    nombreType = Math.floor(selectDropdown());
    nombre = Math.floor(selectDropdown() / countCharType);
    
    //Verification

    //
    if((countCharType !== 3 && countCharType !== 0) || (countCharType === 3 && nombreType === 12) || (countCharType === 3 && nombreType === 24)){ 
        if(charMaj.length != 0){
            majNChar = aleatChar(charMaj, nombre);
            //console.log(`Uniquement compose de Mauscule : ${majNChar}`);
        }
        if(charMin.length != 0){
            minNChar = aleatChar(charMin, nombre);
            //console.log(`Uniquement compose de Minuscule : ${minNChar}`);
        }
        if(charNum.length != 0){
            numNChar = aleatChar(charNum, nombre);
            //console.log(`Uniquement compose de chiffres : ${numNChar}`);
        }
        if(charSymb.length != 0){
            symbNChar = aleatChar(charSymb, nombre);
            //console.log(`Uniquement compose de symbole : ${symbNChar}`);
        }
        //console.log(`Nombre de case coches : ${countCharType}`);
        //console.log(`chaque caractere sera ${nombre}`);

    } else if((countCharType === 3 && nombreType === 8) || (countCharType === 3 && nombreType === 16) || (countCharType === 3 && nombreType === 20)){
        if((countCharType === 3 && nombreType === 8) || (countCharType === 3 && nombreType === 20)){

            //Condition de controle qui affecte 1 restArray si la case i est cochee sinon 0
            if(charMaj.length != 0){
                restArray[0] = 1;
            } else {
                restArray[0] = 0;
            }

            if(charMin.length != 0){
                restArray[1] = 1;
            } else {
                restArray[1] = 0;
            }

            if(charNum.length != 0){
                restArray[2] = 1;
            } else {
                restArray[2] = 0;
            }

            if(charSymb.length != 0){
                restArray[3] = 1;
            } else {
                restArray[3] = 0;
            }
            console.log(restArray);
            //Calcul de longueur
            //Control
            if((restArray[0] === 0) && (restArray[1] === 1) && (restArray[2] === 1) && (restArray[3] === 1)){   
                //Si la case "Avec des Majuscule" n'est que la seule non cochee
                minNChar = aleatChar(charMin, (nombre + 1));
                numNChar = aleatChar(charNum, nombre);
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 0) && (restArray[2] === 1) && (restArray[3] === 1)){  
                //Si la case "Avec des Minuscule" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, (nombre + 1));
                numNChar = aleatChar(charNum, nombre);
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 1) && (restArray[2] === 0) && (restArray[3] === 1)){ 
                //Si la case "Avec des Chiffres" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, nombre);
                minNChar = aleatChar(charMin, (nombre + 1));
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 1) && (restArray[2] === 1) && (restArray[3] === 0)){
                //Si la case "Avec des Symbole" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, (nombre + 1));
                minNChar = aleatChar(charMin, nombre);
                numNChar = aleatChar(charNum, (nombre + 1));
            }


        }
        //Condition ou l'utilisateur coche trois checkbox et veut une longueur de 16 caracteres
        if((countCharType === 3 && nombreType === 16)){
            //Condition de controle qui affecte 1 restArray si la case i est cochee sinon 0
            if(charMaj.length != 0){
                restArray[0] = 1;
            } else {
                restArray[0] = 0;
            }

            if(charMin.length != 0){
                restArray[1] = 1;
            } else {
                restArray[1] = 0;
            }

            if(charNum.length != 0){
                restArray[2] = 1;
            } else {
                restArray[2] = 0;
            }

            if(charSymb.length != 0){
                restArray[3] = 1;
            } else {
                restArray[3] = 0;
            }
            console.log(restArray);
            //Calcul de longueur
            //Control
            if((restArray[0] === 0) && (restArray[1] === 1) && (restArray[2] === 1) && (restArray[3] === 1)){   
                //Si la case "Avec des Majuscule" n'est que la seule non cochee
                minNChar = aleatChar(charMin, nombre);
                numNChar = aleatChar(charNum, nombre);
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 0) && (restArray[2] === 1) && (restArray[3] === 1)){  
                //Si la case "Avec des Minuscule" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, nombre);
                numNChar = aleatChar(charNum, nombre);
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 1) && (restArray[2] === 0) && (restArray[3] === 1)){ 
                //Si la case "Avec des Chiffres" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, nombre);
                minNChar = aleatChar(charMin, nombre);
                symbNChar = aleatChar(charSymb, (nombre + 1));
            }
            if((restArray[0] === 1) && (restArray[1] === 1) && (restArray[2] === 1) && (restArray[3] === 0)){
                //Si la case "Avec des Symbole" n'est que la seule non cochee
                majNChar = aleatChar(charMaj, (nombre + 1));
                minNChar = aleatChar(charMin, nombre);
                numNChar = aleatChar(charNum, nombre);
            }
        }
    }

    const allChar = [...majNChar, ...minNChar, ...numNChar, ...symbNChar];
    
    const finalMelangeChar = melangeChar(allChar);

    //return finalMelangeChar; //finalChar
    for (const char of finalMelangeChar) {
        chaine = chaine + char;
    }

    return chaine; //Retourne une chaine de caractere final comme mot de passe

}

//

//Fonction copier-coller dans le presse papier

function copied(){
    const texteCopied = passwordChar.value;

    navigator.clipboard.writeText(texteCopied).then(
        function () {
          console.log("success");
        },
        function () {
            console.log("echec");
        }
    );

    buttonCopie.classList.add('animeMessageCopie');
    copier.style.display = 'none';
    setTimeout(() => {
        buttonCopie.classList.remove('animeMessageCopie');
        copier.style.display = 'flex';
    }, 
    2000);
    
}

//Fonction qui enleve les bordures du input texte au clic 
function inputFocus() {
    const inputPassword = document.querySelector('#password:focus');
    inputPassword.style.border = 'none';
    inputPassword.style.outline = 'none';
    //ced.style.cursor = 'none';
}
 
/***************************************************************************************************************/
/***********************************************DOM******************************************/
const buttonCopie = document.querySelector('.copie-button'); //Le bouton copie mot de passe 
const passwordChar = document.querySelector('#password'); //Selection de la balise HTML qui doit contenir le mot de passe
const copier = document.querySelector('#copie'); //Bouton qui copie le texte dans le presse papier au clic 

const submit = document.querySelector('#submit');
let countCharType = 0;
const iconDanger = document.querySelector('.iconDanger');

const messageError = document.querySelector('.errorMessage')  //Stockage du message erreur(aucune case cochee)
const messageEnable = document.querySelector('.message'); //Affichage du message de haut de page
//Selection des checkbox
const firstCase = document.querySelector('#case1'); 
const secondCase = document.querySelector('#case2');
const thirdCase = document.querySelector('#case3');
const fourthCase = document.querySelector('#case4');



function afficherPassword(){
    //fonction de genereation automatique de mot de passe
    const password = generPassword();  

    //Liste de condition qui affecte a type de caracteres des valeurs lorsque la case de ce type est cochee 
    if(firstCase.checked){     
        countCharType++;
    }

    if(secondCase.checked){   
        countCharType++;
    }
    
    if(thirdCase.checked){    
        countCharType++;
    }
    
    if(fourthCase.checked){   
        countCharType++;
    }

    //console.log(countCharType);
    if(countCharType !== 0){
        //Variable qui stocke le mot de passe Généré
        passwordChar.value = password; 

        //Ajout de l'animation et apparition du message de haut de page
        messageEnable.classList.add('messageOn');
        //fonction qui remet le message du haut de page en display none apres l'animation
        setTimeout(() => { messageEnable.classList.remove('messageOn')}, 800);
        countCharType = 0;
        //Re-verification 
        if(firstCase.checked){     
            countCharType++;
        }
    
        if(secondCase.checked){   
            countCharType++;
        }
        
        if(thirdCase.checked){    
            countCharType++;
        }
        
        if(fourthCase.checked){   
            countCharType++;
        } 
    }
    if(countCharType === 0) {
        console.error("Erreur");
        messageError.classList.add('errorMessageEnable');
        setTimeout(() => {messageError.classList.remove('errorMessageEnable')}, 800);

    }



}

submit.addEventListener("click", afficherPassword);

//Fonctionnalite de copie du mot de passe genere
copier.addEventListener("click", copied);

//Aucun bordure ne doit s'afficher au click sur le input qui contient le mot de passe genere
passwordChar.addEventListener("click", inputFocus);