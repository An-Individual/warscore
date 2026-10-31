export class DataManager {
    static dataKey = "war-simple";
    static SaveData(data) {
        if(!data) {
            localStorage.removeItem(DataManager.dataKey);
        } else {
            localStorage.setItem(DataManager.dataKey, JSON.stringify(data))
        }
    }

    static LoadData() {
        let raw = localStorage.getItem(DataManager.dataKey);
        if(!raw) {
            return;
        }

        try {
            return JSON.parse(raw);
        } catch {
            return;
        }
    }
}