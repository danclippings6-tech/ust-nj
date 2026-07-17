(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Show success after FormSubmit redirect back (?sent=1)
  var params = new URLSearchParams(window.location.search);
  if (params.get("sent") === "1") {
    var ok = document.getElementById("form-success");
    var form = document.getElementById("contact-form");
    if (ok) {
      ok.classList.add("show");
      ok.focus();
    }
    if (form) form.reset();
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var data = new FormData(form);

      // Honeypot — bots fill this
      if ((data.get("_gotcha") || "").toString().trim()) {
        e.preventDefault();
        return;
      }

      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var consent = data.get("consent");
      var err = document.getElementById("form-error");
      var ok = document.getElementById("form-success");
      var btn = form.querySelector('button[type="submit"]');

      function showError(msg) {
        e.preventDefault();
        if (ok) ok.classList.remove("show");
        if (err) {
          err.textContent = msg;
          err.classList.add("show");
          err.focus();
        } else {
          alert(msg);
        }
      }

      if (!name || !email || !phone) {
        showError("Please add your name, email, and phone.");
        return;
      }
      if (!consent) {
        showError("Please check the box to continue.");
        return;
      }

      // Build subject for FormSubmit
      var service = (data.get("service") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var subjectInput = form.querySelector('input[name="_subject"]');
      if (subjectInput) {
        subjectInput.value =
          "UST NJ lead: " +
          (service || "General") +
          (company ? " — " + company : "") +
          " — " +
          name;
      }

      if (err) err.classList.remove("show");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending…";
      }
      // Native form POST continues → FormSubmit → your inbox
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
