var Westeros;
(function (Westeros) {
    var Tourism;
    (function (Tourism) {
        class HamiltonianTour {
            constructor(options) {
                this.options = options;
            }
            StartTour() {
                if (this.options.onTourStart && typeof (this.options.onTourStart) === "function")
                    this.options.onTourStart();
                this.VisitAttraction("Królewska Przystań");
                this.VisitAttraction("Winterfell");
                this.VisitAttraction("Góry Dorne");
                this.VisitAttraction("Orle Gniazdo");
                if (this.options.onTourCompletion && typeof (this.options.onTourCompletion) === "function")
                    this.options.onTourCompletion();
            }
            VisitAttraction(AttractionName) {
                if (this.options.onEntryToAttraction && typeof (this.options.onEntryToAttraction) === "function")
                    this.options.onEntryToAttraction(AttractionName);
                // zdefiniuj dowolne działania podejmowane w związku z atrakcją
                if (this.options.onExitFromAttraction && typeof (this.options.onExitFromAttraction) === "function")
                    this.options.onExitFromAttraction(AttractionName);
            }
        }
        Tourism.HamiltonianTour = HamiltonianTour;
        class HamiltonianTourOptions {
        }
        Tourism.HamiltonianTourOptions = HamiltonianTourOptions;
    })(Tourism = Westeros.Tourism || (Westeros.Tourism = {}));
})(Westeros || (Westeros = {}));
var options = new Westeros.Tourism.HamiltonianTourOptions();
options.onTourStart = function () { console.log("Uwielbiam podróżowanie!"); };
var tour = new Westeros.Tourism.HamiltonianTour(options);
tour.StartTour();
