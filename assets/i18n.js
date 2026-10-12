// Persian text lives in the HTML; English is defined here. FA is captured from the DOM on load.
window.I18N_EN = {
  "nav.services": "Services",
  "nav.audience": "Who we serve",
  "nav.why": "Why Datazma",
  "nav.process": "Process",
  "nav.contact": "Contact",
  "nav.cta": "Free consult",
  "hero.title": "From learning to doing, with Datazma",
  "hero.sub": "Practical training. Expert consulting. Real implementation.",
  "hero.text": "We help organizations, clinics, hospitals and independent practitioners actually bring AI into their work. A team that speaks clinic and writes code.",
  "hero.cta1": "Book a free 20-min session",
  "hero.cta2": "Ask our AI assistant",
  "stat1.k": "Clinic + Data",
  "stat1.v": "Two disciplines, one team",
  "stat2.k": "3 paths",
  "stat2.v": "Learn, consult, build",
  "stat3.k": "FA / EN",
  "stat3.v": "Persian-speaking & global",
  "services.title": "Three paths, one goal: AI that actually works",
  "s1.title": "Practical AI training",
  "s1.text": "Learning AI doesn't require coding — just the right path and strategy. Hands-on courses and workshops for teams, clinicians and curious minds.",
  "s1.l1": "In-house workshops for clinical & admin teams",
  "s1.l2": "Build agents and chatbots with no code",
  "s1.l3": "A career path into AI",
  "s2.title": "Implementation consulting",
  "s2.text": "We find your starting point together: which process, which tool, what budget. We only recommend what will genuinely work for you.",
  "s2.l1": "Assessment of clinical & admin workflows",
  "s2.l2": "An AI roadmap sized to your budget",
  "s2.l3": "Privacy compliance (PHIPA)",
  "s3.title": "Custom AI applications",
  "s3.text": "From booking chatbots to record summarization and data dashboards — we build apps that solve a real problem.",
  "s3.l1": "Chatbots & intelligent agents",
  "s3.l2": "Automated booking & intake",
  "s3.l3": "Financial & legal document analysis",
  "aud.title": "Who we work with",
  "a1.title": "Clinics & hospitals",
  "a1.text": "Lighter admin load, more accurate records, and staying ahead of competitors.",
  "a2.title": "Independent practitioners",
  "a2.text": "Less time on repetitive tasks, more time with patients.",
  "a3.title": "Finance & legal teams",
  "a3.text": "Accurate document analysis with full data confidentiality.",
  "a4.title": "AI learners",
  "a4.text": "Not sure where to start? We'll build the path with you.",
  "why.title": "A team that has worked at the bedside and written the code",
  "why.p1": "Datazma sits at the intersection of two rare skill sets: clinical practice (medicine, physical medicine & rehabilitation, manual therapy) and data (AI and data science). That combination is who we are — not a marketing line.",
  "why.quote": "AI won't replace your expertise; someone who uses AI well will replace someone who doesn't.",
  "w1.title": "AI for process, not diagnosis",
  "w1.text": "In healthcare we focus on improving and speeding up clinical and admin workflows — never diagnosis or treatment decisions.",
  "w2.title": "Our data commitment",
  "w2.text": "Patient and client data is never stored or shared without explicit consent; storage location and PHIPA compliance are always disclosed.",
  "w3.title": "With you until it runs",
  "w3.text": "We don't just teach — we stay with you from learning to real implementation.",
  "proc.title": "Working together in four steps",
  "p1.title": "20-minute conversation",
  "p1.text": "We listen to your problem and goals — free, no commitment.",
  "p2.title": "Roadmap",
  "p2.text": "We pinpoint the processes to improve and the right tools.",
  "p3.title": "Train or build",
  "p3.text": "We train your team or build the custom solution.",
  "p4.title": "Launch & support",
  "p4.text": "If you get stuck, we're right there with you.",
  "c.title": "Let's talk for 20 minutes",
  "c.text": "Tell us where your work loses the most time or energy. Together we'll see how AI can make it simpler.",
  "f.name": "Name",
  "f.email": "Email",
  "f.role": "Which best describes you?",
  "f.r1": "Clinic / hospital manager",
  "f.r2": "Independent practitioner",
  "f.r3": "Finance / legal organization",
  "f.r4": "Interested in learning AI",
  "f.msg": "Your message",
  "f.note": "Please don't include patient medical information here.",
  "f.submit": "Request a free session",
  "footer.tag": "Datazma | AI training, consulting & applications — datazma.ca",
  "chat.name": "Datazma Assistant",
  "chat.status": "Usually replies instantly",
  "chat.ph": "Type your question…"
};

(function () {
  var FA = {};
  document.querySelectorAll("[data-i18n]").forEach(function (el) { FA[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { FA[el.dataset.i18nPh] = el.placeholder; });
  var FA_TITLE = document.title;

  window.getLang = function () { return document.documentElement.lang === "en" ? "en" : "fa"; };

  window.setLang = function (lang) {
    var dict = lang === "en" ? window.I18N_EN : FA;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.dataset.i18n]; if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = dict[el.dataset.i18nPh]; if (v != null) el.placeholder = v;
    });
    document.title = lang === "en" ? "Datazma | AI Training, Consulting & Applications" : FA_TITLE;
    var t = document.getElementById("langToggle"); if (t) t.textContent = lang === "en" ? "فا" : "EN";
    try { localStorage.setItem("dz-lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  };
})();
