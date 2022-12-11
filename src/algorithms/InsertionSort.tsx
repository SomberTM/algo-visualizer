import { Arrays } from "./ArrayHelpers";

export async function InsertionSort(array: number[], onSwap?: ((arrayState: number[], i: number, j: number) => Promise<boolean> | boolean)) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            if (array[j] < array[j - 1]) {
                Arrays.swap(array, j, j - 1);
                if (onSwap) {
                    const shouldContinue = await onSwap(array, j, j - 1);
                    if (!shouldContinue) {
                        return;
                    }
                } 
            }
        }
    }
}