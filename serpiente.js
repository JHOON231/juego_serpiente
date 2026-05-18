
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;
    const serpiente = [
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 7, y: 6 },
    ];

    let intervaloSerpiente;
    let direccionActual = "derecha";
    let comida = {
      x: 0,
      y: 0
    };
    let puntaje = 0;


    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    generarComida();
    dibujarTodo();

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
      pintarComida();
    }

    function dibujarTablero() {
      ctx.strokeStyle = "white";

      for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    function pintarParte(lineaX, lineaY) {
  
        const x = lineaX * TAMANIO_CELDA;
        const y = lineaY * TAMANIO_CELDA;
 
        ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }

    function pintarSerpiente() {
      for (let i = 0; i < serpiente.length; i++) {

        if (i == 0) {
          ctx.fillStyle = "yellow";
        }

        else {
          ctx.fillStyle = "red";
        }
        pintarParte(serpiente[i].x, serpiente[i].y);
      }
    }

    function moverDerecha() {
      const cabeza = serpiente[0];
      const nuevaCabeza = {
        x: cabeza.x + 1,
        y: cabeza.y
      };
      serpiente.unshift(nuevaCabeza);
      if (!atrapaComida()) {
        serpiente.pop();
      }
    }
    
    function cambiarDireccion(direccion) {
      direccionActual = direccion;
    }

    function moverIzquierda() {
      const cabeza = serpiente[0];
      const nuevaCabeza = {
        x: cabeza.x - 1,
        y: cabeza.y
      };
      serpiente.unshift(nuevaCabeza);
      if (!atrapaComida()) {
        serpiente.pop();
      }
    }

    function moverArriba() {
      const cabeza = serpiente[0];
      const nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y - 1
      };
      serpiente.unshift(nuevaCabeza);
      if (!atrapaComida()) {
        serpiente.pop();
      }
    }

    function moverAbajo() {
      const cabeza = serpiente[0];
      const nuevaCabeza = {
        x: cabeza.x,
        y: cabeza.y + 1
      };
      serpiente.unshift(nuevaCabeza);
      if (!atrapaComida()) {
        serpiente.pop();
      }
    }
    
    function moverSerpiente() {
      if (direccionActual == "derecha") {
        moverDerecha();
      }
      else if (direccionActual == "izquierda") {
        moverIzquierda();
      }
      else if (direccionActual == "arriba") {
        moverArriba();
      }
      else if (direccionActual == "abajo") {
        moverAbajo();
      }
      if (atrapaComida()) {
        puntaje++;
        document.getElementById("puntaje").textContent = puntaje;
        generarComida();
      }
      dibujarTodo();
    }

    function iniciarJuego(){
      intervaloSerpiente = setInterval(moverSerpiente, 1000);
    }

    function pausarJuego(){
       clearInterval(intervaloSerpiente);
    }

    function pintarComida() {
      ctx.fillStyle = "orange";
      pintarParte(comida.x, comida.y);
    }

    function generarComida() {
      const maxX = canvas.width / TAMANIO_CELDA;
      const maxY = canvas.height / TAMANIO_CELDA;

      comida.x = Math.floor(Math.random() * maxX);
      comida.y = Math.floor(Math.random() * maxY);
    }

    function atrapaComida() {
      const cabeza = serpiente[0];
      if (cabeza.x == comida.x && cabeza.y == comida.y) {
        return true;
      }
      return false;
    }

