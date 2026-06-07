// A Bridge Within — shared interactions
(function () {
  "use strict";

  // =====================================================================
  // FORM DELIVERY
  // Paste your deployed Google Apps Script Web App URL between the quotes
  // (see apps-script/SETUP.md). Until it is set, forms show a thank-you
  // message without sending anything ("demo mode").
  // =====================================================================
  var FORM_ENDPOINT = "";

  // ----- Mobile navigation toggle -----
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ----- Scroll reveal -----
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ----- Form submission -----
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var msg = form.querySelector(".form-msg");
      var btn = form.querySelector('button[type="submit"]') || form.querySelector("button");
      var setMsg = function (text, ok) {
        if (!msg) return;
        msg.textContent = text;
        msg.style.display = "block";
        if (!ok) { msg.style.color = "#c0392b"; }
      };

      // Demo mode — no endpoint configured yet
      if (!FORM_ENDPOINT) {
        setMsg("Thank you! Your submission has been received.", true);
        form.reset();
        return;
      }

      // Build a URL-encoded body (CORS-safe; avoids a preflight request)
      var body = new URLSearchParams(new FormData(form));
      body.append("_form", form.getAttribute("data-form") || "general");

      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: body.toString()
      }).then(function () {
        setMsg("Thank you! Your message has been sent.", true);
        form.reset();
      }).catch(function () {
        setMsg("Sorry, something went wrong sending your message. Please try again or email us directly.", false);
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = original; }
      });
    });
  });
})();
