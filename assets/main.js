// Where contact-form requests are sent (opens the visitor's email app).
var CONTACT_EMAIL = "hello@datazma.ca";

(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Language: ?lang= first, then saved choice, otherwise Persian.
  var saved = null;
  try { saved = localStorage.getItem("dz-lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  if ((q || saved) === "en") setLang("en");
  document.getElementById("langToggle").addEventListener("click", function () {
    setLang(getLang() === "en" ? "fa" : "en");
  });

  // Mobile menu
  var menuBtn = document.getElementById("menuBtn"), links = document.getElementById("navLinks");
  function setMenu(open) {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });

  // Active section in nav
  var navMap = {};
  links.querySelectorAll('a[href^="#"]:not(.btn)').forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting || !navMap[en.target.id]) return;
        Object.keys(navMap).forEach(function (k) { navMap[k].removeAttribute("aria-current"); });
        navMap[en.target.id].setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

    // Scroll reveal with a small stagger per group
    if (!reduceMotion) {
      root.classList.add("js");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      document.querySelectorAll(".reveal").forEach(function (el) {
        var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty("--d", Math.min(sib, 5) * 50 + "ms");
        io.observe(el);
      });
    }
  }

  // Chat widget
  var chat = document.getElementById("chat"), launcher = document.getElementById("chatLauncher"), lastFocus = null;
  DatazmaChat.init();
  function open() {
    lastFocus = document.activeElement;
    chat.hidden = false; launcher.setAttribute("aria-expanded", "true"); launcher.classList.add("seen");
    DatazmaChat.greet();
    setTimeout(function () { document.getElementById("chatText").focus(); }, 60);
  }
  function close() {
    chat.hidden = true; launcher.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  DatazmaChat.close = close;
  launcher.addEventListener("click", function () { chat.hidden ? open() : close(); });
  document.getElementById("chatClose").addEventListener("click", close);
  document.querySelectorAll("[data-open-chat]").forEach(function (b) { b.addEventListener("click", open); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!chat.hidden) close();
    else if (links.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
  });

  // Contact form: validate on blur, then open a pre-filled email
  var form = document.getElementById("contactForm");
  var rules = {
    name: function (v) { return v.trim().length > 1; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
  };
  function check(input) {
    var ok = rules[input.name](input.value);
    input.setAttribute("aria-invalid", String(!ok));
    document.getElementById("e-" + input.name).hidden = ok;
    return ok;
  }
  Object.keys(rules).forEach(function (n) {
    var el = form.elements[n];
    el.addEventListener("blur", function () { if (el.value) check(el); });
    el.addEventListener("input", function () { if (el.getAttribute("aria-invalid") === "true") check(el); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = Object.keys(rules).map(function (n) { return check(form.elements[n]) ? null : form.elements[n]; }).filter(Boolean);
    if (bad.length) { bad[0].focus(); return; }
    var d = new FormData(form), en = getLang() === "en";
    var subject = (en ? "Free consultation request — " : "درخواست جلسه رایگان — ") + d.get("name");
    var text = [
      (en ? "Name: " : "نام: ") + d.get("name"),
      (en ? "Email: " : "ایمیل: ") + d.get("email"),
      (en ? "Role: " : "نقش: ") + d.get("role"),
      "", d.get("message") || ""
    ].join("\n");
    location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
    document.getElementById("formStatus").textContent = en
      ? "Your email app is opening with the request ready to send. Thank you!"
      : "برنامه ایمیل شما با درخواست آماده باز می‌شود. ممنون از شما!";
  });
})();
