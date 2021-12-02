const nav_btn = document.getElementById("nav_btn");
const nav_menu = document.getElementById("nav_menu");


nav_btn.addEventListener("click",() => {
    nav_menu.classList.toggle("active");
});
