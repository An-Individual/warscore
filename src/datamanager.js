export class DataManager {
    static dataKey = "war-simple";
    static SaveData(data) {
        if(!data) {
            localStorage.removeItem(this.dataKey);
        } else {
            localStorage.setItem(this.dataKey, JSON.stringify(data))
        }
    }

    static LoadData() {
        let raw = localStorage.getItem(this.dataKey);
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