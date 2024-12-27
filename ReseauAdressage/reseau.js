const prompt = require("prompt-sync")();

function convertToBinaire(ip) {
    let nombreBinaire = '';
    let count = 0;
    for(let i = 0; i < ip.length; i++){
        if(ip[i] === '.'){
            count++;
        }
    }
    if(count === 3){
        console.log("\n---------------------------------------------------------------\n");
        console.log("Le format decimal pointe de l'adresse est correct ");
        const octets = ip.split('.').map(Number);
        if(octets.length === 4 && octets[0] < 256 && octets[1] < 256 && octets[2] < 256 && octets[3] < 256){
            console.log("Le nombre d'octets de l'adresse est correct");
            for (let i = 0; i < 4; i++) {
                octets[i] = octets[i].toString(2);
                while (octets[i].length < 8) {
                    octets[i] = '0' + octets[i];
                }
            }
            nombreBinaire = octets[0] + octets[1] + octets[2] + octets[3];
        
            return nombreBinaire;
        } else {
            console.log("\n---------------------------------------------------------------\n");
            console.log("Adresse IP Invalide !!!");
            ip = prompt("Veullez entrer une adresse valide : ");
        }
    } else {
        console.log("\n---------------------------------------------------------------\n");
        console.log("Adresse IP invalide !!!");
        ip = prompt("Veullez re-entrer une adresse valide : ");
        convertToBinaire(ip);
    }

}

function prefixeCidr(masqueCidr){
    masqueCidr = convertToBinaire(masqueCidr);
    let countCidr = 0;

    for(let i = 0; i < masqueCidr.length; i++){
        if(masqueCidr[i] === '1'){
            countCidr++;
        }
    }

    return countCidr;
}

function binaireToString(ip) {
    let adresse = '';
    let finalAdresse = '';
    for (let i = 0; i < ip.length; i++) {
        adresse += ip[i];
        if ((i + 1) % 8 === 0) { 
            if (finalAdresse) {
                finalAdresse += '.';
            }
            finalAdresse += parseInt(adresse, 2); 
            adresse = '';
        }
    }
    console.log(finalAdresse); // Vérifie l'adresse finale
    return finalAdresse;
}

function adresseToReseau(ip, masque) {
    const ipm = convertToBinaire(ip); // Convertit l'adresse IP en binaire
    const masquem = convertToBinaire(masque); // Convertit le masque en binaire

    // Effectue l'ET logique bit par bit
    let resultBin = '';
    for (let i = 0; i < ipm.length; i++) {
        resultBin += (ipm[i] === '1' && masquem[i] === '1') ? '1' : '0';
    }

    // Convertit le résultat binaire en format IPv4
    return binaireToString(resultBin);
}


function inverseMasque(masque){
    const masquemBinaire = convertToBinaire(masque);
    let masqueInv = '';
    for(let i = 0; i < masquemBinaire.length; i++){
        if(masquemBinaire[i] === '0'){
            masqueInv += '1'; 
        } else {
            masqueInv += '0';
        }
    }
    return masqueInv;
}
//console.log(inverseMasque("111111111111111111111"));

function adresseDiffusion(ipI, masqueI){
    let adresseReseauString = adresseToReseau(ipI, masqueI);
    const masqueInverser = inverseMasque(masqueI);
    let adresseReseauBinaire = convertToBinaire(adresseReseauString)
    let adrDiffusion = '';

    for(let i = 0;i < masqueInverser.length; i++){
        adrDiffusion += (adresseReseauBinaire[i] === '0' && masqueInverser[i] === '0') ? '0' : '1';
    }

    adresseReseauString = binaireToString(adrDiffusion);
    return adresseReseauString;

}
//console.log(adresseDiffusion("255.255.0.0","255.255.0.0"));

function nombreHotes(masque){
    masque = convertToBinaire(masque);
    let countHotes = 0;
    let i = masque.length - 1;

    if(masque[masque.length] === '1'){
        console.log("Il n' y a pas d'adresse adressable")
    } else {
        do {
            countHotes++;
            i--;
        } while(i >= 0 && masque[i] === '0');
    }
    
    return ((Math.pow(2, countHotes)) - 2);
}
//nombreHotes("255.255.12.0");

