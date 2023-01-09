import { useTheme } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface SortVisualizerProps {
    array: number[];
    candleWidth: number;
    canvas: React.RefObject<HTMLCanvasElement>;
    generateArray: (subCandleWidth?: number, subCanvas?: React.RefObject<HTMLCanvasElement>) => number[];
}

export const SortVisualizer: React.FC<SortVisualizerProps> = ({ array, generateArray, candleWidth, canvas }: SortVisualizerProps) => {
    const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
    const canvasContainer = useRef<HTMLDivElement>(null);

    const theme = useTheme();

    useEffect(() => {
        if (canvas.current) {
            const handleResize = () => {
                if (canvas.current) {
                    canvas.current.width = canvasContainer.current!.clientWidth;
                    canvas.current.height = canvasContainer.current!.clientHeight;
                    generateArray(candleWidth, canvas);
                    drawArray();
                }
            }
            window.addEventListener('resize', handleResize);
            canvas.current.width = canvasContainer.current!.clientWidth;
            canvas.current.height = canvasContainer.current!.clientHeight;
            canvasCtx.current = canvas.current.getContext('2d');
            generateArray(candleWidth, canvas)
            drawArray();
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const drawArray = () => {
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