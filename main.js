//Key Api Movie: 6c2abee11a7cd02fa17b9c6dd3b2be2a
//Api Request: https://api.themoviedb.org/3/movie/550?api_key=6c2abee11a7cd02fa17b9c6dd3b2be2a
//API Read Access Token (v4 auth)eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI2YzJhYmVlMTFhN2NkMDJmYTE3YjljNmRkM2IyYmUyYSIsInN1YiI6IjYyNjI1NzlhYzFmZmJkMTBhNDVlMzg2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.evS4Ict_cTGumqurO2flgSeL5bdifhQNpdXIu05tGm4

//Ejecucion Api

let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=6c2abee11a7cd02fa17b9c6dd3b2be2a&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas()