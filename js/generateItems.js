
import { getData } from './getData.js';

const wishList = ['idd099'];

const generateItems = () => {

	const mainHeder = document.querySelector('.main-header'),
		listItem = document.querySelector('.goods-list');


	const generateCards = (data) => {
		listItem.textContent = '';

		data.forEach(item => {
			listItem.insertAdjacentHTML('afterbegin', `
				<li>
				${item.name}
				</li>
			`);
		});
	};

	if (location.pathname.includes('goods') && location.search) { // проверяем есть ли на странице поиск
		const search = decodeURI(location.search); // декодирование результатов поиска на русский язык
		//console.log(search);
		const prop = search.split('=')[0].substring(1); // разбиваем строку по знаку равно и оставляем первый элемент
		// обрезая знак вопроса slice'ом
		//console.log('prop: ', prop);
		const value = search.split('=')[1]; // разбиваем строку по знаку равно и оставляем второй элемент
		//console.log('value: ', value);

		// отправляем запросы на сервер сравнивая данные сервера с действиями пользователя
		if (prop === 'search') {
			getData.search(value, generateCards);
			mainHeder.textContent = `Поиск: ${value}`;
		} else if (prop === 'wishlist') {
			if (wishList.length <= 0 || wishList == null) {
				mainHeder.textContent = `Список желаний пуст`;
			} else {
				getData.wishList(wishList, generateCards);
				mainHeder.textContent = `Список желаний`;
			}
		} else if (prop === 'cat' || prop === 'subcat') {
			getData.category(prop, value, generateCards);
			mainHeder.textContent = value;
		}
	}
};

export default generateItems;