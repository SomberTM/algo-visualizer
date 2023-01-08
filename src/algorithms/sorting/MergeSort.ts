import Sorter from "../Sorter";

export default class MergeSort extends Sorter {
    sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            await this.mergeSort(0, this.array.length - 1);
            resolve();
        })
    }
    
    async mergeSort(start: number, end: number) {
        if (start >= end) {
            return;
        }
        const middle = Math.floor((start + end) / 2);
        await this.mergeSort(start, middle);
        await this.mergeSort(middle + 1, end);
        await this.merge(start, middle, end);
    }

    async merge(start: number, middle: number, end: number) {
        const leftArray = this.array.slice(start, middle + 1);
        const rightArray = this.array.slice(middle + 1, end + 1);
        let leftIndex = 0;
        let rightIndex = 0;
        let index = start;
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (leftArray[leftIndex] < rightArray[rightIndex]) {
                this.array[index] = leftArray[leftIndex];
                leftIndex++;
            } else {
                this.array[index] = rightArray[rightIndex];
                rightIndex++;
            }
            index++;
        }
        while (leftIndex < leftArray.length) {
            this.array[index] = leftArray[leftIndex];
            leftIndex++;
            index++;
        }
        while (rightIndex < rightArray.length) {
            this.array[index] = rightArray[rightIndex];
            rightIndex++;
            index++;
        }
    }

}