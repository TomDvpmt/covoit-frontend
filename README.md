![Logo de Covoit'](/frontend/src/assets/img/covoit-logo-bicolor-on-white.png)

# Contexte

Projet réalisé en 2023 dans le cadre de la formation "Développeur web" d'OpenClassrooms.

# Résumé

**Covoit** est une application de covoiturage.

Le projet consistait à créer le back-end et le front-end de l'application, en utilisant une **base de données**, un **framework JavaScript** et un **state manager**.

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

![Page d'accueil de Covoit'](/frontend/src/assets/img/captures/covoit-home.webp)

-   système de réservations :

![Page de réservations de Covoit'](/frontend/src/assets/img/captures/covoit-booking.webp)

-   messagerie interne entre utilisateurs :

![Page de conversation de Covoit'](/frontend/src/assets/img/captures/covoit-conversation.webp)

-   notifications par mail (Nodemailer) :

![Mail de réservation de Covoit'](/frontend/src/assets/img/captures/covoit-mail.webp)

# Installation

## Back-end

-   Créer une base de données sur [MongoDB Atlas](https://www.mongodb.com/atlas/database), avec une collection intitulée "Covoit" et un utilisateur autorisé à manipuler cette collection.

-   Dans l'interface de MongoDB, cliquer sur le bouton "Connect", choisir "Connect to your application" et noter le "connection string", dans lequel figure le cluster de la base de données (nécessaire pour l'étape suivante).

-   Dans le répertoire `backend`, créer un fichier `.env` contenant les instructions suivantes (ne pas conserver les balises `<>`):

```
MONGO_USERNAME=<nom de l'utilisateur de la collection>
MONGO_PASSWORD=<mot de passe de l'utilisateur>
MONGO_CLUSTER=<cluster de la base de données (exemple : cluster0.lhpmlqm)>
MONGO_DATABASE=Covoit

JWT_TOKEN_GENERATION_PHRASE=<choisir une phrase complexe>

MAILING_ADDRESS=<adresse mail utilisée pour envoyer les notifications>
MAILING_PASSWORD=<mot de passe pour cette adresse mail>
```

-   Toujours dans le répertoire `backend`, exécuter la commande :

`npm install`

## Front-end

-   Dans le répertoire `frontend`, exécuter la commande :

`npm install`

# Lancement de l'application

-   Dans le répertoire `backend`, exécuter la commande :

`node server`

-   Dans le répertoire `frontend`, exécuter la commande :

`npm start`
