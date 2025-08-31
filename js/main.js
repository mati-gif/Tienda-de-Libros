



const API_KEY = 'AIzaSyBhIedadZZ7cFzBJq2ZTnCcW2-jWa40bzQ';

let divCreado = document.getElementById("container_card");
console.log(divCreado);


//esto sirve para manejar un array de favoritos en el localStorage.
let arrayFavoritos;

if (localStorage.getItem("favoritos")) { //verifica si existe un item con esta key en localStorage : osea si en el local storage hay una key con el nombre favoritos devolveme el valor de esa clave

    arrayFavoritos = JSON.parse(localStorage.getItem("favoritos")); //si existe un item con esa key guardame en arrayFavoritos el parseo de lo que esta en esa key.
    //es decur si existe la key "favoritos" en el localStorage se obtiene su valor (que es un string json) y luego se convierte otra vez en un array usando JSON.parse y se guarda en arrayFavoritos.
} else {

    arrayFavoritos = []; // si no guardame en arrayFavoritos un array vacio.
}

console.log(arrayFavoritos);






//esta funcion toma como parametro un objeto libros y crea en html la estructura de la carta.

function createCards(libros) {

    let estaLikeado = isLiked(libros.id);// estoy llamando a la funcion isLiked y le paso como argumento el id de la pelicula que despues lo uso para determinar si esta marcado el boton o no.
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


    // `
    //     <div class=" border-black border-2  m-5 h-auto flex flex-col items-center justify-beetwen w-80 text-center bg-violet-200  sm: w-4/6 h-5/6">

    //     <a href="./detail.html?id=${peliculas.id}"  ><img src ="${peliculas.image}" class="h-40 w-80 object-cover object-top sm: w-60 h-28"  alt = ${peliculas.title}/>
    //     <h4 class=" font-bold">${peliculas.title}</h4>
    //     <p class="p-2 text-xs font-bolder sm: p-1">
    //     ${peliculas.tagline}
    //     </p>
    //     <p class="p-3 text-xs font-bolder sm: p-1">
    //     ${peliculas.overview}
    //     </p> 
    //     </a>
    //     <div class="flex justify-center  w-12 border-black border-[3px]  mt-auto   hover: border-black hover:border-2 hover:text-gray-50 ">
    //     <button data-vote="true" data-id="${peliculas.id}"  class="${estaLikeado ? "bg-orange-500 hover:bg-orange-700" : "bg-green-200 hover:bg-gray-700"} text-white font-bold py-2 px-4  text-black"  >♡</button>

    //     </div> 
    //     </div>

    //     `


    //data-vote="true" ====> se usa para guardar un valor relacionada con el boton de like,osea despues muestro lo que aparece en consola cuando apreto el boton.
    //data-id="${peliculas.id}" =====> se usa para guardar el id de la pelicula que corresponde a la pelicula.
    //son atributos de datos personalizados en html y permiten almacenar información adicional en los elementos HTML sin necesidad de usar clases o id. 


    //dentro del ternario digo: si estaLikeado = "true" (si el id seleccionado se encuentra dentro del arrayFavoritos)

}






//toma una rray de objetos de peliclas llamado arraPeliculas (que es el parametro de la fucnion) y genera tarjetas html
function addCards(arrayLibros) {
    // let divCreado = document.getElementById("container_card");

    divCreado.innerHTML = '';
    let respuesta = "";
    console.log(arrayLibros);
    arrayLibros.forEach(item => {// Se utiliza forEach para iterar sobre cada objeto de libro en arrayLibros
        respuesta += createCards(item); //el html generado por createCards se concatena a la variable respuesta.
    });
    divCreado.innerHTML += respuesta;
}






let allMovies;


