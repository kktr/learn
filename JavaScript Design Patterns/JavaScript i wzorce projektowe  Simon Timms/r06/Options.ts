module Westeros.Tourism {
    export class HamiltonianTour{
    	constructor(public options: HamiltonianTourOptions) {
        }
	    public StartTour(){
	    	if(this.options.onTourStart && typeof(this.options.onTourStart) === "function")
	    		this.options.onTourStart();
            this.VisitAttraction("Królewska Przystań");
            this.VisitAttraction("Winterfell");
            this.VisitAttraction("Góry Dorne");
            this.VisitAttraction("Orle Gniazdo");
            if(this.options.onTourCompletion && typeof(this.options.onTourCompletion) === "function")
                this.options.onTourCompletion();
	    }

	    VisitAttraction(AttractionName){
	    	if(this.options.onEntryToAttraction && typeof(this.options.onEntryToAttraction) === "function")
	    		this.options.onEntryToAttraction(AttractionName);
	    	// zdefiniuj dowolne działania podejmowane w związku z atrakcją
	    	if(this.options.onExitFromAttraction && typeof(this.options.onExitFromAttraction) === "function")
                this.options.onExitFromAttraction(AttractionName);
	    }
    }

    export class HamiltonianTourOptions{
    	onTourStart: Function;
    	onEntryToAttraction: Function;
    	onExitFromAttraction: Function;
    	onTourCompletion: Function;
    }
}

var options = new Westeros.Tourism.HamiltonianTourOptions();
options.onTourStart = function() { console.log("Uwielbiam podróżowanie!");};
var tour = new Westeros.Tourism.HamiltonianTour(options);
tour.StartTour();