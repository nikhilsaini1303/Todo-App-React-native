import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import PopupMenu from '../../Helper/PopupMenu/PopupMenu';
import { checkPresent, labelOptions } from '../../Helper/OptionsData/OptionsData';
import CustomEdit from '../../Helper/CustomEdit/CustomEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../../Helper/Storage/Storage';

const STORAGE_KEY = '@todo-list';
const STORAGE_TODO_KEY = '@todo-list-rem';
const STORAGE_DOING_KEY = '@doing-list';
const STORAGE_DONE_KEY = '@done-list';


const LabelTaskScreen = ({route, navigation}) => {

    const [incomplete, setIncomplete] = useState([]);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState();
    const [update, setUpdate] = useState(''); 
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);
    const [todo, setTodo] = useState([]);
    
    const onBackArrowPressed = () => {
        route.params.setRerender(!route.params.rerender);
        navigation.navigate('Home')
    }

    // For rename Task
    const onEditTaskPressed = (id) => {
        setVisible(true);
        setIndex(id);
    }

    const onCancelPressed = () => {
        setVisible(false);
        setIndex(null);
        setUpdate('');
    }

    const updateTask = async (index, task) => {
        if(checkPresent(incomplete, index)) {
            const newTask = incomplete.map((list) => {
                if(list.key === index) {
                    return {...list, task};
                } else {
                    return list;
                }
            });

            const allTask = todo.map((list) => {
                if(list.key === index) {
                    return {...list, task}
                } else {
                    return list;
                }
            });
            
            await saveTaskIncomplete(newTask);
            await saveTaskAll(allTask);
        }
        else if(checkPresent(doing, index)){
            const newTask = doing.map((list) => {
                if(list.key === index) {
                    return {...list, task};
                } else {
                    return list;
                }
            });

            const allTask = todo.map((list) => {
                if(list.key === index) {
                    return {...list, task}
                } else {
                    return list;
                }
            });
            
            await saveTaskDoing(newTask);
            await saveTaskAll(allTask);
        }
        else if(checkPresent(done, index)) {
            const newTask = done.map((list) => {
                if(list.key === index) {
                    return {...list, task};
                } else {
                    return list;
                }
            });

            const allTask = todo.map((list) => {
                if(list.key === index) {
                    return {...list, task}
                } else {
                    return list;
                }
            });
            
            await saveTaskDone(newTask);
            await saveTaskAll(allTask);
        }
        else {
            console.log("Task doesn't exits!");
        }
    }

    const onUpdatePressed = () => {
        if(update === '') {
            setIndex(null);
            setVisible(false);
            return;
        }

        updateTask(index, update);

        setUpdate('');
        setIndex(null);
        setVisible(false);
    }

    const saveTaskAll = async (allTask) => {
        storeData(STORAGE_KEY, allTask);
        setTodo(allTask);
    }
    const saveTaskIncomplete = async (newTask) => {
        storeData(STORAGE_TODO_KEY, newTask); 
        setIncomplete(newTask);
    }
    const saveTaskDoing = async (newTask) => {
        storeData(STORAGE_DOING_KEY, newTask);
        setDoing(newTask);
    }
    const saveTaskDone = async (newTask) => {
        storeData(STORAGE_DONE_KEY, newTask);
        setDone(newTask);
    }

    
    // Task done, incomplete or doing
    const onDonePressed = async (doneList) => { 
        const deleteIndex = doneList.key;
        const newDone = [...done, doneList];
        await saveTaskDone(newDone);
        const newIncomplete = incomplete.filter((list) => list.key !== deleteIndex);
        await saveTaskIncomplete(newIncomplete);
        const newDoing = doing.filter((list) => list.key !== deleteIndex);
        await saveTaskDoing(newDoing);
    }
    const onDoingPressed = async (doingList) => {
        const deleteIndex = doingList.key;
        const newDoing = [...doing, doingList];
        await saveTaskDoing(newDoing);
        const newIncomplete = incomplete.filter((list) => list.key !== deleteIndex);
        await saveTaskIncomplete(newIncomplete);
        const newDone = done.filter((list) => list.key !== deleteIndex);
        await saveTaskDone(newDone);
    }
    const onIncompletePressed = async (incompleteList) => {
        const deleteIndex = incompleteList.key;
        const newIncomplete = [...incomplete, incompleteList];
        await saveTaskIncomplete(newIncomplete);
        const newDoing = doing.filter((list) => list.key !== deleteIndex);
        await saveTaskDoing(newDoing);
        const newDone = done.filter((list) => list.key !== deleteIndex);
        await saveTaskDone(newDone);
    }
    
    // Task Delete
    const onDeleteIncompletePressed = async (deleteIndex) => {
        const newIncomplete = incomplete.filter((list) => list.key !== deleteIndex);
        const newAll = todo.filter((list) => list.key !== deleteIndex);
        await saveTaskIncomplete(newIncomplete);
        await saveTaskAll(newAll);
    }

    const onDeleteDonePressed = async (deleteIndex) => {
        const newDone = done.filter((list) => list.key !== deleteIndex);
        const newAll = todo.filter((list) => list.key !== deleteIndex);
        await saveTaskDone(newDone);
        await saveTaskAll(newAll);
    }

    const onDeleteDoingPressed = async (deleteIndex) => {
        const newDoing = doing.filter((list) => list.key !== deleteIndex);
        const newAll = todo.filter((list) => list.key !== deleteIndex);
        await saveTaskDoing(newDoing);
        await saveTaskAll(newAll);
    }

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                if(key === STORAGE_KEY) {
                    setTodo(JSON.parse(value));
                }
                if(key === STORAGE_TODO_KEY) {
                    setIncomplete(JSON.parse(value));
                }
                if(key === STORAGE_DONE_KEY) {
                    setDone(JSON.parse(value));
                }
                if(key === STORAGE_DOING_KEY) {
                    setDoing(JSON.parse(value));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getData(STORAGE_KEY);
        getData(STORAGE_TODO_KEY);
        getData(STORAGE_DONE_KEY);
        getData(STORAGE_DOING_KEY);
    },[]);

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={onBackArrowPressed} style={{marginLeft: 10}}>
                    <Icon name='arrow-left' size={30} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Todo {route.params.label}</Text>
            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                    {
                    
                        incomplete.map((list, idx) => (
                            list.labelId === route.params.labelId && 
                            <View key={idx} style={[styles.container]}>
                                <View style={styles.handTodo}>
                                    <Icon name='hand-pointing-right' size={26} color='red' />
                                    <Text style={[styles.listItem, styles.todoList]}>{list.task}</Text>
                                </View>
                                <PopupMenu 
                                    options={labelOptions}
                                    onEditLabelPressed={() => onEditTaskPressed(list.key)}
                                    onDeletePressed={() => onDeleteIncompletePressed(list.key)}
                                    onDonePressed = {() => onDonePressed(list)}
                                    onDoingPressed={() => onDoingPressed(list)}
                                /> 
                            </View> 
                        ))
                    
                    }
                    {
                    
                        done.map((list, idx) => (
                            list.labelId === route.params.labelId && 
                            <View key={idx} style={styles.container}>
                                <View style={styles.handTodo}>
                                    <Icon name='hand-pointing-right' size={26} color='green' />
                                    <Text style={[styles.listItem, styles.doneList]}>{list.task}</Text>
                                </View>
                                <PopupMenu 
                                    options={labelOptions}
                                    onEditLabelPressed={() => onEditTaskPressed(list.key)}
                                    onDeletePressed={() => onDeleteDonePressed(list.key)}
                                    onDoingPressed={() => onDoingPressed(list)}
                                    onIncompletePressed={() => onIncompletePressed(list)}
                                /> 
                            </View> 
                        ))
                
                    }
                    {
                    
                        doing.map((list, idx) => (
                            list.labelId === route.params.labelId && 
                            <View key={idx} style={styles.container}>
                                <View style={styles.handTodo}>
                                    <Icon name='hand-pointing-right' size={26} color='orange' />
                                    <Text style={[styles.listItem, styles.doingList]}>{list.task}</Text>
                                </View>
                                <PopupMenu 
                                    options={labelOptions}
                                    onEditLabelPressed={() => onEditTaskPressed(list.key)}
                                    onDeletePressed={() => onDeleteDoingPressed(list.key)}
                                    onDonePressed = {() => onDonePressed(list)}
                                    onIncompletePressed={() => onIncompletePressed(list)}
                                /> 
                            </View> 
                        ))
            
                    }
                    
                    <CustomEdit 
                        visible={visible}
                        onCancelPressed = {onCancelPressed}
                        onUpdatePressed = {onUpdatePressed}
                        update={update}
                        setUpdate={setUpdate}
                        title={'Rename Task'}
                        placeholder={'Enter Task'}
                    />   
                
            </ScrollView> 
            
        </View>
    );
};



const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#878af5',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 80,
        fontSize: 25,
        fontFamily: "Ubuntu-Bold",
    },
    scrollView: {
        marginTop: 15
    },
    handTodo: {
        flexDirection: 'row'
    },    
    listItem: {
        fontFamily: "Ubuntu-Regular",
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 8
    },
    container : {
        flexDirection:'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 10,
        marginVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#878af5'
    },
    todoList: {
        color: 'red'
    }, 
    doneList: {
        color: 'green'
    },
    doingList: {
        color: 'orange'
    } 
});

export default LabelTaskScreen;