fetch('datos.json') // 👈 pedimos el archivo local
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar datos.json: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        allMovies = data; // data ya es el array de películas

        armarSelect(allMovies);
        addCards(allMovies);
        divCreado.addEventListener("click", (evento) => verifyButtonAndFavorite(evento, allMovies));

        console.log(allMovies);
    })
    .catch(error => {
        console.warn("Error al leer datos.json:", error);
        return [];
    });



//EJEMPLO DE COMO SE USA GETITEM
// let peliculasEnFavoritos = localStorage.getItem("favoritos")
// console.log(JSON.parse(peliculasEnFavoritos));


//  maneja eventos de click en botones dentro de las tarjetas de películas.
//y  actualizar el estado de favorito de la película correspondiente.
function verifyButtonAndFavorite(evento, data) {

    let esBotonLike = evento.target.dataset.vote; //accede al atributo data-vote
    let idPeliculas = evento.target.dataset.id; //accede al atributos data-id
    // evento.target.classList.add("bg-orange-500");
    console.log(esBotonLike);
    console.log(idPeliculas);

    if (esBotonLike) { //si esBotonLike es verdadero 
        toggleFavorites(idPeliculas)//llama a la funcion toggleFavorites que recibe como argumento el idPeliculas 
        //que cambia el estado de favorito de la pelicula con el id dado.Es decir si la pelicula esta marcada como favorita
        //la funcion la desmarca (es decir la elimina de la lista de favoritos)y si no esta marcada la va a marcar como favorita.



        let boton = evento.target;
        console.log(boton);
        toggleBoton(boton) //llama a la funcion toggleBoton pasadno el boton como argumetno y cambia el backGround del mismo.

        // let movie = data.find(item => item.id === idPeliculas)
        // let card = createCards(movie);

        // let cardAnterior = evento.target.parentElement;
        // let cardNueva = document.createElement("div");

        // cardNueva.innerHTML = card


        // divCreado.replaceWith(card)
        // addCards(data);



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

    return arrayFavoritos.includes(id);//Retorna true si el id seleccionado está dentro del array arrayFavoritos, indicando que el id está marcado como favorito. sino retorna false
}



//sirve para alternar el estado de favorito de  una pelicula en la lista de favoritos almacenada en localStorage
//osea esta función permite a los usuarios marcar o desmarcar películas como favoritas, actualizando el localStorage.
//es decir añade o elimina el id de la pelicula del array arrayfavorites .
function toggleFavorites(idPeliculas) {

    if (arrayFavoritos.includes(idPeliculas)) { //si ya esta incluido el like que le di, entonces sacamelo

        arrayFavoritos.splice(arrayFavoritos.indexOf(idPeliculas), 1) //arrayFavoritos.indexOf(idPeliculas) devuelve el índice donde idPeliculas se encuentra en el array
        console.log(arrayFavoritos);
    } else {// si no esta inlcuido el like que le di entonces agregamelo.

        arrayFavoritos.push(idPeliculas);

    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos)) //se actualiza el localStorage con con el nuevo contenido de arrayFavoritos y  JSON.stringify(arrayFavoritos) convierte arrayFavoritos a una string JSON antes de almacenarlo en el localStorage.
}







//forma2: crear una funcion que recibe un parametro (el array de peliculas) que adentro tenga un forEach() que tambien va a recorrer el array de peliculas y va a devolver la tarjeta solo con las propiedadess que le estoy pasando en el foreach .



// addCards(data);
console.log(divCreado);

// divCreado.classList.add("flex", "justify-center", "flex-wrap")
divCreado.style.display = "flex";
divCreado.style.justifyContent = "center";
divCreado.style.flexWrap = "wrap";
console.log(divCreado);




//---creando los option y los imput---//
let containerDiv = document.querySelector(".container_div");
let label = document.getElementById("label");


// containerDiv.classList.add("flex", "justify-center");
containerDiv.style.display = "flex";
containerDiv.style.justifyContent = "center";
containerDiv.style.padding = "10px";


