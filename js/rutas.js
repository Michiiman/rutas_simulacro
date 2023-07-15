const btnAddPuntos=document.getElementById('btnAddPuntos');
const btnAddDatos=document.getElementById('btnAddDatos');
const btnCerrar=document.getElementById('btnCerrar');
const formsRuta=document.getElementById('ruta');
const formsPuntos=document.getElementById('puntos');
const urlPuntos='http://localHost:3000/Puntos';
const urlRutas='http://localHost:3000/Rutas';
const headers= new Headers({'Content-Type':'application/json'});


//Eventos
btnAddPuntos.addEventListener('click',agregarPuntos)

btnCerrar.addEventListener('click',cerrarModal);

btnAddDatos.addEventListener('click',agregarDatos)

formsRuta.addEventListener('submit', agregarDatos);

//Funciones
function agregarPuntos(){
    const puntos=document.getElementById('puntos');
    let elementos=document.createElement('div');
    elementos.innerHTML+=`
    <p>Ingresa la información del punto:</p>
        <input class="container-fluid" type="text" placeholder="Nombre del punto" name="NomPuntos">
        <input class="container-fluid" type="text" placeholder="Link de la imagen" name="Imagen">
        <br>
        <br>
    `
    puntos.appendChild(elementos);
}

function agregarDatos(event){
    event.preventDefault();

    const formData = new FormData(formsRuta);
    post(formData, urlRutas);
}
//Metodo POST
async function post(data, url) {
    let config = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(Object.fromEntries(data))
    };
    await ((await fetch(url, config)).json());
}


function cerrarModal(){
    const puntos=document.getElementById('puntos');
    puntos.innerHTML='';
}
function llamarAPI(url){
    fetch(urlPuntos)
        .then(response=>response.json())
        .then(result=> mostrarHtml(result))
}


//Metodos
