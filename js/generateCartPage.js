import { getData } from './getData.js';
import userData from './userData.js';

//=========== проверяем функцию отправки данных из файла test.js:
const sendData = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		body: data
	});
	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
	}

	return await response.json();
};

// создаем функцию отправки корзины:

const sendCart = () => {

	const cartForm = document.querySelector('.cart-form'); // получаем форму состраницы корзины

	/*const data = { - для теста создадим временный объект
		name: 'Плюшевый мишка',
		count: 3
	};*/

	cartForm.addEventListener('submit', (e) => { // навешиваем обработчик событий на кнопку submit
		e.preventDefault(); // - отменяем стандартные действия браузера

		const formData = new FormData(cartForm); // - создаем новую переменную для отправки данных в формате FormData
		// которую можно сразу передавать на сервер без перевода в формат JSON при условии что сервер понимает FormData

		// const cartList = JSON.stringify(data);  - создаем переменную в которую помещаем строку JSON с данными

		// console.log(cartList);  выводим в консоль cartList 

		// sendData('https://jsonplaceholder.typicode.com/posts', cartList); отправляем на сервер cartList

		// formData.set('order', JSON.stringify(data));  в formData можно добавлять любые данные с помощью метода set 
		// но нужно переводить их в формат JSON(смотри строку 34, создавать новую переменную не обязательно)

		// formData.set('order', JSON.stringify(userData.cartList)); вместо временного объекта отправляем данные
		// корзины из файла userData

		// если сервер понимает только формат JSON:
		// formData.set('order', userData.cartList); переводить данные в формат JSON и 
		// писать JSON.stringify(userData.cartList) не обязательно(смотри строку 56)

		const data = {}; // создаем пустой объект
		for (const [key, value] of formData) { // при помощи деструктуризации получаем ключ и значение и 
			// перебираем formData
			data[key] = value; // в объект formData добавляем новый ключ key и присваиваем значение value
		}

		data.order = userData.cartList; // создаем новое свойство в объекте дата и присваиваем ему значение
		// cartlist из userData и в итоге получаем массив, где элементы это объекты находящиеся в корзине

		console.log(data);

		/*sendData('https://jsonplaceholder.typicode.com/posts', formData) // отправляем на сервер formData
			.then(() => {
				cartForm.reset(); // очищаем форму после отправки данных 
			})
			.catch((err) => {
				console.log(err); // выводим ошибку если что-то пошло не так
			});*/

		// отправляем на сервер data в формате JSON:
		sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
			.then(() => {
				cartForm.reset(); // очищаем форму после отправки данных 
			})
			.catch((err) => {
				console.log(err); // выводим ошибку если что-то пошло не так
			});
	});

};

//=====================================================================================================

const generateCartPage = () => {

	if (location.pathname.includes('cart')) {
		const cartList = document.querySelector('.cart-list'),
			cartTotalPrice = document.querySelector('.cart-total-price');


		const renderCartList = (data) => {
			cartList.textContent = '';

			let totalPrice = 0;

			data.forEach(({ name: itemName, count, description, id, img, price }) => {

				let options = '';

				let countUser = userData.cartList.find(item => item.id === id).count;
				if (countUser > count) {
					countUser = count;
				}
				for (let i = 1; i <= count; i++) {
					options += `<option value=${i} ${countUser === i ? 'selected' : ''}>${i}</option>`;
				}

				totalPrice += countUser * price;

				cartList.insertAdjacentHTML('afterbegin', `
					<li class="cart-item">
						<div class="product">
							<div class="product__image-container">
								<img src=${img[0]}
									alt=${itemName}>
							</div>
							<div class="product__description">
								<h3 class="product__name">
									<a href="card.html#${id}">${itemName}</a></h3>
								<p class="product_description-text">${description}</p>
							</div>
							<div class="product__prices">
								<div class="product__price-type product__price-type-regular">
									<div>
									<div class="product__total product__total-regular">${price * countUser}.-</div>
										${(countUser > 1) ? `<div class="product__price-regular">${price}.-</div>` : ``}
									</div>
								</div>
							</div>
							<div class="product__controls">
								<div class="product-controls__remove">
									<button type="button" class="btn btn-remove" data-idd = ${id}>
										<img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
									</button>
								</div>
								<div class="product-controls__quantity">
									<select title="Выберите количество" aria-label="Выберите количество" data-idd = ${id}>
										${options}
									</select>
								</div>
							</div>
						</div>
					</li>
				`);
			});
			cartTotalPrice.textContent = `${totalPrice} ₽`;
		};

		cartList.addEventListener('change', ((e) => {
			userData.changeCountCartList = {
				id: e.target.dataset.idd,
				count: parseInt(e.target.value)
			};
			getData.cart(userData.cartList, renderCartList);
		}));

		cartList.addEventListener('click', ((e) => {
			const target = e.target;
			const removeBtn = target.closest('.btn-remove');
			if (removeBtn) {
				userData.deleteItemCart = removeBtn.dataset.idd;
				getData.cart(userData.cartList, renderCartList);
			}
		}));

		getData.cart(userData.cartList, renderCartList);

		sendCart(); // вызываем функцию отправки формы
	}
};

export default generateCartPage;