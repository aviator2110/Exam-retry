export class Task {
    static #lastId = 0;
    #id;
    #name;
    #description;
    #creationDate;
    #isComplete;

    constructor(name, description, id, creationDate, isComplete) {
        if (arguments.length === 2) {
            this.#id = Task.#lastId++;
            this.#name = name;
            this.#description = description;
            this.#creationDate = new Date().toISOString();
            this.#isComplete = false;
        } else {
            this.#id = id;
            this.#name = name;
            this.#description = description;
            this.#creationDate = creationDate;
            this.#isComplete = isComplete;
        }
    }

    deleteTask() {

    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get description(){
        return this.#description;
    }

    get creationDate(){
        return this.#creationDate;
    }

    get isComplete(){
        return this.#isComplete;
    }

    static get lastId(){
        return Task.#lastId;
    }

    static set lastId(lastId) {
        Task.#lastId = lastId;
    }

    set isComplete(isComplete) {
        this.#isComplete = isComplete;
    }

    set name(value){
        this.#name = value;
    }

    set description(value){
        this.#description = value;
    }

    toJSON(){
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            creationDate: this.#creationDate,
            isComplete: this.#isComplete,
        }
    }

    editTask() {

    }
}