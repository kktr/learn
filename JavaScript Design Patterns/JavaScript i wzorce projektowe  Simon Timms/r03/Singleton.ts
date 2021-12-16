module Westeros
{
  export class Wall{

    private static _instance:Wall = null;
    private height:number = 0;
    constructor(){
       if(Wall._instance)
        return Wall._instance;
      Wall._instance = this;
    }
    public setHeight(height:number){
      this.height=height;
    }

    public getStatus(){
      console.log("Wysokość muru wynosi: " + this.height + ".");
    }
    public static getInstance():Wall{
      if(!Wall._instance)
      {
        Wall._instance = new Wall();
      }

      return Wall._instance;

    }
  }
}

var wall = Westeros.Wall.getInstance();
wall.setHeight(10);
var wall2 = Westeros.Wall.getInstance();
wall2.getStatus();
var wall3 = new Westeros.Wall();
wall3.getStatus();
wall3.setHeight(20);
var wall4 = new Westeros.Wall();
wall4.getStatus();
