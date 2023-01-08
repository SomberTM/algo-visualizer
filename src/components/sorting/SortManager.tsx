import { useRef, useState } from "react";
import Sorter from "../../algorithms/Sorter";
import { Arrays } from "../../algorithms/ArrayHelpers";
import { SortingAlgorithm, State } from "../../types";
import { algorithms, getAlgorithm } from "../../util";
import { SortVisualizer } from "./SortVisualizer";
import { Button, Input, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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
    // 

    // var overfitElements: number[] = [];

    /* refs */
    const canvas = useRef<HTMLCanvasElement | null>(null);

    /* handler/reactive functions */
    const onCanvasResize = (width: number, height: number) => {
        // Another possibility on resize is to trim the end of the array to fit the new width
        // Attempt is below
        // const maxCandles = Math.floor(width / candleWidth);
        // const currentCandles = array.length;
        // if (currentCandles > maxCandles) {
        //     for (let i = 0; i < currentCandles - maxCandles; i++) {
        //         let element = array.pop();
        //         if (element) {
        //             overfitElements.push(element);
        //         }
        //     }
        //     setArray([...sorter.getArray()]);
        // } else if (overfitElements.length > 0) {
        //     for (let i = 0; i < maxCandles - currentCandles; i++) {
        //         let element = overfitElements.pop();
        //         if (element) {
        //             array.push(element);
        //             setArray([...sorter.getArray()]);
        //         }
        //     }
        // }
        generateArray();
    }
    
    /* other functions */
    const generateArray = (subCandleWidth?: number): number[] => {
        const min = minCandleHeight;
        const max = maxCandleHeight === 'canvas' ? canvas.current?.height ?? 100 : maxCandleHeight;
        var arr: number[] = [];
        if (canvas.current) {
            arr = Arrays.random(Math.floor(canvas.current.width / (subCandleWidth ?? candleWidth)), min, max);
            setArray(arr);
        } else {
            arr = Arrays.random(100, 2, 100)
            setArray(arr);
        }
        return arr;
        // overfitElements = [];
    }

    return (
        <div>
            <SortController
                arrayState={{ array, setArray }}
                candleState={{ candleWidth, setCandleWidth }}
                generateArray={generateArray}
            />
            <SortVisualizer 
                array={array} 
                candleWidth={candleWidth} 
                canvas={canvas}
                handleResize={onCanvasResize}
                generateArray={generateArray}
            />
        </div>
    )
}