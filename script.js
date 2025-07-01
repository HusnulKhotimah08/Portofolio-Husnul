function initTypedText() {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const textArray = ["Informatics Student", "Web Developer", "UI Designer"];
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (typedTextSpan && charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 60);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, 1000);
    }
  }

  if (typedTextSpan) setTimeout(type, 500);
}

function initSkillTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const skillContents = document.querySelectorAll('.skills-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      skillContents.forEach(c => c.classList.add('hidden'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.remove('hidden');
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.nav-link');
  const content = document.getElementById('content');

  function loadPage(page) {
    fetch(page)
      .then(res => res.text())
      .then(data => {
        content.innerHTML = data;
        // Aktifkan kembali logika interaktif setelah load
        initTypedText();
        initSkillTabs();
      });
  }

  // Load pertama kali
  loadPage("home.html");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });
});
