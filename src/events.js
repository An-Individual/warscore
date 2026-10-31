import { ElementCatalog } from "./elementcatalog.js";
import { ScoreManager } from "./scoremanager.js";

/**
 * Hooks up the UI events that call the Score Manager,
 * which will notify the Renderer to update the UI
 * if changes are made. This is the Controller part
 * of our Model View Controller.
 */
export class Events {
    static Initialise() {
        ElementCatalog.Initialise();

        Events.AttachSideRoundSelectorEvents();
        Events.AttachScoreSummaryEvents();
    }

    static AttachSideRoundSelectorEvents() {
        ElementCatalog.roundSideElems[1].onclick = function() {
            ScoreManager.SetRound(1);
        }

        ElementCatalog.roundSideElems[2].onclick = function() {
            ScoreManager.SetRound(2);
        }

        ElementCatalog.roundSideElems[3].onclick = function() {
            ScoreManager.SetRound(3);
        }

        ElementCatalog.roundSideElems[4].onclick = function() {
            ScoreManager.SetRound(4);
        }

        ElementCatalog.roundSideElems[5].onclick = function() {
            ScoreManager.SetRound(5);
        }

        ElementCatalog.roundSideElems[6].onclick = function() {
            ScoreManager.SetRound(6);
        }
    }

    static AttachScoreSummaryEvents() {
        ElementCatalog.roundSummaryElems[1].onclick = function() {
            ScoreManager.SetRound(1);
        }

        ElementCatalog.roundSummaryElems[2].onclick = function() {
            ScoreManager.SetRound(2);
        }

        ElementCatalog.roundSummaryElems[3].onclick = function() {
            ScoreManager.SetRound(3);
        }

        ElementCatalog.roundSummaryElems[4].onclick = function() {
            ScoreManager.SetRound(4);
        }

        ElementCatalog.roundSummaryElems[5].onclick = function() {
            ScoreManager.SetRound(5);
        }

        ElementCatalog.roundSummaryElems[6].onclick = function() {
            ScoreManager.SetRound(6);
        }
    }
}