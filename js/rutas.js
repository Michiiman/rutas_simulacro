const btnAddPuntos = document.getElementById('btnAddPuntos');
const btnAddDatos = document.getElementById('btnAddDatos');
const btnCerrar = document.getElementById('btnCerrar');
const formsRuta = document.getElementById('ruta');
const formsPuntos = document.getElementById('puntos');
const urlPuntos = 'http://localHost:3000/Puntos';
const urlRutas = 'http://localHost:3000/Rutas';
const headers = new Headers({ 'Content-Type': 'application/json' });

// import {btnAddDatos,btnAddPuntos} from 'js/app.js'

//Eventos

//Botones
btnAddPuntos.addEventListener('click', agregarPuntos)

btnCerrar.addEventListener('click', cerrarModal);



//Forms
formsRuta.addEventListener('submit', agregarRutas);

llamarAPI(urlRutas, urlPuntos);

//Funciones
function agregarPuntos() {
    const puntos = document.getElementById('puntos');
    let elementos = document.createElement('div');
    elementos.innerHTML += `
    <p>Ingresa la información del punto:</p>
        <input class="container-fluid" type="text" placeholder="Nombre del punto" name="NomPuntos">
        <input class="container-fluid" type="text" placeholder="Link de la imagen" name="Imagen">
        <br>
        <br>
    `
    puntos.appendChild(elementos);

}
function agregarRutas(event) {
    event.preventDefault();
    const formData = new FormData(formsRuta);
    post(formData, urlRutas);

}
function cerrarModal() {
    const puntos = document.getElementById('puntos');
    puntos.innerHTML = '';
}
function llamarAPI(url, url2) {
    fetch(url)
        .then(response1 => response1.json())
        .then(result1 => {
            const apiruta = result1;

            fetch(url2)
                .then(response2 => response2.json())
                .then(result2 => {
                    const apipuntos = result2;

                    mostrarHtml(apiruta, apipuntos);
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });
}
function mostrarHtml(dato1, dato2) {
    const caja_cartas = document.getElementById('caja_cartas');

    dato1.forEach(carta => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerHTML = `
            <img src="img/ruta.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 id="carta_titulo" class="card-title">${carta.NomRuta}</h5>
                <p class="card-text">
                    <ul id="carta_puntos">
                    </ul>
                </p>
                <div class="d-flex gap-3">
                <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalleRutas">Detalles</a>
                <a type="button" class="btn btn-danger eliminar_carta"  >Eliminar</a>
                </div>
            </div>
        `;
        caja_cartas.appendChild(card);

        const carta_puntos = card.querySelector('#carta_puntos'); // Obtener la lista de puntos de la carta actual

        dato2.forEach(puntos => {
            if (carta.id == puntos.RutaId) {
                const li = document.createElement('li');
                li.textContent = puntos.NomPuntos;
                carta_puntos.appendChild(li);
            }
        });
    });
}
function eliminarCarta() {

}
    


//Metodo POST
function post(data, url) {
    let config = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(Object.fromEntries(data))
    };

    fetch(url, config)
        .then(response => response.json())
        .then(result => mostrarHtml(result))
}
function delet(data,id){
    
}

//Metodos


