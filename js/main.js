//form
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const subject = document.querySelector('#subject');
const budget = document.querySelector('#budget');
const message = document.querySelector('#message');
const errorMsg = document.querySelector('.error-form');

let started = document.querySelector('.started');
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
  errorMsg.classList.add('hidden');
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
    message: message
  });

  // отправим данные
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "tbd");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(json);

  xhr.onload = () => {
    console.log(xhr);

    if (xhr.status === 200) {
      document.querySelector(".form-block").classList.add("sent");
    } else {
      errorMsg.classList.remove('hidden');
    }
  }
}

name.addEventListener("blur", function () {
  checkError(name, true);
})
email.addEventListener("blur", function () {
  checkError(email, true, emailRegex);
})
subject.addEventListener("blur", function () {
  checkError(subject);
})
budget.addEventListener("blur", function () {
  checkError(budget);
})
message.addEventListener("blur", function () {
  checkError(message, true);
})
document.querySelector('._submit').addEventListener('click', submitForm, false);

// ================slider settings=========================
$(function(){
    $('.slider__team').slick({
        slidesToShow: 4,
        infinite: true,
        slidesToScroll: 4,
        // rows: 2,
        prevArrow: '.button-arrow-prev',
        nextArrow: '.button-arrow-next',
    });
});
// =============smooth scroll to the anchor===============
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {

anchor.addEventListener("click", function(event){
event.preventDefault();
const blockID = anchor.getAttribute('href')
document.querySelector('' + blockID).scrollIntoView({
	behavior: "smooth",
	block: "start"
});
});

}
// =============Burger-menu===============================
  $('.header__burger').click(function(event){
    $('.header__burger, .header__menu').toggleClass('active');
    $('body').toggleClass('lock');
  });
  $('.header__list').click(function(event){
    $('.header__burger, .header__menu').removeClass('active');
    $('body').removeClass('lock');
  });
// =======================================================
