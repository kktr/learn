var Westeros;
(function (Westeros) {
    var Transportation;
    (function (Transportation) {
        class Fleet {
            setDestination(destination) {
                //przekazanie rozkazów kapitanom grupy statków, admirałom i każdemu, kto ich wymaga
            }
            resupply() {
            }
            attack(destination) {
                //zaatakowanie miasta
            }
        }
        Transportation.Fleet = Fleet;
        class Ship {
            TurnLeft() { }
            TurnRight() { }
            GoForward() { }
        }
        Transportation.Ship = Ship;
        class Admiral {
        }
        Transportation.Admiral = Admiral;
        class SupplyCoordinator {
        }
        Transportation.SupplyCoordinator = SupplyCoordinator;
    })(Transportation = Westeros.Transportation || (Westeros.Transportation = {}));
})(Westeros || (Westeros = {}));
