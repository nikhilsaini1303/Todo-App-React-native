import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../CustomInput/CustomInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomEdit = ({visible, onCancelPressed, onUpdatePressed, update, setUpdate, title, placeholder}) => {


    return (
    <>
        <Modal transparent visible={visible}>
            <SafeAreaView
                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            >
                <View style={styles.popup}>
                    <Text style={styles.text}>{title}</Text>
                    <CustomInput 
                        placeholder={placeholder}
                        value={update}
                        setValue={setUpdate}
                    />
                    <View style={styles.iconView}>
                        <TouchableOpacity onPress={onCancelPressed}>
                            <Icon name='close-circle' size={50} color='red' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUpdatePressed}>
                            <Icon name='check-circle' size={50} color='green' />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    </>
    );
};

export default CustomEdit;

const styles = StyleSheet.create({
    popup: {
        borderRadius: 8,
        borderColor: '#333',
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        position: 'relative',
        width: '80%',
    },
    text: {
        fontFamily: "Ubuntu-Bold",
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        paddingVertical: 10
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 7,
        borderBottomColor: '#ccc',
        paddingVertical: 20,
        paddingHorizontal: 30
    }
});