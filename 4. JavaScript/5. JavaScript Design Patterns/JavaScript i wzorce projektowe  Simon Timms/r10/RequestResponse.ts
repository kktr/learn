declare var process: any;

module Westeros.Communication{

  export class Message{
    __messageDate: Date;
    __from: string;
    __corrolationId: number;
    body: string;
  }

  export class CrowMailRequestor{
    public Request(){
      var message = { __messageDate : new Date(),
                      __from : "requestor",
                      __corrolationId : Math.random(),
                      body: "Witaj. Jaki jest pierwiastek kwadratowy z liczby 9?"};
      var bus = new CrowMailBus(this);
      bus.Send(message);
      console.log("Wysłano komunikat!");
    }

    public processMessage(message: Message){
      console.dir(message);
    }
  }

  export class CrowMailResponder{
    constructor(public bus: CrowMailBus){}
    processMessage(message:Message){
      var response = { __messageDate : new Date(),
                      __from : "responder",
                      __corrolationId : message.__corrolationId,
                      body: "Zgoda, dokonano inwazji."};
      this.bus.Send(response);
      console.log("Wysłano odpowiedź.");
    }
  }

  export class CrowMailBus{
    responder: CrowMailResponder;
    constructor(public requestor: CrowMailRequestor){
      this.responder = new CrowMailResponder(this);
    }

    public Send(message:Message){
      if(message.__from == "requestor")
      {
        process.nextTick(() => this.responder.processMessage(message));
      }
      else{
        process.nextTick(() => this.requestor.processMessage(message));
      }
    }
  }
}

var requestor = new Westeros.Communication.CrowMailRequestor();
requestor.Request();
