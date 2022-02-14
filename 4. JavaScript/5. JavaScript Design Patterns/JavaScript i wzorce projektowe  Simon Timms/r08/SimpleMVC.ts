module SimpleMVC{
	class LoginModel{
		UserName: string;
		Password: string;
		RememberMe: boolean;
		LoginSuccessful: boolean;
		LoginErrorMessage: string;
	}

	class LoginController{
		
		constructor(public model: LoginModel){}
		public Login(userName: string, password: string, rememberMe: boolean)
		{
			this.model.UserName = userName;
			this.model.Password = password;
			this.model.RememberMe = rememberMe;
			if(this.checkPassword(userName, password))
				this.model.LoginSuccessful;
			else
			{
				this.model.LoginSuccessful = false;
				this.model.LoginErrorMessage = "Niepoprawna nazwa użytkownika lub hasło";
			}
		}
		checkPassword(UserName: string, Password: string):boolean{return true;}
	}
}