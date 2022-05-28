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

userEditZoonBtn?.addEventListener('click', () => {
    editUserContainer.classList.add('showEditUserZoon');
});

closeUserEditZoon?.addEventListener('click', () => {
    editUserContainer.classList.remove('showEditUserZoon');
});
