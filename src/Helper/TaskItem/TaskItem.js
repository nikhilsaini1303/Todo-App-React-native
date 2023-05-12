
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TaskItem = ({task, deleteTask}) => {
    return (
        <View style={styles.container}>
            <View style={styles.indexContainer}>
                <Icon name='hand-pointing-right' size={26} color='white' />
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.task}>{task}</Text>
                <TouchableOpacity onPress={deleteTask}>
                    <Icon style={styles.delete} name="delete" size={20} color='red' />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    indexContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    task: {
        color: '#fff',
        width: '90%',
        fontSize: 16,
        fontFamily: 'Ubuntu-Regular',
    },
    delete: {
        marginLeft: 10,
    },
});

export default TaskItem;