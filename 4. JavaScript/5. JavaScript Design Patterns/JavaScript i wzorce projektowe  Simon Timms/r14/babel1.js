export class BaseStructure {
    constructor() {
        console.log("Zbudowano strukturę");
    }
}


export class Castle extends BaseStructure {
   constructor(name){
    super();
    this.name = name;
    
    }
   Build(){
    console.log("Zbudowano zamek: " + this.name);
   }
  }