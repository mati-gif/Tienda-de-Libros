
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

    arrayLibros.forEach(item => {// Se utiliza forEach para iterar sobre cada objeto de libro en arrayLibros
        respuesta += createCards(item); //el html generado por createCards se concatena a la variable respuesta.
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
//permite mostrar solo las películas favoritas de un usuario, recuperándolas del localStorage  y volviendola mostrar en pantalla.
//recupera la lista de favoritos del localStorage ,filtra las peliculas de allBooks para incluir solo la que estan en favoritos y llama a addCards para mostrarlas
function getFavorites(allBooks) { //recibe como parametro un array con las peliculas.
    console.log(allBooks);
    
    let arrayFavoritos;

    if (localStorage.getItem("favoritos")) {
        arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    } else {
        arrayFavoritos = [];
    }
    console.log(arrayFavoritos);
    
    let arrayFiltrado = allBooks.filter(movie => arrayFavoritos.includes(movie.id));//La función filter recorre allMovies y selecciona sólo aquellas películas cuyos id están en arrayFavoritos.
    // Es decir, se seleccionan sólo las películas que están marcadas como favoritas.
    addCards(arrayFiltrado);//se llama a la función addCards con el array filtrado de películas favoritas 
}


//esta función gestiona el evento de click en los botones de like de las películas, alterna el estado de favorito de la película correspondiente y actualiza la lista de películas favoritas en la interfaz de usuario.
//es decir verifica si el elemento que disparo el evento ( el click) es un boton de favorio
function verifyButtonAndFavorite(evento, allBooks) {//recibe como parametro el evento que desencadena la funcion y allMovies es un array que contiene todas las peliculas
    let esBotonLike = evento.target.dataset.vote;//accede al atributo data-vote
    let idBook = evento.target.dataset.id;//accede al atributos data-id
    console.log(esBotonLike);
    console.log(idBook);
    if (esBotonLike) {
        toggleFavorites(idBook);//llama a la funcion toggleFavorites que recibe como argumento el idBook que cambia el estado de favorito de la película (agregando o eliminando su id de la lista de favoritos en localStorage).
        getFavorites(allBooks); // Actualiza la lista de películas favoritas después de cambiar el estado del botón y las muestra en la interfaz de usuario.
    }
}



//sirve para alternar el estado de favorito de  una pelicula en la lista de favoritos almacenada en localStorage
function toggleFavorites(idBook) {
    let arrayFavoritos;// almacena el array de IDs de películas favoritas.

    if (localStorage.getItem("favoritos")) {
        arrayFavoritos = JSON.parse(localStorage.getItem("favoritos"));
    } else {
        arrayFavoritos = [];
    }

    if (arrayFavoritos.includes(idBook)) {//si idBook esta en el arrayFavoritos, es decir si ya esta dado el like
        arrayFavoritos.splice(arrayFavoritos.indexOf(idBook), 1)
    } else {
        arrayFavoritos.push(idBook);
    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));//se actualiza el localStorage con con el nuevo contenido de arrayFavoritos y  JSON.stringify(arrayFavoritos) convierte arrayFavoritos a una string JSON antes de almacenarlo en el localStorage.
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


