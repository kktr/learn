class Knight{
  credentialFactory;
  constructor(credentialFactory){this.credentialFactory = credentialFactory;}

  public presentCredentials(toRoyalty){
    console.log("Prezentowanie referencji: " + toRoyalty);
    this.credentialFactory.Create();
    return true;
  }
}

class MockCredentialFactory{
  timesCalled = 0;
  Create(){
    this.timesCalled++;
  }

  Verify(){
    assert(this.timesCalled == 3);
  }
}

function assert(value){
  if(!value)
    throw "Niepowodzenie asercji";
}

var credentialFactory = new MockCredentialFactory();
var knight = new Knight(credentialFactory);

var credentials = knight.presentCredentials("Lord Snow");
credentials = knight.presentCredentials("Królowa Cersei");
credentials = knight.presentCredentials("Lord Stark");

credentialFactory.Verify();
