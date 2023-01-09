import React, { useRef, useState } from "react";
import { Arrays } from "../../algorithms/ArrayHelpers";
import { SortVisualizer } from "./SortVisualizer";
import { SortController } from "./SortController";

/**
 * Manages state for a sorting algorithm and passes said state to child components
 */
export const SortManager: React.FC = () => {
    /* state */
    const [array, setArray] = useState<Array<number>>(Arrays.random(100, 2, 100));
    const [candleWidth, setCandleWidth] = useState<number>(10);
    const [minCandleHeight, setMinCandleHeight] = useState<number>(5);
    const [maxCandleHeight, setMaxCandleHeight] = useState<number | 'canvas'>('canvas');

    const canvas = useRef<HTMLCanvasElement>(null);

    /* other functions */
    const generateArray = (subCandleWidth: number = candleWidth, subCanvas: React.RefObject<HTMLCanvasElement> | null = null): number[] => {
        const min = minCandleHeight;
        const max = maxCandleHeight === 'canvas' ? subCanvas?.current?.height ?? 100 : maxCandleHeight;
        var arr: number[] = [];
        if (subCanvas?.current) {
            arr = Arrays.random(Math.floor(subCanvas.current.width / (subCandleWidth ?? candleWidth)), min, max);
        } else {
            arr = Arrays.random(100, min, max)            
        }
        setArray(arr);
        return arr;
        // overfitElements = [];
    }

    return (
        <div>
            <SortController
                arrayState={{ array, setArray }}
                candleState={{ candleWidth, setCandleWidth }}
                generateArray={generateArray}
                canvas={canvas}
            />
            <SortVisualizer 
                array={array} 
                candleWidth={candleWidth} 
                generateArray={generateArray}
                canvas={canvas}
            />
        </div>
    )
}