$("#acjuego").click(function(){
    window.location.href = "file:///C:/Users/gonza/Desktop/DUOC%20UC%20ING.%20EN%20INFORMATICA/TERCER%20SEMESTRE/PROGRAMACION%20WEB/MODULO%202/juego1.html";
 });

const ciudadInput =document.getElementById("ciudad");
const obtenerPronosticoBtn = document.getElementById("obtenerPronostico");
const pronosticoDiv = document.getElementById("pronostico");

// FUNCION PARA OBTENER PRONOSTICO
obtenerPronosticoBtn.addEventListener("click", obtenerPronostico);

function obtenerPronostico(){

    const ciudad = ciudadInput.value.trim();

    if(ciudad ===""){
        mostrarError("Por favor ingresa una ciudad");
        return;
    }
    //Pega tu llave API acá abajo
    const apiKey = "b02035e5fe88a0becdb480b40b2b675e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //REALIZAR SOLICITUD HTTP UTILIZANDO LA FUNCION FETCH A LA URL
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarPronostico(data);
        })

        .catch(error => {

            mostrarError ("Error al obtener el pronostico");
        })

}
//MOSTRAR DATOS EN EL HTML
function mostrarPronostico(data){
    const {name,main,weather} = data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;
    const pronosticoHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}</p>
                <p class="card-text">Sensacion: ${sensacion}</p>
                <p class="card-text">Humedad: ${humedad}</p>
                <p class="card-text">Descripcion: ${descripcion}</p>
            </div>
        </div>

    `;
    pronosticoDiv.innerHTML = pronosticoHTML;

}

function mostrarError(mensaje){
    const errorHTML = `
        <div class="alert alert-danger" role="alert">
            ${mensaje}
        </div>
    `;
    pronosticoDiv.innerHTML = errorHTML;

}
