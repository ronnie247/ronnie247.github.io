/* site.js - dark mode toggle, dropdown menus, translation on sub-pages */
(function(){
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  function paint(){ if (btn) btn.textContent = root.dataset.theme === "dark" ? "☀️" : "🌙"; }
  paint();
  if (btn) btn.addEventListener("click", function(){
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch(e){}
    paint();
  });

  // Dropdown menus: tap to open on phones
  document.querySelectorAll(".dropbtn").forEach(function(b){
    b.addEventListener("click", function(e){ e.preventDefault(); b.parentElement.classList.toggle("open"); });
  });
  document.addEventListener("click", function(e){
    document.querySelectorAll(".dropdown.open").forEach(function(d){ if (!d.contains(e.target)) d.classList.remove("open"); });
  });

  // Translation on sub-pages (language is chosen on the home page and remembered)
  if (document.body.hasAttribute("data-translate")){
    var m = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/);
    if (m && m[1] !== "en"){
      var b = document.getElementById("translate-banner");
      if (b) b.style.display = "block";
      window.googleTranslateElementInit = function(){
        new google.translate.TranslateElement({pageLanguage:"en", autoDisplay:false}, "google_translate_element");
      };
      var s = document.createElement("script");
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(s);
    }
  }
  // Fancy name in the sub-page header (follows the language chosen on the home page)
  var logo = document.querySelector(".sub-logo");
  if (logo){
    var LOGO_NAMES = {hi:"डॉ. रॉनी मंडल", pa:"ਡਾ. ਰੌਨੀ ਮੰਡਲ", ur:"ڈاکٹر رونی منڈل", ko:"로니 몬달 박사"};
    var lm = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/);
    if (lm && LOGO_NAMES[lm[1]]){ logo.textContent = LOGO_NAMES[lm[1]]; logo.classList.add("logo-plain"); }
  }
})();
