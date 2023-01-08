export namespace Arrays {

    export function swap(array: any[], i: number, j: number) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    export function random(length: number, min?: number, max?: number) {
        if (min === undefined) min = 0;
        if (max === undefined) max = 100;
        let array = [];
        for (let i = 0; i < length; i++) {
            array.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return array;
    }

}