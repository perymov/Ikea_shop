import { getData } from './getData.js';
import userData from './userData.js';

const NEW_COUNT_ITEM = 6;

const generateItemPage = () => {

	// применяем деструктуризацию вставляя объект(не создавая его внутри функции) вместо аргумента функции:
	const renderCard = ({ category, count, description, id, img, name: itemName, price, subcategory }) => {

		const goodItemHeader = document.querySelector('.good-item__header'),
			goodItemNew = document.querySelector('.good-item__new'),
			goodItemDescription = document.querySelector('.good-item__description'),
			goodItemEmpty = document.querySelector('.good-item__empty'),
			goodItemPriceValue = document.querySelector('.good-item__price-value'),
			btnGood = document.querySelector('.btn-good'),
			btnAddWishlist = document.querySelector('.btn-add-wishlist'),
			goodImages = document.querySelector('.good-images'),
			// breadcrumbList = document.querySelector('.breadcrumb__list'), для вставки верстки
			breadcrumbLink = document.querySelectorAll('.breadcrumb__link'); // для замены текста в готовой верстке

		goodImages.textContent = '';
		goodItemHeader.textContent = itemName;
		goodItemDescription.textContent = description;
		goodItemPriceValue.textContent = price;
		btnGood.dataset.idd = id;
		btnAddWishlist.dataset.idd = id;

		// хлебные крошки при помощи замены текста в готовой верстке:
		breadcrumbLink[0].textContent = category;
		breadcrumbLink[0].href = `goods.html?cat=${category}`;
		breadcrumbLink[1].textContent = subcategory;
		breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`;
		breadcrumbLink[2].textContent = itemName;

		// хлебные крошки при помощи вставки верстки:
		// breadcrumbList.insertAdjacentHTML('afterbegin', `
		// 	<li class="breadcrumb__list-item">
		// 		<a href="goods.html?cat=${category}" class="breadcrumb__link"><span>${category}</span></a>
		// 	</li>
		// 	<li class="breadcrumb__list-item">
		// 		<a href="goods.html?subcat=${subcategory}" class="breadcrumb__link"><span>${subcategory}</span></a>
		// 	</li>
		// 	<li class="breadcrumb__list-item">
		// 		<a href="#" class="breadcrumb__link"><span>${itemName}</span></a>
		// 	</li>
		// `);


		img.forEach(item => {
			goodImages.insertAdjacentHTML('afterbegin', `
				<div class="good-image__item">
					<img src=${item} alt=${itemName}>
				</div>
			`);
		});

		//проверям на наличие товаров:
		if (count >= NEW_COUNT_ITEM) { // если количество больше NEW_COUNT_ITEM 
			goodItemNew.style.display = 'block'; // показываем надпись "Новинка"
		} else if (!count) { // если количество равно нулю, т.е. возвращает false
			goodItemEmpty.style.display = 'block'; // показываем надпись "Нет в наличии"
			btnGood.style.display = 'none'; // и скрываем кнопку корзины
		}

		const checkWishList = () => {
			if (userData.wishList.includes(id)) {
				btnAddWishlist.classList.add('contains-wishlist');
			} else {
				btnAddWishlist.classList.remove('contains-wishlist');
			}
		};

		btnAddWishlist.addEventListener('click', () => {
			userData.wishList = id;
			checkWishList();
		});

		btnGood.addEventListener('click', () => {
			userData.cartList = id;
		});

		checkWishList();

	};

	if (location.hash && location.pathname.includes('card')) {
		getData.item(location.hash.slice(1), renderCard);
	}
};

export default generateItemPage;