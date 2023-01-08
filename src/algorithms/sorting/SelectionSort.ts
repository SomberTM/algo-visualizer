import Sorter from "../Sorter";

export default class SelectionSort extends Sorter {
    sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            await this.selectionSort();
            resolve();
        })
    }

    private async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let min = i;
            for (let j = i + 1; j < n; j++) {
                if (this.compare(j, min)) {
                    min = j;
                }
            }
            this.swap(i, min);
            await this.wait();
        }
    }
    
}