import { Button, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react"
import { SortManager } from "./components/sorting/SortManager"
import './styles.css';

export const App: React.FC = () => {
    const [sortManagers, setSortManagers] = useState<number>(1)

    return (
        <>
            {
                Array.from({ length: sortManagers }, (_, i) => {
                    return (
                        <div className='sort-manager-container'>
                            <span>
                            <SortManager key={i} />
                            <IconButton 
                                className='button-add-manager'
                                onClick={() => setSortManagers(sortManagers + 1)}
                            >
                                <AddIcon />
                            </IconButton>
                            </span>
                        </div>
                    );
                })
            }
        </>
    )
}