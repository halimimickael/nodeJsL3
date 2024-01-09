const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

function getAllMovie(){
    return JSON.parse(fs.readFileSync('./dbMovies.json'),'utf-8')
}

function getMovieById (idParam){
    return getAllMovie()
    .filter(movie => movie.id == idParam)
}

function getMovieByTitle (titleParam){
    return getAllMovie().
    filter(movie =>  movie.title.toLowerCase().includes(titleParam))
}

function delMovieById(idParam) {
    const allMovies = getAllMovie(); 
    const updatedMovies = allMovies.filter(movie => movie.id !== idParam);                                         
    return updatedMovies; 
}

app.get('/movies',(req,res) => {
    const moviesObject = getAllMovie()
    res.status(200).end(JSON.stringify(moviesObject))
})

app.get('/movies/:param', (req, res) => {
    const paramValue = req.params.param;
    const idMovie = Number(paramValue);
     
    if (!isNaN(idMovie)) {
        // If the conversion to number is successful, consider it as an ID
        const movieObject = getMovieById(idMovie);
        res.status(200).end(JSON.stringify(movieObject));
    } else {
        // Otherwise, consider it as a title
        const titleMovie = String(paramValue.toLowerCase());
        const movieObject = getMovieByTitle(titleMovie);
        res.status(200).end(JSON.stringify(movieObject));
    }
});

app.post('/movie',(req,res)=>{
    const myMovie = req.body
    console.log(myMovie);
    const allMovie = getAllMovie()
    allMovie.push(myMovie)
    fs.writeFileSync('./dbMovies.json', JSON.stringify(allMovie, null, 2));
    res.end('') 
})

app.delete('/movie/:idParam', (req, res) => {
    const idParam = Number(req.params.idParam);
    
    if (isNaN(idParam)) {
        return res.status(400).json({ error: 'Invalid movie ID' });
    }
    const moviesObject = delMovieById(idParam);
    fs.writeFileSync('./dbMovies.json', JSON.stringify(moviesObject, null, 2));
    
    res.status(200).json({ message: 'Movie deleted successfully' });
});

app.listen(port,() => {
    console.log(`server listening port : ${port}`);
})