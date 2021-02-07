# Movie Search APP :
Travail fait par : 
* **Maryam Cherradi**
* **Firas Dhaha**


# Description de l'application :
Cette application est concue pour faire des recherches sur des films en se basant sur un nombre de critère :
* **Genre** : il faut choisir un nombre de genres parmis ceux proposés.
* **Acteur** : il faut choisir un acteur ou écrire le nom d'un acteur.
* **Réalisateur** : il faut écrire le nom du réalisateur souhaité. 
* **Nationalité** : il faut choisir la nationalité du film parmis ceux proposées.
* **Année de sortie** : il faut choisir l'année de sortie du film (par défaut, ça affiche les films sortis à partir de 2010) 

## Le front end : 
La partie front end est codé en ReactJs, elle assure l'affichage des résultats reçus du backend. En particulier, le front end reçoit du server une liste contenant les IMDB id des films résultants de la recherche. En utilisant les IMDB id et l'api OMDBAPI, on récupère les informations sur chaque film (Synopsis, poster, ...) qu'on va afficher. 
## Le Back end (server) :

# Comment utiliser l'application :
## Installation : 
### Requirements : 
- Python 3
- Nodejs (https://nodejs.org/en/download/)
### 1 - Clone le repo :
```
git clone git@gitlab-student.centralesupelec.fr:firas.dhaha/movie-search-app-v2.git
cd movie-search-app-v2
```
### Installation des modules :
#### Front End :
(installez yarn pour gerer les package du front end)
```
npm install --global yarn 
cd movie-app 
yarn
```
#### Back End : 
```
cd ../backend 
pip3 install -r requirements.txt
```

**NOW YOU'RE GOOD TO GO**

## Lancement de l'application :
### lancer le front :
```
cd movie-app 
yarn start 
```
### lancer le server :
"export" sous mac/linux et "set" sous windows.
```
cd backend 
export FLASK_ENV = development 
export FLASK_APP = server.py
flask run -h localhost -p 3000 
```
Pour relancer le server, il faut seulement faire la commande ``` flask run -h localhost -p 3000 ```
## Utilisation de l'application :

* choisissez ou saisissez les critères que vous voulez 
* Clicker sur le button recherche 
* Voilà les résultats 



## Issues :
* Si l'application bug , relancez la (ctrl-c sur dans le terminal et refaites les étapes de lancement)
* Ne pas reload la page




