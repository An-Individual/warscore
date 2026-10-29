async function initialize() {
    try {
    } catch (error) {
        alert(error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", async (event) => {
	await initialize();
});