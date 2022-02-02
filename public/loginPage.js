"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => {
	let loginCallback = (loginResponse) => {
			if (!loginResponse.success) {
				userForm.setLoginErrorMessage('Неверный логин/пароль или пользователь не зарегистрирован!');
			} else location.reload();
	};
	ApiConnector.login(data, loginCallback);
}

userForm.registerFormCallback = data => {
	let registerCallback = (registerResponse) => {
			if (!registerResponse.success) {
				userForm.setRegisterErrorMessage('Неверный логин/пароль');
			} else location.reload();
			};
	ApiConnector.register(data, registerCallback);
}