// File
//------------------------------------------------------------------------------

window.sedona.file = function() {
	if (document.querySelector('.file[type="file"]') !== null) {
		let element = document.querySelectorAll('.file[type="file"]');

		Array.prototype.forEach.call(element, function(el) {
			if (!el.classList.contains('file--js-init')) {
				el.classList.add('table--js-init', 'file--input');

				let id = el.getAttribute('id');

				let layout = '' +
					'<label class="file" for="' + id + '">' +
						'<ul class="file__field"></ul>' +
						'<div class="file__button"></div>' +
					'</label>';

				el.insertAdjacentHTML('afterend', layout);

				el.addEventListener('change', function() {
					let filesSelected = this.files;
					let filesList = '';

					for (let i = 0; i < filesSelected.length; i++) {
						let fileName = filesSelected[i].name;

						filesList = filesList + '<li>' + fileName + '</li>';
					}

					document.querySelector('.file[for="' + id + '"] .file__field').innerHTML = filesList;
				});
			}
		});
	}
}

sedona.file();
