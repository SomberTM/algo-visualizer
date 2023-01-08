import Sorter from "../Sorter";

export default class QuickSort extends Sorter {
    sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            await this.quickSort(0, this.array.length - 1);
            resolve();
        })
    }

    private async quickSort(start: number, end: number) {
        if (start >= end) {
            return;
        }
        const pivot = await this.partition(start, end);
        await this.quickSort(start, pivot - 1);
        await this.quickSort(pivot + 1, end);
    }

    private async partition(start: number, end: number) {
        const pivot = this.array[end];
        let i = start;
        for (let j = start; j < end; j++) {
            if (this.compare(j, end)) {
                this.swap(i, j);
                await this.wait();
                i++;
            }
        }
        this.swap(i, end);
        await this.wait();
        return i;
    }
    
}