// Lior Shlomo 208011197
// Zohar Hazani 209189380

class LocalStorage {
    // An asynchronous function that sets an item in localStorage.
    async setItem(key, value) {
        console.log('Async SetItem called');
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem(key, value);
                resolve("Added");
            } catch (err) {
                reject(err);
            }
        });
    }

    // An asynchronous function that gets an item from localStorage.
    async getItem(key) {
        console.log('Async GetItem called');
        return new Promise((resolve, reject) => {
            try {
                const value = localStorage.getItem(key);
                resolve(value);
            } catch (err) {
                reject(err);
            }
        });
    }

}
// Export an instance of the LocalStorage class.
export default new LocalStorage();
