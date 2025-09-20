




let divCreado = document.getElementById("container_card");
console.log(divCreado);


//esto sirve para manejar un array de favoritos en el localStorage.
let arrayFavoritos;

if (localStorage.getItem("favoritos")) { 

    arrayFavoritos = JSON.parse(localStorage.getItem("favoritos")); 
} else {

    arrayFavoritos = []; // si no guardame en arrayFavoritos un array vacio.
}

console.log(arrayFavoritos);






//esta funcion toma como parametro un objeto libros y crea en html la estructura de la carta.

function createCards(libros) {

    let estaLikeado = isLiked(libros.id);// estoy llamando a la funcion isLiked y le paso como argumento el id del libro que despues lo uso para determinar si esta marcado el boton o no.
    return `
    <div class="card">
    <a href="./detail.html?id=${libros.id}">
        <img src="${libros.image}" class="card-img" alt="${libros.title}"/>
        <h4 class="card-title">${libros.title}</h4>
        <p class="card-tagline">${libros.tagline}</p>
        <p class="card-overview">${libros.overview}</p> 
    </a>
    <div class="card-btn-container">
        <button 
        data-vote="true" 
        data-id="${libros.id}"  
        class="btn-like ${estaLikeado ? "btn-liked" : "btn-not-liked"}"
        >♡</button>
    </div> 
    </div>
`;

}


//toma una array de objetos de libros llamado arrayLibros y genera tarjetas html
function addCards(arrayLibros) {

    divCreado.innerHTML = '';
    let respuesta = "";
    console.log(arrayLibros);
    arrayLibros.forEach(item => {
        respuesta += createCards(item); 
    });
    divCreado.innerHTML += respuesta;
}


let allBooks;


fetch('datos.json') 
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar datos.json: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        allBooks = data; 

        armarSelect(allBooks);
        addCards(allBooks);
        divCreado.addEventListener("click", (evento) => verifyButtonAndFavorite(evento, allBooks));

        console.log(allBooks);
    })
    .catch(error => {
        console.warn("Error al leer datos.json:", error);
        return [];
    });


//  maneja eventos de click en botones dentro de las tarjetas de libros.
//y  actualizar el estado de favorito de la libro correspondiente.
function verifyButtonAndFavorite(evento, data) {

    let esBotonLike = evento.target.dataset.vote; 
    let idBooks = evento.target.dataset.id; 
    console.log(esBotonLike);
    console.log(idBooks);

    if (esBotonLike) { 
        toggleFavorites(idBooks)
        let boton = evento.target;
        console.log(boton);
        toggleBoton(boton) 

    }

}


function toggleBoton(boton) {

    if (boton.classList.contains("btn-liked")) {
        boton.classList.remove("btn-liked");
        boton.classList.add("btn-not-liked");
    } else {
        boton.classList.remove("btn-not-liked");
        boton.classList.add("btn-liked");
    }

}


//verifica si un id especifico esta presente dentro de arrayFavoritos
function isLiked(id) {

    return arrayFavoritos.includes(id);
}




// esta función permite a los usuarios marcar o desmarcar películas como favoritas, actualizando el localStorage.
function toggleFavorites(idBooks) {

    if (arrayFavoritos.includes(idBooks)) { 

        arrayFavoritos.splice(arrayFavoritos.indexOf(idBooks), 1) 
        console.log(arrayFavoritos);
    } else {

        arrayFavoritos.push(idBooks);

    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos)) 
}



console.log(divCreado);

divCreado.style.display = "flex";
divCreado.style.justifyContent = "center";
divCreado.style.flexWrap = "wrap";
console.log(divCreado);




//---creando los option y los imput---//
let containerDiv = document.querySelector(".container_div");
let label = document.getElementById("label");


containerDiv.style.display = "flex";
containerDiv.style.justifyContent = "center";
containerDiv.style.padding = "10px";



if (containerDiv && label) {

    let selectOption = document.createElement("select");
    selectOption.classList.add("select");
    console.log(selectOption);
    label.appendChild(selectOption);
    console.log(containerDiv);


    let inputText = document.createElement("input");
    inputText.type = "text";
    inputText.id = "input-text";
    inputText.value = "";
    inputText.placeholder = "Buscar un libro";
    inputText.classList.add("search-input");
    label.appendChild(inputText);

    console.log(containerDiv);

}





