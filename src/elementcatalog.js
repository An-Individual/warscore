export class ElementCatalog {

    static initialised = false;

    static Initialise() {
        if(ElementCatalog.initialised) {
            return;
        }

        ElementCatalog.roundSideElems = [];
        ElementCatalog.roundSideElems[1] = document.getElementById("button-select-round-one");
        ElementCatalog.roundSideElems[2] = document.getElementById("button-select-round-two");
        ElementCatalog.roundSideElems[3] = document.getElementById("button-select-round-three");
        ElementCatalog.roundSideElems[4] = document.getElementById("button-select-round-four");
        ElementCatalog.roundSideElems[5] = document.getElementById("button-select-round-five");
        ElementCatalog.roundSideElems[6] = document.getElementById("button-select-round-end");

        ElementCatalog.roundSummaryElems = [];
        ElementCatalog.roundSummaryElems[1] = document.getElementById("score-box-one");
        ElementCatalog.roundSummaryElems[2] = document.getElementById("score-box-two");
        ElementCatalog.roundSummaryElems[3] = document.getElementById("score-box-three");
        ElementCatalog.roundSummaryElems[4] = document.getElementById("score-box-four");
        ElementCatalog.roundSummaryElems[5] = document.getElementById("score-box-five");
        ElementCatalog.roundSummaryElems[6] = document.getElementById("score-box-end");

        ElementCatalog.roundSummaryTitlesElems = [];
        ElementCatalog.roundSummaryTitlesElems[1] = document.getElementById("title-round-one");
        ElementCatalog.roundSummaryTitlesElems[2] = document.getElementById("title-round-two");
        ElementCatalog.roundSummaryTitlesElems[3] = document.getElementById("title-round-three");
        ElementCatalog.roundSummaryTitlesElems[4] = document.getElementById("title-round-four");
        ElementCatalog.roundSummaryTitlesElems[5] = document.getElementById("title-round-five");
        ElementCatalog.roundSummaryTitlesElems[6] = document.getElementById("title-round-end");

        ElementCatalog.roundSummaryScoresElems = [];
        ElementCatalog.roundSummaryScoresElems[1] = document.getElementById("score-round-one");
        ElementCatalog.roundSummaryScoresElems[2] = document.getElementById("score-round-two");
        ElementCatalog.roundSummaryScoresElems[3] = document.getElementById("score-round-three");
        ElementCatalog.roundSummaryScoresElems[4] = document.getElementById("score-round-four");
        ElementCatalog.roundSummaryScoresElems[5] = document.getElementById("score-round-five");
        ElementCatalog.roundSummaryScoresElems[6] = document.getElementById("score-round-end");

        ElementCatalog.scoreTotalPrimaryElem = document.getElementById("score-total-primary");
        ElementCatalog.scoreTotalPrimaryMaxElem = document.getElementById("score-total-primary-maximum");
        
        ElementCatalog.scoreTotalSecondaryElem = document.getElementById("score-total-secondary");
        ElementCatalog.scoreTotalSecondaryMaxElem = document.getElementById("score-total-secondary-maximum");

        ElementCatalog.scoreTotalElem = document.getElementById("score-total-value");
        ElementCatalog.scoreTotalMaxElem = document.getElementById("score-total-maximum");

        ElementCatalog.roundTitleElem = document.getElementById("round-title");
        ElementCatalog.currentPrimaryElem = document.getElementById("current-primary-value");
        ElementCatalog.currentPrimaryMaxElem = document.getElementById("round-score-maximum-primary");
        ElementCatalog.currentSecondaryElem = document.getElementById("current-secondary-value");
        ElementCatalog.currentSecondaryMaxElem = document.getElementById("round-score-maximum-secondary");

        ElementCatalog.cpValueElem = document.getElementById("cp-value");

        ElementCatalog.initialised = true;
    }
}