function principal() {
    let productos = [
        { id: 1, pelicula: "Manhattan", sala: "1", costo: "3400 pesos", funcion: "21:10 horas", genero: "Drama", rutaImagen: "manhattan.jpg" },
        { id: 2, pelicula: "Maridos y Mujeres", sala: "3", costo: "4000 pesos", funcion: "20:00 horas", genero: "Drama", rutaImagen: "maridosMujeres.jpg" },
        { id: 3, pelicula: "La Rosa Purpura del Cairo", sala: "5", costo: "3400 pesos", funcion: "20:15 horas", genero: "Ficcion", rutaImagen: "rosaPurpura.jpg" },
        { id: 4, pelicula: "Annie Hall ", sala: "9", costo: "4000 pesos", funcion: "18:20 horas", genero: "Comedia", rutaImagen: "annieHall.jpg" },
        { id: 5, pelicula: "Bananas", sala: "2", costo: "3400 pesos", funcion: "17.00 horas", genero: "Comedia", rutaImagen: "bananas.png" },
        { id: 6, pelicula: "Scoop", sala: "4", costo: "3400 pesos", funcion: "19:50 horas", genero: "Drama", rutaImagen: "scoop.png" },
        { id: 7, pelicula: "Poderosa Afrodita", sala: "7", costo: "4000 pesos", funcion: "20.30 horas", genero: "Comedia", rutaImagen: "poderosaAfrodita.jpg" },
        { id: 8, pelicula: "La Tapadera", sala: "6", costo: "4500 pesos", funcion: "21:30 horas", genero: "Drama", rutaImagen: "laTapadera.jpg" },
        { id: 9, pelicula: "Desmontando a Harry", sala: "8", costo: "4500 pesos", funcion: "20.40 horas", genero: "Comedia", rutaImagen: "desmontandoaHarry.jpg" },
        { id: 10, pelicula: "La Zarpa", sala: "10", costo: "4000 pesos", funcion: "21.50 horas", genero: "Terror", rutaImagen: "laZarpa.jpg" },
    ]

    let carrito = recuperarCarritoDelStorage("carrito")
    renderizarCarrito(carrito)

    crearTarjetasProductos(productos)

    let inputBuscar = document.getElementById("inputBuscar")
    inputBuscar.addEventListener("change", (e) => filtrarYrenderizar(e, productos))

    let botonesAgregarProductos = document.getElementsByClassName("botonAgregarAlCarrito")
    for (const boton of botonesAgregarProductos) {
        boton.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos))
    }
    
    let botonProductosCarrito = document.getElementById("productosCarrito")
    botonProductosCarrito.addEventListener("click", verOcultarCarrito)
}

principal()

function filtrarYrenderizar(e, productos){
    let arrayFiltrado = filtrar(e, productos)
    crearTarjetasProductos(arrayFiltrado)
    
}

function filtrar(e, productos) {
    console.log(e)
    return productos.filter(producto => producto.pelicula.includes(e.target.value))

}

function verOcultarCarrito(e) {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")

    if(e.target.innerText === "Carrito"){
        e.target.innerText = "Productos"
    } else {
        e.target.innerText = "Carrito"
    }
}

function crearTarjetasProductos(productos) {
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""
    productos.forEach(producto => {
        //Creando elementos con append
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.innerHTML = `
            <img src=./images/${producto.rutaImagen} />
            <h3>${producto.pelicula}</h3>
            <p>Sala : ${producto.sala}</p>
            <p>Genero : ${producto.genero}</p>
            <button class=botonAgregarAlCarrito id=${producto.id}>Comprar ahora</button>
        `

        contenedor.append(tarjetaProducto)

        /* let botonAgregarAlCarrito = document.getElementById(producto.id)
        /* botonAgregarAlCarrito.addEventListener("click", agregarProductoAlCarrito) */
       /*  botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(e, producto, carrito))  */
    })
}

function agregarProductoAlCarrito(event, productos) {
    let carrito = recuperarCarritoDelStorage()
    let id = Number(event.target.id)
    let productoOriginal = productos.find(producto => producto.id === id)
    let indiceProductoEnCarrito = carrito.findIndex(producto => producto.id === id)
    if (indiceProductoEnCarrito === -1){
        carrito.push ({
            id: productoOriginal.id,
            pelicula: productoOriginal.pelicula,
            sala: productoOriginal.sala,
            funcion: productoOriginal.funcion,
            genero: productoOriginal.genero,
            precioUnitario: productoOriginal.costo,
            unidades: 1,
            subtotal: productoOriginal.costo
        })
    } else {
        carrito[indiceProductoEnCarrito].unidades++
        carrito[indiceProductoEnCarrito].subtotal = carrito[indiceProductoEnCarrito].precioUnitario * carrito[indiceProductoEnCarrito].unidades
    }
    console.log(carrito)

    guardarEnStorage("carrito", carrito)
    renderizarCarrito(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML= ""

    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjetaCarrito"
        //tarjetaCarrito.classList.add("tarjetaCarrito")

        tarjetaCarrito.innerHTML = `
            <p>${producto.pelicula}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
    })
}

                      
function guardarEnStorage(clave, valor) {
    let valorJson = JSON.stringify(valor)
    localStorage.setItem(clave, valorJson)
}

function recuperarCarritoDelStorage(){
    let valorJson = localStorage.getItem("carrito")
    let carrito = JSON.parse(valorJson)
    if(!carrito){
        carrito = []
    }
    return carrito
}


localStorage.setItem("pelicula", "Maridos y Mujeres")
localStorage.setItem("genero", "drama")
localStorage.setItem("enEstreno", "true")
localStorage.setItem("infoPersona", {
    nombre: "Karla",
    edad: 26,
    esCasada: false
}

)

let pelicula = localStorage.getItem("pelicula")
let genero = localStorage.getItem("genero")
let enEstreno = localStorage.getItem("enEstreno")
console.log(pelicula)
console.log(genero)
console.log(enEstreno)

localStorage.setItem("pelicula", "Scoop")

for (let i = 0; i < localStorage.length; i++){
    let clave = localStorage.key(i)
    let valor = localStorage.getItem(clave)
    console.log("CLAVE: " + clave + " - VALOR: " + valor)
}


let objetoLiteral = [{
    nombre: "karla",
    edad: 31
}]

let stringFormatoJson = '[{"nombre": "karla", "edad": 31}]'

//Objeto/array Javascript a string en formato JSON
let stringJson = JSON.stringify(objetoLiteral)
console.log(stringJson)
localStorage.setItem("infoPersonas", stringJson)

let infoPersonasRecuperada = localStorage.getItem("infoPersonas")
console.log(infoPersonasRecuperada)
let infoOriginal = JSON.parse(infoPersonasRecuperada)
console.log(infoOriginal)

// string en formato json a objeto/array javascript