import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView } from 'react-native';

import React, {useState} from 'react';
import Task from './components/Task'

function App(props) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const haddleAddTask = () => {
    setTaskItems([...taskItems, task])
    setTask(null);
    console.log(taskItems)
  }  

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View >
          {/* Title */}
          <Text style={styles.sectionTitle} >Tasks</Text>
          {/* Tasks */}
          <View style={styles.item}>
            {
              taskItems.map((item) => {
                <Task text={item} /> 
              })
            }
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={t => setTask(t)} />
        <TouchableOpacity onPress={() => haddleAddTask()}>
          <View style={styles.addWrappper}>
            <Text style={styles.addText}></Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 30,
  },
  createTask: {
    backgroundColor: 'red',
    fontStyle: 'italic'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrappper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
});
