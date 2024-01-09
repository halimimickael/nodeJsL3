## <span style="color: #58C9B9;">LESSON 03 NODEJS

### <span style="color: #519D9E;">Initialisation de node dans notre projet</span>

<div>Dans un tout premier temps nous allons crée un nouveau fichier où on veut notre project grace a la commande `mkir` dans le cmd de l'odinateur. Ensuite nous allons initialiser la node dans notre nouveau projet en injectant la ligne suivante : `npm init`, repondre oui a toute les questions poser par le cmd</div>

### <span style="color: #519D9E;">Initialisation du fichier package.json
<div>avant: </div>
<pre>
<code>
{
  "name": "l03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^3.0.2"
  }
}
</code>
</pre>
<div>Changement du "main" et on change le "test" par "start"<br>
après :</div>
<pre>
<code>
{
  "name": "l03",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "nodemon start"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "nodemon": "^3.0.2"
  }
}

</code>
</pre>

##  <span style="color: #58C9B9;">LA CONSTRUCTION D'UN SERVEUR
### <span style="color: #519D9E;"> Déclarer express
<pre>
<code>
const express = require('express')
const app = express()
</code>
</pre>

###<span style="color: #519D9E;"> Préparer l'utilisation de fs
`const fs = require('fs')`
<div>  La bibliothèque "fs" peut être utilisée pour effectuer diverses opérations sur les fichiers lors du traitement des requêtes "HTTP". </div>

### <span style="color: #519D9E;"> Préparer l'utilisation de body-parser
`const bodyParser = require('body-parser')`
<div>"body-parser" est une bibliothèque "Node.js" qui est souvent utilisée avec Express pour faciliter le traitement des données envoyées dans le corps (body) des requêtes "HTTP". Elle permet de récupérer ces données, souvent au format "JSON" ou "urlencoded", et de les rendre disponibles dans le code de votre application "Express".</div>

##### Comment installer body-parser dans notre project:
<div><i>npm install body-parser</i></div>

##### Explication de lq ligne de code "app.use(bodyParser.json())"
<div>"Body-parser" est une bibliothèque qui simplifie le traitement du corps des requêtes "HTTP". La méthode "json()" de "body-parser" est utilisée ici pour traiter le corps de la requête lorsqu'il est au format JSON.</div>


### <span style="color: #519D9E;"> Instaurer le port que nous allons utiliser
`const port = 3000`

### <span style="color: #519D9E;">MIDDLEWARES
<div> Les middlewares sont des fonctions qui ont accès à l'objet de requête "(req)", à l'objet de réponse "(res)", et à la fonction middleware suivante dans le cycle de requête-réponse de l'application "Express". Ils sont utilisés pour effectuer des tâches intermédiaires dans le traitement des requêtes.
</div>

#### USE STATIC
`app.use(express.static('public'));`
<div><p> C'est une fonction middleware spécifique fournie par Express pour servir des fichiers statiques. Elle prend comme argument le répertoire que vous souhaitez exposer de manière statique. Dans cet exemple, elle pointe vers le répertoire appelé "public".

Ainsi, avec cette ligne de code, vous indiquez à Express d'utiliser la fonction middleware express.static pour gérer les requêtes de fichiers statiques à partir du répertoire "public". Cela signifie que si vous avez un fichier dans le répertoire "public", comme par exemple "style.css", vous pouvez y accéder depuis le navigateur en utilisant l'URL correspondante, par exemple, http://localhost:3000/style.css.</p></div> 
#### USE BODYPARSER
`app.use(bodyParser.json())`
<div>"Body-parser" est une bibliothèque qui simplifie le traitement du corps des requêtes "HTTP". La méthode "json()" de "body-parser" est utilisée ici pour traiter le corps de la requête lorsqu'il est au format JSON.</div>


## <span style="color: #58C9B9;"> QUELQUE COMMANDES  

### <span style="color: #519D9E;">Utilisation d'un filtre pour un fichier json:
<p>Dans la plupart des cas de ce cours nous allons chercher un element de notre json(database), pour cela nous utilison la fonction ".filter"<hr>
voici un exemple:</p>
<p>Dans cet exemple je demande comme paramettre un id. Je vais demander de rendre dans le array de tout les films que j'ai obtenue le film dont le id correspond au paramettre que j'aurais recu.<br>
Faire attention! "movie" n'esT qu'en realité juste un nom, j'aurais pue l'appeler "jus","rose" ou meme"pierre", il donne juste un nom a notre base de donné. C'est donc pour cela que nous utilison movie.id doit etre egal a notre paramettre</p>

### <span style="color: #519D9E;"> GET:
<p>La fonctionnalité GET permet de sortir un element de notre base de donnée<hr>
exemple : </p>
<pre>
<code>
function getAllMovie(){
    return JSON.parse(fs.readFileSync('./dbMovies.json'),'utf-8')
}
app.get('/movies',(req,res) => {
    const moviesObject = getAllMovie()
    res.status(200).end(JSON.stringify(moviesObject))
})
</code>
</pre>

<p>Dans le code, on voit une premiere fonction qui va nous aider a pouvoir recuperer tout les informations que l'on dispose dans le fichier json. Dans la deuxieme partie du code nous voyons qu'on prend tout les information du json pour les renvoyer en tant que string.</p>


### <span style="color: #519D9E;">POST
<p>POST nous permez de rajouter un object a notre base de donnée <hr>
Exemple : </p>
<pre>
<code>
app.post('/movie',(req,res)=>{
    const myMovie = req.body
    console.log(myMovie);
    const allMovie = getAllMovie()
    allMovie.push(myMovie)
    fs.writeFileSync('./dbMovies.json', JSON.stringify(allMovie, null, 2));
    res.end('') 
})
</code>
</pre>

<p>Dans se cas la on avait pour obligation de prendre tout le fichier json pour le mettre en arr, enregister les données donner par l'utilisateur pour pouvoir faire un push dans le arr enregistrer juste avant pour qu'enfin venir prendre tout le arr et le reecrire dans le fichier json. </p>

<!-- ### DEL
<p>cette action nous aide a suprimer un objet du database</p> -->
