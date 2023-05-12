
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, Keyboard, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { storeData } from '../Storage/Storage';

const STORAGE_KEY = '@todo-list';
const STORAGE_TODO_KEY = '@todo-list-rem';

const TaskInputField = ({lists, setLists, labelId}) => {
    const [task, setTask] = useState('');

    const handleAddTask = () => {
        if(task === '') return;
        const newList = [...lists, { labelId, key: Date.now().toString(),  task}];
        saveList(newList);
        setTask(null);
        Keyboard.dismiss();
    }

    const saveList = async (newList) => {
        storeData(STORAGE_KEY, newList);
        storeData(STORAGE_TODO_KEY, newList);
        setLists(newList);
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TextInput 
                style={styles.inputField}  
                placeholder={'Write a task...'} 
                placeholderTextColor={'#fff'}
                onChangeText={setTask}
                value={task}
            />
            <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.button}>
                    <Icon name="navigation-variant" size={30} color="black" />
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
        fontFamily: 'Ubuntu-Regular',
    },
    button: {
        height: 43,
        width: 43,
        borderRadius: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default TaskInputField;