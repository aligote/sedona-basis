// Validate
//------------------------------------------------------------------------------

window.sedona.form = {
	validate: function() {
		if (document.querySelector('form[novalidate]') !== null) {
			let form = document.querySelectorAll('form[novalidate]');

			Array.prototype.forEach.call(form, function(el) {
				el.addEventListener('submit', function(evt) {
					if (el.querySelector('[required]') !== null) {
						let element = el.querySelectorAll('[required]');

						Array.prototype.forEach.call(element, function(el) {
							sedonaFormValidateRequired(el);
						});
					}

					if (el.querySelector('[type="email"]') !== null) {
						let element = el.querySelectorAll('[type="email"]');

						Array.prototype.forEach.call(element, function(el) {
							sedonaFormValidateEmail(el);
						});
					}

					if (el.querySelector('.form__control--danger') !== null) {
						evt.preventDefault();

						// Переместить к первой ошибке
					}
				});
			});
		}
	}
}

sedona.form.validate();

function sedonaFormValidateRequired(el) {
	if (el.value.length === 0) {
		el.parentElement.classList.add('form__control--danger');
	} else {
		el.parentElement.classList.remove('form__control--danger');
	}
}

function sedonaFormValidateEmail(el) {
	if (el.value.length > 0) {
		sedonaFormValidateRemoveDangerHint(el);

		if (!/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,10}$/ig.test(el.value)) {
			el.parentElement.classList.add('form__control--danger');

			sedonaFormValidateAddDangerHint(el, 'Введен некорректный адрес электронной почты');
		} else {
			el.parentElement.classList.remove('form__control--danger');
		}
	}
}

function sedonaFormValidateAddDangerHint(el, message) {
	el.parentElement.insertAdjacentHTML('afterend', '<div class="form__hint  form__hint--danger">' + message + '</div>');
}

function sedonaFormValidateRemoveDangerHint(el) {
	if (el.parentElement.nextElementSibling !== null && el.parentElement.nextElementSibling.classList.contains('form__hint--danger')) {
		el.parentElement.parentElement.removeChild(el.parentElement.nextElementSibling);
	}
}
