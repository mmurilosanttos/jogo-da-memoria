// Funcionalidade do tema escuro/claro
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body
  const icon = themeToggle.querySelector("i")

  // Verificar tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)
  }

  // Toggle do tema
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)
  })

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      icon.className = "fas fa-moon"
    } else {
      icon.className = "fas fa-sun"
    }
  }

  // Navegação suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Validação do formulário
  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Limpar mensagens de erro anteriores
    clearErrors()

    // Validar campos
    const nome = document.getElementById("nome").value.trim()
    const email = document.getElementById("email").value.trim()
    const mensagem = document.getElementById("mensagem").value.trim()

    let isValid = true

    // Validar nome
    if (nome === "") {
      showError("nome-error", "Nome é obrigatório")
      isValid = false
    } else if (nome.length < 2) {
      showError("nome-error", "Nome deve ter pelo menos 2 caracteres")
      isValid = false
    }

    // Validar email
    if (email === "") {
      showError("email-error", "E-mail é obrigatório")
      isValid = false
    } else if (!isValidEmail(email)) {
      showError("email-error", "E-mail inválido")
      isValid = false
    }

    // Validar mensagem
    if (mensagem === "") {
      showError("mensagem-error", "Mensagem é obrigatória")
      isValid = false
    } else if (mensagem.length < 10) {
      showError("mensagem-error", "Mensagem deve ter pelo menos 10 caracteres")
      isValid = false
    }

    if (isValid) {
      // Simular envio do formulário
      alert("Mensagem enviada com sucesso! Obrigado pelo contato.")
      contactForm.reset()
    }
  })

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    errorElement.textContent = message
    errorElement.style.display = "block"
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message")
    errorElements.forEach((element) => {
      element.style.display = "none"
      element.textContent = ""
    })
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Animação de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  document.querySelectorAll(".skill-item, .project-card, .contact-card").forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Função para scroll suave para seções
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Inicializar Google Maps
function initMap() {
  // Coordenadas de Sergipe, Brasil
  const sergipe = { lat: -10.9472, lng: -37.0731 }

  const map = new window.google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: sergipe,
    styles: [
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [{ color: "#f5f5f5" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#e9e9e9" }],
      },
    ],
  })

  // Adicionar marcador
  const marker = new window.google.maps.Marker({
    position: sergipe,
    map: map,
    title: "Sergipe, Brasil",
  })
}

// Efeito de digitação no título (opcional)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Aplicar efeito de digitação ao carregar a página
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-text h1")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 80)
  }
})