
function createCards(libro) {
    let card = `
                <div class="div-card">
                    <a href="./detail.html?id=${libro.id}">
                        <img src="${libro.image}" class="div-img" alt="${libro.title}">
                        <h4 class="div-h4">${libro.title}</h4>
                        <p class="parrafo-uno ">${libro.tagline}</p>
                        <p class="parrafo-dos ">${libro.overview}</p>
                    </a>
                    <div class="div-button ">
                        <button data-vote="true" data-id="${libro.id}" class="button ">
                        ♡
                        </button>
                    </div>
                </div>`;
    ;
    return card;
}


function addCards(arrayLibros) {
    let divCreado = document.getElementById("container_favs");

    divCreado.innerHTML = '';
    let respuesta = "";

    arrayLibros.forEach(item => {
        respuesta += createCards(item); 
    });
    divCreado.innerHTML += respuesta;
}





let divCreado = document.getElementById("container_favs");

fetch('datos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar datos.json: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        let allBooks = data; 
        console.log(allBooks);
        getFavorites(allBooks);
        divCreado.addEventListener("click", (evento) => verifyButtonAndFavorite(evento, allBooks));
    })
    .catch(error => {
        console.warn("Error:", error);
    });





//sirve para  filtrar y mostrar la lista de películas favoritas basándose en los datos de localStorage.
function getFavorites(allBooks) { 
    console.log(allBooks);
    
    let arrayFavoritos;

    if (localStorage.getItem("favoritos")) {
        arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    } else {
        arrayFavoritos = [];
    }
    console.log(arrayFavoritos);
    
    let arrayFiltrado = allBooks.filter(movie => arrayFavoritos.includes(movie.id));
    addCards(arrayFiltrado);
}


//esta función gestiona el evento de click en los botones de like de los libros, alterna el estado de favorito de la libros correspondiente y actualiza la lista de libros favoritos en la interfaz de usuario.
function verifyButtonAndFavorite(evento, allBooks) {
    let esBotonLike = evento.target.dataset.vote;
    let idBook = evento.target.dataset.id;
    console.log(esBotonLike);
    console.log(idBook);
    if (esBotonLike) {
        toggleFavorites(idBook);
        getFavorites(allBooks); 
    }
}



//sirve para alternar el estado de favorito de  un libro en la lista de favoritos almacenada en localStorage
function toggleFavorites(idBook) {
    let arrayFavoritos;

    if (localStorage.getItem("favoritos")) {
        arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    } else {
        arrayFavoritos = [];
    }

    if (arrayFavoritos.includes(idBook)) {
        arrayFavoritos.splice(arrayFavoritos.indexOf(idBook), 1)
    } else {
        arrayFavoritos.push(idBook);
    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
}


//HACIENDO EL BOTON PARA ELIMINAR LAS CARTAS DE FAVORITOS.

let botonResete = document.querySelector(".boton-reset");
console.log(botonResete);
botonResete.addEventListener("click", callBackReset)


function callBackReset() {

    let div = document.getElementById("container_favs");

    console.log(div);

    div.innerHTML = "";

    localStorage.removeItem("favoritos");
}


