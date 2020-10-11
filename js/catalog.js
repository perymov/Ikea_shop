
import { getData } from './getData.js';
import generateSubCatalog from './generateSubCatalog.js';

// экспортировать можно двумя способами
// первый это экспортирование конкретных элементов(функций, объектов, массивов и т.д.), в этом случае
// в при импортировании эти элементы нужно заключать в фигурные скобки(см. файл index.js) и писать их через запятую
// второй это экспортирование по дефолту(смотри в других файлах), в этом случае фигурные скобки не обязательны,

export const catalog = () => {  // экспортируем catalog со всем содержимым в главный файл index.js
	const updateSubCatalog = generateSubCatalog();
	// объявляем переменные для существующих элементов и создаем новые элементы
	const body = document.querySelector('body'), // получаем со страницы блок body
		burgerBtn = document.querySelector('.btn-burger'), // получаем со страницы кнопку бургера
		// overlay = document.querySelector('.overlay'),
		menuCatalog = document.querySelector('.catalog'), // получаем со страницы блок содержащий главное меню
		closeBtn = document.querySelector('.btn-close'), // получаем со страницы кнопку закрытия меню(крестик)
		//catalogList = document.querySelector('.catalog-list'), // получаем со страницы список ссылок в главном меню 
		menuSubcatalog = document.querySelector('.subcatalog'), // получаем со страницы блок содержащий подменю
		//subcatalogHeader = document.querySelector('.subcatalog-header'), // получаем со страницы заголовок подменю
		//returnBtn = document.querySelector('.btn-return'), // получаем со страницы кнопку закрытия подменю
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
		const itemList = target.closest('.catalog-list__item');
		if (itemList) { // если значение переменной target true, то выполняем следующие действия
			getData.subCatalog(target.textContent, (data) => {
				// subcatalogHeader.innerHTML = itemList.innerHTML; вставляем в заголовок подменю верстку содержащуюся в target,
				// в нашем случае это нажатый пункт меню
				updateSubCatalog(target.textContent, data);
				menuSubcatalog.classList.add('subopen'); // присваиваем класс, прописанный в css и открывающий подменю
			});
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

	// returnBtn.addEventListener('click', hideSubCatalog);  навешиваем слушатель собития клика на иконку возврата из 
	// подменю, который после клика вызывает функцию закрытия подменю hideSubCatalog
	menuSubcatalog.addEventListener('click', event => {
		const btnReturn = event.target.closest('.btn-return');
		if (btnReturn) { hideSubCatalog(); }
	});

	// навешиваем слушатель события клика на поле overlay, закрывающий меню и подменю при клике на overlay 
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) { // проверяем произошел ли клик на overlay и если да, то
			closeMenu();  // вызывается функцию закрытия меню closeMenu
			hideSubCatalog(); // вызывается функцию закрытия подменю hideSubCatalog
		}
	});

	menuCatalog.addEventListener('click', showSubCatalog); // навешиваем слушатель собития клика на строку списка меню, 
	// который после клика вызывает функцию открытия меню showSubCatalog

	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			closeMenu();  // вызывается функцию закрытия меню closeMenu
		}
	});
};

