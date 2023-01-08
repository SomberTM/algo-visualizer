// Keep track of all swaps / previous states so that we can have a slider and go back and forth
import EventEmitter from "events";
import { Arrays } from "./ArrayHelpers";

export interface SorterConstructorOptions {
    array?: number[];
    operationSpeed?: number;
}

export interface SorterStatistics {
    comparisons: number;
    swaps: number;
}

export interface SorterHistory {
    array: number[];
    // number of comparisons at this time
    comparisons: number;
    // number of swaps at this time
    swaps: number;
    currentIndex: number;
    comparisonIndex: number;
}

export type SorterHistoryType = SorterHistory[];

export type SorterEvent = "swap" | "comparison" | "finished";

export default abstract class Sorter extends EventEmitter {

    // Keeps track of the number of comparisons and swaps
    protected readonly statistics: SorterStatistics;

    // The array that is being sorted
    protected readonly array: number[];

    // The state of the array at each step (each swap)
    // should also keep track of the number of comparisons and swaps at the time 
    // as well as the current index and comparison index.
    // Size: 0 to n - 1
    protected readonly history: SorterHistoryType;

    // How fast we execute the sorting algorithm
    protected operationSpeed: number;

    constructor(options?: SorterConstructorOptions) {
        super();
        this.array = options?.array || [];
        this.history = [];
        this.operationSpeed = options?.operationSpeed || 10;
        this.statistics = {
            comparisons: 0,
            swaps: 0
        };
    }

    abstract sort(shouldAwaitEachSwap: boolean): Promise<void>;

    public on(event: SorterEvent, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }

    public emit(event: SorterEvent, ...args: any[]): boolean {
        switch (event) {
            case "swap":
                this.statistics.swaps++;
                break;
            case "comparison":
                this.statistics.comparisons++;
                break;
        }
        return super.emit(event, ...args);
    }

    // Returns a promise that resolves after the current operation speed in ms has passed
    protected async wait(): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, this.operationSpeed));
    }

    protected swap(i: number, j: number): void {
        Arrays.swap(this.array, i, j);
        this.history.push({
            array: this.array.slice(),
            comparisons: this.statistics.comparisons,
            swaps: this.statistics.swaps,
            currentIndex: i,
            comparisonIndex: j
        });
        this.emit("swap", this.array, i, j);
    }

    protected compare(i: number, j: number): boolean {
        this.emit("comparison", this.array, i, j);
        return this.array[i] < this.array[j];
    }

    public getArray(): number[] {
        return this.array;
    }

    public getHistory(): SorterHistoryType {
        return this.history;
    }

    public getStatistics(): SorterStatistics {
        return this.statistics;
    }   

    public getOperationSpeed(): number {
        return this.operationSpeed;
    }

    public setOperationSpeed(speed: number): void {
        this.operationSpeed = speed;
    }

}