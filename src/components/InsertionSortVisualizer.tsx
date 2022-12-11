import { Button, Grid, Input, Paper, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Arrays } from "../algorithms/ArrayHelpers";
import { InsertionSort } from "../algorithms/InsertionSort";

export interface InsertionSortVisualizerProps {

}

export const InsertionSortVisualizer: React.FC<InsertionSortVisualizerProps> = () => {
    const theme = useTheme();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [array, setArray] = useState<number[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const [comparisonIndex, setComparisonIndex] = useState<number>(0);
    const [candleWidth, setCandleWidth] = useState<number>(10);
    const [sorting, setSorting] = useState<boolean>(false);
    const [sortSpeed, setSortSpeed] = useState<number>(100);

    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = 900;
            canvasRef.current.height = 400;
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            setArray(Arrays.random(canvasRef.current.width / candleWidth, 0, canvasRef.current.height));
        }
    }, []);

    useEffect(() => {
        canvasCtxRef.current!.fillStyle = theme.palette.background.paper;
        canvasCtxRef.current!.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        console.log("Rendering array");
        for (let i = 0; i < array.length; i++) {
            canvasCtxRef.current!.beginPath();
            canvasCtxRef.current!.rect(i * candleWidth, array[i], candleWidth, canvasRef.current!.height - array[i] - (array[i] > 2 ? 2 : 0));
            if (i == selectedIndex) {
                canvasCtxRef.current!.fillStyle = 'red'
            } else if (i == comparisonIndex) {
                canvasCtxRef.current!.fillStyle = 'yellow';
            } else {
                canvasCtxRef.current!.fillStyle = theme.palette.secondary.main;
            }
            canvasCtxRef.current!.fill();
            canvasCtxRef.current!.lineWidth = 2;
            canvasCtxRef.current!.strokeStyle = theme.palette.background.default;
            canvasCtxRef.current!.stroke();
            canvasCtxRef.current!.closePath();
        }
    }, [array, candleWidth, theme]);

    const onSortButtonClick = async () => {
        if (array.length == 0 || !sorting) {
            setArray(Arrays.random(canvasRef.current!.width / candleWidth, 0, canvasRef.current!.height));
        }
        setSorting(true);
        await InsertionSort(array, async (arrayState, i, j) => {
            await new Promise(resolve => setTimeout(resolve, 5));
            const newArray = [...arrayState];
            setArray(newArray);
            setComparisonIndex(j - 1);
            setSelectedIndex(j);
            return true;
        });
        setSorting(false);
    }

    return (
        <Grid container> 
            <Grid item>
                <Paper style={{width: '50vw', height: '50vh', position: 'absolute', left: '20vw', top: '25vh'}}>
                    <div style={{ padding: '25px' }}>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </Paper>
            </Grid>
            <Grid item> 
                <Paper style={{width: '10vw', height: '50vh', position: 'absolute', left: '71vw', top: '25vh', padding: '5px', textAlign: 'center'}}>
                    <Input></Input>
                    <Button onClick={onSortButtonClick} style={{ backgroundColor: theme.palette.background.default, color: theme.palette.secondary.main }}>
                        Sort
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
}