
// Это временный файл из которого данные будут разнесены по другим файлам
// после чего этот файл можно будет удалить

import { getData } from './getData.js';

// const wishList = ['idd066', 'idd036', 'idd076', 'idd096']; вырезаем в generateItems

const cartlist = [
	{
		id: 'idd016',
		count: 3
	},
	{
		id: 'idd066',
		count: 1
	},
	{
		id: 'idd001',
		count: 5
	}
];

export const loadData = () => {

	// location - это объект браузера содержащий различные данные(о поиске, портах, пути к файлу, hash и другие)
	/* вырезаем в generateItems:
	if (location.search) { // проверяем есть ли на странице поиск
		const search = decodeURI(location.search); // декодирование результатов поиска на русский язык
		//console.log(search);
		const prop = search.split('=')[0].slice(1); // разбиваем строку по знаку равно и оставляем первый элемент
		// обрезая знак вопроса slice'ом
		//console.log('prop: ', prop);
		const value = search.split('=')[1]; // разбиваем строку по знаку равно и оставляем второй элемент
		//console.log('value: ', value);

		// отправляем запросы на сервер сравнивая данные сервера с действиями пользователя
		if (prop === 'search') {
			getData.search(value, (data) => console.log(data));
		} else if (prop === 'wishlist') {
			getData.wishList(wishList, (data) => console.log(data));
		} else if (prop === 'cat' || prop === 'subcat') {
			//getData.category(prop, value, (data) => console.log(data));
		}
	}
*/

	if (location.hash) { // проверяем есть ли на странице hash
		getData.item(location.hash.slice(1), (data) => console.log(data));
	}

	if (location.pathname.includes('cart')) { // проверяем есть ли на странице корзина
		getData.cart(cartlist, (data) => console.log(data));
	}

	// getData.catalog((data) => console.log(data));
	// getData.subCatalog('Кухня', (data) => console.log(data));
};