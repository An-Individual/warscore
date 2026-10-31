import { ElementCatalog } from "./elementcatalog";

/**
 * Recieves notifications from the Score Manager (connected during
 * initialization) and updates the UI to match the new score state.
 * This is the View part of our Model View Controller.
 */
export class Renderer {
    static selectClass = "round-selected";

    static Initialise() {
        ElementCatalog.Initialise();
    }

    static OnChange(data) {
        let dataToUpdate = {}
        if(data) {
            dataToUpdate = data;
        }

        Renderer.UpdateRoundSidebar(data);
        Renderer.UpdatePerRoundSummaries(data);
        Renderer.UpdateTotals(data);
        Renderer.UpdateCurrentValues(data);
        Renderer.UpdateCPValue(data);
    }

    static UpdateRoundSidebar(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        for(let idx = 1; idx <= 6; idx++) {
            let elem = ElementCatalog.roundSideElems[idx];
            if(idx == selectedRound) {
                if(!elem.classList.contains(Renderer.selectClass)) {
                    elem.classList.add(Renderer.selectClass);
                }
            } else {
                if(elem.classList.contains(Renderer.selectClass)) {
                    elem.classList.remove(Renderer.selectClass);
                }
            }
        }
    }

    static UpdatePerRoundSummaries(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        for(let idx in ElementCatalog.roundSideElems) {
            let titleElem = ElementCatalog.roundSummaryTitlesElems[idx];
            if(idx == selectedRound) {
                if(!titleElem.classList.contains(Renderer.selectClass)) {
                    titleElem.classList.add(Renderer.selectClass);
                }
            } else {
                if(titleElem.classList.contains(Renderer.selectClass)) {
                    titleElem.classList.remove(Renderer.selectClass);
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

            let scoreElem = ElementCatalog.roundSummaryScoresElems[idx];
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

        ElementCatalog.scoreTotalPrimaryElem.textContent = totalPrimary;
        if(totalPrimary >= 45) {
            ElementCatalog.scoreTotalPrimaryMaxElem.style.opacity = 1;
        } else {
            ElementCatalog.scoreTotalPrimaryMaxElem.style.opacity = 0;
        }

        ElementCatalog.scoreTotalSecondaryElem.textContent = totalSecondary;
        if(totalSecondary >= 45) {
            ElementCatalog.scoreTotalSecondaryMaxElem.style.opacity = 1;
        } else {
            ElementCatalog.scoreTotalSecondaryMaxElem.style.opacity = 0;
        }

        ElementCatalog.scoreTotalElem.textContent = totalPrimary + totalSecondary;
        if(totalPrimary + totalSecondary >= 90) {
            ElementCatalog.scoreTotalMaxElem.style.opacity = 1;
        } else {
            ElementCatalog.scoreTotalMaxElem.style.opacity = 0;
        }
    }

    static UpdateCurrentValues(data) {
        let selectedRound = 1;
        if(data.currentRound) {
            selectedRound = data.currentRound;
        }

        if(selectedRound < 6) {
            ElementCatalog.roundTitleElem.textContent = `Round ${selectedRound}`;
        } else {
            ElementCatalog.roundTitleElem.textContent = `End Game`;
        }

        let primary = 0;
        let secondary = 0;
        if(data.rounds && data.rounds[selectedRound]) {
            primary = data.rounds[selectedRound].primary;
            secondary = data.rounds[selectedRound].secondary;
        }

        ElementCatalog.currentPrimaryElem.textContent = primary;
        if(primary >= 15) {
            ElementCatalog.currentPrimaryMaxElem.opacity = 1;
        } else {
            ElementCatalog.currentPrimaryMaxElem.opacity = 0;
        }

        ElementCatalog.currentSecondaryElem.textContent = secondary;
        if(secondary >= 15) {
            ElementCatalog.currentSecondaryMaxElem.opacity = 1;
        } else {
            ElementCatalog.currentSecondaryMaxElem.opacity = 0;
        }
    }

    static UpdateCPValue(data) {
        let cpValue = 0;
        if(data.cpValue) {
            cpValue = data.cp;
        }

        ElementCatalog.cpValueElem.textContent = cpValue;
    }
}