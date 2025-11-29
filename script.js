document.addEventListener('DOMContentLoaded', () => {

  const modalCompra = document.getElementById("modalCompra");
  const modalCarrito = document.getElementById("modalCarrito");

  const closeCompra = document.querySelector(".closeCompra");
  const closeCarrito = document.querySelector(".closeCarrito");

  const form = document.getElementById("formCompra");
  const mensaje = document.getElementById("mensaje");

  const totalCarritoTop = document.getElementById("totalCarritoTop");
  const btnComprarCarritoTop = document.getElementById("btnComprarCarritoTop");

  const listaCarrito = document.getElementById("listaCarrito");
  const totalCarritoModal = document.getElementById("totalCarritoModal");

  const mensajeAgregado = document.getElementById("mensajeAgregado");

  let carrito = [];

  function mostrarMensaje() {
    mensajeAgregado.style.display = "block";
    setTimeout(() => mensajeAgregado.style.display = "none", 1500);
  }

  function actualizarCarrito() {
    const total = carrito.reduce((s, p) => s + p.precio, 0);

    totalCarritoTop.textContent = `$${total} MXN`;
    totalCarritoModal.textContent = `$${total} MXN`;

    listaCarrito.innerHTML = "";

    carrito.forEach((prod, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${prod.nombre} — $${prod.precio} MXN 
        <button data-index="${index}" class="btnEliminar">❌</button>
      `;
      listaCarrito.appendChild(li);
    });

    document.querySelectorAll(".btnEliminar").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.index;
        carrito.splice(id, 1);
        actualizarCarrito();
      });
    });
  }

  document.querySelectorAll('button[data-action="buy"]').forEach(btn => {
    btn.addEventListener("click", () => {
      modalCompra.style.display = "flex";
      mensaje.style.display = "none";
      form.style.display = "block";
    });
  });

  document.querySelectorAll('button[data-action="add"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      const productoEl = e.target.closest('.producto');
      const nombre = productoEl.querySelector('h3').textContent;
      const precio = parseInt(productoEl.querySelector('.precio').dataset.precio, 10);

      carrito.push({ nombre, precio });

      actualizarCarrito();
      mostrarMensaje();
    });
  });

  btnComprarCarritoTop.addEventListener("click", () => {
    if (carrito.length > 0) {
      modalCarrito.style.display = "flex";
    } else {
      alert("El carrito está vacío.");
    }
  });

  document.getElementById("btnIrAlPago").addEventListener("click", () => {
    modalCarrito.style.display = "none";
    modalCompra.style.display = "flex";
  });

  closeCompra.addEventListener("click", () => {
    modalCompra.style.display = "none";
  });

  closeCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.style.display = "none";
    mensaje.style.display = "block";

    carrito = [];
    actualizarCarrito();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalCompra) modalCompra.style.display = "none";
    if (e.target === modalCarrito) modalCarrito.style.display = "none";
  });

});
