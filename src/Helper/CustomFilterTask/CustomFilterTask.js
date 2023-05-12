import React from 'react';
import { Modal, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomFilterTask = ({visible, setVisible, filterTasks, numberOfTasks, color}) => {
    return (
        <>
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.buttonText}>
                        <Text style={styles.modalText}>{numberOfTasks}{filterTasks.length}</Text>
                        <TouchableOpacity 
                            onPress={() => setVisible(!visible)}
                            style={styles.button}
                        >
                            <Icon name='close-circle' size={34} color='red' />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollView}>
                    {
                        filterTasks.map((list, i) => (
                            <View key={list.key} style={[
                                styles.taskCon, 
                                {borderBottomWidth: i === filterTasks.length - 1 ? 0 : 1}, 
                                {borderBottomColor: color}
                                ]}
                            >
                                <Text style={[styles.textStyle, {color: color}]}>{list.task}</Text>
                            </View>
                        ))
                    }
                    </ScrollView>
                </View>
            </View>
        </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "85%",
        height: "70%"
    },
    buttonText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 5,
        borderBottomColor: '#000',
        height: "10%",
    },
    button: {
        padding: 0,
    },
    modalText: {
        marginTop: 5,
        fontSize: 19,
        fontFamily: 'Ubuntu-Bold',
        color: '#000'
    },
    scrollView: {
        marginTop: 10
    },
    taskCon: {
        marginBottom: 10,
        height: 40
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Ubuntu-Regular',
    },
});

export default CustomFilterTask;