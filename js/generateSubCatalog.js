
// генерируем верстку:
const generateSubCatalog = () => {

	const subCatalog = document.createElement('div');
	subCatalog.classList.add('subcatalog');
	const updateHTML = (header, list) => {
		subCatalog.textContent = '';
		let listHTML = '';
		list.forEach((item) => {
			listHTML +=
				`<li class="subcatalog-list__item">
							<a href="goods.html?subcat=${item}">${item}</a>
						</li>`;
		});
		// создаем переменную содержащую верстку:
		const subCatalogHTML = `
		<button type="button" class="btn btn-return catalog-btn" aria-expanded="true" title="Закрыть меню"
			aria-label="Закрыть меню">
			<svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M4 12 L12 4 L12 6 L6 12 Z">
				</path>
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M4 12 L12 20 L12 18 L6 12 Z">
				</path>
				<path fill-rule="evenodd" clip-rule="evenodd"
					d="M6 11 L20 11 L20 13 L5 13 Z">
				</path>
			</svg>
		</button>
		<h3 class="subcatalog-header"><a href="goods.html?cat=${header}">${header}</a></h3>
		<ul class="subcatalog-list">
		${listHTML}
		</ul>
	`;
		// вставляем верстку в subCatalog методом insertAdjacentHTML перед концом body
		subCatalog.insertAdjacentHTML('afterbegin', subCatalogHTML);
		//updateHTML();
	};
	document.body.insertAdjacentElement('beforeend', subCatalog);


	return updateHTML;
};

export default generateSubCatalog; // экспортируем созданную верстку в главный файл index.js