function plageAdresse(ip, masque){
    //ip = "192.168.1.10";
    //masque = "255.255.255.192";
    let adresseReseauP = adresseToReseau(ip, masque);
    let adresseDiffusionD = adresseDiffusion(ip, masque);
    let plageAdresseP = '';
    let plageAdresseD = '';
    //console.log(`L'adresse reseau est : ${adresseReseauP}`);
    //console.log(`L'adresse de diffusion : ${adresseDiffusionD}`);
    let octetsAdresseReseauP = adresseReseauP.split('.').map(Number);
    let octetsAdresseDiffusionD = adresseDiffusionD.split('.').map(Number);

    for(let i = 0; i < (octetsAdresseDiffusionD.length); i++){
        if(octetsAdresseReseauP[i] === octetsAdresseDiffusionD[i]){
            (i === 0) ? plageAdresseP = octetsAdresseReseauP[i] : plageAdresseP = plageAdresseP + '.' + octetsAdresseReseauP[i];
        } else {
            plageAdresseP = plageAdresseP + '.' + (octetsAdresseReseauP[i] + 1);
        }
    }

    for(let i = 0; i < (octetsAdresseDiffusionD.length); i++){
        if(octetsAdresseReseauP[i] === octetsAdresseDiffusionD[i]){
            (i === 0) ? plageAdresseD = octetsAdresseDiffusionD[i] : plageAdresseD = plageAdresseD + '.' + octetsAdresseDiffusionD[i];
        } else {
            plageAdresseD = plageAdresseD + '.' + (octetsAdresseDiffusionD[i] - 1);
        }
    }
    console.log(`La plage d'adresse est donc de : ${plageAdresseP} a ${plageAdresseD}`)
    console.log(`La premiere adresse est : ${plageAdresseP}`);
    console.log(`la derniere adresse est : ${plageAdresseD}`);

}

function countControlBinaire(){
    let ip = prompt("Veuillez entrer l'adresse IP sous format decimal pointe sans aucun caractere special : ");
    let countControl = 0;
    for(let i = 0; i < ip.length; i++){
        if(ip[i] === ' '){
            countControl++;
        }
    }
    if(countControl === 0){
        console.log("\n----------------------------------------------------------------");
        console.log(`L'adresse IP convertit en binaire est : ${convertToBinaire(ip)}`);
    } else {
        console.log("\n----------------------------------------------------------------");
        countControlBinaire();
    }
}

function menu(){
    let choix;

do {

    console.log("\n");
    console.log("--------------------------Menu principal--------------------------\n");
    console.log("1. Conversion d'une adresse IP decimal pointe en binaire");
    console.log("2. Trouver le prefixe /CIDR d'un reseau");    
    console.log("3. Trouver l'adresse reseau"); 
    console.log("4. Trouver l'adresse de diffusion");  
    console.log("5. Trouver la plage d'adresse");  
    console.log("6. Quelle est nombre d'hote de ce reseau");
    console.log("7. Quitter l'application");

    
    choix = parseInt(prompt("Veuillez choisir une option du menu (1-7) : "));

    switch (choix) {
        case 1:
            console.log("\n----------------------------------------------------------------\n");
            countControlBinaire();

            break;

        case 2 :
            console.log("\n----------------------------------------------------------------\n");
            let masqueCidr = prompt("Veuillez entrer le masque d3e ce reseau en format decimal pointe : ")
            console.log(`le prefixe /CIDR e ce reseau est : /${prefixeCidr(masqueCidr)}`);
        case 3:
            console.log("\n----------------------------------------------------------------\n");
            let ipI = prompt("Veuillez entrer l'adresse IP sous format decimal pointe : ");
            let masque = prompt("Veuillez entrer masque sous format decimal pointe : ");
            console.log(`L'adresse reseau de ces references est : ${adresseToReseau(ipI, masque)}`);
            console.log("\n----------------------------------------------------------------");
            break;
        case 4:
            console.log("\n----------------------------------------------------------------\n");
            let ipDiff = prompt("Veuillez entrer l'adresse IP sous format decimal pointe : ");
            let masqueDiff = prompt("Veuillez entrer masque sous format decimal pointe : ");
            console.log("----------------------------------------------------------------\n");
            console.log(`L'adresse de diffusion est : ${adresseDiffusion(ipDiff, masqueDiff)}`);

            break;
        case 5:
            console.log("\n----------------------------------------------------------------\n");
            let ipP = prompt("Veuillez entrer l'adresse IP sous format decimal pointe : ");
            let masqueP =  prompt("Veuillez entrer masque sous format decimal pointe : ");
            plageAdresse(ipP, masqueP);
            console.log("\n----------------------------------------------------------------");
            break;
        case 6:
            console.log("\n----------------------------------------------------------------\n");
            let masqueN = prompt("Veuillez entrer le masque de ce reseau en notation decimal pointe : ");
            console.log(`Le nombre d'hotes de ce reseau est : ${nombreHotes(masqueN)}`);
            break;
        case 7:
            console.log("\n----------------------------------------------------------------\n");
            console.log("Merci d'avoir teste notre application !!! \n");
            break;

        default:
            console.log("\n----------------------------------------------------------------\n");
            console.log("Entree invalide veuillez entrer un chiffre entre (1-7)");
            break;
    }
} while (choix !== 7);

}

menu();







