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
  Keyboard,
  Image,
  Modal,
  SafeAreaView } from 'react-native';

import React, {useState} from 'react';
import Task from './components/Task'

const CreateTaskPopup = ({visible, childre}) => {
  const [showModal, setShowModal] = useState(visible)
  return <Modal transparent visible={true}>
    <View style={styles.createTaskBackground}>
      <View style={styles.taskContainer}></View>
    </View>
  </Modal>
};

function App(props) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [visible, setVisible] = useState(false);


  const haddleAddTask = () => {
    // Keyboard.dismiss()
    // setTaskItems([...taskItems, task])
    // setTask(null);
  }  

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
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
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </View>

      <CreateTaskPopup visible={visible}>
        <View style={{alignItems: 'center}'}}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={{height: 20, width: 20}} />
          </View>
        </View>
      </CreateTaskPopup>
      <Button title='Popup' onPress={() => setVisible(true)} />

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
  },
  createTaskBackground: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '50%',
  },
  taskContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 50,
    borderRadius: 20,
    elevation: 20,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
});
