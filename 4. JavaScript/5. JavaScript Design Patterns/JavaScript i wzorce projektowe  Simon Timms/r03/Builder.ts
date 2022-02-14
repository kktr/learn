module Westeros
{
  export class Tournament{
    public events:Event[];
    public prizes:Prize[];
    public attendees: Attendee[]
    constructor(){

    }
  }

  export class TournamentBuilder
  {
    build(builder)
    {
      return builder.build();
    }
  }

  export class LannisterTournamentBuilder{
    public build(){

      var tournament = new Tournament();
      tournament.events.push(new Event("Kopie"));
      tournament.events.push(new Event("Potyczka"));

      tournament.attendees.push(new Attendee("Jamie"));

      tournament.prizes.push(new Prize("Złoto"));
      tournament.prizes.push(new Prize("Więcej złota"));

      return tournament;
    }
  }

  export class BaratheonTournamentBuilder{
    public build(){
      var tournament = new Tournament();
      tournament.events.push(new Event("Kopie"));
      tournament.events.push(new Event("Potyczka"));

      tournament.attendees.push(new Attendee("Stannis"));
      tournament.attendees.push(new Attendee("Robert"));

      return tournament;
    }
  }

  export class Event{
    constructor(public name: string){}
  }

  export class Prize{
    constructor(public name: string){}
  }

  export class Attendee{
    constructor(public name: string){}
  }
}
