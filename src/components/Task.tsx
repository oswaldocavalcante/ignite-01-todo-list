import React, { useState } from "react";
import { Image, Pressable, PressableProps, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type Props = {
    text: string;
    completed: boolean;
    onRemove: () => void;
    onConclude: () => void;
};

export function Task(props: Props) {

    const [completed, setCompleted] = useState(false);
    const [textDecorationLineIdx, setTextDecorationLineIdx] = useState(0);

    const [radioButton, setRadioButton] = useState(require('../images/button-unchecked-default.png'));
    const [deleteButton, setDeleteButton] = useState(require('../images/button-delete-default.png'));

    function onConclude() {
        if (!completed) {
            setCompleted(true);
            setTextDecorationLineIdx(1);
            props.onConclude();
            setRadioButton(require('../images/button-checked-default.png'));
        } else {
            setCompleted(false);
            setTextDecorationLineIdx(0);
            props.onConclude();
            setRadioButton(require('../images/button-unchecked-default.png'));
        }
    }

    return (
        <View style={[styles.taskContainer, { borderColor: completed ? 'transparent' : '#333333'}]}>
            <TouchableOpacity onPress={onConclude} >
                <Image source={radioButton} />
            </TouchableOpacity>
            <Text
                style={[styles.taskText, {
                    textDecorationLine: completed ? 'line-through' : 'none',
                    color: completed ? '#808080' : '#FFFFFF' 
                }]}
            >
                {props.text}
            </Text>
            <TouchableOpacity onPress={props.onRemove} >
                <Image source={require('../images/button-delete-default.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    taskContainer: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#262626',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 13,
        marginBottom: 10,
        alignItems: 'center',
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        textDecorationLine: 'none',
        marginLeft: 10,
        lineHeight: 25,
    },
});