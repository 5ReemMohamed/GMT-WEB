window.onload = function () {
  window.scrollTo(0, 0);
};

document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992) {
      const collapseEl = document.querySelector('.navbar-collapse');
      const bsCollapse = bootstrap.Collapse.getInstance(collapseEl) 
                      || new bootstrap.Collapse(collapseEl, { toggle: false });
      bsCollapse.hide();
    }
  });
});




const form = document.getElementById("contactForm");

const nameInput = document.getElementById("UserName");
const emailInput = document.getElementById("UserEmail");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

const successMessage = document.getElementById("formSuccess");

function validateAll() {
  let isValid = true;


  const name = nameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  
  const email = emailInput.value.trim();
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  
  const subject = subjectInput.value.trim();
  if (subject.length < 5) {
    subjectError.textContent = "Subject must be at least 5 characters.";
    isValid = false;
  } else {
    subjectError.textContent = "";
  }

 
  const message = messageInput.value.trim();
  if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  return isValid;
}


[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
  input.addEventListener("input", validateAll);
});


form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateAll()) {
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim()
    };

    
    localStorage.setItem("contactFormData", JSON.stringify(formData));

   
    successMessage.classList.remove("d-none");

    
    form.reset();

    setTimeout(() => {
      successMessage.classList.add("d-none");
    }, 3000);
  } else {
    successMessage.classList.add("d-none");
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.work-card');
  const modalTitle = document.getElementById('workModalLabel');
  const modalImage = document.getElementById('modalImage');
  const modalDesc = document.getElementById('modalDescription');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.dataset.title;
      modalImage.src = card.dataset.img;
      modalImage.alt = card.dataset.title;
      modalDesc.textContent = card.dataset.description;
    });
  });
});
AOS.init({
  offset: 120, 
  duration: 1000, 
  easing: 'ease-in-out', 
  
});