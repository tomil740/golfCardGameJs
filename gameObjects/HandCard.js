export class HandCard{
    #toExpose;
    #value;
    constructor(theCard){
        this.#toExpose = "Face Down"
        this.#value = theCard;
    }

    get value(){
        return this.#value;
    }

    get toExpose(){
        return this.#toExpose;
    }
}