let cartCount = 0;
let total = 0;

const buttons = document.querySelectorAll(".btn-comprar");
const cartDisplay = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    if (!card) return;

    const name = card.querySelector(".product-name").textContent;
    const priceText = card.querySelector(".product-price").textContent;
    const price = Number(priceText.replace("R$", "").replace(",", "."));

    cartCount++;
    total += price;
    cartDisplay.textContent = cartCount;
    mostrarToast(name);
    abrirCarrinho();

    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `<span>${name} - ${priceText}</span><button class="remove-item">X</button>`;
    cartItems.appendChild(item);

    item.querySelector(".remove-item").onclick = () => {
      item.remove();
      cartCount--;
      total -= price;
      cartDisplay.textContent = cartCount;
      atualizarTotal();
    };

    atualizarTotal();
  });
});

function atualizarTotal() {
  totalDisplay.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {
  document.getElementById("cartModal").style.display = "flex";
}
function fecharCarrinho() {
  document.getElementById("cartModal").style.display = "none";
}
function irParaProdutos() {
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
}
function mostrarToast(nome) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-text").textContent = nome + " adicionado";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
function finalizarCompra() {
  const btn = document.querySelector(".btn-checkout");
  btn.textContent = "Processando...";
  btn.disabled = true;
  setTimeout(() => {
    alert("Compra finalizada! 🎉");
    location.reload();
  }, 2000);
}

function abrirLogin() {
  document.getElementById("loginModal").style.display = "flex";
}
function fecharLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function fazerLogin() {
  const nome = document.getElementById("loginNome").value;
  const email = document.getElementById("loginEmail").value;
  if (!nome || !email) {
    alert("Preencha nome e email!");
    return;
  }
  localStorage.setItem("nomeUsuario", nome);
  localStorage.setItem("emailUsuario", email);
  fecharLogin();
  atualizarHeaderUsuario();
}

function atualizarHeaderUsuario() {
  const nome = localStorage.getItem("nomeUsuario");
  const email = localStorage.getItem("emailUsuario");
  if (nome && email) {
    document.getElementById("userText").textContent = nome;
    const avatar = nome.charAt(0).toUpperCase();
    document.getElementById("userAvatar").textContent = avatar;
  } else {
    document.getElementById("userText").textContent = "Entrar";
    document.getElementById("userAvatar").innerHTML =
      '<i class="fa-solid fa-circle-user"></i>';
  }
}

function toggleUserMenu() {
  document.getElementById("userDropdown").classList.toggle("show");
}
function acaoUsuario() {
  const nome = localStorage.getItem("nomeUsuario");
  const email = localStorage.getItem("emailUsuario");
  if (nome && email) {
    toggleUserMenu();
  } else {
    abrirLogin();
  }
}
function sair() {
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("emailUsuario");
  alert("Você saiu da conta.");
  location.reload();
}
document.addEventListener("click", function (event) {
  if (!document.getElementById("userMenu").contains(event.target)) {
    document.getElementById("userDropdown").classList.remove("show");
  }
});
document
  .getElementById("userTrigger")
  .addEventListener("click", function (event) {
    event.stopPropagation();
  });
function abrirPerfil() {
  window.location.href = "usuario.html";
}
window.addEventListener("DOMContentLoaded", () => {
  atualizarHeaderUsuario();
});

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    card.style.display = name.includes(value) ? "block" : "none";
  });
});
