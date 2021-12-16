/*jshint esversion: 6*/
/* eslint-env es6 */

// Abstract factory

let KingJoffery = (function() {
  function KingJoffery() {}

  KingJoffery.prototype.makeDecision = function() {
    console.log('King Decision');
  };

  KingJoffery.prototype.marry = function() {};

  return KingJoffery;
})();

let LordTywin = (function() {
  function LordTywin() {}

  LordTywin.prototype.makeDecision = function() {
    console.log('HandOfTheKing decision');
  };

  return LordTywin;
})();

let LannisterFactory = (function() {
  function LannisterFactory() {}

  LannisterFactory.prototype.getKing = function() {
    return new KingJoffery();
  };

  LannisterFactory.prototype.getHandOfTheKing = function() {
    return new LordTywin();
  };

  return LannisterFactory;
})();

let TargaryenFactory = (function() {
  function TargaryenFactory() {}

  TargaryenFactory.prototype.getKing = function() {
    return new KingAerys();
  };

  TargaryenFactory.prototype.getHandOfTheKing = function() {
    return new LordConnington();
  };

  return TargaryenFactory;
})();

let CourtSession = (function() {
  function CourtSession(abstractFactory) {
    this.abstractFactory = abstractFactory;
    this.COMPLAINT_THRESHOLD = 10;
  }

  CourtSession.prototype.complaintPresented = function(complaint) {
    if (complaint.severity < this.COMPLAINT_THRESHOLD) {
      this.abstractFactory.getHandOfTheKing().makeDecision();
    } else this.abstractFactory.getKing().makeDecision();
  };
  return;
})();

let courtSession1 = new CourtSession(new TargaryenFactory());
courtSession1.complaintPresented({ severity: 8 });
courtSession1.complaintPresented({ severity: 12 });
let courtSession2 = new CourtSession(new LannisterFactory());

courtSession2.complaintPresented({ severity: 8 });
courtSession2.complaintPresented({ severity: 12 });
