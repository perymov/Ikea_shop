import { getLocalStorage, setLocalStorage } from './storage.js';

const userData = {
	wishListData: getLocalStorage('wishlist'),
	get wishList() {
		return this.wishListData;
	},
	set wishList(id) {
		if (this.wishListData.includes(id)) {
			const index = this.wishListData.indexOf(id);
			this.wishListData.splice(index, 1);
		} else {
			this.wishListData.push(id);
		}
		setLocalStorage('wishlist', this.wishList);
	},

	cartlistData: getLocalStorage('cartlist'),
	get cartList() {
		return this.cartlistData;
	},
	set cartList(id) {
		let obj = this.cartlistData.find(item => item.id === id);
		if (obj) {
			obj.count++;
		} else {
			obj = {
				id,
				count: 1
			};
			this.cartlistData.push(obj);
		}
		setLocalStorage('cartlist', this.cartList);
	}

};

export default userData;