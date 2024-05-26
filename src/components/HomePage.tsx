import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Grid, Tooltip } from "@mui/material";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { TodoReadDto } from "../models/todoDtos";
import { TodoModel } from "../models/todoModel";
import { UserDisplayDto } from "../models/userDtos";
import { firebaseListenAllTask } from "../services/firebaseServices";
import { mapToReadDto } from "../utils/todoMapper";
import HeaderNavbar from "./Navbar";
import TaskContainer from "./TaskContainer";
import TaskInputForm from "./TaskInputForm";


export default function HomePage() {
    const [components, setComponents] = useState<JSX.Element[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const currentUser: UserDisplayDto | null = useAuth();

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = firebaseListenAllTask((snapshot: QuerySnapshot<DocumentData>) => {
                const listOfTasks: TodoReadDto[] = [];
                snapshot.forEach((doc) => {
                    const dataToPush = { ...doc.data() as TodoModel, id: doc.id, };
                    listOfTasks.push(mapToReadDto(dataToPush));
                })
                setComponents(listOfTasks.map(task => <TaskContainer key={task.id} {...task} />));
            }, currentUser.userId)
            return () => unsubscribe();
        }
    }, [currentUser]);


    const handleOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <HeaderNavbar />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 2, margin: 2 }}>

                {/* <TextField
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    id="outlined-basic"
                    size="small"
                    label="Enter title to search"
                    placeholder="Search"
                    variant="outlined"
                /> */}
            </Box>
            <Grid container marginX={"0px"} spacing={2} justifyContent="flex-start" justifycontent-xs="center">
                {components.map((component, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                        {component}
                    </Grid>
                ))}
            </Grid>

            <Tooltip title="Add New Task" placement="top">
                <Fab onClick={handleOpen} sx={{ position: "absolute", bottom: "40px", right: "40px" }} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>

            <TaskInputForm open={open} setOpen={setOpen} />
        </>
    );
}