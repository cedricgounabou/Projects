Rapport du projet Création d'une Application de gestion de Contacts

Introduction

Ce projet d'annuaire de contacts est une application de gestion de contacts écrite en JavaScript. Cette application permet à l'utilisateur d'ajouter, afficher, rechercher, mettre à jour et supprimer des contacts. Toutes ces actions se ferons en ligne de commande une interface simple et efficace pour gérer une liste de contacts tout en conservant les données entre les sessions grâce à l'utilisation de tableau et d'objets.

Fonctionnalités de l'application

1. Ajout de Contacts
   - L'utilisateur peut ajouter un contact en fournissant les informations suivantes de ce dernier que sont :
     - le nom
     - le prénom
     - le numero de téléphone
     - l'adresse email
   - Une validation des données est effectuée pour s'assurer que :
     - Tous les champs sont remplis.
     - L'adresse email est a format valide.
     - Le numéro de téléphone est numérique et contient au moins 10 chiffres.

2. Affichage de la l'annuaire(tous les contacts)
   - Tous les contacts enregistrés dans l'annuaire sont affichés avec les differentes informations suivantes :
     - Nom, Prénom, Téléphone et Email.
   - Si aucun contact n'est présent, un message un message est affiche disant que l'annuaire de ne comporte aucun contact ou est vide.

3. Recherche de Contact
   - L'utilisateur peut rechercher un contact par nom ou numéro de téléphone connu.
   - Le résultat affiche le contact correspondant au nom ou au numero de telephone entre par l'utilisateur.

4. Mise à Jour de Contact
   - L'utilisateur peut modifier les informations d'un contact existant en le recherchant d'abord par son nom ou son numero de téléphone.
   - Après validation, le contact est mis à jour avec les nouvelles informations.

5. Suppression de Contact
   - L'utilisateur peut supprimer un contact en spécifiant son numéro d'ordre dans la liste ou dans l'annuaire.
   - Une confirmation de suppression est affichée pour indiquer le succès de l'opération.



Structure du Code

1. Variables Globales
   - annuaire: Tableau qui stocke tous les contacts.
   - positionContact: Utilisé pour stocher la position d'un contact lors des opérations de recherche et de mise à jour.

2. Fonctions Principales
   - ajouterContact() : Ajoute un contact au tableau après validation des entrées. 
   - afficherAnnuaire() : Affiche tous les contacts présents dans l'annuaire.
   - rechercheContact() : Recherche un contact par nom ou numéro de téléphone. 
   - miseAjour() : Modifie les informations d'un contact existant. 
   - supprimerContact() : Supprime un contact de l'annuaire en utilisant son index.
     

3. Menu Principal
   - Une boucle do while propose les différentes options ou choix ou un menu principal à l'utilisateur.


Validation des Données

- Numéro de Téléphone : doit être numérique avec au moins 10 chiffres.
- Email : Doit respecter le format email (exemple :example@mail.com).
- Champs Obligatoires : aucun champ ne doit être vide


Difficulte rencontre 
Ma difficulté était surtout au niveau de la gestion des erreurs, ce qui devait s'affiche lorsque certaines conditions ne sont pas respecté.


Conclusion

Ce projet d'annuaire est un bon point de départ pour apprendre à gérer des données dynamiques en JavaScript des todolist. 
