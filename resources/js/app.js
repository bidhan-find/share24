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

/* ---------------- Navbar ---------------- */
document.addEventListener('DOMContentLoaded', function () {
    el_autohide = document.querySelector('.autohide');
    // add padding-top to bady (if necessary)
    navbar_height = document.querySelector('.navbar').offsetHeight;
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

/* ---------------- Edit user info ---------------- */
const userEditZoonBtn = document.querySelector('#userEditZoonBtn');
const editUserContainer = document.querySelector('.edit_user');
const closeUserEditZoon = document.querySelector('#closeUserEditZoon');
const profileImageUpload = document.querySelector('#profileImageUpload');
const checkPasswordBtn = document.querySelector('#checkPasswordBtn');

// Open edit user zoon
userEditZoonBtn?.addEventListener('click', () => {
    editUserContainer.classList.add('showEditUserZoon');
});

// Close edit user zoon
closeUserEditZoon?.addEventListener('click', () => {
    editUserContainer.classList.remove('showEditUserZoon');
});

// Check password
checkPasswordBtn?.addEventListener('click', () => {
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
            if (data.status) {
                document.querySelector('.check_password').style.display = 'none';
                document.querySelector('.editUser').style.display = 'block';
            } else {
                document.querySelector('.editUserError').innerText = data.message;
            }
        });
});

// image uoload
function uploadProfileImage(input) {
    // Update image preview
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
            $('.fileName').text(input.files[0].name);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

profileImageUpload?.addEventListener('change', () => uploadProfileImage(profileImageUpload));