function armarSelect(arrayLibros) {


    let capturarGeneros = arrayLibros.map((genero) => { 
        let generosCapturados = genero.genres
        return generosCapturados
    });

    console.log(capturarGeneros);
    let allGenres = [];

    capturarGeneros.forEach(item => {

        allGenres = allGenres.concat(item); 
    })

    console.log(allGenres);

    let eliminarDuplicados = [];

    allGenres.forEach(genre => { 
        if (!eliminarDuplicados.includes(genre)) {

            eliminarDuplicados.push(genre)
        }

    });

    console.log(eliminarDuplicados);

    createOptions(eliminarDuplicados);

}


function createOptions(genero) {
    let select = document.querySelector(".select");

    select.innerHTML = ''; 
    select.classList.add("option-inicial");

    let optionInicial = document.createElement('option');
    optionInicial.textContent = "elige el genero";
    optionInicial.value = "genero";
    console.log(optionInicial);

    select.appendChild(optionInicial);


    genero.forEach((genre) => {

        let option = document.createElement('option');
        option.value = genre;
        option.innerHTML = genre;
        select.appendChild(option);
    });
}


//--CREANDO LA CALLBACK DEL SELECT =====> OPTION <====== //

//esta funcion se ejecuta cuando se seleciiona un genero en el select. Se ejecuta en respuesta a un evento y utiliza la funcion filtrarLibrosPorGenero para filtrar las peliculas por el genero seleccionado.
let callBackEventSelect = (evento) => {

    console.log(allBooks);
    let arrayFiltrado = allBooks; // inicializa el array filtrado con todos los datos de los libros.
    let arrayFiltradoPorGenero = filtrarLibrosPorGenero(selectOpciones.value, arrayFiltrado); //filtra los libros por el genero seleccionado.
    let arrayFiltradoPorNombre = filtrarLibrosPorNombre(buscarLibros.value.toLowerCase(), arrayFiltradoPorGenero);  // Filtra las películas filtradas por género según el nombre de la película 
    addCards(arrayFiltradoPorNombre);
    mostrarMensajeSiNoHayLibros(arrayFiltradoPorNombre);

}



//--CREANDO LA CALLBACK DEL INPUT =====> EL USUARIO INGRESA EL NOMBRE DEL LIBRO <====== //

let selectOpciones = document.querySelector(".select");


selectOpciones.addEventListener("input", callBackEventSelect);


let buscarLibros = document.getElementById("input-text");


buscarLibros.addEventListener("input", callBackEventSelect);


//------CREANDO EL EVENTO ( SELECT =>  OPTIONS ) PARA QUE CUANDO SE HAGA CLICK EN UN GENERO APAREZCAN LOS LIBROS QUE TIENEN ESE GENERO ----//.

//esta funcion lp que hacw es  filtrar un array  de películas según el género seleccionado y devuelve las películas que coinciden con ese género.
function filtrarLibrosPorGenero(select, array) {

    if (select === "genero") {          
        return array;
    }
    let filterBooks = array.filter((book) => {

        return book.genres.includes(select)

    });

    return filterBooks;
}


//------CREANDO EL EVENTO (  ===> INPUT <===  ) PARA QUE CUANDO ESCRIBA EL TITULO DEL LIBRO APAREZCA EL LIBRO CON ESE NOMBRE.----//.
//-----------------------


// esta funcion  filtra un array de peliculas según un nombre que se ingreso. Si no se infresa ningún nombre , devuelve la lista completa de películas. Si se ingresa un nombre, devuelve una lista de películas cuyos títulos contienen el nombre buscado.
function filtrarLibrosPorNombre(nombre, array) {

    if (nombre === "") { 
        return array;
    }

    let filterSearch = array.filter((movie) => {
        return movie.title.toLowerCase().includes(nombre)
    });
    console.log(filterSearch);

    return filterSearch;
}


function mostrarMensajeSiNoHayLibros(books) {
    let bookContainer = document.getElementById("container_card");
    let mensajeExistente = document.getElementById("mensaje_no_encontrado");
    console.log(mensajeExistente);
    if (mensajeExistente) {
        mensajeExistente.remove();
    }

    if (books.length === 0) {
        let parrafo = document.createElement("p");
        console.log(parrafo);
        parrafo.id = "mensaje_no_encontrado";
        parrafo.textContent = "libro no encontrado";
        bookContainer.appendChild(parrafo);
    }
}

// export default { createCards,addCards}



















































































