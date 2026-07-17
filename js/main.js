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

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var city = (data.get("city") || "").toString().trim();
      var sites = (data.get("sites") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();

      if (!name || !email || !phone) {
        alert("Please add your name, email, and phone so we can reach you.");
        return;
      }

      var subject = encodeURIComponent(
        "UST NJ inquiry: " + (service || "General") + (company ? " — " + company : "")
      );
      var body = encodeURIComponent(
        [
          "Name: " + name,
          "Email: " + email,
          "Phone: " + phone,
          "Business: " + (company || "—"),
          "City / County: " + (city || "—"),
          "NJ sites: " + (sites || "—"),
          "Service: " + (service || "—"),
          "",
          "Message:",
          message || "(none)",
          "",
          "— Sent from UST NJ website"
        ].join("\n")
      );

      var to = form.getAttribute("data-email") || "hello@ustnj.com";
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;

      var ok = document.getElementById("form-success");
      if (ok) {
        ok.classList.add("show");
        ok.focus();
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
