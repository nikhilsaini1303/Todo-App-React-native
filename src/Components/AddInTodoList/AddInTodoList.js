import { ScrollView, StyleSheet, Text, TouchableOpacity, View , SafeAreaView, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import TaskInputField from '../../Helper/TaskInputField/TaskInputField';
import TaskItem from '../../Helper/TaskItem/TaskItem';
import { storeData } from '../../Helper/Storage/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo-list';
const STORAGE_TODO_KEY = '@todo-list-rem';

const AddInTodoList = ({route, navigation}) => {

    const [lists, setLists] = useState([]);

    const onBackArrowPressed = () => {
        navigation.navigate('Home')
    }

    const saveList = async (newList) => {
        storeData(STORAGE_KEY, newList);
        storeData(STORAGE_TODO_KEY, newList);
        setLists(newList);
    }

    const deleteTask = (deleteIndex) => {
        const newList = lists.filter((list) => list.key !== deleteIndex);
        saveList(newList);
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                setLists(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    },[]);

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity style={{marginLeft: 10}} onPress={onBackArrowPressed}>
                    <Icon name='arrow-left' size={30} color='#fff' />
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Tasks in {route.params.title}</Text>
            </SafeAreaView>
            <ScrollView style={styles.scrollView}>
                {
                    lists.map((list, idx) => (
                        list.labelId === route.params.labelId && 
                        <View key={list.key} style={styles.taskContainer}>
                            <TaskItem 
                                task={list.task}
                                deleteTask={() => deleteTask(list.key)}
                            />
                        </View>
                    ))
                }
            </ScrollView>
            <TaskInputField  
                lists={lists} 
                setLists={setLists} 
                labelId={route.params.labelId} 
            />
        </View>
    );
};

export default AddInTodoList;

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
        paddingHorizontal: 50,
        fontSize: 25,
        fontFamily: "Ubuntu-Bold",
    },
    scrollView: {
        marginBottom: 70,
    },
    taskContainer: {
        marginTop: 20,
    }
});