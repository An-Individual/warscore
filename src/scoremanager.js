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
        ScoreManager.data = DataManager.LoadData();
    }

    static SetRound(r) {
        if(r < 1 || r > 6) {
            return false;
        }

        ScoreManager.EnsureData();
        ScoreManager.data.currentRound = r;
        ScoreManager.NotifyListeners();
        return true;
    }

    static IncrementCP(value) {
        ScoreManager.EnsureCP();
        ScoreManager.data.cp += value;
        if(ScoreManager.LimitsExceeded()) {
            ScoreManager.data.cp -= value;
            return false;
        } else {
            ScoreManager.NotifyListeners();
            return true;
        }
    }

    static IncrementPrimary(value) {
        let round = ScoreManager.data?.currentRound ?? 1
        ScoreManager.EnsureRound(round);
        ScoreManager.data.rounds[round].primary += value;
        if(ScoreManager.LimitsExceeded()) {
            ScoreManager.data.rounds[round].primary -= value;
            return false;
        } else {
            ScoreManager.NotifyListeners();
            return true;
        }
    }

    static IncrementSecondary(value) {
        let round = ScoreManager.data?.currentRound ?? 1
        ScoreManager.EnsureRound(round);
        ScoreManager.data.rounds[round].secondary += value;
        if(ScoreManager.LimitsExceeded()) {
            ScoreManager.data.rounds[round].secondary -= value;
            return false;
        } else {
            ScoreManager.NotifyListeners();
            return true;
        }
    }

    static LimitsExceeded() {
        if(ScoreManager.data?.cp && ScoreManager.data.cp < 0) {
            return true;
        }

        if(!ScoreManager.data?.rounds) {
            return false;
        }

        let primaryTotal = 0;
        let secondaryTotal = 0;
        for(let round in ScoreManager.data.rounds) {
            if(ScoreManager.data.rounds[round].primary < 0) {
                return true;
            } else if (ScoreManager.data.rounds[round].primary > 15) {
                return true;
            } else if (ScoreManager.data.rounds[round].secondary < 0) {
                return true;
            } else if (ScoreManager.data.rounds[round].secondary > 15) {
                return true;
            }
            primaryTotal += ScoreManager.data.rounds[round].primary;
            secondaryTotal += ScoreManager.data.rounds[round].secondary;
            if(primaryTotal > 45 || secondaryTotal > 45) {
                return true;
            }
        }

        return false;
    }

    static EnsureData() {
        if(!ScoreManager.data) {
            ScoreManager.data = {};
        }
    }

    static EnsureRound(r) {
        ScoreManager.EnsureData();

        if(!ScoreManager.data.rounds) {
            ScoreManager.data.rounds = [];
        }

        if(!ScoreManager.data.rounds[r]) {
            ScoreManager.data.rounds[r] = {};
        }

        if(!ScoreManager.data.rounds[r].primary) {
            ScoreManager.data.rounds[r].primary = 0;
        }

        if(!ScoreManager.data.rounds[r].secondary) {
            ScoreManager.data.rounds[r].secondary = 0;
        }
    }

    static EnsureCP() {
        ScoreManager.EnsureData();

        if(!ScoreManager.data.cp) {
            ScoreManager.data.cp = 0;
        }
    }

    static AddListener(callback) {
        if(!ScoreManager.listeners) {
            ScoreManager.listeners = [];
        }
        ScoreManager.listeners.push(callback);
    }

    static ClearData() {
        ScoreManager.data = {}
        ScoreManager.NotifyListeners();
    }

    static NotifyListeners() {
        if(ScoreManager.listeners) {
            for(let idx in ScoreManager.listeners) {
                ScoreManager.listeners[idx](ScoreManager.data);
            }
        }
    }

    static ClearListeners() {
        ScoreManager.listeners = [];
    }
}