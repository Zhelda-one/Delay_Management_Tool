class Action {
    constructor() {
        this.listeners = [];
    }

    Subscribe(callback) {
        this.listeners.push(callback);
    }

    Unsubscribe(callback) {
        this.listeners = this.listeners.filter(cb => cb !== callback);
    }

    Invoke(...args) {
        this.listeners.forEach(cb => cb(...args));
    }
}