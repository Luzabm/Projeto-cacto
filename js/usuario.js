const perfilBox = document.getElementById("perfilBox");
const pedidosBox = document.getElementById("pedidosBox");

mostrarPerfil();

function mostrarPerfil() {
  perfilBox.style.display = "block";

  const nome = localStorage.getItem("nomeUsuario") || "Usuário";
  const email = localStorage.getItem("emailUsuario") || "Email";

  perfilBox.innerHTML = `
    <div class="big-avatar">${nome.charAt(0).toUpperCase()}</div>
    <h2>${nome}</h2>
    <p>${email}</p>
  `;
}

function mostrarPedidos() {
  perfilBox.style.display = "none";
  pedidosBox.style.display = "block";
  pedidosBox.innerHTML = "";

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  if (pedidos.length === 0) {
    pedidosBox.innerHTML = "<p>Você ainda não tem pedidos</p>";
    return;
  }

  const template = document.getElementById("pedidoTemplate");
  pedidos
    .slice()
    .reverse()
    .forEach((pedido) => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".pedido-id").textContent = "Pedido #" + pedido.id;

      clone.querySelector(".pedido-data").textContent = pedido.data;

      clone.querySelector(".pedido-total").textContent =
        "R$ " + Number(pedido.total).toFixed(2).replace(".", ",");

      const statusEl = clone.querySelector(".pedido-status");
      const status = pedido.status || "Processando";

      statusEl.textContent = status;

      const stepProcessando = clone.querySelector(".step-processando");
      const stepEnviado = clone.querySelector(".step-enviado");
      const stepEntregue = clone.querySelector(".step-entregue");
      const lines = clone.querySelectorAll(".line");

      if (status === "Processando") {
        stepProcessando.classList.add("active");
      }

      if (status === "Enviado") {
        stepProcessando.classList.add("active");
        stepEnviado.classList.add("active");

        lines[0].classList.add("active");
      }

      if (status === "Entregue") {
        stepProcessando.classList.add("active");
        stepEnviado.classList.add("active");
        stepEntregue.classList.add("active");
        lines[0].classList.add("active");
        lines[1].classList.add("active");
      }

      const produtosBox = clone.querySelector(".pedido-produtos");

      pedido.produtos.forEach((prod) => {
        const qty = prod.qty || 1;
        const preco = Number(prod.price) || 0;
        const totalProduto = preco * qty;
        const linha = document.createElement("div");
        linha.className = "produto-linha";
        linha.innerHTML = `
          <span>${prod.name}</span>
          <span>${qty}x</span>
          <span>R$ ${totalProduto.toFixed(2).replace(".", ",")}</span>
        `;
        produtosBox.appendChild(linha);
      });

      const card = clone.querySelector(".pedido-card");
      card.onclick = () => {
        card.classList.toggle("open");
      };
      pedidosBox.appendChild(clone);
    });
}

function mostrarConfig() {
  pedidosBox.style.display = "none";
  perfilBox.style.display = "block";

  perfilBox.innerHTML = `
    <h2>Configurações</h2>

    <input id="novoNome" placeholder="Novo nome">

    <button onclick="salvarNome()">Salvar</button>
  `;
}

function salvarNome() {
  const novo = document.getElementById("novoNome").value;

  if (!novo) return;

  localStorage.setItem("nomeUsuario", novo);

  alert("Nome atualizado!");

  mostrarPerfil();
}

function sair() {
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("emailUsuario");

  window.location.href = "index.html";
}

function voltarIndex() {
  window.location.href = "index.html";
}

card.onclick = () => {
  card.classList.toggle("open");
};
