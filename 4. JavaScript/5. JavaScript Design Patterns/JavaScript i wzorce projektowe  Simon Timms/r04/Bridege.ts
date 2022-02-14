module Westeros.Religion
{
  export class OldGods{
      prayTo(sacrifice){
        console.log("My, pradawni bogowie, słyszymy Twoją modlitwę");
      }
  }

  export class DrownedGod{
    prayTo(humanSacrifice){
      console.log("*BULGOTANIE* GAWORZENIE");
    }
  }

 export class SevenGods{
    prayTo(prayerPurpose){
      console.log("Przykro nam, ale jest tu nas sporo. Wprowadza to zamieszanie. Czy modliłeś się o coś?");
    }
  }

  export interface God
  {
    prayTo():void;
  }

  export class OldGodsAdapter implements God{
    _oldGods:OldGods;
    constructor(){
      this._oldGods = new OldGods();
    }
    public prayTo(){
      let sacrifice= new Sacrifice();
      this._oldGods.prayTo(sacrifice);
    }
  }

  export class DrownedGodAdapter implements God{
    _drownedGod;
    constructor(){
      this._drownedGod = new DrownedGod();
    }
    public prayTo(){
      let sacrifice = new HumanSacrifice();
      this._drownedGod.prayTo(sacrifice);
    }
  }

  export class SevenGodsAdapter implements God{
    _sevenGods;
    public prayerPurposeProvider = new PrayerPurposeProvider();
    constructor(){
      this._sevenGods = new SevenGods();
    }
    public prayTo(){
      this._sevenGods.prayTo(this.prayerPurposeProvider.GetPurpose());
    }

  }

  export class PrayerPurposeProvider{
    GetPurpose(){}
    }
  export class Sacrifice{}
export class HumanSacrifice{}

}

let god1 = new Westeros.Religion.SevenGodsAdapter();
let god2 = new Westeros.Religion.DrownedGodAdapter();
let god3 = new Westeros.Religion.OldGodsAdapter();

let gods : Westeros.Religion.God[] = [god1, god2, god3];
for(let i =0; i<gods.length; i++){
  gods[i].prayTo();
}