import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as Font from 'expo-font';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { Task } from './src/components/Task';

type Task = {
  id: string;
  text: string,
  completed: boolean
}



export default function App() {
  
  const [taskText, setTaskText] = useState('');
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const [tasksCreated, setTasksCreated] = useState(0);
  const [tasksConcluded, setTasksConcluded] = useState(0);

  const [onFocus, setOnFocus] = useState(false);

  function handleCreateTask () {
    
    if (taskText == '') return;
    setTasksList(prevState => [...prevState, { id: Crypto.randomUUID() , text: taskText, completed: false }]);
    setTasksCreated(prevState => (prevState + 1));
    setTaskText('');
  }

  function handleRemoveTask (task: Task) {

    if(task.completed) {
      setTasksConcluded(prevState => (prevState - 1));
    } else {
      setTasksCreated(prevState => (prevState - 1));
    }

    setTasksList(tasksList.filter(element => element != task));
  }

  function handleConcludeTask (task: Task) {

    if(!task.completed) {
      task.completed = true;
      setTasksCreated(prevState => (prevState - 1));
      setTasksConcluded(prevState => (prevState + 1));
    } else {
      task.completed = false;
      setTasksCreated(prevState => (prevState + 1));
      setTasksConcluded(prevState => (prevState - 1));
    }
  }


  return (
    <View style={styles.container}>

      <StatusBar barStyle={'light-content'} />

      <View style={styles.header}>
        <Image source={require('./src/images/Logo.png')} />
      </View>

      <View style={styles.workflowContainer}>

        <View style={styles.inputContainer}>
          <TextInput 
            style={[styles.taskInput, { borderColor: onFocus ? '#8284FA' : '#0D0D0D'}]}
            placeholder='Adicione uma nova tarefa'
            placeholderTextColor={'#808080'}
            keyboardType='default'
            onChangeText={setTaskText}
            value={taskText}
            onFocus={() => setOnFocus(true)}
            onBlur={() => setOnFocus(false)}
          />
          <TouchableOpacity style={styles.taskButton} onPress={handleCreateTask} >
            <Image source={require('./src/images/button-create-default.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.countersContainer}>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.counterTitle, styles.tasksCreated]}>
              Criadas
            </Text>
            <View style={styles.counterNumberContainer}>
              <Text style={styles.counterNumber}>
                {tasksCreated}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.counterTitle, styles.tasksConcluded]}>
              Concluídas
            </Text>
            <View style={styles.counterNumberContainer}>
              <Text style={styles.counterNumber}>
                {tasksConcluded}
              </Text>
            </View>
          </View>

        </View>

        <FlatList
          data={tasksList}
          keyExtractor={ item => item.id }
          renderItem={({ item }) => (
            <Task
              text={item.text}
              completed={item.completed}
              onRemove={() => handleRemoveTask(item)}
              onConclude={() => handleConcludeTask(item)}
            />
          )}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.listEmpty}>
              <Image source={require('./src/images/Clipboard.png')} />
              <Text style={styles.listTitle}>Você ainda não tem tarefas cadastradas</Text>
              <Text style={styles.listSubtitle}>Crie tarefas e organize seus itens a fazer</Text>
            </View>
          }
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    width: '100%',
    alignItems: 'center',
    paddingTop: 100,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: -60,
    marginBottom: 40,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: '#262626',
    height: 60,
    fontSize: 18,
    color: '#FFF',
    padding: 20,
    marginRight: 5,
  },
  taskButton: {
    flexDirection: 'row',
    width: 60,
    height: 60,
    backgroundColor: '#1E6F9F',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workflowContainer: {
    flex: 7,
    backgroundColor: '#1A1A1A',
    width: '100%',
    alignItems: 'center',
    padding: 25,
  },
  countersContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  counterTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  counterNumberContainer: {
    borderRadius: 10,
    backgroundColor: '#333',
    color: '#D9D9D9',
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  counterNumber: {
    color: '#D9D9D9',
    fontWeight: 'bold'
  },
  tasksCreated: {
    color: '#4EA8DE',
  },
  tasksConcluded: {
    color: '#8284FA'
  },
  listEmpty: {
    borderTopWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    paddingTop: 50,
  },
  listTitle: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  listSubtitle: {
    color: '#808080',
    fontSize: 16,
  },
});