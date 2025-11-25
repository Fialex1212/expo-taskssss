import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState<{ text: string; done: boolean }[]>([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task.trim(), done: false }]);
      setTask("");
    }
  };

  const toggleTaskDone = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const toggleModal = (index: number) => {
    setSelectedTaskIndex(index);
    setModalVisible(!modalVisible);
  };

  const deleteTask = () => {
    if (selectedTaskIndex !== null) {
      const newTasks = tasks.filter((_, i) => i !== selectedTaskIndex);
      setTasks(newTasks);
      setModalVisible(false);
      setSelectedTaskIndex(null);
    }
  };

  return (
    <ScrollView bounces={false} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Taskssss</Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontSize: 12,
          color: "#8f8e8eff",
        }}
      >
        Task managment app
      </Text>
      <View>
        <TextInput
          placeholder="Create a new task"
          value={task}
          onChangeText={setTask}
          style={styles.textInput}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {tasks.map((task, index) => (
          <Pressable key={index} onLongPress={() => toggleModal(index)}>
            <Modal
              animationType="fade"
              transparent
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                  <Text style={{ fontSize: 16, marginBottom: 20 }}>
                    Actions with task
                  </Text>

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={deleteTask}
                  >
                    <Text style={{ color: "#fff" }}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#999" }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: "#fff" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View
              style={[
                styles.card,
                { backgroundColor: task.done ? "#3826bdff" : "#4630EB" },
              ]}
            >
              <Text
                style={[
                  styles.cardText,
                  { textDecorationLine: task.done ? "line-through" : "none" },
                  { opacity: task.done ? 0.6 : 1 },
                ]}
              >
                {task.text}
              </Text>
              <Checkbox
                value={task.done}
                onValueChange={() => toggleTaskDone(index)}
                color={task.done ? "#30eb40ff" : undefined}
                style={styles.checkBox}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    paddingBottom: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4630EB",
  },
  textInput: {
    height: 44,
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 8,
    borderColor: "#4630EB",
    color: "#000",
  },
  button: {
    backgroundColor: "#4630EB",
    height: 44,
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardsContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#4630EB",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: 300,
    width: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    color: "#fff",
    maxWidth: "80%",
  },
  checkBox: {
    marginLeft: 10,
    borderColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#4630EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
});
