/**
 * Recieves notifications from the Score Manager (connected during
 * initialization) and updates the UI to match the new score state.
 * This is the View part of our Model View Controller.
 */
export class Renderer {
    static selectClass = "round-selected";

    static Initialise() {
        this.roundSideElems = [];
        this.roundSideElems[1] = document.getElementById("button-select-round-one");
        this.roundSideElems[2] = document.getElementById("button-select-round-two");
        this.roundSideElems[3] = document.getElementById("button-select-round-three");
        this.roundSideElems[4] = document.getElementById("button-select-round-four");
        this.roundSideElems[5] = document.getElementById("button-select-round-five");
        this.roundSideElems[6] = document.getElementById("button-select-round-end");

        this.roundSummaryTitlesElems = [];
        this.roundSummaryTitlesElems[1] = document.getElementById("title-round-one");
        this.roundSummaryTitlesElems[2] = document.getElementById("title-round-two");
        this.roundSummaryTitlesElems[3] = document.getElementById("title-round-three");
        this.roundSummaryTitlesElems[4] = document.getElementById("title-round-four");
        this.roundSummaryTitlesElems[5] = document.getElementById("title-round-five");
        this.roundSummaryTitlesElems[6] = document.getElementById("title-round-end");

        this.roundSummaryScoresElems = [];
        this.roundSummaryScoresElems[1] = document.getElementById("score-round-one");
        this.roundSummaryScoresElems[2] = document.getElementById("score-round-two");
        this.roundSummaryScoresElems[3] = document.getElementById("score-round-three");
        this.roundSummaryScoresElems[4] = document.getElementById("score-round-four");
        this.roundSummaryScoresElems[5] = document.getElementById("score-round-five");
        this.roundSummaryScoresElems[6] = document.getElementById("score-round-end");

        this.scoreTotalPrimaryElem = document.getElementById("score-total-primary");
        this.scoreTotalPrimaryMaxElem = document.getElementById("score-total-primary-maximum");
        
        this.scoreTotalSecondaryElem = document.getElementById("score-total-secondary");
        this.scoreTotalSecondaryMaxElem = document.getElementById("score-total-secondary-maximum");

        this.scoreTotalElem = document.getElementById("score-total-value");
        this.scoreTotalMaxElem = document.getElementById("score-total-maximum");

        this.roundTitleElem = document.getElementById("round-title");
        this.currentPrimaryElem = document.getElementById("current-primary-value");
        this.currentPrimaryMaxElem = document.getElementById("round-score-maximum-primary");
        this.currentSecondaryElem = document.getElementById("current-secondary-value");
        this.currentSecondaryMaxElem = document.getElementById("round-score-maximum-secondary");

        this.cpValueElem = document.getElementById("cp-value");
    }

    static OnChange(data) {
        let dataToUpdate = {}
        if(data) {
            dataToUpdate = data;
        }

        this.UpdateRoundSidebar(data);
        this.UpdatePerRoundSummaries(data);
        this.UpdateTotals(data);
        this.UpdateCurrentValues(data);
        this.UpdateCPValue(data);
    }

    static UpdateRoundSidebar(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        for(let idx = 1; idx <= 6; idx++) {
            let elem = this.roundSideElems[idx];
            if(idx == selectedRound) {
                if(!elem.classList.contains(this.selectClass)) {
                    elem.classList.add(this.selectClass);
                }
            } else {
                if(elem.classList.contains(this.selectClass)) {
                    elem.classList.remove(this.selectClass);
                }
            }
        }
    }

    static UpdatePerRoundSummaries(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        for(let idx in this.roundSideElems) {
            let titleElem = this.roundSummaryTitlesElems[idx];
            if(idx == selectedRound) {
                if(!titleElem.classList.contains(this.selectClass)) {
                    titleElem.classList.add(this.selectClass);
                }
            } else {
                if(titleElem.classList.contains(this.selectClass)) {
                    titleElem.classList.remove(this.selectClass);
                }
            }

            let primary;
            let secondary;
            if(!data.rounds || !data.rounds[idx]) {
                primary = 0;
                secondary = 0;
            } else {
                primary = data.rounds[idx].primary;
                secondary = data.rounds[idx].secondary;
            }

            let scoreElem = this.roundSummaryScoresElems[idx];
            let primaryElem = scoreElem.getElementsByClassName("score-preround-primary")[0];
            let secondaryElem = scoreElem.getElementsByClassName("score-preround-secondary")[0];

            primaryElem.textContent = `+${primary}`;
            secondaryElem.textContent = `+${secondary}`;
        }
    }

    static UpdateTotals(data) {
        let totalPrimary = 0;
        let totalSecondary = 0;
        if(data.rounds) {
            for(let idx = 1; i <= 6; i++) {
                if(data.rounds[idx]) {
                    totalPrimary += data.rounds[idx].primary;
                    totalSecondary += data.rounds[idx].secondary;
                }
            }
        }

        this.scoreTotalPrimaryElem.textContent = totalPrimary;
        if(totalPrimary >= 45) {
            this.scoreTotalPrimaryMaxElem.style.opacity = 1;
        } else {
            this.scoreTotalPrimaryMaxElem.style.opacity = 0;
        }

        this.scoreTotalSecondaryElem.textContent = totalSecondary;
        if(totalSecondary >= 45) {
            this.scoreTotalSecondaryMaxElem.style.opacity = 1;
        } else {
            this.scoreTotalSecondaryMaxElem.style.opacity = 0;
        }

        this.scoreTotalElem.textContent = totalPrimary + totalSecondary;
        if(totalPrimary + totalSecondary >= 90) {
            this.scoreTotalMaxElem.style.opacity = 1;
        } else {
            this.scoreTotalMaxElem.style.opacity = 0;
        }
    }

    static UpdateCurrentValues(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        let primary = 0;
        let secondary = 0;
        if(data.rounds && data.rounds[selectedRound]) {
            primary = data.rounds[selectedRound].primary;
            secondary = data.rounds[selectedRound].secondary;
        }

        this.currentPrimaryElem.textContent = primary;
        if(primary >= 15) {
            this.currentPrimaryMaxElem.opacity = 1;
        } else {
            this.currentPrimaryMaxElem.opacity = 0;
        }

        this.currentSecondaryElem.textContent = secondary;
        if(secondary >= 15) {
            this.currentSecondaryMaxElem.opacity = 1;
        } else {
            this.currentSecondaryMaxElem.opacity = 0;
        }
    }

    static UpdateCPValue(data) {
        let cpValue = 0;
        if(data.cpValue) {
            cpValue = data.cp;
        }

        this.cpValueElem.textContent = cpValue;
    }
}