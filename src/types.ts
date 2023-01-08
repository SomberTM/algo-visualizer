import Sorter, { SorterConstructorOptions } from "./algorithms/Sorter";
import BubbleSort from "./algorithms/sorting/BubbleSort";
import HeapSort from "./algorithms/sorting/HeapSort";
import InsertionSort from "./algorithms/sorting/InsertionSort";
import MergeSort from "./algorithms/sorting/MergeSort";
import QuickSort from "./algorithms/sorting/QuickSort";
import SelectionSort from "./algorithms/sorting/SelectionSort";
import ShellSort from "./algorithms/sorting/ShellSort";

type Class<T> = new (...args: any[]) => T;
type SorterClass<T extends Sorter> = new (options?: SorterConstructorOptions) => T;

export type SortingAlgorithmMap = {
    "Insertion Sort": SorterClass<InsertionSort>;
    "Merge Sort": SorterClass<MergeSort>;
    "Quick Sort": SorterClass<QuickSort>;
    "Heap Sort": SorterClass<HeapSort>;
    "Bubble Sort": SorterClass<BubbleSort>;
    "Selection Sort": SorterClass<SelectionSort>;
    "Shell Sort": SorterClass<ShellSort>;
};

export type State<N extends string, V> = {
    [K in (`${N}` | `set${Capitalize<N>}`)]: K extends N ? V : (newValue: V) => void;
}

export type SortingAlgorithm = keyof SortingAlgorithmMap;
export type SortingAlgorithmClass<T extends keyof SortingAlgorithmMap> = SortingAlgorithmMap[T];