// containerDiv.innerHTML = "<label> Filtrar:</label>"

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
    // inputText.classList.add("ml-20");
    // inputText.style.marginLeft = "5rem";
    // inputText.style.padding = "5px";
    label.appendChild(inputText);

    console.log(containerDiv);

}





function armarSelect(arrayPeliculas) {//arrayPeliculas seria data.movies pero como no puedo poner data.movies como parametro le pongo un nombre que lo represente que seria arrayPeliculas


    let capturarGeneros = arrayPeliculas.map((genero) => { // devuelve un array que adentro tiene arrays con los generos de cada pelicula.
        let generosCapturados = genero.genres
        return generosCapturados
    });

    console.log(capturarGeneros);
    let allGenres = [];

    capturarGeneros.forEach(item => {

        allGenres = allGenres.concat(item); // es concatenar todo en un solo array. 
    })

    console.log(allGenres);


    let eliminarDuplicados = [];

    allGenres.forEach(genre => { //si en el array vacio no tengo el genero , lo mete . si eliminar duplicados no inlcuye le genero , le pusheo el genero. Si ya lo incluye no se lo pusheo porque ya lo tiene lo que hace que obtenga un array sin duplicar elementos.
        if (!eliminarDuplicados.includes(genre)) {


            eliminarDuplicados.push(genre)
        }

    });

    console.log(eliminarDuplicados);

    createOptions(eliminarDuplicados);

}




// let capturarGeneros = data.flatMap(genero => genero.genres); // el metodo map devuelve un nuevo array grande de generos que adentro tiene  arrays que muestra los generos por cada pelicula. Y lo que hace el flat es unir todo en un solo array grande quitandole el corchete a los array pequeños.

// console.log(capturarGeneros);
// let eliminarDuplicados = [...new Set(capturarGeneros)];// lo que hace etsa funcion es que no permite elementos duplicados , me trae un nuevo array con los generos que no se repiten. El newSet crea un conjunto de valores a partir del array capturarGeneros.
// console.log(eliminarDuplicados);
// // los tres puntos descompone del array capturarGeneros todos los generos y con el newSet trae un objeto y  le saca los duplicados .


// console.log(new Set (capturarGeneros.flat())); //el metodo flat() une todos los arrays en uno solo, mientras que el metodo newSet no perimite elementos repeidos dentro de un array.




//forma 2:

function createOptions(genero) {
    let select = document.querySelector(".select");

    select.innerHTML = ''; //elimina todas las opciones existentes antes de agregar las nuevas, asegurando que no haya opciones duplicadas ni acumulación innecesaria de opciones.
    select.classList.add("option-inicial");
    
    let optionInicial = document.createElement('option');
    optionInicial.textContent = "elige el genero";
    optionInicial.value = "genero";
    console.log(optionInicial);
    
    select.appendChild(optionInicial);


    genero.forEach((genre) => {

        let option = document.createElement('option');
        // option.innerHTML = "elige el genero";
        option.value = genre;
        option.innerHTML = genre;
        select.appendChild(option);
    });
}











//--CREANDO LA CALLBACK DEL SELECT =====> OPTION <====== //

//esta funcion se ejecuta cuando se seleciiona un genero en el select. Se ejecuta en respuesta a un evento y utiliza la funcion filtrarPeliculasPorGenero para filtrar las peliculas por el genero seleccionado.
let callBackEventSelect = (evento) => {

    // let select = evento.target.value; // obtiene el valor del genero seleccionado.
    console.log(allMovies);
    let arrayFiltrado = allMovies; // inicializa el array filtrado con todos los datos de las peliculas.
    let arrayFiltradoPorGenero = filtrarPeliculasPorGenero(selectOpciones.value, arrayFiltrado); //filtra las peliculas por el genero seleccionado.
    let arrayFiltradoPorNombre = filtrarPeliculasPorNombre(buscarPelis.value.toLowerCase(), arrayFiltradoPorGenero);  // Filtra las películas filtradas por género según el nombre de la película 
    addCards(arrayFiltradoPorNombre);
    mostrarMensajeSiNoHayPeliculas(arrayFiltradoPorNombre);

}



