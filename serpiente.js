
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


    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
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
