import Sorter from "../Sorter";

export default class InsertionSort extends Sorter {

    public async sort(shouldAwaitEachSwap: boolean = true): Promise<void> {
        return new Promise(async (resolve) => {
            for (let i = 1; i < this.array.length; i++) {
                let j = i;
                while (j > 0 && this.compare(j - 1, j)) {
                    this.swap(j, j - 1);
                    if (shouldAwaitEachSwap) {
                        await this.wait();
                    }
                    j--;
                }
            }
            resolve();
        }) 
    }

}