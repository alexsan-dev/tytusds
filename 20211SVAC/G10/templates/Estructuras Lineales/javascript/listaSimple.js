class Nodo {
    constructor (dato) {
        this.valor = dato;
        this.siguiente = null;
    }
}

class listaSimple {
    constructor() {
        this.primero = null;
        this.size = 0;
    }

    agregar(dato) {
        let nodo = new Nodo(dato);
        if (this.primero == null) {
            this.primero = nodo;
        }else {
            let actual = this.primero;
            while (actual.siguiente != null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nodo;
        }
        this.size += 1;
    }

    eliminar(dato) {
        let actual = this.primero;
        let anterior = null;

        try {
            while (actual.valor != dato) {
                anterior = actual;
                actual = actual.siguiente;
            }
            if (anterior == null) {
                this.primero = actual.siguiente;
            } else {
                anterior.siguiente = actual.siguiente
                actual.siguiente = null;
            }
            this.size -= 1;
        }
        
        catch {
            return false;
        }
    }

    buscar(dato) {
        let actual = this.primero;

        while (actual != null) {
            if (actual.valor == dato) {
                return actual.valor
            } 
            actual = actual.siguiente;
        }
        return false;
    }

    actualizar(dato, nuevo) {
        let actual = this.primero;

        if (this.buscar(dato)) {
            while (actual.valor != dato) {
                actual = actual.siguiente;
            }
            console.log(`Se remplazo ${actual.valor} por ${nuevo}`);
            actual.valor = nuevo;
        }
        else {
            console.log(`No existe ${dato} en la lista`);
        }
    }

    longitud() {
        return this.size;
    }

    index(dato) {
        let actual = this.primero
        let contador = 0
        while (this.buscar(dato)) {
            if (actual.valor == dato) {
                return contador
            }
            contador += 1
            actual = actual.siguiente
        }
    }

    obtener(numero) {
        let actual = this.primero
        for (let i = 0; i < this.size; i ++) {
            if (numero == i) {return actual.valor}
            actual = actual.siguiente
        }
    }

    mostrar() {
        let actual = this.primero;
        let string = ''
        for (let i = 0; i < this.size; i++) {
            string += actual.valor
            string += ' -> '
            actual = actual.siguiente;
        }
        console.log(string)
    }
}

const lista = new listaSimple()

const dato = document.getElementById('dato')

const agregar = document.getElementById('agregar')
const eliminar = document.getElementById('eliminar')
const actualizar = document.getElementById('actualizar')
const cambiar = document.getElementById('cambiar')
const buscar = document.getElementById('buscar')
const ver = document.getElementById('mostrar')

const guardar = document.getElementById('guardar')
const cargar = document.getElementById('cargar')

const velocidad = document.getElementById("velocidad")

let time = 2.5
velocidad.oninput = () => {
    document.getElementById('numero').innerHTML = velocidad.value
    //num_velocidad = (velocidad.value * 1) / 5
    if (velocidad.value == 3 ) time = 2.5
    else time = parseInt(velocidad.value)
    
}

const salida ={
    operasion: 'Lista enlazada simple',
    lista: []
}

agregar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){
        lista.agregar(dato.value)
        salida.lista.push(dato.value)
        graficar()
        
    }
})

eliminar.addEventListener("click", (e) => {
    e.preventDefault()

    context.clearRect(0, 0, canvas.width, canvas.height)
    x_figura = 20
    x_texto = 50

    if(dato.value != ''){
        lista.eliminar(dato.value)
        for(let i = 0; i< lista.size; i++) {
            cargar_grafica(lista.obtener(i))
        }
        const indice = salida.lista.indexOf(dato.value)
        salida.lista.splice(indice, 1)
    }
})

actualizar.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById('oculto').style.display = 'block'
    
})

buscar.addEventListener("click", (e) => {
    e.preventDefault()
    if(dato.value != ''){
        animacion_buscar()
    }
})

cambiar.addEventListener("click", (e) => {
    const nuevo = document.getElementById('dato2')

    context.clearRect(0, 0, canvas.width, canvas.height)
    x_figura = 20
    x_texto = 50

    if(dato.value != '' && nuevo.value != ''){
        lista.actualizar(dato.value, nuevo.value)
        const indice = salida.lista.indexOf(dato.value)
        salida.lista[indice] = nuevo.value
        for(let i = 0; i< lista.size; i++) {
            cargar_grafica(lista.obtener(i))
        }
    }
    document.getElementById('oculto').style.display = 'none'
    
})

let archivo = document.getElementById('file')
let entrada;

archivo.addEventListener('change', () => {
    let leer = new FileReader()
    leer.readAsText(archivo.files[0])
    leer.onload = function() {
    entrada = JSON.parse(leer.result)
    }
    document.getElementById('mensaje').innerText = 'Se cargo el archivo con exito'
})

cargar.addEventListener("click", (e) => {
    e.preventDefault()

    let valores = entrada["valores"]
    salida.lista = valores
    for (let i = 0; i < valores.length; i++) {
        lista.agregar(valores[i])
        cargar_grafica(valores[i])
    }
    document.getElementById('mensaje').innerText = ''
    archivo.setAttribute('disabled', '')
})

let x_aux
let x_texto_aux

