
import { getData } from './getData.js';
import userData from './userData.js';

const COUNTER = 6;

//const wishList = ["idd001", "idd067"];

const generateItems = () => {

	const mainHeader = document.querySelector('.main-header');



	const generateCards = (data) => {
		const listItem = document.querySelector('.goods-list');
		listItem.textContent = '';
		if (!data.length) {
			const list = document.querySelector('.goods');
			list.textContent = location.search === '?wishlist' ? 'Список желаний пуст' : `К сожалению по вашему запросу ничего не найдено`;
			return;
		}

		data.forEach(item => {

			//применяем деструктуризацию:
			const { name, count, description, id, img, price } = item;
			// создаем пустой объект и присваиваем ему item, в качестве аргументов в объект передаем в объект свойства item
			// подставляя которые в верстку будем получать на страницу значения этих свойств(в нашем случае из базы данных) 

			listItem.insertAdjacentHTML('afterbegin', `
				<li>
					<a class="goods-item__link" href="card.html#${id}">
						<article class="goods-item">
							<div class="goods-item__img">
								<img src=${img[0]}
									${img[1] ? `data-second-image=${img[1]}` : ''}
									alt=${name}>
							</div >
						${count > COUNTER ? `<p class="goods-item__new">Новинка</p>` : ''}
						${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
						<h3 class="goods-item__header">${name}</h3>
						<p class="goods-item__description">${description}</p>
						<p class="goods-item__price">
							<span class="goods-item__price-value">${price}</span>
							<span class="goods-item__currency"> ₽</span>
						</p>
						${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd=${item.id}></button>` : ''}
						</article >
					</a >
				</li >
			`);

			// listItem.insertAdjacentHTML('afterbegin', `
			// 	<li>
			// 		<a class="goods-item__link" href="card.html#${item.id}">
			// 			<article class="goods-item">
			// 			<div class="goods-item__img">
			// 				<img
			// 					src=${item.img[0]}
			// 					alt=${item.name}>
			// 			</div>
			// 			<h3 class="goods-item__header">${item.name}</h3>

			// 			<p class="goods-item__description">${item.description}</p>
			// 			<p class="goods-item__price">
			// 				<span class="goods-item__price-value">${item.price}</span>
			// 				<span class="goods-item__currency"> ₽</span>
			// 			</p>
			// 			<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd=${item.id}></button>
			// 			</article>
			// 		</a>
			// 	</li>
			// `);
		});

		listItem.addEventListener('click', (e) => {
			const btnAddCard = e.target.closest('.btn-add-card');
			if (btnAddCard) {
				e.preventDefault();
				userData.cartList = btnAddCard.dataset.idd;
			}
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
			mainHeader.textContent = `Поиск: ${value}`;
		} else if (prop === 'wishlist') {
			getData.wishList(userData.wishList, generateCards);
			mainHeader.textContent = `Список желаний`;
		} else if (prop === 'cat' || prop === 'subcat') {
			getData.category(prop, value, generateCards);
			mainHeader.textContent = value;
		}
	}
};

export default generateItems;