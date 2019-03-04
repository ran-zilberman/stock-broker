
export abstract class Indicator {

    tickGenerator: Iterator<{isIn: boolean,date: string}>;

    nextValue() {
        return this.tickGenerator.next();
    }
}