import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const PopupMenu = ({ options , onDeletePressed, onAddTaskPressed, onEditLabelPressed, onDonePressed, onDoingPressed, onIncompletePressed}) => {

    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;

    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 300,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    return (
    <>
        <TouchableOpacity onPress={() => resizeBox(1)}>
            <Icon name='dots-vertical' size={26} color={'#212121'} />
        </TouchableOpacity>
        <Modal transparent visible={visible}>
            <SafeAreaView
                style={{ flex: 1 }}
                onTouchStart={() => resizeBox(0)}
            >
                <Animated.View style={[
                    styles.popup,
                    {
                        opacity: scale.interpolate({ inputRange: [0, 1], outputRange: [0, 1]})
                    },
                    {
                        transform: [{ scale }],
                    },
                    ]}>
                    {
                        options.map((op, i) => (
                            <TouchableOpacity 
                                style={[
                                            styles.option, 
                                            {borderBottomWidth: i === options.length - 1 ? 0 : 1}
                                        ]} 
                                key={i} 
                                onPress={ 
                                    op.action  === 'delete' ? 
                                    onDeletePressed  : op.action === 'addTask' ?
                                    onAddTaskPressed : op.action === 'done' ?
                                    onDonePressed : op.action === 'doing' ?
                                    onDoingPressed : op.action === 'incomplete' ?
                                    onIncompletePressed : onEditLabelPressed
                                }
                            >
                                <Text style={{color: op.color, fontFamily: "Ubuntu-Regular"}}>{op.title}</Text>
                                <Icon name={op.icon} size={26} color={op.color} style={{marginLeft: 10}} />
                            </TouchableOpacity>
                        ))
                    }
                </Animated.View>
            </SafeAreaView>
        </Modal>
    </>
    );
};

export default PopupMenu;

const styles = StyleSheet.create({
    popup: {
        borderRadius: 8,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'absolute',
        top: 76,
        right: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        borderBottomColor: '#ccc'
    }
});