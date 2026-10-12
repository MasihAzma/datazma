// Datazma Assistant — bilingual chatbot.
// Works fully in the browser from the knowledge base below. To connect an LLM backend
// (e.g. an n8n webhook or serverless function), set `endpoint`; it receives
// POST { message, history, lang } and must return JSON { reply }. On any error the
// built-in knowledge base answers instead.
window.DATAZMA_CHAT = window.DATAZMA_CHAT || { endpoint: "" };

(function () {
  var KB = [
    {
      id: "greet",
      k: ["سلام", "درود", "وقت بخیر", "صبح بخیر", "hello", "hi", "hey", "salam"],
      fa: "سلام! 👋 من دستیار Datazma هستم. درباره آموزش AI، مشاوره پیاده‌سازی یا ساخت اپلیکیشن اختصاصی هر سؤالی دارید بپرسید.",
      en: "Hi there! 👋 I'm the Datazma assistant. Ask me anything about AI training, implementation consulting, or custom AI apps."
    },
    {
      id: "about",
      k: ["datazma چیه", "دیتازما", "شما کی", "کی هستید", "درباره", "معرفی", "who are you", "about", "what is datazma"],
      fa: "Datazma به سازمان‌ها، کلینیک‌ها، بیمارستان‌ها و پزشکان مستقل کمک می‌کند هوش مصنوعی را واقعاً وارد کارشان کنند.\n\nما تیمی هستیم که هم زبان بالین را می‌فهمد، هم کد می‌نویسد — آموزش می‌دهیم، مشاوره می‌دهیم و اپلیکیشن اختصاصی می‌سازیم. از یادگیری تا اجرا، با Datazma.",
      en: "Datazma helps organizations, clinics, hospitals and independent practitioners actually bring AI into their work.\n\nWe're a team that speaks clinic and writes code — we train, we consult, and we build custom apps. From learning to doing, with Datazma."
    },
    {
      id: "services",
      k: ["خدمات", "چه کار", "چیکار", "سرویس", "چه کمکی", "services", "what do you do", "offer", "help with"],
      fa: "سه مسیر داریم:\n\n▲ آموزش کاربردی AI — کارگاه و دوره، بدون نیاز به برنامه‌نویسی\n▲ مشاوره تخصصی — پیدا کردن نقطه شروع، نقشه راه و انطباق با PHIPA\n▲ ساخت اپلیکیشن اختصاصی — چت‌بات، اتوماسیون نوبت‌دهی، تحلیل اسناد\n\nکدام برایتان جالب‌تر است؟",
      en: "We offer three paths:\n\n▲ Practical AI training — workshops and courses, no coding required\n▲ Expert consulting — finding your starting point, a roadmap, PHIPA compliance\n▲ Custom AI apps — chatbots, booking automation, document analysis\n\nWhich one interests you most?"
    },
    {
      id: "training",
      k: ["آموزش", "دوره", "کلاس", "کارگاه", "یاد بگیرم", "یادگیری", "course", "training", "learn", "workshop", "class"],
      fa: "آموزش‌های ما عملی و پروژه‌محور است: از مفاهیم پایه تا ساخت ایجنت، چت‌بات و اتوماسیون — بدون نیاز به برنامه‌نویسی.\n\nبرای تیم‌های سازمانی کارگاه اختصاصی برگزار می‌کنیم و برای افراد، مسیر یادگیری و تغییر شغل به سمت AI را با هم می‌چینیم.\n\nمی‌خواهید در یک جلسه ۲۰ دقیقه‌ای رایگان مسیر مناسب شما را پیدا کنیم؟",
      en: "Our training is hands-on and project-based: from the basics to building agents, chatbots and automations — no coding needed.\n\nWe run custom workshops for teams, and for individuals we map out a learning or career-change path into AI together.\n\nWant to find your path in a free 20-minute session?"
    },
    {
      id: "consult",
      k: ["مشاوره", "نقشه راه", "استراتژی", "پیاده سازی", "پیاده‌سازی", "consult", "consulting", "strategy", "roadmap", "implement"],
      fa: "در مشاوره، اول فرآیندهای شما را می‌شناسیم: کجا وقت یا دقت از دست می‌رود؟ بعد نقشه راهی متناسب با بودجه پیشنهاد می‌دهیم — فقط چیزی که واقعاً به‌کارتان می‌آید، نه هر ترندی که این هفته داغ است.\n\nقدم اول یک گفتگوی ۲۰ دقیقه‌ای رایگان است.",
      en: "In consulting we start by understanding your workflows: where are you losing time or accuracy? Then we propose a roadmap that fits your budget — only what genuinely helps, not whatever is trending this week.\n\nStep one is a free 20-minute conversation."
    },
    {
      id: "apps",
      k: ["اپلیکیشن", "نرم افزار", "نرم‌افزار", "چت بات", "چت‌بات", "ایجنت", "اتوماسیون", "بسازید", "app", "application", "chatbot", "agent", "automation", "build", "software"],
      fa: "اپلیکیشن‌هایی که می‌سازیم یک مسئله واقعی را حل می‌کنند، مثلاً:\n\n▲ چت‌بات پاسخ‌گویی و نوبت‌دهی مطب\n▲ خلاصه‌سازی و مرتب‌سازی پرونده‌ها و فرم‌های پذیرش\n▲ تحلیل اسناد مالی و حقوقی\n▲ داشبورد داده برای مدیران\n\nمسئله شما چیست؟ در جلسه رایگان بررسی‌اش می‌کنیم.",
      en: "The apps we build solve a real problem, for example:\n\n▲ A clinic chatbot for FAQs and booking\n▲ Summarizing and organizing records and intake forms\n▲ Financial and legal document analysis\n▲ Data dashboards for managers\n\nWhat's your problem? We can look at it in a free session."
    },
    {
      id: "health",
      k: ["کلینیک", "بیمارستان", "مطب", "پزشک", "دکتر", "سلامت", "درمان", "فیزیوتراپی", "clinic", "hospital", "doctor", "physician", "health", "healthcare", "medical", "practice"],
      fa: "حوزه سلامت تخصص ماست — تیم ما هم پای بالین بوده هم کد نوشته.\n\nدر سلامت، AI برای بهبود فرآیند است، نه تشخیص یا تصمیم درمانی. یعنی روی کارهایی مثل نوبت‌دهی، پذیرش، مستندسازی و کارهای اداری تمرکز می‌کنیم تا وقت شما برای بیمار آزاد شود.\n\nمیدونستی AI می‌تونه نوبت‌دهی مطبت رو خودکار کنه؟ بدون یک خط کد.",
      en: "Healthcare is our specialty — our team has worked at the bedside and written the code.\n\nIn healthcare, AI is for improving processes, not diagnosis or treatment decisions. We focus on booking, intake, documentation and admin work so your time goes back to patients.\n\nDid you know AI can automate your clinic's booking? Without a single line of code."
    },
    {
      id: "diagnosis",
      k: ["تشخیص", "بیماری", "علائم", "دارو", "درد", "نسخه", "diagnose", "diagnosis", "symptom", "medication", "pain", "treatment for", "prescription"],
      fa: "متأسفانه من نمی‌توانم درباره تشخیص، دارو یا درمان نظر بدهم — این کار پزشک شماست. 🙏\n\nDatazma روی بهبود فرآیندهای بالینی و اداری با AI کار می‌کند، نه تصمیم درمانی. اگر سؤال پزشکی دارید، لطفاً با پزشک خود مشورت کنید.",
      en: "Sorry, I can't advise on diagnosis, medication or treatment — that's your clinician's job. 🙏\n\nDatazma uses AI to improve clinical and admin processes, not to make treatment decisions. For medical questions, please consult your healthcare provider."
    },
    {
      id: "privacy",
      k: ["حریم", "خصوصی", "امنیت", "امن", "داده", "داده بیمار", "اطلاعات بیمار", "محرمانه", "phipa", "privacy", "security", "secure", "data", "confidential", "hipaa"],
      fa: "تعهد داده ما ساده است:\n\n▲ داده بیمار یا مشتری بدون رضایت صریح ذخیره یا به‌اشتراک گذاشته نمی‌شود.\n▲ محل نگهداری داده و انطباق با مقررات محلی (PHIPA) شفاف اعلام می‌شود.\n\nلطفاً در این چت هم اطلاعات پزشکی بیماران را وارد نکنید.",
      en: "Our data commitment is simple:\n\n▲ Patient or client data is never stored or shared without explicit consent.\n▲ Where data lives and how we comply with local regulations (PHIPA) is always disclosed.\n\nPlease don't share patient medical information in this chat either."
    },
    {
      id: "price",
      k: ["قیمت", "هزینه", "تعرفه", "چقدر", "بودجه", "پول", "price", "pricing", "cost", "how much", "budget", "fee"],
      fa: "هزینه به نوع همکاری بستگی دارد — یک کارگاه آموزشی با ساخت یک اپلیکیشن اختصاصی فرق می‌کند. وعده عدد کلی نمی‌دهیم؛ بعد از شناخت نیازتان پیشنهاد شفاف و متناسب با بودجه می‌دهیم.\n\nجلسه اول ۲۰ دقیقه و رایگان است.",
      en: "It depends on the engagement — a workshop is different from a custom app. We don't quote blanket numbers; once we understand your needs we give a clear proposal that fits your budget.\n\nThe first 20-minute session is free."
    },
    {
      id: "book",
      k: ["رزرو", "جلسه", "وقت", "تماس", "ارتباط", "ایمیل", "شماره", "رایگان", "book", "booking", "meeting", "call", "contact", "email", "talk", "free", "appointment", "schedule"],
      fa: "عالی! پیشنهاد می‌کنم ۲۰ دقیقه صحبت کنیم — رایگان و بدون تعهد.\n\nفرم پایین صفحه را پر کنید تا زمان مناسب را هماهنگ کنیم: <a href=\"#contact\" data-close-chat>رفتن به فرم رزرو</a>\n\nاینستاگرام: @datazma",
      en: "Great! Let's talk for 20 minutes — free and no commitment.\n\nFill in the form at the bottom of the page and we'll find a time: <a href=\"#contact\" data-close-chat>Go to booking form</a>\n\nInstagram: @datazma"
    },
    {
      id: "nocode",
      k: ["برنامه نویسی", "برنامه‌نویسی", "کدنویسی", "فنی", "programming", "coding", "code", "technical", "developer"],
      fa: "یادگیری و استفاده از AI نیاز به برنامه‌نویسی ندارد — فقط به مسیر و استراتژی درست نیاز دارید. بخش فنی را ما انجام می‌دهیم و شما را قدم‌به‌قدم همراهی می‌کنیم.",
      en: "Learning and using AI doesn't require programming — you just need the right path and strategy. We handle the technical side and walk with you step by step."
    },
    {
      id: "start",
      k: ["از کجا شروع", "شروع کنم", "نمیدونم", "نمی‌دانم", "where to start", "get started", "begin", "start"],
      fa: "رایج‌ترین مشکل همین است — ندانستن نقطه شروع. پیشنهاد ما:\n\n۱. یک کار تکراری که بیشترین وقت را می‌گیرد پیدا کنید.\n۲. در جلسه رایگان ۲۰ دقیقه‌ای با ما بررسی‌اش کنید.\n۳. با یک راهکار کوچک و قابل‌اندازه‌گیری شروع کنیم.\n\nاگر جایی گیر کردید، همان لحظه کنارتان هستیم.",
      en: "That's the most common challenge — not knowing where to start. Our suggestion:\n\n1. Pick one repetitive task that eats the most time.\n2. Review it with us in a free 20-minute session.\n3. Start with one small, measurable solution.\n\nIf you get stuck, we're right there with you."
    },
    {
      id: "replace",
      k: ["جایگزین", "بیکار", "شغلم", "replace", "job", "jobs", "take over"],
      fa: "هوش مصنوعی جایگزین تخصص شما نمی‌شود؛ کسی که از آن درست استفاده کند، جایگزین کسی می‌شود که نمی‌داند. امروز AI همان چیزیست که ۱۰ سال پیش اینترنت بود.",
      en: "AI won't replace your expertise; someone who uses AI well will replace someone who doesn't. AI today is what the internet was ten years ago."
    },
    {
      id: "finance",
      k: ["مالی", "حقوقی", "وکیل", "حسابداری", "قرارداد", "اسناد", "finance", "legal", "lawyer", "accounting", "contract", "documents"],
      fa: "برای سازمان‌های مالی و حقوقی، تحلیل و خلاصه‌سازی اسناد را با AI سریع‌تر و دقیق‌تر می‌کنیم — با حفظ کامل محرمانگی داده و شفافیت درباره محل نگهداری آن.",
      en: "For finance and legal teams, we make document analysis and summarization faster and more accurate with AI — with full confidentiality and clarity on where data is stored."
    },
    {
      id: "thanks",
      k: ["مرسی", "ممنون", "سپاس", "متشکر", "thanks", "thank you", "thx"],
      fa: "خواهش می‌کنم! 🌱 اگر سؤال دیگری داشتید، همین‌جا هستم.",
      en: "You're welcome! 🌱 If anything else comes up, I'm right here."
    },
    {
      id: "bye",
      k: ["خداحافظ", "bye", "goodbye", "see you"],
      fa: "خداحافظ! از یادگیری تا اجرا، با Datazma. 👋",
      en: "Goodbye! From learning to doing, with Datazma. 👋"
    }
  ];

  var FALLBACK = {
    fa: "سؤال خوبی است! برای اینکه دقیق جواب بدهم، بهتر است در یک جلسه ۲۰ دقیقه‌ای رایگان صحبت کنیم: <a href=\"#contact\" data-close-chat>رزرو جلسه</a>\n\nیا یکی از موضوعات زیر را انتخاب کنید 👇",
    en: "Good question! To answer it properly, let's talk in a free 20-minute session: <a href=\"#contact\" data-close-chat>Book a session</a>\n\nOr pick one of the topics below 👇"
  };
  var WELCOME = {
    fa: "سلام! 👋 من دستیار Datazma هستم.\nچطور می‌توانم کمکتان کنم هوش مصنوعی را وارد کارتان کنید؟",
    en: "Hi! 👋 I'm the Datazma assistant.\nHow can I help you bring AI into your work?"
  };
  var CHIPS = {
    fa: [["خدمات Datazma", "services"], ["AI برای کلینیک", "health"], ["دوره‌های آموزشی", "training"], ["حریم خصوصی داده", "privacy"], ["رزرو مشاوره رایگان", "book"]],
    en: [["Services", "services"], ["AI for clinics", "health"], ["Training", "training"], ["Data privacy", "privacy"], ["Book free consult", "book"]]
  };

  function norm(s) {
    return s.toLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/‌/g, " ").replace(/[?؟!.,،]/g, " ").replace(/\s+/g, " ").trim();
  }
  function isFa(s) { return /[؀-ۿ]/.test(s); }

  function match(text) {
    var t = " " + norm(text) + " ", best = null, bestScore = 0;
    KB.forEach(function (it) {
      var score = 0;
      it.k.forEach(function (kw) {
        var n = norm(kw);
        // Latin keywords match whole words; Persian keywords match substrings (affixes are common).
        var hit = /[a-z]/.test(n) ? t.indexOf(" " + n + " ") > -1 || (n.length > 4 && t.indexOf(n) > -1) : t.indexOf(n) > -1;
        if (hit) score += n.length > 5 ? 2 : 1;
      });
      if (it.id === "diagnosis" && score) score += 2; // safety intent wins ties
      if (it.id === "health" && score) score += 1;  // domain answer beats generic "services"
      if (score > bestScore) { bestScore = score; best = it; }
    });
    return best;
  }

  var body, chips, history = [];

  function add(role, html) {
    var d = document.createElement("div");
    d.className = "msg " + role;
    if (role === "bot") d.innerHTML = html; else d.textContent = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function renderChips() {
    chips.innerHTML = "";
    CHIPS[getLang()].forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = c[0];
      b.onclick = function () { send(c[0], c[1]); };
      chips.appendChild(b);
    });
  }

  function localReply(text, forcedId) {
    var lang = isFa(text) ? "fa" : (/[a-z]/i.test(text) ? "en" : getLang());
    var it = forcedId ? KB.filter(function (x) { return x.id === forcedId; })[0] : match(text);
    if (forcedId) lang = getLang();
    return it ? it[lang] : FALLBACK[lang];
  }

  function remoteReply(text) {
    var ep = window.DATAZMA_CHAT && window.DATAZMA_CHAT.endpoint;
    if (!ep) return Promise.reject();
    return fetch(ep, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history: history.slice(-10), lang: getLang() })
    }).then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) {
        var reply = j.reply || j.output || j.text;
        if (!reply) throw 0;
        var tmp = document.createElement("div"); tmp.textContent = reply; return tmp.innerHTML;
      });
  }

  function send(text, forcedId) {
    text = (text || "").trim();
    if (!text) return;
    add("user", text);
    history.push({ role: "user", content: text });
    var typing = add("bot", '<span class="typing"><i></i><i></i><i></i></span>');
    var p = forcedId ? Promise.reject() : remoteReply(text);
    p.catch(function () {
      return new Promise(function (res) { setTimeout(function () { res(localReply(text, forcedId)); }, 550 + Math.random() * 400); });
    }).then(function (html) {
      typing.innerHTML = html;
      history.push({ role: "assistant", content: typing.textContent });
      body.scrollTop = body.scrollHeight;
    });
  }

  window.DatazmaChat = {
    init: function () {
      body = document.getElementById("chatBody");
      chips = document.getElementById("chatChips");
      var form = document.getElementById("chatForm"), input = document.getElementById("chatText");
      form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); input.value = ""; });
      body.addEventListener("click", function (e) {
        if (e.target.closest("[data-close-chat]")) window.DatazmaChat.close();
      });
      document.addEventListener("langchange", renderChips);
      renderChips();
    },
    greet: function () { if (!body.children.length) add("bot", WELCOME[getLang()]); },
    send: send,
    close: function () {}
  };
})();
