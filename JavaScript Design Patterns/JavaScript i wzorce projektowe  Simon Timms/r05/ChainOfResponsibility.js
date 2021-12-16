var Westeros;
(function (Westeros) {
    var JudicialSystem;
    (function (JudicialSystem) {
        class Complaint {
            constructor() {
                this.ComplainingParty = "";
                this.ComplaintAbout = "";
                this.Complaint = "";
            }
        }
        JudicialSystem.Complaint = Complaint;
        class ClerkOfTheCourt {
            IsInterestedInComplaint(complaint) {
                //zdecydowanie, czy pojawiła się skarga, która może zostać rozwiązana przez urzędnika
                return false;
            }
            ListenToComplaint(complaint) {
                // wykonanie określonej operacji
                // przekazanie rozwiązania dotyczącego skargi
                return "";
            }
        }
        JudicialSystem.ClerkOfTheCourt = ClerkOfTheCourt;
        class King {
            IsInterestedInComplaint(complaint) {
                return true;
            }
            ListenToComplaint(complaint) {
                // wykonanie określonej operacji
                // przekazanie rozwiązania dotyczącego skargi
                return "";
            }
        }
        JudicialSystem.King = King;
        class ComplaintResolver {
            constructor() {
                this.complaintListeners = new Array();
                this.complaintListeners.push(new ClerkOfTheCourt());
                this.complaintListeners.push(new King());
            }
            ResolveComplaint(complaint) {
                for (var i = 0; i < this.complaintListeners.length; i++) {
                    if (this.complaintListeners[i].IsInterestedInComplaint(complaint)) {
                        return this.complaintListeners[i].ListenToComplaint(complaint);
                    }
                }
            }
        }
        JudicialSystem.ComplaintResolver = ComplaintResolver;
    })(JudicialSystem = Westeros.JudicialSystem || (Westeros.JudicialSystem = {}));
})(Westeros || (Westeros = {}));
