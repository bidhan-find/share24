/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable semi */
/*
Template Name     : Share24 - File sharing app
File Description  : Main javascript file of the template
Author            : Bidhan Dev
Support           : bidhandev.d@gmail.com
MIT license       : https://github.com/bidhandev/share24/blob/master/LICENSE
*/

import Noty from 'noty';

/* ---------------- Auto focus input ---------------- */
setTimeout(function () {
    $('#email').focus();
    $('#username').focus();
}, 400);

document.getElementById('homeShareModal').addEventListener('click', () => {
    setTimeout(function () {
        $('#sendMail').focus();
    }, 600);
})

/* ---------------- Navbar ---------------- */
document.addEventListener('DOMContentLoaded', function () {
    const el_autohide = document.querySelector('.autohide');
    // add padding-top to bady (if necessary)
    const navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';
    if (el_autohide) {
        let last_scroll_top = 0;
        window.addEventListener('scroll', function () {
            const scroll_top = window.scrollY;
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            } else {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
    }
});

/* ---------------- Show & Hide input password ---------------- */
const showOrHidePassword = (className) => {
    $(className).click(function () {
        $(this).toggleClass('bx-hide bx-show');
        const input = $($(this).attr('toggle'));
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });
};

showOrHidePassword('.toggle-password');
showOrHidePassword('.toggle-password2');

// Reset Show & Hide input
const resetPasswordField = () => {
    document.querySelector('#eyeIcon').classList.remove('bx-show');
    const resetToggol = document.querySelectorAll('.password-field');
    const resetToggol2 = document.querySelectorAll('.password-field2');
    resetToggol.forEach(ele => {
        ele.setAttribute('type', 'password')
    });
    resetToggol2.forEach(ele => {
        ele.setAttribute('type', 'password')
    });
    document.querySelector('#eyeIcon').classList.add('bx-hide');
};

/* ---------------- Edit user info ---------------- */
const body = document.querySelector('#body');
const userEditZoonBtn = document.querySelector('#userEditZoonBtn');
const editUserContainer = document.querySelector('.edit_user');
const closeUserEditZoon = document.querySelector('#closeUserEditZoon');
const profileImage = document.querySelector('#profileImageUpload');
const checkPasswordBtn = document.querySelector('#checkPasswordBtn');
const userUpdateBtn = document.querySelector('#userUpdateBtn');

// Open edit user zoon
userEditZoonBtn?.addEventListener('click', () => {
    body.classList.add('overFlow');
    editUserContainer.classList.add('showEditUserZoon');
    setTimeout(function () {
        $('#userPasswordFild').focus();
    }, 400);
});

// Close edit user zoon
const closeeditUserZoon = () => {
    editUserContainer.classList.remove('showEditUserZoon');
    document.querySelector('.check_password').style.display = 'block';
    document.querySelector('.editUser').style.display = 'none';
    body.classList.remove('overFlow');
};

closeUserEditZoon?.addEventListener('click', () => {
    closeeditUserZoon();
});

// Check password
checkPasswordBtn?.addEventListener('click', () => {
    checkPasswordBtn.innerHTML = '<div class="spinner-border text-secondary" role="status"></div>';
    const userPassword = document.querySelector('#userPasswordFild');
    const data = {
        password: userPassword.value
    };
    fetch('/user-edit/check-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            userPassword.value = '';
            resetPasswordField();
            if (data.status) {
                document.querySelector('.check_password').style.display = 'none';
                document.querySelector('.editUser').style.display = 'block';
                checkPasswordBtn.innerHTML = 'Next';
                setTimeout(function () {
                    $('#password').focus();
                }, 400);
            } else {
                checkPasswordBtn.innerHTML = 'Next';
                document.querySelector('.checkPassUserError').innerText = data.message;
                new Noty({
                    type: 'error',
                    timeout: 1000,
                    text: 'Something went wrong',
                    progressBar: false
                }).show();
                setTimeout(function () {
                    $('#userPasswordFild').focus();
                }, 400);
            }
        });
});

// Update image preview
function previewProfileImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').attr('src', e.target.result);
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
            $('.fileName').text(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
    };
};

// Update user info
userUpdateBtn?.addEventListener('click', () => {
    userUpdateBtn.innerHTML = '<div class="spinner-border text-secondary" role="status"></div>';
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const file = profileImage.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);
    formData.append('password', password.value);
    formData.append('confirmPassword', confirmPassword.value);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const data = JSON.parse(xhr.response)
            console.log(JSON.parse(xhr.response));
            if (data.user) {
                closeeditUserZoon();
                userUpdateBtn.innerHTML = 'Next';
                document.querySelector('.checkPassUserError').innerText = '';
                password.value = '';
                confirmPassword.value = '';
                resetPasswordField();
                profileImage.value = '';
                document.querySelector('.fileName').innerText = '';
                if (data.user.profileImage !== null) {
                    document.querySelector('#userEditZoonBtn').src = data.user.profileImage;
                    document.querySelector('#editZoonProfileImage').src = data.user.profileImage;
                };
                new Noty({
                    type: 'success',
                    timeout: 3000,
                    text: 'User info has been successfully updated.',
                    progressBar: false
                }).show();
            } else {
                document.querySelector('.editUserError').innerText = data.error;
                userUpdateBtn.innerHTML = 'Next';
                new Noty({
                    type: 'error',
                    timeout: 1000,
                    text: 'Something went wrong',
                    progressBar: false
                }).show();
            };
        }
    };
    xhr.open('POST', '/user-edit');
    xhr.send(formData);
});

profileImage?.addEventListener('change', () => previewProfileImage(profileImage));