guardar.addEventListener("click", (e) => {
    e.preventDefault()
    let texto = JSON.stringify(salida)
    download('ListaSimple.json', texto)
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// ---------Animaciones------------------------------------------------------------------------------------
var canvas = document.getElementById('lienzo')
var context = canvas.getContext("2d")

let x_start
let y_start

let x_start_text
let y_start_text

let x_figura = 20
let x_texto = 50

function graficar() {
    x_start = 20
    y_start = 20

    x_start_text = 50
    y_start_text = 60

    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_start, 20, 60, 60)

    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(dato.value, x_start_text, 60, 60)
    animar()
}

function flecha(x) {
    
    context.beginPath()
    let p0 = x + 60 + 50
    let p1 = x + 60 + 10
    let p2 = 220
    let p3 = p2 + 30
    let p4 = p2 + 60 

    context.moveTo(p0, p3)
    context.lineTo(p1, p2)
    context.lineTo(p1, p4)
    context.fillStyle="rgb(34, 40, 49)";
    context.fill()
}

function cargar_grafica(relleno) {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 320, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_figura, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(relleno, x_texto, 260, 60)

    // Flecha
    flecha(x_figura)

    x_figura = x_figura+(60*2)
    x_texto = x_figura + 30
}

function crear_cuadrado() {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 300, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_figura, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(dato.value, x_texto, 260, 60)

    // Flecha
    flecha(x_figura)

    x_figura = x_figura + 120
    x_texto = x_figura + 30
}

function animar() {

    window.requestAnimationFrame(function loop() {

        if (x_start != x_figura) {
            x_start += time 
            x_start_text += time

            context.clearRect(0, 0, canvas.width, 220)
            context.beginPath()
            context.fillStyle = "rgb(48, 71, 94)"
            context.fillRect(x_start, y_start, 60, 60)

            context.textAlign="center";
            context.font = "bold 22pt sans-serif"
            context.fillStyle="rgb(221, 221, 221)";
            context.fillText(dato.value, x_start_text, 60, 60)

            if (x_start == x_figura) {
                y_start += time
                y_start_text += time

                context.clearRect(0, 0, canvas.width, 220)
                context.beginPath()
                context.fillStyle = "rgb(48, 71, 94)"
                context.fillRect(x_start, y_start, 60, 60)

                context.textAlign="center";
                context.font = "bold 22pt sans-serif"
                context.fillStyle="rgb(221, 221, 221)";
                context.fillText(dato.value, x_start_text, y_start_text, 60)

                if (y_start == 220) {
                    crear_cuadrado()
                    window.webkitCancelAnimationFrame()
                }
            }
            window.requestAnimationFrame(loop)
        } else {
            y_start += time
            y_start_text += time

            context.clearRect(0, 0, canvas.width, 220)
            context.beginPath()
            context.fillStyle = "rgb(48, 71, 94)"
            context.fillRect(x_start, y_start, 60, 60)

            context.textAlign="center";
            context.font = "bold 22pt sans-serif"
            context.fillStyle="rgb(221, 221, 221)";
            context.fillText(dato.value, x_start_text, y_start_text, 60)

            if (y_start == 220) {
                crear_cuadrado()
                window.webkitCancelAnimationFrame()
            }
            window.requestAnimationFrame(loop)
        }
    })
}

function animacion_buscar() { 
    if (lista.buscar(dato.value) != false) {

        let recorrer = 20
        let tope = 20

        let posicion = lista.index(dato.value)

        for (let i = 0; i < posicion ; i ++) {
            tope = tope + 120
        }

        var intervalo = setInterval(contorno, 1000)

        function contorno() {
            context.beginPath()
            context.lineWidth = 5
            context.strokeStyle = "rgb(240, 84, 84)"
            context.rect(recorrer, 220, 60, 60)
            context.stroke()

            var temporizador = setInterval(animacion, 1000)

            if (recorrer == tope){
                clearInterval(intervalo)
                
            }else {
                recorrer = recorrer + 120
                clearInterval(temporizador)
            }
        }

        function animacion() {
            window.requestAnimationFrame(function loop() {
                context.clearRect(0, 0, tope-10, canvas.height)
                x_aux = 20
                x_texto_aux = 50
                let posicion = lista.index(dato.value)
    
                for(let i = 0; i <= posicion; i++) {
                    recuperar_grafica(salida.lista[i])
                }
                recorrer = 20
                tope = 20
            })
        }
        
    } else {
        console.log('Dato no existe en la lista')
    } 
}

function recuperar_grafica(relleno) {

    context.beginPath()
    context.textAlign="center";
    context.font = "bold 20pt sans-serif"
    context.fillStyle="rgb(48, 71, 94)";
    context.fillText('Primero', 50, 300, 60)

    //Cuadrado
    context.beginPath()
    context.fillStyle = "rgb(48, 71, 94)"
    context.fillRect(x_aux, 220, 60, 60)

    //Texto
    context.textAlign="center";
    context.font = "bold 22pt sans-serif"
    context.fillStyle="rgb(221, 221, 221)";
    context.fillText(relleno, x_texto_aux, 260, 60)

    // Flecha
    flecha(x_aux)

    x_aux = x_aux+(60*2)
    x_texto_aux = x_aux + 30
}

