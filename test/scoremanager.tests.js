import { ScoreManager } from "../src/scoremanager.js"
import assert from "node:assert";

describe("ScoreManager", function(){
    describe("#ClearData()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Data Cleared with Listener - Listener Notified", function() {
            let listenerCalled = false;
            ScoreManager.AddListener(() => {
                listenerCalled = true;
            });

            ScoreManager.ClearData();
            assert.equal(listenerCalled, true);
        });
    });

    describe("#ClearListeners()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Clear called with listener - Listener removed", function() {
            let listenerCalled = false;
            ScoreManager.AddListener(() => {
                listenerCalled = true;
            });

            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
            assert.equal(listenerCalled, false);
        });
    });

    describe("#SetRound()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Set round to zero - No Action", function() {
            let roundValue = -1;
            ScoreManager.AddListener((data) => {
                roundValue = data.currentRound;
            });

            assert.equal(ScoreManager.SetRound(0), false);
            assert.equal(roundValue, -1);
        });

        it("Set round to seven - No Action", function() {
            let roundValue = -1;
            ScoreManager.AddListener((data) => {
                roundValue = data.currentRound;
            });

            assert.equal(ScoreManager.SetRound(7), false);
            assert.equal(roundValue, -1);
        });

        it("Set round to one - Round Set", function() {
            let roundValue = -1;
            ScoreManager.AddListener((data) => {
                roundValue = data.currentRound;
            });

            assert.equal(ScoreManager.SetRound(1), true);
            assert.equal(roundValue, 1);
            assert.equal(ScoreManager.data.currentRound, 1);
        });

        it("Set round to six - Round Set", function() {
            let roundValue = -1;
            ScoreManager.AddListener((data) => {
                roundValue = data.currentRound;
            });

            assert.equal(ScoreManager.SetRound(6), true);
            assert.equal(roundValue, 6);
            assert.equal(ScoreManager.data.currentRound, 6);
        });
    });

    describe("#IncrementCP()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Increase from unset - Set to 1", function() {
            let cpValue = -1;
            ScoreManager.AddListener((data) => {
                cpValue = data.cp;
            });

            assert.equal(ScoreManager.IncrementCP(1), true);
            assert.equal(cpValue, 1);
            assert.equal(ScoreManager.data.cp, 1);
        });

        it("Increase from one - Set to 2", function() {
            ScoreManager.data.cp = 1;
            let cpValue = -1;
            ScoreManager.AddListener((data) => {
                cpValue = data.cp;
            });

            assert.equal(ScoreManager.IncrementCP(1), true);
            assert.equal(cpValue, 2);
            assert.equal(ScoreManager.data.cp, 2);
        });

        it("Decrease from one - Set to 0", function() {
            ScoreManager.data.cp = 1;
            let cpValue = -1;
            ScoreManager.AddListener((data) => {
                cpValue = data.cp;
            });

            assert.equal(ScoreManager.IncrementCP(-1), true);
            assert.equal(cpValue, 0);
            assert.equal(ScoreManager.data.cp, 0);
        });

        it("Decrease from zero - Returns False Not Changed", function() {
            ScoreManager.data.cp = 0;
            let cpValue = -1;
            ScoreManager.AddListener((data) => {
                cpValue = data.cp;
            });

            assert.equal(ScoreManager.IncrementCP(-1), false);
            assert.equal(cpValue, -1);
            assert.equal(ScoreManager.data.cp, 0);
        });
    });

    describe("#IncrementPrimary()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Increase from unset round or value - Round 1 Set to 1", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(1), true);
            assert.equal(setValue, 1);
            assert.equal(ScoreManager.data.rounds[1].primary, 1);
        });

        it("Increase round 2 from unset - Round 2 Set to 1", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                if(data.rounds) {
                    setValue = data.rounds[2].primary;
                }
            });

            assert.equal(ScoreManager.SetRound(2), true);
            assert.equal(ScoreManager.IncrementPrimary(1), true);
            assert.equal(setValue, 1);
            assert.equal(ScoreManager.data.rounds[2].primary, 1);
        });

        it("Decrease from unset round or value - No Action", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(-1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[1].primary, 0);
        });

        it("Decrease round 2 from unset - No Action", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                if(data.rounds) {
                    setValue = data.rounds[2].primary;
                }
            });

            assert.equal(ScoreManager.SetRound(2), true);
            assert.equal(ScoreManager.IncrementPrimary(-1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[2].primary, 0);
        });

        it("Increase To 15 - Value Increased", function() {
            ScoreManager.IncrementPrimary(14);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(1), true);
            assert.equal(setValue, 15);
            assert.equal(ScoreManager.data.rounds[1].primary, 15);
        });

        it("Increase Past 15 - No Action", function() {
            ScoreManager.IncrementPrimary(15);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[1].primary, 15);
        });

        it("Increase total to 45 - Value Set", function() {
            ScoreManager.IncrementPrimary(15);
            ScoreManager.SetRound(2);
            ScoreManager.IncrementPrimary(15);
            ScoreManager.SetRound(3);
            ScoreManager.IncrementPrimary(14);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[3].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(1), true);
            assert.equal(setValue, 15);
            assert.equal(ScoreManager.data.rounds[3].primary, 15);

            let total = 0;
            for(let round in ScoreManager.data.rounds) {
                total += ScoreManager.data.rounds[round].primary;
            }
            assert.equal(total, 45);
        });

        it("Increase total past 45 - No Action", function() {
            ScoreManager.IncrementPrimary(15);
            ScoreManager.SetRound(2);
            ScoreManager.IncrementPrimary(15);
            ScoreManager.SetRound(3);
            ScoreManager.IncrementPrimary(15);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[3].primary;
            });

            assert.equal(ScoreManager.IncrementPrimary(1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[3].primary, 15);

            let total = 0;
            for(let round in ScoreManager.data.rounds) {
                total += ScoreManager.data.rounds[round].primary;
            }
            assert.equal(total, 45);
        });
    });

    describe("#IncrementSecondary()", function(){
        this.beforeEach(function(){
            ScoreManager.ClearListeners();
            ScoreManager.ClearData();
        });

        it("Increase from unset round or value - Round 1 Set to 1", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(1), true);
            assert.equal(setValue, 1);
            assert.equal(ScoreManager.data.rounds[1].secondary, 1);
        });

        it("Increase round 2 from unset - Round 2 Set to 1", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                if(data.rounds) {
                    setValue = data.rounds[2].secondary;
                }
            });

            assert.equal(ScoreManager.SetRound(2), true);
            assert.equal(ScoreManager.IncrementSecondary(1), true);
            assert.equal(setValue, 1);
            assert.equal(ScoreManager.data.rounds[2].secondary, 1);
        });

        it("Decrease from unset round or value - No Action", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(-1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[1].secondary, 0);
        });

        it("Decrease round 2 from unset - No Action", function() {
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                if(data.rounds) {
                    setValue = data.rounds[2].secondary;
                }
            });

            assert.equal(ScoreManager.SetRound(2), true);
            assert.equal(ScoreManager.IncrementSecondary(-1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[2].secondary, 0);
        });

        it("Increase To 15 - Value Increased", function() {
            ScoreManager.IncrementSecondary(14);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(1), true);
            assert.equal(setValue, 15);
            assert.equal(ScoreManager.data.rounds[1].secondary, 15);
        });

        it("Increase Past 15 - No Action", function() {
            ScoreManager.IncrementSecondary(15);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[1].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[1].secondary, 15);
        });

        it("Increase total to 45 - Value Set", function() {
            ScoreManager.IncrementSecondary(15);
            ScoreManager.SetRound(2);
            ScoreManager.IncrementSecondary(15);
            ScoreManager.SetRound(3);
            ScoreManager.IncrementSecondary(14);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[3].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(1), true);
            assert.equal(setValue, 15);
            assert.equal(ScoreManager.data.rounds[3].secondary, 15);

            let total = 0;
            for(let round in ScoreManager.data.rounds) {
                total += ScoreManager.data.rounds[round].secondary;
            }
            assert.equal(total, 45);
        });

        it("Increase total past 45 - No Action", function() {
            ScoreManager.IncrementSecondary(15);
            ScoreManager.SetRound(2);
            ScoreManager.IncrementSecondary(15);
            ScoreManager.SetRound(3);
            ScoreManager.IncrementSecondary(15);
            let setValue = -1;
            ScoreManager.AddListener((data) => {
                setValue = data.rounds[3].secondary;
            });

            assert.equal(ScoreManager.IncrementSecondary(1), false);
            assert.equal(setValue, -1);
            assert.equal(ScoreManager.data.rounds[3].secondary, 15);

            let total = 0;
            for(let round in ScoreManager.data.rounds) {
                total += ScoreManager.data.rounds[round].secondary;
            }
            assert.equal(total, 45);
        });
    });
});