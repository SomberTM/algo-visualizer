import Sorter from "../Sorter";

export default class HeapSort extends Sorter {
    sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            await this.heapSort();
            resolve();
        })
    }

    private async heapSort() {
        const n = this.array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }
        for (let i = n - 1; i >= 0; i--) {
            this.swap(0, i);
            await this.wait();
            await this.heapify(i, 0);
        }
    }

    private async heapify(n: number, i: number) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && this.compare(left, largest)) {
            largest = left;
        }
        if (right < n && this.compare(right, largest)) {
            largest = right;
        }
        if (largest !== i) {
            this.swap(i, largest);
            await this.wait();
            await this.heapify(n, largest);
        }
    }
    
}