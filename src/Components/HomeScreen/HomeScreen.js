import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import PopupMenu from '../../Helper/PopupMenu/PopupMenu';
import CustomEdit from '../../Helper/CustomEdit/CustomEdit';
import ShowTaskList from '../../Helper/ShowTaskList/ShowTaskList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { options } from '../../Helper/OptionsData/OptionsData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../../Helper/Storage/Storage';
import CustomFilterTask from '../../Helper/CustomFilterTask/CustomFilterTask';

const STORAGE_LABEL_KEY = '@label-list';
const STORAGE_KEY = '@todo-list';
const STORAGE_TODO_KEY = '@todo-list-rem';
const STORAGE_DOING_KEY = '@doing-list';
const STORAGE_DONE_KEY = '@done-list';

const STORAGE_KEY_USERNAME = 'username';
const STORAGE_KEY_ISLOGGEDIN = 'isLoggedIn';


const HomeScreen = ({ navigation }) => {

    const [isAdd, setIsAdd] = useState(false);
    const [arrlabel, setarrlabel] = useState([]);
    const [label, setLabel] = useState('');
    const [visible, setVisible] = useState(false);
    const [update, setUpdate] = useState('');
    const [index, setIndex] = useState();
    const [isFilter, setIsFilter] = useState(false);
    const [isRed, setIsRed] = useState(false);
    const [isOrange, setIsOrange] = useState(false);
    const [isGreen, setISGreen] = useState(false);
    const [rerender, setRerender] = useState(false);

    const [incomplete, setIncomplete] = useState([]);
    const [all, setAll] = useState([]);
    const [done, setDone] = useState([]);
    const [doing, setDoing] = useState([]);

    //logout 
    const onLogOutPressed = async () => {
        try {
            // Clear user session data
            await AsyncStorage.removeItem(STORAGE_KEY_USERNAME);
            await AsyncStorage.removeItem(STORAGE_KEY_ISLOGGEDIN);
        
            // Perform any additional actions after successful sign-out
            navigation.navigate('First');

        } catch (error) {
            console.log('Error signing out:', error);
        }
    }

    // Add Label
    const onAddPressed = () => {
        setIsAdd(true);
    }
    const onCancelLabelPressed = () => {
        setLabel('');
        setIsAdd(false);
    }
    const onUpdateLabelPressed = () => {
        if(label === '') {
            setIsAdd(false);
            return;
        }

        const newLabel = [...arrlabel, {labelId: Math.random().toString(36).substring(7), key: Date.now().toString(), label}];
        saveLabel(newLabel);

        setLabel('');
        setIsAdd(false);
    }

    const saveLabel = async (newLabel) => {
        storeData(STORAGE_LABEL_KEY, newLabel);
        setarrlabel(newLabel);
    }
    const saveIncomplete = async (newIncomplete) => {
        storeData(STORAGE_TODO_KEY, newIncomplete);
        setIncomplete(newIncomplete);
    }
    const saveAll = async (newAll) => {
        storeData(STORAGE_KEY, newAll);
        setAll(newAll);
    }
    const saveDone = async (newDone) => {
        storeData(STORAGE_DONE_KEY, newDone);
        setDone(newDone);
    }
    const saveDoing = async (newDoing) => {
        storeData(STORAGE_DOING_KEY, newDoing);
        setDoing(newDoing);
    }

    
    // Delete Label
    const onDeletePressed = (deleteIndex, labelId) => {

        const newIncomplete = incomplete.filter((list) => list.labelId !== labelId);
        const newAll = all.filter((list) => list.labelId !== labelId);
        const newDone = done.filter((list) => list.labelId !== labelId);
        const newDoing = doing.filter((list) => list.labelId !== labelId);
        const newLabel = arrlabel.filter((list) => list.key !== deleteIndex);

        saveLabel(newLabel);
        saveIncomplete(newIncomplete);
        saveAll(newAll);
        saveDone(newDone);
        saveDoing(newDoing);
    }


    // Add Task Specific Label
    const onAddTaskPressed = (labelId, label) => {
        navigation.navigate('AddTask', {
            labelId: labelId,
            title: label,
        });
    }

    // Rename Label
    const onEditLabelPressed = (key) => {
        setVisible(true);
        setIndex(key);
    }

    const updateLabel = async (index, label) => {
        const newLabel = arrlabel.map((list) => {
            if(list.key === index) {
                return {...list, label};
            } else {
                return list;
            }
        });
        
        await saveLabel(newLabel);
    }

    const onCancelPressed = () => {
        setVisible(false);
        setUpdate('');
    }

    const onUpdatePressed = () => {
        if(update === '') {
            setVisible(false);
            return;
        }
        
        updateLabel(index, update);
        setUpdate('');
        setVisible(false);
    }

    // Specific Task List
    const onLabelItems = (labelId, label) => {
        navigation.navigate('LabelTasks',{
            label: label,
            labelId: labelId,
            setRerender: setRerender,
            rerender: rerender,
        });
    }

    // filter List 
    const onRedPressed = () => {
        setIsFilter(true);
        setIsRed(true);
        setIsOrange(false);
        setISGreen(false);
    }
    const onOrangePressed = () => {
        setIsFilter(true);
        setIsRed(false);
        setIsOrange(true);
        setISGreen(false);
    }
    const onGreenPressed = () => {
        setIsFilter(true);
        setIsRed(false);
        setIsOrange(false);
        setISGreen(true);
    }

    // fetch data
    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                if(key === STORAGE_LABEL_KEY) {
                    setarrlabel(JSON.parse(value));
                }
                if(key === STORAGE_TODO_KEY) {
                    setIncomplete(JSON.parse(value));
                }
                if(key === STORAGE_KEY) {
                    setAll(JSON.parse(value));
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
        getData(STORAGE_LABEL_KEY);
        getData(STORAGE_TODO_KEY);
        getData(STORAGE_KEY);
        getData(STORAGE_DONE_KEY);
        getData(STORAGE_DOING_KEY);
    },[isRed, isOrange, isGreen, rerender]);


    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.headerText}>Todo App</Text>
                <TouchableOpacity onPress={onLogOutPressed}>
                    <Icon name='logout' size={40} color='#fff' />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.label}>
                <Text style={styles.labelText}>Labels</Text>
                <TouchableOpacity onPress={onAddPressed}>
                    <Icon name='plus-circle-outline' size={35} color='#000' />
                </TouchableOpacity>
                <CustomEdit 
                    visible={isAdd}
                    onCancelPressed = {onCancelLabelPressed}
                    onUpdatePressed = {onUpdateLabelPressed}
                    update={label}
                    setUpdate={setLabel}
                    title={'Add Label'}
                    placeholder={'Enter Label'}
                />
            </View>
            <ScrollView style={styles.scrollView}>
                {
                    arrlabel.length  ? (
                        arrlabel.map((list) => (
                            <View key={list.labelId} style={styles.container}>
                                <TouchableOpacity style={styles.popShowTask} onPress={() => onLabelItems(list.labelId, list.label)}>
                                    <Icon name='label' size={20} marginRight={5} color='#000' />
                                    <Text style={[styles.text, {color: '#000'}]}>{list.label}</Text>
                                </TouchableOpacity>
                                <View style={styles.popShowTask}>
                                    <PopupMenu 
                                        options={options} 
                                        onDeletePressed = { () => onDeletePressed (list.key, list.labelId)} 
                                        onAddTaskPressed = {() => onAddTaskPressed (list.labelId,  list.label)}
                                        onEditLabelPressed = {() => onEditLabelPressed(list.key)} 
                                    />
                                </View>
                                <CustomEdit 
                                    visible={visible}
                                    onCancelPressed = {onCancelPressed}
                                    onUpdatePressed = {onUpdatePressed}
                                    update={update}
                                    setUpdate={setUpdate}
                                    title={'Rename Label'}
                                    placeholder={'Enter Label'}
                                />
                            </View>
                        )
                            
                        )
                    ) : (
                        null
                    )
                }
            </ScrollView>
            <View style={styles.status}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.textIcon}>
                    <TouchableOpacity style={styles.iconText} onPress={onRedPressed}>
                        <Text style={[styles.text, {color: 'red'}]}>Todo</Text>
                        <Icon name='circle' size={26} color='red' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconText} onPress={onOrangePressed}>
                        <Text style={[styles.text, {color: 'orange'}]}>Doing</Text>
                        <Icon name='circle' size={26} color='orange' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconText} onPress={onGreenPressed}>
                        <Text  style={[styles.text, {color: 'green'}]}>Done</Text>
                        <Icon name='circle' size={26} color='green' />
                    </TouchableOpacity>
                </View>
            </View>
            <CustomFilterTask 
                visible={isFilter}
                setVisible={setIsFilter}
                filterTasks= {
                    isRed ? incomplete : 
                    isGreen ? done :
                    isOrange ? doing : []
                }
                numberOfTasks= {
                    isRed ? 'Number of tasks to Todo : ' : 
                    isGreen ? 'Number of Completed tasks : ' :
                    isOrange ? 'Number of Doing tasks : ' : ''
                }
                color ={
                    isRed ? 'red' : 
                    isGreen ? 'green' :
                    isOrange ? 'orange' : '#000'
                }
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        flex: 1
    },
    header: {
        backgroundColor: '#878af5',
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 80,
        fontSize: 30,
        fontFamily: "Ubuntu-Bold",
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignContent: 'center'
    },
    labelText: {
        color: '#000',
        textAlign: 'justify',
        marginVertical: 3,
        fontFamily: 'Ubuntu-Bold',
        fontSize: 25
    },
    scrollView: {
        marginTop: 1,
    },
    container: { 
        flexDirection:'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 10,
        marginVertical: 10,
    },
    moreInfo: {
        width: 30,
        height: 30,
        resizeMode: 'stretch'
    },
    popShowTask: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    status: {
        height: 110,
        backgroundColor: '#878af5'
    },
    statusText: {
        fontSize: 25,
        fontFamily: 'Ubuntu-Bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 8
    },
    textIcon : {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10
    },
    iconText: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    text: {
        fontFamily: 'Ubuntu-Regular',
        fontSize: 20,
        textAlign: 'center'
    }
});