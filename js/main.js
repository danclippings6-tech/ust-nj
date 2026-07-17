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
      // Honeypot — bots fill this; humans never see it
      if ((data.get("_gotcha") || "").toString().trim()) {
        return;
      }

      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var city = (data.get("city") || "").toString().trim();
      var sites = (data.get("sites") || "").toString().trim();
      var service = (data.get("service") || "").toString().trim();
      var message = (data.get("message") || "").toString().trim();
      var consent = data.get("consent");

      var err = document.getElementById("form-error");
      var ok = document.getElementById("form-success");
      var btn = form.querySelector('button[type="submit"]');

      function showError(msg) {
        if (ok) ok.classList.remove("show");
        if (err) {
          err.textContent = msg;
          err.classList.add("show");
          err.focus();
        } else {
          alert(msg);
        }
      }

      function showSuccess() {
        if (err) err.classList.remove("show");
        if (ok) {
          ok.classList.add("show");
          ok.focus();
        }
        form.reset();
      }

      if (!name || !email || !phone) {
        showError("Please add your name, email, and phone so we can reach you.");
        return;
      }
      if (!consent) {
        showError("Please check the box to continue.");
        return;
      }

      var to = form.getAttribute("data-email") || "info@ustnj.com";
      var payload = {
        name: name,
        email: email,
        phone: phone,
        company: company || "—",
        city: city || "—",
        sites: sites || "—",
        service: service || "Not sure — help me choose",
        message: message || "(none)",
        _subject: "UST NJ inquiry: " + (service || "General") + (company ? " — " + company : ""),
        _template: "table",
        _captcha: "false"
      };

      if (btn) {
        btn.disabled = true;
        btn.setAttribute("data-label", btn.textContent);
        btn.textContent = "Sending…";
      }
      if (err) err.classList.remove("show");
      if (ok) ok.classList.remove("show");

      // Sends real email to info@ustnj.com (no email app)
      fetch("https://formsubmit.co/ajax/" + encodeURIComponent(to), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok || (result.body && result.body.success === "true") || (result.body && result.body.success === true)) {
            showSuccess();
            return;
          }
          var msg =
            (result.body && (result.body.message || result.body.error)) ||
            "Could not send. Email info@ustnj.com or call (201) 815-4235.";
          showError(String(msg));
        })
        .catch(function () {
          showError(
            "Could not send right now. Email info@ustnj.com or call/text (201) 815-4235."
          );
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.textContent = btn.getAttribute("data-label") || "Send to UST NJ";
          }
        });
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
