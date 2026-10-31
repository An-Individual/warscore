import { ScoreManager } from "./scoremanager.js";
import { Renderer } from "./renderer.js";
import { Events } from "./events.js";

async function initialize() {
    try {
        Renderer.Initialise();
        ScoreManager.AddListener(Renderer.OnChange);
        Events.Initialise();
    } catch (error) {
        alert(error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
	await initialize();
});