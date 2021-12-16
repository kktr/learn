module Westeros.Transportation{

  export class Fleet {
    public ship: Ship[];
    public admiral: Admiral;
    public supplyCoordinator: SupplyCoordinator;

    public setDestination( destination: string){
      //przekazanie rozkazów kapitanom grupy statków, admirałom i każdemu, kto ich wymaga
    }

    public resupply(){

    }

    public attack(destination: string){
      //zaatakowanie miasta
    }

    //zezwolenie na inne działania...
  }

  export class Ship{
    TurnLeft(){}
    TurnRight(){}
    GoForward(){}

  }

  export class Admiral{

  }

  export class SupplyCoordinator{

  }
}
