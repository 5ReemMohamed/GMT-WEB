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


window.addEventListener("scroll", () => {
  const indicator = document.querySelector(".scroll-indicator");
  if (window.scrollY > 100) {
    indicator.style.opacity = "0";
    indicator.style.visibility = "hidden";
  } else {
    indicator.style.opacity = "1";
    indicator.style.visibility = "visible";
  }
});
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
 
  if (window.innerHeight + window.scrollY < document.body.offsetHeight - 7000) {
    scrollIndicator.classList.add('active');
  } else {
    scrollIndicator.classList.remove('active');
  }
});

scrollIndicator.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight/1.13 ,
    behavior: 'smooth'
  });
});

const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');
const successMessage = document.getElementById('formSuccess');


const messages = {
  en: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    name: "Name must be at least 2 characters long.",
    subject: "Subject must be at least 5 characters long.",
    message: "Message must be at least 10 characters long."
  },
  ar: {
    required: "هذا الحقل مطلوب.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    name: "يجب أن لا يقل الاسم عن حرفين.",
    subject: "يجب أن لا يقل الموضوع عن 5 أحرف.",
    message: "يجب أن لا تقل الرسالة عن 10 أحرف."
  }
};

let currentLang = localStorage.getItem('lang') || 'en';


function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.getAttribute('name');
  const errorElement = document.getElementById(fieldName.replace('user', '').toLowerCase() + 'Error');

  let isValid = true;
  let errorMessage = '';

  if (value === '') {
    isValid = false;
    errorMessage = messages[currentLang].required;
  }

  if (fieldName === 'userEmail' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = messages[currentLang].email;
    }
  }

  if (fieldName === 'userName' && value !== '' && value.length < 2) {
    isValid = false;
    errorMessage = messages[currentLang].name;
  }

  if (fieldName === 'subject' && value !== '' && value.length < 5) {
    isValid = false;
    errorMessage = messages[currentLang].subject;
  }

  if (fieldName === 'message' && value !== '' && value.length < 10) {
    isValid = false;
    errorMessage = messages[currentLang].message;
  }

  if (!isValid) {
    field.classList.add('is-invalid');
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
  } else {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    errorElement.style.display = 'none';
  }

  return isValid;
}


function clearFieldError(field) {
  const fieldName = field.getAttribute('name');
  const errorElement = document.getElementById(fieldName.replace('user', '').toLowerCase() + 'Error');

  field.classList.remove('is-invalid');
  if (field.value.trim() !== '') {
    field.classList.add('is-valid');
  } else {
    field.classList.remove('is-valid');
  }
  errorElement.style.display = 'none';
}


formInputs.forEach(input => {
  input.addEventListener('blur', function () {
    validateField(this);
  });

  input.addEventListener('input', function () {
    clearFieldError(this);
  });
});


contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let isFormValid = true;

  formInputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (isFormValid) {

    const name = document.querySelector('[name="userName"]').value.trim();
    const email = document.querySelector('[name="userEmail"]').value.trim();
    const subject = document.querySelector('[name="subject"]').value.trim();
    const message = document.querySelector('[name="message"]').value.trim();

   
    const whatsappMessage = `Hello, I would like to contact you.%0A
Name: ${encodeURIComponent(name)}%0A
Email: ${encodeURIComponent(email)}%0A
Subject: ${encodeURIComponent(subject)}%0A
Message: ${encodeURIComponent(message)}`;

    const phoneNumber = "201149364431"; 

  
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');

    contactForm.reset();
    formInputs.forEach(input => {
      input.classList.remove('is-valid', 'is-invalid');
    });
    successMessage.classList.remove('d-none');
    setTimeout(() => {
      successMessage.classList.add('d-none');
    }, 5000);
  } else {
    const firstInvalidField = contactForm.querySelector('.is-invalid');
    if (firstInvalidField) {
      firstInvalidField.focus();
    }
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const langBtn = document.querySelector('.language-btn');

  function updateLanguage(lang) {
    document.querySelectorAll('[data-en][data-ar]').forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]').forEach(el => {
      el.setAttribute('placeholder', el.getAttribute(`data-placeholder-${lang}`));
    });

    langBtn.textContent = lang === 'en' ? 'العربية' : 'English';
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('text-end', lang === 'ar');
    document.body.classList.toggle('text-start', lang === 'en');
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage(newLang);
  });

  updateLanguage(currentLang);

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
  easing: 'ease-in-out'
});
