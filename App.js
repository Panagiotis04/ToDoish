import React, {useState} from 'react';
import { 
        View, 
        Text, 
        Button,
        StyleSheet,
        Modal,
        KeyboardAvoidingView,
        TextInput,
        Pressable,
        Keyboard,
        TouchableOpacity,
       } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import 'react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Task from './Task';
import Order from './Order';

import DateTimePicker from '@react-native-community/datetimepicker';

function Tasks({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDisabled, setDisabled] = useState(true)

  const haddleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null);
  }  

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const multFuncEx = () => {
    haddleAddTask();
    setModalVisible(!setModalVisible)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View >
          {/* Title */}
          {/* <Text style={styles.sectionTitle} >Tasks</Text> */}
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
      {/* Create task popup */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Task</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              // style={styles.writeTaskWrapper}
            >
              <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={t => setTask(t)} />
              <Pressable style={[styles.button, styles.buttonSaveTask]} disabled={false} onPress={() => multFuncEx()}>
                <Text style={styles.textStyle}>+</Text>
                {/* <View>
                  <Text style={styles.addText}></Text>
                </View> */}
              </Pressable>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
      {/* + Button */}
      <View style={styles.bottomPlace}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
      </View>
      
    </View>
  );
}

export const Orders = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateItems, setDateItems] = useState([new Date(), new Date()]);
  
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate)
    setDateItems([currentDate, dateItems[1]]);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate)
    setDateItems([dateItems[0], currentDate]);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const haddleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null);
  }  

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const multFuncEx = () => {
    haddleAddTask();
    setModalVisible(!setModalVisible)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View >
          {/* Title */}
          {/* <Text style={styles.sectionTitle} >Tasks</Text> */}
          {/* Tasks */}
          <View style={styles.item}>
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Order 
                      text={item} 
                      date1={dateItems[0].getDate() + '-' + dateItems[0].getMonth()} 
                      date2={dateItems[1].getDate() + '-' + dateItems[1].getMonth()} /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </View>
      {/* Create task popup */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create Task</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              // style={styles.writeTaskWrapper}
            >
              <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={t => setTask(t)} />
              <View>
                <Text>Order Date: {date.toLocaleString()}</Text>
                <DateTimePicker
                  testID="dateTimePicker1"
                  value={dateItems[0]}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange1}
                />
                <Text>Estimate Arrival: </Text>
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={dateItems[1]}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange2}
                  minimumDate={dateItems[0]}
                />
              </View>
              <View>
              <Pressable style={styles.buttonSaveTask} onPress={() => multFuncEx()}>
                <Text style={styles.textStyle}>+</Text>
              </Pressable>
              <Pressable style={styles.buttonCloseTask} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>x</Text>
              </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
      {/* + Button */}
      <View style={styles.bottomPlace}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
      </View>
      
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      // useLegacyImplementation = {false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="Tasks" component={Tasks} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer>
      </MyDrawer>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    position: 'relative',
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
  bottomPlace: {
    justifyContent: 'center',
    alignItems: 'baseline',
    position: 'absolute',
    marginLeft: '80%',
    bottom: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    // marginTop: 22
  },
  modalView: {
    margin: 40,
    width: '90%',
    height: '90%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 0,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    position: 'relative'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonSaveTask: {
    width: 150,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 450,
    marginLeft: 150,
  },
  buttonCloseTask: {
    width: 150,
    height: 60,
    borderRadius: 5,
    bottom: 0,
    backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center"
  },
});
