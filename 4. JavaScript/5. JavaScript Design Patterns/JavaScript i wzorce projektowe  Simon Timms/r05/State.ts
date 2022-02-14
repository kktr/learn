module Westeros.Banking{
	class NaiveBanking{
		state = "";
		balance = 0;
		public NextState(action: string, amount: number)
		{
			if(this.state == "przekroczone" && action == "wypłata")
			{
				this.state = "wstrzymane";
			}
			if(this.state == "wstrzymane" && action != "depozyt")
			{
				this.state = "wstrzymane";
			}
			if(this.state == "dobra sytuacja" && action == "wypłata" && amount <= this.balance)
			{
				this.balance -= amount; 
			}
			if(this.state == "dobra sytuacja" && action == "wypłata" && amount > this.balance)
			{
				this.balance -= amount; 
				this.state = "przekroczone";
			}
		}
	}

	export interface IState{
		Deposit(amount: number);
		Withdraw(amount: number);
	}

	export class BankAccountManager{
		private balance: number;
		private currentState: IState;
		constructor() {
		    this.currentState = new GoodStandingState(this);
		}

		public Deposit(amount: number)
		{
			this.currentState.Deposit(amount);
		}

		public Withdraw(amount: number)
		{
			this.currentState.Withdraw(amount);
		}
		public addToBalance(amount: number)
		{
			this.balance += amount;
		}
		public getBalance():number{
			return this.balance;
		}
		public moveToState(newState: IState)
		{
			this.currentState = newState;
		}
	}

	export class GoodStandingState implements IState{
		manager: BankAccountManager;
		constructor(manager: BankAccountManager) {
		    this.manager = manager;
		}
		public Deposit(amount: number){
			this.manager.addToBalance(amount);
		}
		public Withdraw(amount: number){
			if(this.manager.getBalance() < amount)
			{
				this.manager.moveToState(new OverdrawnState(this.manager));
			}

			this.manager.addToBalance(-1 * amount) 
		}
	}

	export class OverdrawnState implements IState{
		manager: BankAccountManager;
		constructor(manager: BankAccountManager) {
		    this.manager = manager;
		}
		public Deposit(amount: number){
			this.manager.addToBalance(amount);
			if(this.manager.getBalance() > 0)
			{
				this.manager.moveToState(new GoodStandingState(this.manager));
			}
		}
		public Withdraw(amount: number){
			this.manager.moveToState(new OnHold(this.manager));
			throw "Nie można wypłacić pieniędzy z konta bankowego z już przekroczonym saldem.";
		}
	}

	export class OnHold implements IState{
		manager: BankAccountManager;
		constructor(manager: BankAccountManager) {
		    this.manager = manager;
		}
		public Deposit(amount: number){
			this.manager.addToBalance(amount);
			throw "Używane konto zostało zablokowane i konieczna jest wizyta w banku w celu wyjaśnienia tej kwestii.";
		}
		public Withdraw(amount: number){
			throw "Używane konto zostało zablokowane i konieczna jest wizyta w banku w celu wyjaśnienia tej kwestii.";
		}
	}
	
}