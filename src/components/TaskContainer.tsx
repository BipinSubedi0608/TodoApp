import React from 'react';
import { Paper, Typography, IconButton, Badge, Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import moment from 'moment-timezone';
import { TodoReadDto } from '../models/todoDtos';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { firebaseDeleteTask, firebaseMarkTaskAsComplete } from '../services/firebaseServices';

export default function TaskContainer(props: TodoReadDto) {
    const { id, title, createdAt, deadline, isHighPriority, isCompleted, completedAt } = props;

    const paperStyleObject = {
        p: 2,
        marginBottom: 3,
        position: "relative",
        height: "9rem",
        width: "85%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
    };

    const deviceTimezone = moment.tz.guess();
    

    const handleDeleteButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        Swal.fire({
            icon: "warning",
            title: "Are you sure ?",
            text: "Do you really want to delete this task ?",
            showConfirmButton: true,
            showCancelButton: true,
        }).then(async (value: SweetAlertResult<any>) => {
            if (value.isConfirmed) {
                const $closestTaskContainer = $(event.target).closest(".todo-container");
                const idToBeDeleted = $closestTaskContainer.data("key");
                await firebaseDeleteTask(idToBeDeleted);
            }
        });
    };

    const handlePaperClick = (event: React.MouseEvent<HTMLElement>) => {
        Swal.fire({
            icon: "question",
            title: "Are you sure ?",
            text: "Do you really want to mark this task as completed ?",
            showConfirmButton: true,
            showCancelButton: true,
        }).then(async (value: SweetAlertResult<any>) => {
            if (value.isConfirmed) {
                const $closestTaskContainer = $(event.target).closest(".todo-container");
                const idToBeMarkedAsCompleted = $closestTaskContainer.data("key");
                await firebaseMarkTaskAsComplete(idToBeMarkedAsCompleted);
            }
        });
    };

    function PaperComponent() {
        return (
            <Paper onClick={handlePaperClick} elevation={4} data-key={id} className='todo-container' sx={paperStyleObject}>
                <Typography variant="h6" gutterBottom sx={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
                    {title}
                </Typography>

                <Box sx={{ marginTop: "auto" }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Created At: {' '}
                        <span style={{ fontWeight: "bolder" }}>
                            {moment.tz(createdAt, deviceTimezone).format("YYYY/MM/DD HH:MM")}
                        </span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Deadline: {' '}
                        <span style={{ fontWeight: "bolder" }}>
                            {moment.tz(deadline, deviceTimezone).format("YYYY/MM/DD HH:MM")}
                        </span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Completed At: {' '}
                        <span style={{ fontWeight: "bolder" }}>
                            {completedAt ?
                                moment.tz(completedAt, deviceTimezone).format("YYYY/MM/DD HH:MM") :
                                "Not Completed"}
                        </span>
                    </Typography>
                </Box>

                <Tooltip title="Delete This Task">
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 0 }}
                        aria-controls="task-menu"
                        aria-haspopup="true"
                        onClick={handleDeleteButtonClick}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Paper>
        );
    }



    return (
        isCompleted ?
            <Badge sx={{ width: "100%", display: "inline-block", wordWrap: "break-word" }} badgeContent={<TaskAltIcon />} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} >
                <PaperComponent />
            </Badge>
            :
            isHighPriority ?
                <Badge sx={{ width: "100%", display: "inline-block", wordWrap: "break-word" }} badgeContent={<PushPinIcon />} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} >
                    <PaperComponent />
                </Badge>
                :
                <PaperComponent />
    );
}