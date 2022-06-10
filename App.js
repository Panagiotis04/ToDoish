import React, {useState, useEffect} from 'react';
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
        Image,


       } from 'react-native';

import Task from './Task';
import Order from './Order';

import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function Tasks({ navigation }) {
  const [task, setTask] = useState({
    title: "",
    important: false,
    ergent: false,
    points: 1,
  });
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreItems, setScoreItems] = useState([]);

  const TASK_1 = {
    title: 'Task 1',
    important: true,
    ergent: false,
    points: 2
  }

  const getMyObject = async () => {
    try {
      
      const jsonValue = await AsyncStorage.getItem('task1')
      console.log('I read this: ' + jsonValue)
      setTaskItems([JSON.parse(jsonValue)])
      return JSON.parse(jsonValue)
    } catch(e) {
      // read error
    }
    console.log('read.')
  }

  // const getMyStringValue = async () => {
  //   try {
  //     return await AsyncStorage.getItem('@key')
  //   } catch(e) {
  //     // read error
  //   }

  //   console.log('Done.')
  // }

  const setObjectValue = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(jsonValue)
      if(jsonValue !== null) await AsyncStorage.setItem('task1', jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('saved.')
  }

  // const setStringValue = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('key', value)
  //   } catch(e) {
  //     // save error
  //   }
  
  //   console.log('Done.')
  // }

  useEffect(() => {
    getMyObject()
  }, [])

  const haddleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setScoreItems([...scoreItems, score])
    setObjectValue(task)
    setTask({
      title: "",
      important: false,
      ergent: false,
      points: 1,
    })
  }  

  const completeTask = (index) => {
    setScore(taskItems[index].points + score)
    navigation.setOptions({headerRight: () =>
      <View style={styles.scoreView}>
        <Image source={require('./assets/thunder.png')} style={{height: 20, width: 20}}></Image>
        <Text style={{fontWeight: 'bold'}}>{taskItems[index].points + score}</Text>
      </View>
    })
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  const multFuncEx = () => {
    haddleAddTask();

    setModalVisible(!setModalVisible)
  }

  const updateTitle = (t) => {
    setTask(previousState => {
      return { ...previousState, title: t }
    });
  }

  const updateErgency = (e, p) => {
    setTask(previousState => {
      return { ...previousState, ergent: !e, points: !e === true ? p + 2 : p - 2}
    });
  }

  const updateImportance = (i, p) => {
    setTask(previousState => {
      return { ...previousState, important: !i, points: !i === true ? p + 1 : p - 1}
    });
  }

  const iconsNames = ['biking', 'boxing', 'gym', 'notes', 'notFound']

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.item}>
            { 
              taskItems.sort(function(a, b) {
                if(a.points > b.points) 
                  return -1;
                else 
                  return 1;

              })
              .map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task 
                      text={item.title} 
                      image={item.title.split(" ").filter(x => iconsNames.includes(x.toLowerCase())).concat(['notFound'])[0].toLowerCase()} 
                      ergent={item.ergent === true ? 'ergent' : (item.ergent === false && item.important === true) ? 'important' : 'whiteIcon'}
                      important={item.ergent === true && item.important === true ? 'important' : 'whiteIcon'}
                      points={item.points}
                    /> 
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
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
              style={styles.keyboardView}
            >
              <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={t => updateTitle(t)} />
              </View>

              <View style={styles.ergentImportantView}>
                <Pressable style={styles.ergentPressable} onPress={() => updateErgency(task.ergent, task.points)}>
                  <Image source={task.ergent === true ? require('./assets/ergent.png') : require('./assets/notErgent.png')} style={styles.ergentIcon} />
                </Pressable>
                <Pressable style={styles.importantPressable} onPress={() => updateImportance(task.important, task.points)}>
                  <Image source={task.important === true ? require('./assets/important.png') : require('./assets/notImportant.png')} style={styles.importantIcon} />
                </Pressable>
              </View>

              <View style={styles.taskCreationView}>
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

export const Orders = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [store, setStore] = useState();
  const [storeItems, setStoreItems] = useState([]);

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
    setStoreItems([...storeItems, store])
    setStore(null);
    setTask(null);
  }  

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let storesCopy = [...storeItems];
    itemsCopy.splice(index, 1);
    storesCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setStoreItems(storesCopy);
  }

  const multFuncEx = () => {
    haddleAddTask();
    setModalVisible(!setModalVisible)
  }

  const iconsNames = ['albert', 'amazon', 'notFound']

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <ScrollView style={styles.scrollView}>
          <View >
            <View style={styles.item}>
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Order 
                        text={item} 
                        date1={dateItems[0].getDate() + '-' + dateItems[0].getMonth()} 
                        date2={dateItems[1].getDate() + '-' + dateItems[1].getMonth()}
                        image={storeItems[index].split(" ").filter(x => iconsNames.includes(x.toLowerCase())).concat(['notFound'])[0].toLowerCase()} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>  
          </View>
        </ScrollView>
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
            <Text style={styles.modalText}>Create Order</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={t => setTask(t)} />
              <TextInput style={styles.input} placeholder={'Write store name'} value={store} onChangeText={o => setStore(o)} />
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

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Homestack" component={Tasks}  options={({navigation}) => ({
      title: "Tasks",
      headerStyle: {
        backgroundColor: "rgb(0, 145, 234)",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "white",
      },
      headerRight: () => (
        <View style={styles.scoreView}>
          <Image source={require('./assets/thunder.png')} style={{height: 20, width: 20}}></Image>
          <Text style={{fontWeight: 'bold'}}>0</Text>
        </View>
        ),
    })} initialParams={{id: "Test 1"}}/>
      <Drawer.Screen name="Orders" component={Orders} />
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
    paddingTop: 30,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingTop: 60,
    marginHorizontal: 0,
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    flex: 1,
    marginTop: -70,
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
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
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
  headerButton: {
    width: 1,
    height: 1,
  },
  buttonSaveTask: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    position: 'relative',
    // marginTop: 450,
    // marginLeft: 150,
  },
  buttonCloseTask: {
    width: 60,
    height: 60,
    borderRadius: 5,
    bottom: 0,
    backgroundColor: 'red',
    position: 'relative',
    justifyContent: 'center',
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
    textAlign: "center",
    alignItems: 'center',
  },
  inputView: {
    position: 'relative',
  },
  importantIcon: {
    position: 'relative',
    height: 50,
    width: 50,
  },
  importantPressable: {
    position: 'relative',
    justifyContent: 'center',
  },
  ergentIcon: {
    position: 'relative',
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  ergentPressable: {
    position: 'relative',
    justifyContent: 'center',
  },
  keyboardView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 50,
  },
  ergentImportantView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },  
  taskCreationView: {
    position: 'relative',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
  },
  scoreView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0,
    marginLeft: 10,
  },

});
