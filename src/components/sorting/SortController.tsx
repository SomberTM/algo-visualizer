import { Button, Input, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Sorter from "../../algorithms/Sorter";
import { SortingAlgorithm, State } from "../../types";
import { useState } from "react";
import { algorithms, getAlgorithm } from "../../util";

const createSorter = (algorithm: SortingAlgorithm, state: State<"array", number[]>): Sorter => {
    const array = new Proxy([...state.array], {
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            if (result) {
                state.setArray([...target]);
            }
            return result;
        }
    });
    const clazz = getAlgorithm(algorithm);
    return new clazz({
        array,
        operationSpeed: 1
    });
}

interface SortControllerProps {
    // sorterState: State<"sorter", Sorter>;
    candleState: State<"candleWidth", number>;
    arrayState: State<"array", number[]>;
    generateArray: (subCandleWidth?: number) => number[];
}

export const SortController: React.FC<SortControllerProps> = ({ candleState, arrayState, generateArray }) => {
    const [sorting, setSorting] = useState<boolean>(false);
    const [algorithm, setAlgorithm] = useState<SortingAlgorithm>(algorithms[0]);
    const [sorter, setSorter] = useState<Sorter>(createSorter(algorithm, { array: arrayState.array, setArray: arrayState.setArray }));
    const [sortSpeed, setSortSpeed] = useState<number>(1);

    const onSortButtonClick = async () => {
        setSorting(true);
        await sorter.sort(true);
        setSorting(false);
    }

    const onSelectAlgorithmChange = (event: SelectChangeEvent<SortingAlgorithm>) => {
        const value = event.target.value as SortingAlgorithm;
        setAlgorithm(value);
        setSorter(createSorter(value, { array: generateArray(), setArray: arrayState.setArray }));
    }

    return (
        <div className='sort-controller-container'>
            <span className='sort-controller-span'>
                <Button 
                    onClick={onSortButtonClick}
                    disabled={sorting}
                >
                    Sort
                </Button>
                <TextField 
                    type="number"
                    value={candleState.candleWidth}
                    disabled={sorting}
                    onChange={(event) => { 
                        const value: number = event.target.value as unknown as number;
                        if (!isNaN(value) && value > 0) {
                            candleState.setCandleWidth(value);
                            if (!sorting) {
                                generateArray(value);
                            }
                        } else {
                            candleState.setCandleWidth(0);
                        }
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">px</InputAdornment>,
                    }}
                />
                <Select 
                    value={algorithm}
                    onChange={onSelectAlgorithmChange}
                    disabled={sorting}
                >
                    {
                        algorithms.map((_algorithm, index) => {
                            return (
                                <MenuItem key={index} value={_algorithm}>{_algorithm}</MenuItem>
                            )
                        })
                    }
                </Select>
            </span>
        </div>
    )
}
