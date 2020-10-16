
const PARAM = {
	cat: 'category',
	subcat: 'subcategory',
	search: ['name', 'description', 'category', 'subcategory']
};


export const getData = {
	url: 'database/dataBase.json', // путь к базе данных(локальный, на компьютере)
	// на основании функции getResourse в файле test.js создадим новый метод в объекте getData
	// для получения донных из бады данных:
	async getData(url) {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
		}

		return await response.json();
	},
	// и в методе get будем вызывать данные из getData, т.е. меняем fetch(this.url) на getData
	get(process) { // метод для получения данных в объекте getData
		// fetch(this.url)
		this.getData(this.url)
			//.then(response => response.json()) - убираем данный метод
			.then(process)
			.catch((err) => console.error(err)); // используем метод catch для отлавливания ошибок
	},
	wishList(list, callback) {
		this.get((data) => {
			const result = data.filter((item) => list.includes(item.id));
			callback(result);
		});
	},
	item(value, callback) {
		this.get((data) => {
			const result = data.find(item => item.id === value);
			callback(result);
		});
	},
	cart(list, callback) {
		this.get((data) => {
			const result = data.filter((item) => list.some(obj => obj.id === item.id));
			callback(result);
		});
	},
	category(prop, value, callback) {
		this.get((data) => {
			const result = data.filter(item => item[PARAM[prop]].toLowerCase() === value.toLowerCase());
			callback(result);
		});
	},
	search(value, callback) {
		this.get((data) => {
			const result = data.filter(item => {
				for (const prop in item) {
					if (PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
						return true;
					}
				}
			});
			callback(result);
		});
	},
	catalog(callback) {
		this.get((data) => {
			const result = data.reduce((arr, item) => {
				if (!arr.includes(item.category)) {
					arr.push(item.category);
				}
				return arr;
			}, []);
			callback(result);
		});
	},
	subCatalog(value, callback) {
		this.get((data) => {
			const result = data
				.filter(item => item.category === value)
				.reduce((acc, item) => {
					if (!acc.includes(item.subcategory)) {
						acc.push(item.subcategory);
					}
					return acc;
				}, []);
			callback(result);
		});
	}
};



// fetch - функция которая делает запрос по url и возвращает promise(промиссы), которые нужно обработать
// обрабатывают с помощью then(), а ошибки с помощью catch()

