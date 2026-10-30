import { DataManager } from "./datamanager.js"

/**
 * Tracks the score state of a game, enforces
 * per round and per game scoring limits,
 * and notifies listeners of changes to the
 * score state. This is the Model in our
 * Model View Controller.
 */
export class ScoreManager {
    static data = {};

    static Initialize() {
        this.data = DataManager.LoadData();
    }

    static SetRound(r) {
        if(r < 1 || r > 6) {
            return false;
        }

        this.EnsureData();
        this.data.currentRound = r;
        this.NotifyListeners();
        return true;
    }

    static IncrementCP(value) {
        this.EnsureCP();
        this.data.cp += value;
        if(this.LimitsExceeded()) {
            this.data.cp -= value;
            return false;
        } else {
            this.NotifyListeners();
            return true;
        }
    }

    static IncrementPrimary(value) {
        let round = this.data?.currentRound ?? 1
        this.EnsureRound(round);
        this.data.rounds[round].primary += value;
        if(this.LimitsExceeded()) {
            this.data.rounds[round].primary -= value;
            return false;
        } else {
            this.NotifyListeners();
            return true;
        }
    }

    static IncrementSecondary(value) {
        let round = this.data?.currentRound ?? 1
        this.EnsureRound(round);
        this.data.rounds[round].secondary += value;
        if(this.LimitsExceeded()) {
            this.data.rounds[round].secondary -= value;
            return false;
        } else {
            this.NotifyListeners();
            return true;
        }
    }

    static LimitsExceeded() {
        if(this.data?.cp && this.data.cp < 0) {
            return true;
        }

        if(!this.data?.rounds) {
            return false;
        }

        let primaryTotal = 0;
        let secondaryTotal = 0;
        for(let round in this.data.rounds) {
            if(this.data.rounds[round].primary < 0) {
                return true;
            } else if (this.data.rounds[round].primary > 15) {
                return true;
            } else if (this.data.rounds[round].secondary < 0) {
                return true;
            } else if (this.data.rounds[round].secondary > 15) {
                return true;
            }
            primaryTotal += this.data.rounds[round].primary;
            secondaryTotal += this.data.rounds[round].secondary;
            if(primaryTotal > 45 || secondaryTotal > 45) {
                return true;
            }
        }

        return false;
    }

    static EnsureData() {
        if(!this.data) {
            this.data = {};
        }
    }

    static EnsureRound(r) {
        this.EnsureData();

        if(!this.data.rounds) {
            this.data.rounds = [];
        }

        if(!this.data.rounds[r]) {
            this.data.rounds[r] = {};
        }

        if(!this.data.rounds[r].primary) {
            this.data.rounds[r].primary = 0;
        }

        if(!this.data.rounds[r].secondary) {
            this.data.rounds[r].secondary = 0;
        }
    }

    static EnsureCP() {
        this.EnsureData();

        if(!this.data.cp) {
            this.data.cp = 0;
        }
    }

    static AddListener(callback) {
        if(!this.listeners) {
            this.listeners = [];
        }
        this.listeners.push(callback);
    }

    static ClearData() {
        this.data = {}
        this.NotifyListeners();
    }

    static NotifyListeners() {
        if(this.listeners) {
            for(let idx in this.listeners) {
                this.listeners[idx](this.data);
            }
        }
    }

    static ClearListeners() {
        this.listeners = [];
    }
}