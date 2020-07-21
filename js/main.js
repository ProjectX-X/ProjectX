let currentLang = localStorage.getItem('language') || 'eng';
//form
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const budget = document.querySelector("#budget");
const message = document.querySelector("#message");
const errorMsg = document.querySelector(".error-form");

let started = document.querySelector(".started");
started.addEventListener("click", function () {
  console.log(document.querySelector("#" + started.dataset.name));
  window.scrollTo({
    top:
      document.querySelector("#" + started.dataset.name).offsetTop -
      document.querySelector(".header").offsetHeight,
    behavior: "smooth",
  });
});

let foo = document.querySelector(".foo");
foo.addEventListener("click", function () {
  // console.log(document.querySelector("#" + started.dataset.name));
  window.scrollTo({
    top:
      document.querySelector("#" + foo.dataset.name).offsetTop -
      document.querySelector(".header").offsetHeight,
    behavior: "smooth",
  });
});

function checkError(field, isRequired = false, regex) {
  errorMsg.classList.add("hidden");

  if (isRequired && !field.value) {
    field.classList.add("error-input", "required");
    return 1;
  }
  if (field.value.length > 255) {
    field.classList.add("error-input", "maxlength");
    return 1;
  }
  if (regex && !regex.test(String(field.value).toLowerCase())) {
    field.classList.add("error-input", "regex");
    return 1;
  }

  field.classList.remove("error-input", "required", "maxlength", "regex");
  return 0;
}

function submitForm(e) {
  let errorsCount = 0;
  e.preventDefault();

  errorsCount += checkError(name, true);
  errorsCount += checkError(email, true, emailRegex);
  errorsCount += checkError(subject);
  errorsCount += checkError(budget);
  errorsCount += checkError(message, true);

  if (errorsCount) {
    return;
  }

  const json = JSON.stringify({
    name: name,
    email: email,
    subject: subject,
    budget: budget,
    message: message,
  });

  // отправим данные
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "tbd");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(json);

  xhr.onload = () => {
    if (xhr.status === 200) {
      document.querySelector(".form-block").classList.add("sent");
    } else {
      errorMsg.classList.remove("hidden");
    }
  };
}

name.addEventListener("blur", function () {
  checkError(name, true);
});
email.addEventListener("blur", function () {
  checkError(email, true, emailRegex);
});
subject.addEventListener("blur", function () {
  checkError(subject);
});
budget.addEventListener("blur", function () {
  checkError(budget);
});
message.addEventListener("blur", function () {
  checkError(message, true);
});
document.querySelector("._submit").addEventListener("click", submitForm, false);

//lang
let arrLang;
// получаем JSON
fetch('./lang.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    arrLang = data;
    initLang();
  });

initLang = () => {
  toggleLangButtons(currentLang);
  changeLang(currentLang);
  listenLang();
}

toggleLangButtons = (lang) => {
  localStorage.setItem('language', lang);
  document.querySelectorAll('.lang').forEach((item) => {
    item.classList.add('active')
  });
  document.querySelector('.lang[data-js=' + lang + ']').classList.remove('active');
}

//Слушатель на переключатель языка
listenLang = () => {
  let targetInput = document.querySelectorAll('.lang');
  targetInput.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      changeLang(e.target.getAttribute('data-js'));
    });
  })
}

//Замена текста
changeLang = (lang) => {
  const d = document;
  const text = arrLang[lang];

  toggleLangButtons(lang);

  d.querySelectorAll('.header__link')
    .forEach((item, i) => {
      item.textContent = text.header[i];
    })

  d.querySelector('.home-title').textContent = text.home.title;
  d.querySelector('.started').textContent = text.home.button;

  d.querySelector('[data-js="about-title"]').textContent = text.about.title;
  d.querySelectorAll('[data-js="about-p"]')
    .forEach((item, i) => {
      item.textContent = text.about.paragraph[i];
    })

  d.querySelector('[data-js="focus-title"]').textContent = text.focus.title;
  d.querySelectorAll('.focus__bottom-item')
    .forEach((item, i) => {
      item.querySelector('h3').textContent = text.focus.items[i].title;
      item.querySelector('p').textContent = text.focus.items[i].text;
    })

  d.querySelector('.team__inner-title').textContent = text.team.title;
  d.querySelectorAll('.slider__team-item:not(.slick-cloned)')
    .forEach((item, i) => {
      item.querySelector('.slider__team-name--firstname').textContent = text.team.items[i].name;
      item.querySelector('.slider__team-name--surname').textContent = text.team.items[i].surname;
      item.querySelector('.slider__team-position').textContent = text.team.items[i].position;
    })

  d.querySelector('[data-js="step-title"]').textContent = text.steps.title;
  d.querySelectorAll('.wrap_tb')
    .forEach((item, i) => {
      item.querySelector('.title_bl').textContent = text.steps.items[i].title;
      item.querySelector('.descr').textContent = text.steps.items[i].text;
    })
  d.querySelector('[data-js="select-title"]').textContent = text.choose.title;
  d.querySelectorAll('.blockW')
    .forEach((item, i) => {
      item.querySelector('.titleW').innerHTML = text.choose.items[i].title;
      item.querySelector('.descrW').textContent = text.choose.items[i].text;
    })

  d.querySelector('.order-title').textContent = text.order.title;
  d.querySelector('._submit').value = text.order.button;
  d.querySelector('.error-form').textContent = text.order.error;
  d.querySelector('[data-js="form-sent"]').innerHTML = text.order.send;


  d.querySelectorAll('.form-item-container')
    .forEach((item) => {
      let input = item.querySelector('.form-item, .form-message');
      let error = item.querySelectorAll('.error-input-add');
      input.placeholder = text.order[input.id];
      if (error) {
        error.forEach((item) => {
          item.textContent = text.order.errorContainer[item.getAttribute('data-js')]
        })
      }
    })
}

