"use strict"
//menu burger
const iconMenu = document.querySelector('.icon-menu')
if (iconMenu) {
  const menuBody = document.querySelector('.menu-body')
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('lock');
    iconMenu.classList.toggle('menu-open');
    menuBody.classList.toggle('menu-open');
  })
}
const swiper = new Swiper('.swiper', {
  // autoplay: true,
  // speed: 1800,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },
  loop: true,
  slidesPerView: 2.5,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    635: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2.3,
    }
  },
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    if (error === 0) {
      form.classList.add("everythingok");
      // everything is fine
      let response = await fetch("../files/sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("everythingok");
      } else {
        alert("Ошибка");
        form.classList.remove("_error");
      }
    } else {
      alert("Заколните обязательные поля");
    }
  }
  /*=============================================================================================================*/
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // функция мета emaill
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

let g = document.querySelectorAll("*[data-modal-btn]");
for (let _ = 0; _ < g.length; _++)
  g[_].addEventListener("click", (function () {
    let e = g[_].getAttribute("data-modal-btn")
      , t = document.querySelector("[data-modal-window='" + e + "']");
    t.classList.toggle("_active"),
      document.body.classList.toggle('lock');
      t.querySelector(".pop-up__close").addEventListener("click", (function (e) {
        t.classList.remove("_active")
      }
      ))
  }
  ));
window.onclick = function (e) {
  if (e.target.hasAttribute("data-modal-window")) {
    let e = document.querySelectorAll("*[data-modal-window]");
    for (let t = 0; t < e.length; t++)
      e[t].classList.remove("_active")
  }
};