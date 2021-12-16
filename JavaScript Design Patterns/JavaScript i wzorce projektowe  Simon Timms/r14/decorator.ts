function spy(target: any, key: string, descriptor?: any) {
  
  // zapisanie odwołania do oryginalnej metody
  // dzięki temu zachowywane są bieżące wartości w
  // deskryptorze i nie jest nadpisywane to, co
  // inny dekorator mógł wprowadzić w deskryptorze.
  if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
  }
  var originalMethod = descriptor.value; 

  //edytowanie parametru deskryptor/wartość
  descriptor.value =  function (...args: any[]) {
      var a = args.map(a => JSON.stringify(a)).join();
      // w tym miejscu nie jest używany originalMethod
      var result = originalMethod.apply(this, args);
      var r = JSON.stringify(result);
      console.log(`Wysłana wiadomość: ${a}`);
      return result;
  }

  // zwracanie zmodyfikowanego deskryptora zamiast nadpisywania
  // go przez zwrócenie nowego deskryptora
  return descriptor;
}

class CrowMessenger {
    constructor(){
        console.log("Zbudowano");
    }
    @spy
    public SendMessage(message: string) {
        console.log(`Wysyłana wiadomość: ${message}`);
    }
}
//new MethodDecoratorExample().method("Witaj");
var c = new CrowMessenger();
var r = c.SendMessage("Atak o świcie"); 
console.log(r);