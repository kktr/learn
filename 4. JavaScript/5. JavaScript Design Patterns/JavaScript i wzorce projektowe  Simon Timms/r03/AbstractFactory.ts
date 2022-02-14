module Westeros.Ruling
{
  export interface IKing
  {
    makeDecision();
    marry();
  }

  export interface IHandOfTheKing
  {
    makeDecision();
  }

  export interface IRulingFamilyAbstractFactory{
    getKing():IKing;
    getHandOfTheKing():IHandOfTheKing;
  }
}

module Westeros.Ruling.Lannister
{
  export class KingJoffery implements Westeros.Ruling.IKing{
    makeDecision(){
      console.log("Decyzja podjęta przez króla Joffery'a");
    }
    marry(){}
  }

  export class LordTywin implements Westeros.Ruling.IHandOfTheKing{
    makeDecision(){
      console.log("Decyzja podjęta przez lorda Tywina");
    }
  }

  export class LannisterFactory implements Westeros.Ruling.IRulingFamilyAbstractFactory{
    getKing():IKing{
      return new KingJoffery();
    }
    getHandOfTheKing():IHandOfTheKing{
      return new LordTywin();
    }
  }
}

module Westeros.Ruling.Targaryen
{
  export class KingAerys implements Westeros.Ruling.IKing{
    makeDecision(){
      console.log("Decyzja podjęta przez króla Aerysa");
    }
    marry(){}
  }

  export class LordConnington implements Westeros.Ruling.IHandOfTheKing{
    makeDecision(){
      console.log("Decyzja podjęta przez lorda Conningtona");
    }
  }

  export class TargaryenFactory implements Westeros.Ruling.IRulingFamilyAbstractFactory{
    getKing():IKing{
      return new KingAerys();
    }
    getHandOfTheKing():IHandOfTheKing{
      return new LordConnington();
    }
  }
}

module Westeros.Ruling{
  export class CourtSession{
    COMPLAINT_THRESHOLD = 10;
    constructor(public abstractFactory: IRulingFamilyAbstractFactory){}
    complaintPresented(complaint){
      if(complaint.severity < this.COMPLAINT_THRESHOLD){
        this.abstractFactory.getHandOfTheKing().makeDecision();
      }
      else
        this.abstractFactory.getKing().makeDecision();
    }
  }
}

var courtSession1 = new Westeros.Ruling.CourtSession(new Westeros.Ruling.Targaryen.TargaryenFactory());
courtSession1.complaintPresented({ severity: 8});
courtSession1.complaintPresented({ severity: 12});

var courtSession2 = new Westeros.Ruling.CourtSession(new Westeros.Ruling.Lannister.LannisterFactory());
courtSession2.complaintPresented({ severity: 8});
courtSession2.complaintPresented({ severity: 12});