#Movie Search APP :
Travail fait par : 
* Maryam Cherradi
* Firas Dhaha


#Description de l'application :



#Comment utiliser l'application :
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
```
cd backend 
export FLASK_ENV = development 
export FLASK_APP = server.py
flask run -h localhost -p 3000 
```

## Utilisation de l'application :

* choisissez ou saisissez les critères que vous voulez 
* Clicker sur le button recherche 
* Voilà les résultats 



## Issues :
* Si l'application bug , relancez la (ctrl-c sur dans le terminal et refaites les étapes de lancement)
* Ne pas reload la page




