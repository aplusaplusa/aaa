// fetch("/menu.html")
// .then(res => res.text())
// .then(html => {
//   document.getElementById("menu-container").innerHTML = html;
// });


fetch("/menu.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("menu-container").innerHTML = html;

    const menuM = document.getElementById("menu-m");
    const menuMbg = document.getElementById("menu-m-bg");
    const menuR = document.getElementById("menu-r");
    const menuButtons = document.querySelectorAll(".menu-btn");

    // Mobile Btn: Open/Close
    menuM.addEventListener("click", () => {
      menuR.classList.toggle("open");
      menuM.classList.toggle("active");
      menuMbg.style.display = menuM.classList.contains("active") ? "block" : "none";
      menuM.textContent = menuM.classList.contains("active") ? "close" : "menu";
    });

    menuButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");
        if (href) {
          menuR.classList.remove("open");
          menuM.classList.remove("active");
          menuMbg.style.display = "none";
          menuM.textContent = "menu";

          window.location.href = href;
          e.preventDefault();
        }
      });
    });
  })
  .catch(err => console.error("Menu fetch error:", err));
