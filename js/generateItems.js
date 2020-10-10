
import { getData } from './getData.js';

const wishList = ["idd001", "idd067"];

const generateItems = () => {

	const mainHeder = document.querySelector('.main-header'),
		listItem = document.querySelector('.goods-list');


	const generateCards = (data) => {
		listItem.textContent = '';

		data.forEach(item => {
			listItem.insertAdjacentHTML('afterbegin', `
				<li>
					<a class="goods-item__link" href="card.html#${item.id}">
						<article class="goods-item">
						<div class="goods-item__img">
							<img
								src=${item.img[0]}
								alt=${item.name}>
						</div>
						<h3 class="goods-item__header">${item.name}</h3>
								
						<p class="goods-item__description">${item.description}</p>
						<p class="goods-item__price">
							<span class="goods-item__price-value">${item.price}</span>
							<span class="goods-item__currency"> ₽</span>
						</p>
						<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd=${item.id}></button>
						</article>
					</a>
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