
export const catalog = () => {  // экспортируем catalog со всем содержимым в главный файл index.js

	// объявляем переменные для существующих элементов и создаем новые элементы
	const body = document.querySelector('body'), // получаем со страницы блок body
		burgerBtn = document.querySelector('.btn-burger'), // получаем со страницы кнопку бургера
		// overlay = document.querySelector('.overlay'),
		menuCatalog = document.querySelector('.catalog'), // получаем со страницы блок содержащий главное меню
		closeBtn = document.querySelector('.btn-close'), // получаем со страницы кнопку закрытия меню(крестик)
		catalogParent = document.querySelector('.catalog-list'), // получаем со страницы список ссылок в главном меню 
		menuSubcatalog = document.querySelector('.subcatalog'), // получаем со страницы блок содержащий подменю
		subcatalogHeader = document.querySelector('.subcatalog-header'), // получаем со страницы заголовок подменю
		returnBtn = document.querySelector('.btn-return'), // получаем со страницы кнопку закрытия подменю
		overlay = document.createElement('div'); // создаем блок с затемнением

	// присваиваем вновь созданному элементу overlay соответствующий класс и помещаем его в тело body:
	overlay.classList.add('overlay'); // присваиваем класс
	document.body.insertAdjacentElement('beforeend', overlay); // помещаем на страницу

	// создаем функцию, открывающую меню:
	const openMenu = () => {
		menuCatalog.classList.add('open'); // присваиваем класс, прописанный в css и открывающий меню
		overlay.classList.add('active'); // присваиваем класс, прописанный в css
		body.style.overflow = 'hidden'; // добавляем стиль для body запрещающий прокрутку
	};

	// создаем функцию, закрывающую меню:
	const closeMenu = () => {
		menuCatalog.classList.remove('open'); // убираем ранее присвоенный класс 
		overlay.classList.remove('active'); // убираем ранее присвоенный класс
		body.style.overflow = ''; // убираем стиль запрещающий прокрутку 
		hideSubCatalog(); // вызываем функцию закрывающую подменю menuSubcatalog
	};

	// создаем функцию, открывающую подменю:
	const showSubCatalog = (event) => {
		event.preventDefault(); // отменяем стандартные действия для пунктов меню(ссылок)
		const target = event.target; // создаем переменную, которой присваиваем значение произошедшего события
		if (target) { // если значение переменной target true, то выполняем следующие действия
			menuSubcatalog.classList.add('subopen'); // присваиваем класс, прописанный в css и открывающий подменю
			subcatalogHeader.innerHTML = target.innerHTML; // вставляем в заголовок подменю верстку содержащуюся в target,
			// в нашем случае это нажатый пункт меню
		}
	};

	// создаем функцию закрывающую подменю: 
	const hideSubCatalog = () => {
		menuSubcatalog.classList.remove('subopen'); // убираем ранее присвоенный класс
	};

	// навешиваем обработчики событий:
	burgerBtn.addEventListener('click', openMenu); // навешиваем слушатель собития клика на иконку меню бургер, 
	// который после клика вызывает функцию открытия меню openMenu

	closeBtn.addEventListener('click', closeMenu); // навешиваем слушатель собития клика на иконку закрытия меню 
	// бургер(крестик), который после клика вызывает функцию закрытия меню closeMenu

	returnBtn.addEventListener('click', hideSubCatalog); // навешиваем слушатель собития клика на иконку возврата из 
	// подменю, который после клика вызывает функцию закрытия подменю hideSubCatalog

	// навешиваем слушатель события клика на поле overlay, закрывающий меню и подменю при клике на overlay 
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) { // проверяем произошел ли клик на overlay и если да, то
			closeMenu();  // вызывается функцию закрытия меню closeMenu
			hideSubCatalog(); // вызывается функцию закрытия подменю hideSubCatalog
		}
	});

	catalogParent.addEventListener('click', showSubCatalog); // навешиваем слушатель собития клика на строку списка меню, 
	// который после клика вызывает функцию открытия меню showSubCatalog
};