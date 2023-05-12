export const options = [
    {
        title: 'Edit Label',
        icon: 'rename-box',
        color: 'black',
        action: 'editLabel',
    },
    {
        title: 'Add Task',
        icon: 'plus',
        color: 'green',
        action: 'addTask',
    },
    {
        title: 'Delete Label',
        icon: 'delete',
        color: 'red',
        action: 'delete',
    },
];

export const labelOptions = [
    {
        title: 'Edit Task',
        icon: 'rename-box',
        color: 'black',
        action: 'editLabel',
    },
    {
        title: 'Todo Task',
        icon: 'circle',
        color: 'red',
        action: 'incomplete',
    },
    {
        title: 'Doing Task',
        icon: 'circle',
        color: 'orange',
        action: 'doing',
    },
    {
        title: 'Done Task',
        icon: 'circle',
        color: 'green',
        action: 'done',
    },
    {
        title: 'Delete Task',
        icon: 'delete',
        color: 'red',
        action: 'delete',
    },
]

export const checkPresent = (Tasks, index) => {
    const isKeyPresent = Tasks.some(obj => obj.key === index);

    return isKeyPresent;
}
