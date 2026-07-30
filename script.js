document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const snackModal = document.getElementById("snackModal");
const snackModalImage = document.getElementById("snackModalImage");
const snackModalTitle = document.getElementById("snackModalTitle");
const snackModalDesc = document.getElementById("snackModalDesc");
const snackModalPrice = document.getElementById("snackModalPrice");
let lastSnackButton = null;

function openSnackModal(button) {
  lastSnackButton = button;
  const title = button.dataset.title || "Snack";
  const desc = button.dataset.desc || "";
  const price = button.dataset.price || "";
  const image = button.dataset.img || "";

  snackModalTitle.textContent = title;
  snackModalDesc.textContent = desc;
  snackModalPrice.textContent = price;
  snackModalImage.src = image;
  snackModalImage.alt = `${title} photo`;
  snackModal.classList.add("open");
  snackModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  snackModal.querySelector(".modal-close").focus();
}

function closeSnackModal() {
  snackModal.classList.remove("open");
  snackModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  snackModalImage.removeAttribute("src");
  if (lastSnackButton) lastSnackButton.focus();
}

document.querySelectorAll(".snack-trigger").forEach((button) => {
  button.addEventListener("click", () => openSnackModal(button));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeSnackModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && snackModal.classList.contains("open")) {
    closeSnackModal();
  }
});
