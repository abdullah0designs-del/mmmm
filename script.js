/***********************
 * تحميل المحافظات
 ***********************/
const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "البحر الأحمر",
  "البحيرة", "الفيوم", "الغربية", "الإسماعيلية", "المنوفية",
  "المنيا", "القليوبية", "الوادي الجديد", "السويس", "اسوان",
  "اسيوط", "بني سويف", "بورسعيد", "دمياط", "الشرقية",
  "جنوب سيناء", "كفر الشيخ", "مطروح", "الأقصر", "قنا",
  "شمال سيناء", "سوهاج"
];

const govSelect = document.getElementById("governorate");

governorates.forEach(gov => {
  const option = document.createElement("option");
  option.value = gov;
  option.textContent = gov;
  govSelect.appendChild(option);
});

/***********************
 * إخفاء وإظهار الصفحات
 ***********************/
function hideAll() {
  document.querySelectorAll(".container").forEach(div => {
    div.classList.add("hidden");
  });
}

function showRegister() {
  hideAll();
  document.getElementById("register").classList.remove("hidden");
}

function showLogin() {
  hideAll();
  document.getElementById("login").classList.remove("hidden");
}

function goHome() {
  hideAll();
  document.getElementById("home").classList.remove("hidden");
}

/***********************
 * إنشاء حساب
 ***********************/
function register() {
  const nameValue = document.getElementById("name").value.trim();
  const gradeValue = document.getElementById("grade").value;
  const governorateValue = document.getElementById("governorate").value;
  const phoneValue = document.getElementById("phone").value.trim();
  const parentPhoneValue = document.getElementById("parentPhone").value.trim();
  const passwordValue = document.getElementById("password").value;

  if (
    nameValue === "" ||
    gradeValue === "" ||
    governorateValue === "" ||
    phoneValue === "" ||
    parentPhoneValue === "" ||
    passwordValue === ""
  ) {
    alert("برجاء إكمال جميع البيانات");
    return;
  }

  if (phoneValue.length !== 11 || parentPhoneValue.length !== 11) {
    alert("رقم الهاتف يجب أن يكون 11 رقم");
    return;
  }

  const user = {
    name: nameValue,
    grade: gradeValue,
    governorate: governorateValue,
    phone: phoneValue,
    parentPhone: parentPhoneValue,
    password: passwordValue
  };

  localStorage.setItem("arabicaUser", JSON.stringify(user));
  alert("تم إنشاء الحساب بنجاح ✅");
  goHome();
}

/***********************
 * تسجيل الدخول
 ***********************/
function login() {
  const loginPhone = document.getElementById("loginPhone").value.trim();
  const loginPassword = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("arabicaUser"));

  if (!savedUser) {
    alert("لا يوجد حساب مسجل");
    return;
  }

  if (
    loginPhone === savedUser.phone &&
    loginPassword === savedUser.password
  ) {
    showProfile(savedUser);
  } else {
    alert("رقم الهاتف أو كلمة المرور غير صحيحة");
  }
}

/***********************
 * صفحة البيانات
 ***********************/
function showProfile(user) {
  hideAll();
  document.getElementById("profile").classList.remove("hidden");

  document.getElementById("profileData").innerHTML = `
    <strong>الاسم:</strong> ${user.name}<br>
    <strong>الصف الدراسي:</strong> ${user.grade}<br>
    <strong>المحافظة:</strong> ${user.governorate}<br>
    <strong>رقم الهاتف:</strong> ${user.phone}<br>
    <strong>رقم ولي الأمر:</strong> ${user.parentPhone}
  `;
}
