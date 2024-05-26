import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
import { firebaseAddTask } from '../services/firebaseServices';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface TaskInputFormProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function TaskInputForm({ open, setOpen }: TaskInputFormProps) {
    const [title, setTitle] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [isHighPriority, setHighPriority] = useState<boolean>(false);
    const currentUserId: string = useAuth()?.userId ?? "";

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (new Date(deadline) < new Date()) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Deadline cannot be in the past",
                timer: 2000,
                timerProgressBar: true,
            });
            return;
        }
        setOpen(false);

        const docRef = await firebaseAddTask({ title, deadline: new Date(deadline), isHighPriority }, currentUserId);
        console.log(docRef);
    }


    return (
        <form>
            <Dialog
                sx={{ zIndex: 100 }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Enter your task details"}</DialogTitle>


                <DialogContent>
                    <Grid container spacing={2} marginTop={1}>
                        {/* Title field */}
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        {/* Deadline field */}
                        <Grid item xs={12}>
                            <TextField
                                label="Deadline"
                                type="datetime-local" // Use datetime-local input type for a date with time
                                variant="outlined"
                                fullWidth
                                value={deadline} // Convert Date object to string for input value
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </Grid>
                        {/* Checkbox for high priority */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isHighPriority}
                                        onChange={(e) => setHighPriority(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Mark as high priority"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>


                <DialogActions>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}