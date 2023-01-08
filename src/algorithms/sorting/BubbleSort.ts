import Sorter from "../Sorter";

export default class BubbleSort extends Sorter {
    sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            for (let i = 0; i < this.array.length; i++) {
                for (let j = i; j > 0; j--) {
                    if (this.compare(j, j - 1)) {
                        this.swap(j, j - 1);
                        if (shouldAwaitEachSwap) {
                            await this.wait();
                        }
                    }
                }
            }
            resolve();
        })
    }
    
}