Pour tester l'application:

Pour le Frontend


1. Dans un terminal, accéder au dossier frontend
2. Installer les dépendances avec : npm install
3. Le frontend du projet étant concu avec Angular, lancer avec : ng serve
4. Le frontend est accessible sur le http://localhost:4200

Pour le Backend

1. Dans un autre terminal, accéder au dossier backend
2. Installer les dépendances avec : npm install
3. Lancer avec : nodemon server 
4. Le Backend se connecte sur le http://localhost:3000

L'application utilise la base de données MongoDB

1. Créer un fichier .env 
2. A l'intérieur de celui ci, renseigner pour utiliser la base de données :

    - USER_DB="nom d'utilisateur base de données MongoDB"
    - PASSWORD_DB="Mot de passe base de données MongoDB"
    - CLUSTER_DB="Nom du cluster"

3. Renseigner le code secret du Token

    - JWT_SECRET="mot de passe JWT"