import { AppBar, Container, Grid, MenuItem, Select, Typography } from "@mui/material"
import React, { useState } from "react";
import { SortingAlgorithm } from "../types";

export const NavBar = (props: React.PropsWithChildren) => {
    const algorithms = ["Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Bubble Sort", "Selection Sort"];
    const [algorithm, setAlgorithm] = useState<SortingAlgorithm>("Insertion Sort");

    return (
        <Container>
            <AppBar position='static' color='primary'>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item>
                        <Typography variant="h4" >
                            Sorting Algorithm Visualizer
                        </Typography>
                    </Grid >  
                    <Grid item>
                        <Select
                            value={algorithm}
                            onChange={(event) => {
                                setAlgorithm(event.target.value as SortingAlgorithm);
                            }}
                        >
                            {
                                algorithms.map((_algorithm, index) => {
                                    return (
                                        <MenuItem key={index} value={_algorithm}>{_algorithm}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </Grid>
                </Grid>
            </AppBar>
            {props.children}
        </Container>
    )
}