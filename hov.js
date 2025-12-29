/* ===================================================== */
/*        متغير للتحكم في الأنيميشن                     */
/* ===================================================== */
let isAnimating = false;

/* ===================================================== */
/*          بيانات الساعات                               */
/* ===================================================== */
const watches = {
  1: {
    img: "image/ex1.png",
    theme: "",
    tag: "ساعات حديثة فاخرة",
    code: "CH-3123-PABL",
    title: "تصميم عصري دقة لا مثيل له",
  },
  2: {
    img: "image/apple.png",
    theme: "theme-3",
    tag: "ساعة ذكية",
    code: "APL-WT-2025",
    title: "وقت ذكي<br>حياة أكثر تنظيم<br>وأداء يومي أفضل",
  },
};

/* ===================================================== */
/*        تغيير الساعة                                  */
/* ===================================================== */
function changeWatch(index, element) {
  if (isAnimating) return;
  isAnimating = true;

  const watch = document.getElementById("mainWatch");
  const tag = document.getElementById("watchTag");
  const code = document.getElementById("watchCode");
  const title = document.getElementById("watchTitle");
  const dots = document.querySelectorAll(".pagination span");

  dots.forEach((dot) => dot.classList.remove("active"));
  element.classList.add("active");

  watch.style.opacity = "0";

  setTimeout(() => {
    watch.src = watches[index].img;
    tag.innerHTML = watches[index].tag;
    code.innerHTML = watches[index].code;
    title.innerHTML = watches[index].title;
    document.body.className = watches[index].theme;

    if (watches[index].theme === "") localStorage.setItem("userTheme", "blue");
    else if (watches[index].theme === "theme-3")
      localStorage.setItem("userTheme", "brown");

    watch.style.opacity = "1";
    isAnimating = false;
  }, 400);
}

/* ===================================================== */
/*        ظهور البطاقات عند السكروول                     */
/* ===================================================== */
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.1 }
);

cards.forEach((card) => observer.observe(card));

/* ===================================================== */
/*          زر الإعجاب (القلب)                            */
/* ===================================================== */
function toggleFavorite(el) {
  el.classList.toggle("active");
  el.textContent = el.classList.contains("active") ? "❤" : "♡";
}

/* ===================================================== */
/*          الانتقال بين الصفحات حسب الثيم               */
/* ===================================================== */
function goLogin() {
  const theme = localStorage.getItem("userTheme");
  window.location.href = theme === "brown" ? "loginBrown.html" : "login.html";
}

function goProducts() {
  const theme = localStorage.getItem("userTheme");
  window.location.href = theme === "brown" ? "Sp.html" : "MprPage.html";
}

function goCart() {
  const theme = localStorage.getItem("userTheme");
  window.location.href = theme === "brown" ? "cart2.html" : "cart.html";
}

/* ===================================================== */
/*          تفعيل الثيم عند تحميل الصفحة                */
/* ===================================================== */
window.onload = function () {
  const savedTheme = localStorage.getItem("userTheme");
  const watch = document.getElementById("mainWatch");
  const tag = document.getElementById("watchTag");
  const code = document.getElementById("watchCode");
  const title = document.getElementById("watchTitle");
  const dots = document.querySelectorAll(".pagination span");

  if (savedTheme === "brown") {
    document.body.className = "theme-3";
    if (watch) watch.src = watches[2].img;
    if (tag) tag.innerHTML = watches[2].tag;
    if (code) code.innerHTML = watches[2].code;
    if (title) title.innerHTML = watches[2].title;
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[0]) dots[0].classList.add("active");
  } else {
    document.body.className = "";
    if (dots[1]) dots[1].classList.add("active");
  }
};

/* ===================================================== */
/*          زر الموبايل يفتح القائمة                     */
/* ===================================================== */
// زر الموبايل يفتح القائمة الكاملة
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Dropdown يعمل بالضغط على جميع الشاشات
document.querySelectorAll(".dropbtn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault(); // منع الرابط الافتراضي
    const dropdown = this.parentElement;

    // إغلاق أي dropdown آخر مفتوح
    document.querySelectorAll(".dropdown").forEach((d) => {
      if (d !== dropdown) d.classList.remove("active");
    });

    // تبديل الحالة الحالية
    dropdown.classList.toggle("active");
  });
});

// لإغلاق الـ dropdown إذا ضغط المستخدم خارج القائمة
document.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown") && !e.target.closest(".menu-icon")) {
    document
      .querySelectorAll(".dropdown")
      .forEach((d) => d.classList.remove("active"));
  }
});

// // كود لفتح قائمة المنتجات المنسدلة عند الضغط في الموبايل
// document.querySelector('.dropbtn').addEventListener('click', function(e) {
//     if (window.innerWidth <= 768) {
//         e.preventDefault();
//         this.parentElement.classList.toggle('active');
//     }
// });
// زر اكتشف المزيد
const discoverBtn = document.getElementById("discoverBtn");

if (discoverBtn) {
  discoverBtn.addEventListener("click", () => {
    const theme = localStorage.getItem("userTheme");

    if (theme === "brown") {
      // القهوي → صفحة المنتجات الرياضية
      window.location.href = "Sp.html";
    } else {
      // الأزرق → صفحة المنتجات الحديثة
      window.location.href = "MprPage.html";
    }
  });
}
