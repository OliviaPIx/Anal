// Флаг для отслеживания состояния меню
var isNavOpen = false;

// Открытие бокового меню
function openNav() {
    if (!isNavOpen) {
        document.getElementById("mySidenav").style.width = "250px";
        isNavOpen = true;
        console.log("Меню открыто");
    }
}

// Закрытие бокового меню
function closeNav() {
    if (isNavOpen) {
        document.getElementById("mySidenav").style.width = "0";
        isNavOpen = false;
        console.log("Меню закрыто");
    }
}

// Закрытие бокового меню при клике вне его области
document.addEventListener("click", function(event) {
    var sidenav = document.getElementById("mySidenav");
    var menuIcon = document.querySelector(".menu-icon");

    // Закрываем меню, если клик был вне меню и иконки меню
    if (isNavOpen && !sidenav.contains(event.target) && !menuIcon.contains(event.target)) {
        closeNav();
    }
});

document.querySelector(".closebtn").addEventListener("click", closeNav);
document.querySelector(".menu-icon").addEventListener("click", openNav);

// Открытие модального окна регистрации
function openRegisterModal() {
    document.getElementById("registerModal").classList.add("show");
    document.getElementById("overlay").classList.add("show");
}

// Закрытие модального окна регистрации
function closeRegisterModal() {
    document.getElementById("registerModal").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

// Открытие модального окна входа
function openLoginModal() {
    document.getElementById("loginModal").classList.add("show");
    document.getElementById("overlay").classList.add("show");
}

// Закрытие модального окна входа
function closeLoginModal() {
    document.getElementById("loginModal").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}

// Обработка формы регистрации
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("registerPasswordConfirm").value;
    var errorMessage = document.getElementById("registerError");

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
        errorMessage.textContent = "Пароли не совпадают!";
        return;
    }

    // Проверка длины пароля
    if (password.length < 8) {
        errorMessage.textContent = "Пароль должен быть не менее 8 символов.";
        return;
    }

    // Проверка на наличие хотя бы одной буквы
    if (!/[a-zA-Z]/.test(password)) {
        errorMessage.textContent = "Пароль должен содержать хотя бы одну букву.";
        return;
    }

    // Проверка на наличие хотя бы одной цифры
    if (!/[0-9]/.test(password)) {
        errorMessage.textContent = "Пароль должен содержать хотя бы одну цифру.";
        return;
    }

    // Отправляем данные на сервер
    var formData = new FormData(document.getElementById("registerForm"));
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "register.php", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert("Регистрация успешна!");
                closeRegisterModal();
            } else {
                errorMessage.textContent = response.message;
            }
        } else {
            errorMessage.textContent = "Произошла ошибка при регистрации.";
        }
    };
    xhr.send(formData);
});

// Обработка сессионных переменных при загрузке страницы
document.addEventListener("DOMContentLoaded", function() {
    var authButtons = document.getElementById('auth-buttons');
    var profile = document.getElementById('profile');
    var usernameDisplay = document.getElementById('username-display');

    if (sessionStorage.getItem('userLoggedIn') === 'true') {
        authButtons.style.display = 'none';
        profile.style.display = 'flex';
        usernameDisplay.textContent = sessionStorage.getItem('username');
    } else {
        authButtons.style.display = 'flex';
        profile.style.display = 'none';
    }
});
// Открытие и закрытие модального окна
document.getElementById('openTermsModal').onclick = function() {
    document.getElementById('termsModal').style.display = 'block';
};

// Закрытие модального окна пользовательского соглашения
document.getElementById('closeTermsModal').onclick = function() {
    document.getElementById('termsModal').style.display = 'none';
};
document.querySelector(".menu-icon").addEventListener("click", function() {
    if (isNavOpen) {
        closeNav();
    } else {
        openNav();
    }
});

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
    var termsModal = document.getElementById('termsModal');
    if (event.target === termsModal) {
        termsModal.style.display = 'none';
    }

};
// Открытие модального окна пользовательского соглашения
document.getElementById('openUserAgreementModal').onclick = function() {
    document.getElementById('userAgreementModal').style.display = 'block';
};

// Закрытие модального окна пользовательского соглашения
document.getElementById('closeUserAgreementModal').onclick = function() {
    document.getElementById('userAgreementModal').style.display = 'none';
};

