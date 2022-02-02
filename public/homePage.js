"use strict"

const exitButton= new LogoutButton();
exitButton.action = function() {
	let callback = (response) => {
		if (response.success) {
			location.reload();
		}
	}
	ApiConnector.logout(callback);
}

let callback = (response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
}
ApiConnector.current(callback);
	
let getCourse = () => {
	let callback = (response) => {
		if (response.success) {
			const getRate = new RatesBoard();
			getRate.clearTable();
			getRate.fillTable(response.data);
		}
	}
	ApiConnector.getStocks(callback);
}
getCourse();
setInterval(getCourse, 60000)

const uploadMoney = new MoneyManager();
let topUp = (data) => {
	let callback = (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			uploadMoney.setMessage(response.success, 'Готово');
		} else {
			uploadMoney.setMessage(response.success, 'Не вышло');
		}
	}
	ApiConnector.addMoney(data, callback);
}
uploadMoney.addMoneyCallback = topUp;

let conversion = (data) => {
	let callback = (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			uploadMoney.setMessage(response.success, 'Готово');
		} else {
			uploadMoney.setMessage(response.success, 'Не вышло');
		}
	}
	ApiConnector.convertMoney(data, callback);
}
uploadMoney.conversionMoneyCallback = conversion;


let transfer = (data) => {
	let callback = (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			uploadMoney.setMessage(response.success, 'Готово');
		} else {
			uploadMoney.setMessage(response.success, 'Не вышло');
		}
	}
	ApiConnector.transferMoney(data, callback);
}
uploadMoney.sendMoneyCallback = transfer;

const favorite = new FavoritesWidget();

let favoriteCallback = (response) => {
		favorite.clearTable();
		favorite.fillTable(response.data);
		uploadMoney.updateUsersList(response.data);
	}
ApiConnector.getFavorites(favoriteCallback);

let addUser = (data) => {
	let callback = (response) => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			uploadMoney.updateUsersList(response.data);
		} else {
			favorite.setMessage(response.success, 'Не вышло');
		}
	}
	ApiConnector.addUserToFavorites(data, callback);
}
favorite.addUserCallback = addUser;


let removeUser = (data) => {
	let callback = (response) => {
		if (response.success) {
			favorite.clearTable();
			favorite.fillTable(response.data);
			uploadMoney.updateUsersList(response.data);
		} else {
			favorite.setMessage(response.success, 'Не вышло');
		}
	}
	ApiConnector.removeUserFromFavorites(data, callback);
}
favorite.removeUserCallback = removeUser;
