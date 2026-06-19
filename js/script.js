let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart = cart.map((p) => ({
  name: p.name,
  price: Number(p.price) || 0,
  priceText: p.priceText || "R$ 0,00",
  qty: p.qty || 1,
}));

let cartCount = 0;
let total = 0;

const buttons = document.querySelectorAll(".btn-comprar");
const cartDisplay = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("clicou");
  
    const card = btn.closest(".card");
  
    const name = card.querySelector(".product-name").textContent;
    const priceText = card.querySelector(".product-price").textContent;
    const price = Number(priceText.replace("R$", "").replace(",", "."));
  
    const existente = cart.find((p) => p.name === name);
  
    if (existente) {
      existente.qty++;
    } else {
      cart.push({
        name,
        price,
        priceText,
        qty: 1,
      });
    }
  
    renderCarrinho();
  
    abrirCarrinho();
  });
});

function renderCarrinho() {
  cartItems.innerHTML = "";

  cartCount = 0;
  total = 0;

  const template = document.getElementById("cartItemTemplate");

  cart.forEach((produto, index) => {
    cartCount += produto.qty;
    total += produto.price * produto.qty;

    const clone = template.content.cloneNode(true);

    clone.querySelector(".cart-name").textContent = produto.name;

    clone.querySelector(".cart-qty-number").textContent = produto.qty;

    clone.querySelector(".cart-price").textContent = produto.priceText;

    clone.querySelector(".menos").onclick = () => {
      produto.qty--;
      if (produto.qty <= 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCarrinho();
    };

    clone.querySelector(".mais").onclick = () => {
      produto.qty++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCarrinho();
    };

    clone.querySelector(".remove-item").onclick = () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCarrinho();
    };

    cartItems.appendChild(clone);
  });

  cartDisplay.textContent = cartCount;

  atualizarTotal();
}

function atualizarTotal() {
  totalDisplay.textContent = "R$ " + total.toFixed(2).replace(".", ",");
}

function finalizarCompra() {
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const btn = document.querySelector(".btn-checkout");

  btn.textContent = "Processando...";
  btn.disabled = true;

  setTimeout(() => {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    const novoPedido = {
      id: Date.now(),
      criadoEm: Date.now(),
      data: new Date().toLocaleDateString(),
      total: total.toFixed(2),
      status: "Processando",
      produtos: [...cart],
    };

    pedidos.push(novoPedido);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    cart = [];
    localStorage.removeItem("cart");

    alert("Compra realizada com sucesso 🎉");

    location.reload();
  }, 1500);
}

function abrirCarrinho() {
  const modal = document.getElementById("cartModal");
  console.log("Modal:", modal);
  modal.style.display = "flex";
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

    document.getElementById("userAvatar").textContent = nome
      .charAt(0)
      .toUpperCase();
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

document.addEventListener("click", (e) => {
  if (!document.getElementById("userMenu").contains(e.target)) {
    document.getElementById("userDropdown").classList.remove("show");
  }
});

document
  .getElementById("userTrigger")
  .addEventListener("click", (e) => e.stopPropagation());

function abrirPerfil() {
  window.location.href = "usuario.html";
}

document.getElementById("searchInput").addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".card").forEach((card) => {
    const name = card.querySelector(".product-name").textContent.toLowerCase();

    card.style.display = name.includes(value) ? "block" : "none";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  atualizarHeaderUsuario();
  renderCarrinho();
});

function atualizarStatusPedidos(pedidos) {
  const agora = Date.now();

  pedidos.forEach((pedido) => {
    const criado = pedido.criadoEm || pedido.id;
    const diff = agora - criado;

    if (diff > 20000) {
      pedido.status = "Entregue";
    } else if (diff > 10000) {
      pedido.status = "Enviado";
    } else {
      pedido.status = "Processando";
    }
  });
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}
