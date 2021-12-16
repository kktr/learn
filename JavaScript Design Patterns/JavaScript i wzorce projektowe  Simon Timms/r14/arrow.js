var Pages;
(function (Pages) {
    class LoginPage {
        constructor(container) {
            container.on("click", ".login-link", (item) => {
                this.login();
            });
            container.on("click", ".login-link", function (item) {
                this.login();
            });
        }
        login() {
            console.log("Zalogowano");
        }
    }
    Pages.LoginPage = LoginPage;
})(Pages || (Pages = {}));
