import BubbleSort from "./algorithms/sorting/BubbleSort";
import HeapSort from "./algorithms/sorting/HeapSort";
import InsertionSort from "./algorithms/sorting/InsertionSort";
import MergeSort from "./algorithms/sorting/MergeSort";
import QuickSort from "./algorithms/sorting/QuickSort";
import SelectionSort from "./algorithms/sorting/SelectionSort";
import ShellSort from "./algorithms/sorting/ShellSort";
import { SortingAlgorithm, SortingAlgorithmClass, SortingAlgorithmMap } from "./types";

const algorithmMap: SortingAlgorithmMap = {
    "Insertion Sort": InsertionSort,
    "Merge Sort": MergeSort,
    "Quick Sort": QuickSort,
    "Heap Sort": HeapSort,
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Shell Sort": ShellSort
}

export const algorithms: SortingAlgorithm[] = Object.keys(algorithmMap) as SortingAlgorithm[];

export const getAlgorithm = <T extends SortingAlgorithm>(algorithm: T): SortingAlgorithmClass<T> => {
    return algorithmMap[algorithm];
}