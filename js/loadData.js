
const iWant = ['idd66', 'idd36', 'idd76', 'idd96'];

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
		id: 'idd01',
		count: 5
	}
];

export const loadData = () => {

	if (location.search) {

		const search = decodeURI(location.search);
		console.log(search);
		const prop = search.split('=')[0].slice(1);
		console.log('prop: ', prop);
		const value = search.split('=');
		console.log('value: ', value[1]);

		if (prop === 's') {
			console.log(value);
		} else if (prop === 'iWant') {
			console.log(iWant);
		} else {
			console.log(prop, value);
		}
	}

	if (location.hash) {
		console.log(location.hash.slice(1));
	}

	if (location.pathname.includes('cart')) {
		console.log(cartlist);
	}

};