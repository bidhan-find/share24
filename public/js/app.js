/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ (() => {

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
  el_autohide = document.querySelector('.autohide'); // add padding-top to bady (if necessary)

  navbar_height = document.querySelector('.navbar').offsetHeight;
  document.body.style.paddingTop = navbar_height + 'px';

  if (el_autohide) {
    var last_scroll_top = 0;
    window.addEventListener('scroll', function () {
      var scroll_top = window.scrollY;

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

var showOrHidePassword = function showOrHidePassword(className) {
  $(className).click(function () {
    $(this).toggleClass('bx-hide bx-show');
    var input = $($(this).attr('toggle'));

    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  });
};

showOrHidePassword('.toggle-password');
showOrHidePassword('.toggle-password2'); // Reset Show & Hide input

var resetPasswordField = function resetPasswordField() {
  document.querySelector('#eyeIcon').classList.remove('bx-show');
  var resetToggol = document.querySelectorAll('.password-field');
  var resetToggol2 = document.querySelectorAll('.password-field2');
  resetToggol.forEach(function (ele) {
    ele.setAttribute('type', 'password');
  });
  resetToggol2.forEach(function (ele) {
    ele.setAttribute('type', 'password');
  });
  document.querySelector('#eyeIcon').classList.add('bx-hide');
};
/* ---------------- Edit user info ---------------- */


var userEditZoonBtn = document.querySelector('#userEditZoonBtn');
var editUserContainer = document.querySelector('.edit_user');
var closeUserEditZoon = document.querySelector('#closeUserEditZoon');
var profileImage = document.querySelector('#profileImageUpload');
var checkPasswordBtn = document.querySelector('#checkPasswordBtn');
var userUpdateBtn = document.querySelector('#userUpdateBtn'); // Open edit user zoon

userEditZoonBtn === null || userEditZoonBtn === void 0 ? void 0 : userEditZoonBtn.addEventListener('click', function () {
  editUserContainer.classList.add('showEditUserZoon');
}); // Close edit user zoon

var closeeditUserZoon = function closeeditUserZoon() {
  editUserContainer.classList.remove('showEditUserZoon');
  document.querySelector('.check_password').style.display = 'block';
  document.querySelector('.editUser').style.display = 'none';
};

closeUserEditZoon === null || closeUserEditZoon === void 0 ? void 0 : closeUserEditZoon.addEventListener('click', function () {
  closeeditUserZoon();
}); // Check password

checkPasswordBtn === null || checkPasswordBtn === void 0 ? void 0 : checkPasswordBtn.addEventListener('click', function () {
  checkPasswordBtn.innerHTML = '<div class="spinner-border text-secondary" role="status"></div>';
  var userPassword = document.querySelector('#userPasswordFild');
  var data = {
    password: userPassword.value
  };
  fetch('/user-edit/check-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    userPassword.value = '';
    resetPasswordField();

    if (data.status) {
      document.querySelector('.check_password').style.display = 'none';
      document.querySelector('.editUser').style.display = 'block';
      checkPasswordBtn.innerHTML = 'Next';
    } else {
      checkPasswordBtn.innerHTML = 'Next';
      document.querySelector('.checkPassUserError').innerText = data.message;
    }
  });
}); // Update image preview

function previewProfileImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#imagePreview').attr('src', e.target.result);
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
      $('.fileName').text(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  }

  ;
}

; // Update user info

userUpdateBtn === null || userUpdateBtn === void 0 ? void 0 : userUpdateBtn.addEventListener('click', function () {
  userUpdateBtn.innerHTML = '<div class="spinner-border text-secondary" role="status"></div>';
  var name = document.querySelector('#name').value;
  var password = document.querySelector('#password');
  var confirmPassword = document.querySelector('#confirmPassword');
  var file = profileImage.files[0];
  var formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('password', password.value);
  formData.append('confirmPassword', confirmPassword.value);
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      var data = JSON.parse(xhr.response);
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
        }

        ;
        new Noty({
          type: 'success',
          timeout: 3000,
          text: 'Item added to cart',
          progressBar: false
        }).show();
      } else {
        document.querySelector('.editUserError').innerText = data.message;
        userUpdateBtn.innerHTML = 'Next';
      }

      ;
    }
  };

  xhr.open('POST', '/user-edit');
  xhr.send(formData);
});
profileImage === null || profileImage === void 0 ? void 0 : profileImage.addEventListener('change', function () {
  return previewProfileImage(profileImage);
});

/***/ }),

/***/ "./resources/scss/app.scss":
/*!*********************************!*\
  !*** ./resources/scss/app.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/public/js/app": 0,
/******/ 			"public/css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkshare24"] = self["webpackChunkshare24"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["public/css/app"], () => (__webpack_require__("./resources/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;