//--CREANDO LA CALLBACK DEL INPUT =====> EL USUARIO INGRESA EL NOMBRE DE LA PELI <====== //



// La función callBackEventInput se ejecuta cuando se escribe algo en el input.(    no prestarle atencion a etsa funcion, uni esta funcion con la de arriba y el filtrocruzado se hace igual)
// let callBackEventInput = (evento) =>{
//     // let input = evento.target.value.toLowerCase();// Obtiene el valor del input y lo convierte a minúsculas
//     // console.log(input);
//     let arrayFiltrado = data; // inicializa el array filtrado con todos los datos de las peliculas.
//     let arrayFiltradoPorNombre = filtrarPeliculasPorNombre(inputText.value.toLowerCase(),arrayFiltrado);// Filtra las películas por el nombre ingresado
//     let arrayFiltradoPorGenero = filtrarPeliculasPorGenero(selectOpciones.value,arrayFiltradoPorNombre); // Filtra las películas filtradas por nombre según el género seleccionado
//     addCards(arrayFiltradoPorGenero);
//     mostrarMensajeSiNoHayPeliculas(arrayFiltradoPorGenero);
//     // filtrarPeliculasPorNombre(input);

// }

let selectOpciones = document.querySelector(".select");


selectOpciones.addEventListener("input", callBackEventSelect);



let buscarPelis = document.getElementById("input-text");


buscarPelis.addEventListener("input", callBackEventSelect);














//------CREANDO EL EVENTO ( SELECT =>  OPTIONS ) PARA QUE CUANDO SE HAGA CLICK EN UN GENERO APAREZCAN LAS PELICULAS QUE TIENEN ESE GENERO ----//.

//esta funcion lp que hacw es  filtrar un array  de películas según el género seleccionado y devuelve las películas que coinciden con ese género.
function filtrarPeliculasPorGenero(select, array) {

    //si el valor del select es genero , indica que no se ha seleccionado ningun genero en especifico y la funcion devuelve el array de peliculas 
    if (select === "genero") {                //  || select === "" (no prestarle atencion)
        return array;
    }


    let filterMovies = array.filter((movie) => {

        return movie.genres.includes(select)

    });


    return filterMovies;
}







//------CREANDO EL EVENTO (  ===> INPUT <===  ) PARA QUE CUANDO ESCRIBA EL TITULO DE LA PELICULA APAREZCA LA PELI CON ESE NOMBRE.----//.
//-----------------------


// esta funcion  filtra un array de peliculas según un nombre que se ingreso. Si no se infresa ningún nombre , devuelve la lista completa de películas. Si se ingresa un nombre, devuelve una lista de películas cuyos títulos contienen el nombre buscado.
function filtrarPeliculasPorNombre(nombre, array) {



    if (nombre === "") { // si nombre es un string vacio (lo que significa que no se ingresó un nombre para buscar), la función devuelve una array de peliculas..
        return array;
    }
    let filterSearch = array.filter((movie) => {
        return movie.title.toLowerCase().includes(nombre)
    });
    console.log(filterSearch);






    return filterSearch;

}


function mostrarMensajeSiNoHayPeliculas(movies) {
    let movieContainer = document.getElementById("container_card");
    let mensajeExistente = document.getElementById("mensaje_no_encontrado");
    console.log(mensajeExistente);
    if (mensajeExistente) {
        mensajeExistente.remove();
    }

    if (movies.length === 0) {
        let parrafo = document.createElement("p");
        console.log(parrafo);
        parrafo.id = "mensaje_no_encontrado";
        parrafo.textContent = "libro no encontrado";
        movieContainer.appendChild(parrafo);
    }
}





// export default { createCards,addCards}



















































































