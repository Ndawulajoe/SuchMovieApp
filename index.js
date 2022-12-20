const autocompleteconfig={
    renderOption(movie){
        const imgSrc=movie.Poster==='N/A' ? '' :movie.Poster;
        
        return`
        <img src='${imgSrc}'/>
    ${movie.Title}(${movie.Year})
        `
    },
    
    inputValue(movie){
        return movie.Title
    },
    async getMovieData (such){
        const res = await axios.get("http://www.omdbapi.com/",{
            params:{
                apikey:'ccd897ed',
                s:such
            }
        })
        if(res.data.Error){
            return[]
        }
        console.log(res.data)
        //console.log(res.data.Search)
        return res.data.Search
        
    }


}
creatAutocomplete({
    ...autocompleteconfig,
    root:document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        getResults(movie,document.querySelector('#left-summary'))

    },
    
})

creatAutocomplete({
    ...autocompleteconfig,
    root:document.querySelector('#right-autocomlete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        getResults(movie,document.querySelector('#right-summary'))

    },
    
})


async function getResults(movie,summaryElement){
    const response = await axios.get("http://www.omdbapi.com/",{
        params:{
            apikey:'ccd897ed',
            i:movie.imdbID
        }
    })
    //console.log(response.data)
    summaryElement.innerHTML=movieDetails(response.data)
}
function movieDetails(data){
    console.log(data)
    return`
    <artcle class="media">
    <figure class="media-left">
    <p class="image">
    <img src="${data.Poster}"/>
    </p>
    </figure>
    </artcle>
    <div class="media-content">
    <div class="content">
    <h1>${data.Title}</h1>
    <h4>${data.Genre}</h4>
    <p>${data.Plot}</p>
    </div>
    </div>
    <article class="notification is-primary">
    <p class="title">${data.Awards}</p>
    <p class="subtitle">award</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${data.BoxOffice}</p>
    <p class="subtitle">boxOffice</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${data.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${data.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${data.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    `
}
