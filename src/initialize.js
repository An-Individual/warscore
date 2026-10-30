import { ScoreManager } from "./scoremanager.js";
import { Renderer } from "./renderer.js";

async function initialize() {
    try {
        Renderer.Initialise();
        ScoreManager.AddListener(Renderer.OnChange);
    } catch (error) {
        alert(error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
	await initialize();
});