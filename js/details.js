
fetch('datos.json')
	.then(response => {
		if (!response.ok) {
			throw new Error("Error al cargar datos.json: " + response.status);
		}
		return response.json();
	})
	.then(data => {
		let allBooks = data; // Asigna data a la variable global allBooks
		let libroFiltrado = allBooks.find(item => item.id === movieId)
		createDetailsCard(libroFiltrado);
	})
	.catch(error => {
		console.warn(error); // Manejo de errores
		return []; // Retorna un array vacío en caso de error
	});





const urlParams = new URLSearchParams(window.location.search); //URLSearchParams es una interfaz que permite trabajar con los parámetros de búsqueda de una URL. windowsLocationSearch es la cadena de consulta de la url acytual, devuelve todo lo que sigue despues del "?".
const movieId = urlParams.get('id');

console.log(movieId);






function createDetailsCard(libroDetalle) {
	let contenedorDetalle = document.getElementById("detail_container");

	console.log(libroDetalle);
	let card = `<div class="detail-card">
    <img src ="${libroDetalle.image}" class="detalle-img"  alt = ${libroDetalle.title}/>
    

	<table class="detail-table">
	<tbody>
		<tr class="detail-row detail-row-green ">
			<td class="detail-cell-left "> Lenguaje original</td>
			<td class="detail-cell">${libroDetalle.original_language}</td>
		</tr>
		<tr class="detail-row">
			<td class="detail-cell-left">Fecha de lanzamiento</td>
			<td class="detail-cell">${libroDetalle.release_date}</td>
		</tr>
		<tr class="detail-row border-2 border-black">
			<td class="detail-cell-left">Duración</td>
			<td class="detail-cell">${libroDetalle.runtime} min</td>
		</tr>
		<tr class="detail-row border-2 border-black">
			<td class="detail-cell-left">Estado</td>
			<td class="detail-cell">${libroDetalle.status}</td>
		</tr>
	</tbody>
    </table>

    </div>
`

	contenedorDetalle.innerHTML += card;
	crearTabla(contenedorDetalle, libroDetalle);
}

function crearTabla(contenedorDetalle, libroDetalle) {


	let tablas = `<div class="tabla-card">
<h1 class="tabla-title">${libroDetalle.title}</h1>
<h2 class="tabla-subtitle">${libroDetalle.tagline}</h2>
<h3 class="tabla-genres">Genero: ${libroDetalle.genres}</h3>
<p class="tabla-overview">${libroDetalle.overview}</p>

<table class="tabla-detail">
    <tbody>
    <tr class="tabla-row tabla-row-green">
        <td class="tabla-cell-left">Promedio de votos</td>
        <td class="tabla-cell">${libroDetalle.vote_average}</td>
    </tr>
    <tr class="tabla-row">
        <td class="tabla-cell-left">Presupuesto</td>
        <td class="tabla-cell">${libroDetalle.budget}</td>
    </tr>
    <tr class="tabla-row">
        <td class="tabla-cell-left">Ingresos</td>
        <td class="tabla-cell">${libroDetalle.revenue}</td>
    </tr>
    </tbody>
</table>
</div>


`
	contenedorDetalle.innerHTML += tablas;

}

























