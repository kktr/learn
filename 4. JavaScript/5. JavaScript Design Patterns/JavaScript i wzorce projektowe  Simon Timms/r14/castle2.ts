module Westros.Buildings{
  export class BaseStructure{
    constructor() {
        console.log("Zbudowano strukturę");
    }
}

  export class Castle extends BaseStructure{
   constructor(public name){
    super();
    }
   public Build(){
    console.log("Zbudowano zamek: " + this.name);
   }
  }
}