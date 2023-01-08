import { useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface SortVisualizerProps {
    array: number[];
    candleWidth: number;
    canvas: React.RefObject<HTMLCanvasElement>;
    generateArray?: (subCandleWidth?: number) => number[];
    handleResize?: (width: number, height: number) => void;
}

export const SortVisualizer: React.FC<SortVisualizerProps> = ({ array, generateArray, candleWidth, canvas, handleResize: onResize }: SortVisualizerProps) => {
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
    const canvasContainer = useRef<HTMLDivElement>(null);

    const theme = useTheme();

    useEffect(() => {
        if (canvas.current) {
            const handleResize = () => {
                if (canvas.current) {
                    canvas.current.width = canvasContainer.current!.clientWidth;
                    canvas.current.height = canvasContainer.current!.clientHeight;
                    if (onResize) {
                        onResize(canvas.current.width, canvas.current.height);
                    }
                    drawArray();
                }
            }
            window.addEventListener('resize', handleResize);
            canvas.current.width = canvasContainer.current!.clientWidth;
            canvas.current.height = canvasContainer.current!.clientHeight;
            canvasCtx.current = canvas.current.getContext('2d');
            if (generateArray) {
                // ensures that we generate an array that fits the canvas 
                // or else it will just be the default 100 element array
                generateArray();
            }
            drawArray();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const drawArray = () => {
        console.log(`Drawing array`);
        canvasCtx.current!.fillStyle = theme.palette.background.default;
        canvasCtx.current!.fillRect(0, 0, canvas.current!.width, canvas.current!.height);
        for (let i = 0; i < array.length; i++) {
            canvasCtx.current!.beginPath();
            canvasCtx.current!.rect(i * candleWidth, array[i], candleWidth, canvas.current!.height - array[i]);
            // canvasCtx.current!.rect(i * candleWidth, 0, candleWidth, array[i]);
            // if (i == selectedIndex) {
            //     // This is really the comparison index
            //     canvasCtx.current!.fillStyle = 'red'
            // } else if (i == comparisonIndex) {
            //     // This is really the current index
            //     canvasCtx.current!.fillStyle = 'green';
            // } else {
            canvasCtx.current!.fillStyle = theme.palette.primary.main;
            // }
            canvasCtx.current!.fill();
            const lineWidth: number = 2;
            if (candleWidth > lineWidth) {
                canvasCtx.current!.lineWidth = lineWidth;
                canvasCtx.current!.strokeStyle = theme.palette.background.paper;
                canvasCtx.current!.stroke();
            }
            canvasCtx.current!.closePath();
        }
    }

    useEffect(() => {
        drawArray();
    }, [array, candleWidth]);

    return (
        <div className="sort-visualizer-canvas-container" ref={canvasContainer}>
            <canvas className="sort-visualizer-canvas" ref={canvas}></canvas>
        </div>
    )
}