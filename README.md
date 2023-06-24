<center>

![Logo de Covoit'](/src/assets/img/covoit-logo-bicolor-on-white.png)

</center>

# Contexte

Projet réalisé en 2023 dans le cadre de la formation "Développeur web" d'OpenClassrooms.

# Résumé

**Covoit** est une application de covoiturage.

Le projet consistait à créer le back-end et le front-end de l'application, en utilisant une **base de données**, un **framework JavaScript** et un **state manager**.

# Lien vers l'application

<a href="https://covoit.onrender.com/" target="_blank">https://covoit.onrender.com/</a>

# Dépôts

Ce dépôt contient uniquement le **front-end** de l'application.

Le back-end : <a href="https://github.com/TomDvpmt/covoit-backend" target="_blank">https://github.com/TomDvpmt/covoit-backend</a>

# Technologies utilisées (MERN)

-   MongoDB Atlas
-   JavaScript
-   Node.js
-   Mongoose
-   Express
-   Bcrypt
-   JWT
-   Multer
-   Nodemailer
-   React
-   React Router 6
-   Redux
-   Redux Toolkit
-   PropTypes
-   Material UI

# Fonctionnalités

-   module de recherche de trajet avec API externe pour les noms de communes (geo.api.gouv.fr) :

<center>

![Page d'accueil de Covoit'](/src/assets/img/captures/covoit-home.webp)

</center>

-   système de réservations :

<center>

![Page de réservations de Covoit'](/src/assets/img/captures/covoit-booking.webp)

</center>

-   messagerie interne entre utilisateurs :

<center>

![Page de conversation de Covoit'](/src/assets/img/captures/covoit-conversation.webp)

</center>

-   notifications par mail (Nodemailer) :

<center>

![Mail de réservation de Covoit'](/src/assets/img/captures/covoit-mail.webp)

</center>

# Installation

-   Dans le répertoire racine de l'application, exécuter la commande :

`npm install`

-   Dans le fichier `/src/config/API.js`, remplacer la valeur de `API_BASE_URI` par celle de votre serveur back-end.

# Lancement de l'application

-   Dans le répertoire racine, exécuter la commande :

`npm start`
