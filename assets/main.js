// Where contact-form requests are sent (opens the visitor's email app).
var CONTACT_EMAIL = "hello@datazma.ca";

(function () {
  // Language: saved choice, then ?lang=en, otherwise Persian.
  var saved = null;
  try { saved = localStorage.getItem("dz-lang"); } catch (e) {}
  var q = new URLSearchParams(location.search).get("lang");
  var lang = q === "en" || q === "fa" ? q : saved;
  if (lang === "en") setLang("en");
  document.getElementById("langToggle").addEventListener("click", function () {
    setLang(getLang() === "en" ? "fa" : "en");
  });

  // Chat widget
  var chat = document.getElementById("chat"), launcher = document.getElementById("chatLauncher");
  DatazmaChat.init();
  function open() {
    chat.hidden = false; launcher.setAttribute("aria-expanded", "true"); launcher.classList.add("seen");
    DatazmaChat.greet();
    setTimeout(function () { document.getElementById("chatText").focus(); }, 50);
  }
  function close() { chat.hidden = true; launcher.setAttribute("aria-expanded", "false"); }
  DatazmaChat.close = close;
  launcher.addEventListener("click", function () { chat.hidden ? open() : close(); });
  document.getElementById("chatClose").addEventListener("click", close);
  document.querySelectorAll("[data-open-chat]").forEach(function (b) { b.addEventListener("click", open); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !chat.hidden) close(); });

  // Contact form → pre-filled email
  var form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
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
      ? "Your email app should open with the request ready to send. Thank you!"
      : "برنامه ایمیل شما با درخواست آماده باز می‌شود. ممنون از شما!";
  });
})();
