import Sorter from "../Sorter";

export default class ShellSort extends Sorter {

    public async sort(shouldAwaitEachSwap: boolean): Promise<void> {
        return new Promise(async (resolve) => {
            const n = this.array.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i++) {
                    let j = i;
                    while (j >= gap && this.compare(j - gap, j)) {
                        this.swap(j, j - gap);
                        if (shouldAwaitEachSwap) {
                            await this.wait();
                        }
                        j -= gap;
                    }
                }
            }
            resolve();
        })
    }

}