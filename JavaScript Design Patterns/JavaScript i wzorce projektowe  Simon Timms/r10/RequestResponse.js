var Westeros;
(function (Westeros) {
    var Communication;
    (function (Communication) {
        class Message {
        }
        Communication.Message = Message;
        class CrowMailRequestor {
            Request() {
                var message = { __messageDate: new Date(),
                    __from: "requestor",
                    __corrolationId: Math.random(),
                    body: "Witaj. Jaki jest pierwiastek kwadratowy z liczby 9?" };
                var bus = new CrowMailBus(this);
                bus.Send(message);
                console.log("Wysłano komunikat!");
            }
            processMessage(message) {
                console.dir(message);
            }
        }
        Communication.CrowMailRequestor = CrowMailRequestor;
        class CrowMailResponder {
            constructor(bus) {
                this.bus = bus;
            }
            processMessage(message) {
                var response = { __messageDate: new Date(),
                    __from: "responder",
                    __corrolationId: message.__corrolationId,
                    body: "Zgoda, dokonano inwazji." };
                this.bus.Send(response);
                console.log("Wysłano odpowiedź.");
            }
        }
        Communication.CrowMailResponder = CrowMailResponder;
        class CrowMailBus {
            constructor(requestor) {
                this.requestor = requestor;
                this.responder = new CrowMailResponder(this);
            }
            Send(message) {
                if (message.__from == "requestor") {
                    process.nextTick(() => this.responder.processMessage(message));
                }
                else {
                    process.nextTick(() => this.requestor.processMessage(message));
                }
            }
        }
        Communication.CrowMailBus = CrowMailBus;
    })(Communication = Westeros.Communication || (Westeros.Communication = {}));
})(Westeros || (Westeros = {}));
var requestor = new Westeros.Communication.CrowMailRequestor();
requestor.Request();
