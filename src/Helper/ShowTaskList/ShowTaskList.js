import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShowTaskList = ({todo, addIndex, onListUpPressed, upDown, show, onListDownPressed}) => {

    return (
    <>
        <View style={styles.root}>
            {
                upDown ? <TouchableOpacity style={styles.upDown} onPress={onListUpPressed}>
                
                    
                        <Icon name='menu-down' size={30} color='black' /> 
                    
                
            </TouchableOpacity> : <TouchableOpacity style={styles.upDown} onPress={onListDownPressed}>
                <Icon name='menu-up' size={30} color='black' />
            </TouchableOpacity>
            }
            <ScrollView>
                {
                    show ? todo.lists.id === addIndex ?  
                    <View>
                        {
                            todo.lists.tasks.map((task, idx) => (
                                <Text key={idx}>{task}</Text>
                            ))
                        }
                    </View>  : null : null 
                }
            </ScrollView>
        </View>
    </>
    )
}

export default ShowTaskList;

const styles = StyleSheet.create({
    root: {
        marginRight: 5,
        backgroundColor: '#fff',
    }
});


{/* <ShowTaskList 
                                    todo={todo}
                                    addIndex={addIndex}
                                    onListUpPressed= {() => onListUpPressed(idx)}
                                    onListDownPressed={() => onListDownPressed()}
                                    show={show}
                                    upDown={upDown}
                                /> */}


                                // const isObjectEmpty = (objectName) => {
                                //     return (
                                //         objectName &&
                                //         Object.keys(objectName).length === 0 &&
                                //         objectName.constructor === Object
                                //     );
                                // };
                            
                                // const onListUpPressed = (id) => {
                                    
                                //     console.warn(todo);
                                //     if(isObjectEmpty(todo)) return;
                                
                                    
                                //     setAddIndex(id);
                                //     setShow(true);
                                    
                                //     setUpDown(false);
                                    
                                // }
                            
                                // const onListDownPressed = () => {
                                //     setAddIndex(null);
                                //     setShow(false);
                                //     setUpDown(true);
                                    
                                // }

    //                             const [show, setShow] = useState(false);
    // const [upDown, setUpDown] = useState(true);
    // const [addIndex, setAddIndex] = useState();