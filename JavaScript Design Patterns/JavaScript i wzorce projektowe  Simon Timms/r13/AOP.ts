class GoldTransfer{
  SendPaymentOfGold(amountOfGold, destination){
    var user = Security.GetCurrentUser();
    if(Security.IsAuthorized(user, "SendPaymentOfGold")){
      //send actual payment
    }
    else{
      return { success: 0, message:"Brak autoryzacji"};
    }
  }
}

class Security{
  static IsAuthorized(user, functionPoint){}
  static GetCurrentUser(){}
}