// ================slider settings=========================
$(function () {
  $(".slider__team").slick({
    waitForAnimate: false,
    slidesToShow: 4,
    infinite: true,
    slidesToScroll: 4,
    prevArrow: ".button-arrow-prev",
    nextArrow: ".button-arrow-next",
    responsive: [
      {
        breakpoint: 959,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          arrows: false,
          centerMode: true,
          variableWidth: true,
          touchThreshold: 10,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
// =============smooth scroll to the anchor===============
const anchors = document.querySelectorAll('.header__body a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}
// ================Change the color of menu links===========
let anchorArr = document.getElementsByClassName("header__link");
let prevLink = "";
for (let i = 0; i < anchorArr.length; i++) {
  anchorArr[i].onclick = function () {
    if (prevLink != "" && prevLink != this) {
      prevLink.className = "header__link";
    }
    this.className = "header__link selected";
    prevLink = this;
  };
}
// =============Burger-menu===============================
$(".header__burger").click(function (event) {
  $(".header__burger, .header__menu").toggleClass("active");
  $("body").toggleClass("lock");
});
$(".header__list").click(function (event) {
  $(".header__burger, .header__menu").removeClass("active");
  $("body").removeClass("lock");
});
// =======================================================

// =======================================HEADER-CHANGING BG-COLOR @Ifenkiul 8.07.2020
const toolbar = document.querySelector(".header");
const aboutCoordinates =
  document.querySelector(".about").getBoundingClientRect().top + window.scrollY;
// console.log(
//   "top " + document.querySelector(".header").getBoundingClientRect().top
// );
// console.log(
//   "bottom " + document.querySelector(".header").getBoundingClientRect().bottom
// );

const ourFocusCoordinates =
  document.querySelector(".focus").getBoundingClientRect().top + window.scrollY;

const teamCoordinates =
  document.querySelector(".team").getBoundingClientRect().top + window.scrollY;

const workStepsCoordinates =
  document.querySelector(".worksteps").getBoundingClientRect().top +
  window.scrollY;

const selectCoordinates =
  document.querySelector("#select").getBoundingClientRect().top +
  window.scrollY;
/*
window.addEventListener("scroll", function () {
  const windowScroll = window.scrollY;

  if (windowScroll >= aboutCoordinates && windowScroll < ourFocusCoordinates) {
    toolbar.style.backgroundColor = "rgba(246, 71, 71, 0.8)"; //RED
  } else if (
    windowScroll >= ourFocusCoordinates &&
    windowScroll < teamCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(0,250,154, 0.8)"; //GREEN
  } else if (
    windowScroll >= teamCoordinates &&
    windowScroll < workStepsCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(190, 144, 212,0.8)"; //PURPLE
  } else if (
    windowScroll >= workStepsCoordinates &&
    windowScroll < selectCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(245, 171, 53, 0.8)"; //ORANGE
  } else {
    toolbar.style.backgroundColor = "rgba(255,255,255,0.8)"; //WHITE
  }
});
*/
// =======================================DIFFERENT LANGUAGES @Ifenkiul 9.07.2020
// const languagesForPage = {
//   "a[href='#about']": ["ABOUT US", "ПРО НАС"],
//   "a[href='#focus']": ["OUR FOCUS", "ФОКУС"],
//   "a[href='#team']": ["OUR TEAM", "КОМАНДА"],
//   "a[href='#worksteps']": ["WORK STEPS", "КРОКИ"],
//   "a[href='#select']": ["WHY CHOOSE US", "ОБРАТИ НАС"],
//   "a[href='#order']": ["GET IN TOUCH", "ЗАМОВИТИ"],
// };
// // sessionStorage.setItem("languageChosen", "UA");
//
// const changeLanguage = function () {
//   const languageSet = sessionStorage.getItem("languageChosen") === "UA" ? 1 : 0;
//
//   for (let key in languagesForPage) {
//     document.querySelector(key).textContent =
//       languagesForPage[key][languageSet];
//   }
// };


window.onload = () => {
  document.querySelector(".home").classList.add("home-backIm");
};
