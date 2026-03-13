let content = null;
if (window.location.pathname.includes("usuario")) {
  content = document.getElementById("userContent");
  mostrarPerfil();
}

function mostrarPerfil() {
  const nome = localStorage.getItem("nomeUsuario") || "Usuário";
  const email = localStorage.getItem("emailUsuario") || "Email";

  content.innerHTML = `
    <div class="profile-box">
      <div class="big-avatar">${nome.charAt(0).toUpperCase()}</div>
      <h2>${nome}</h2>
      <p>${email}</p>
    </div>`;
}

function mostrarPedidos() {
  content.innerHTML = `
    <div class="profile-box">
      <h2>Meus Pedidos</h2>
      <div class="pedido">Pedido #1023 - R$ 59,90</div>
      <div class="pedido">Pedido #1022 - R$ 19,90</div>
      <div class="pedido">Pedido #1021 - R$ 120,00</div>
    </div>`;
}

function mostrarConfig() {
  content.innerHTML = `
    <div class="profile-box">
      <h2>Configurações</h2>
      <label>Alterar nome</label>
      <input id="novoNome" placeholder="Novo nome">
      <button onclick="salvarNome()">Salvar</button>
    </div>`;
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
