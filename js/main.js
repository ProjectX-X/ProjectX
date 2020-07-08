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

function checkError(field, isRequired = false, regex) {
  errorMsg.classList.add("hidden");
  if (isRequired && !field.value) {
    field.classList.add("error-input");
    return 1;
  }
  if (field.value.length > 255) {
    field.classList.add("error-input");
    return 1;
  }
  if (regex && !regex.test(String(field.value).toLowerCase())) {
    field.classList.add("error-input");
    return 1;
  }

  field.classList.remove("error-input");
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
    console.log(xhr);

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

window.addEventListener("scroll", function () {
  const windowScroll = window.scrollY;

  if (windowScroll >= aboutCoordinates && windowScroll < ourFocusCoordinates) {
    toolbar.style.backgroundColor = "rgba(246, 71, 71, 0.9)"; //RED
  } else if (
    windowScroll >= ourFocusCoordinates &&
    windowScroll < teamCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(0,250,154, 0.9)"; //GREEN
  } else if (
    windowScroll >= teamCoordinates &&
    windowScroll < workStepsCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(190, 144, 212,0.9)"; //PURPLE
  } else if (
    windowScroll >= workStepsCoordinates &&
    windowScroll < selectCoordinates
  ) {
    toolbar.style.backgroundColor = "rgba(245, 171, 53, 0.9)"; //ORANGE
  } else {
    toolbar.style.backgroundColor = "rgba(255,255,255,0.9)"; //WHITE
  }
});
