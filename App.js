import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableNativeFeedback, View, StatusBar as RNStatusBar, FlatList, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function App() {
  const [visibleSubmitForm, setvisibleSubmitForm] = useState(false);
  const [notes, setNotes] = useState([]);

  const onFormCancelled = () => {
    console.log("Note form cancelled by used");
    setvisibleSubmitForm(false);
  };

  const onFormSubmitted = (note) => {
    console.log(`Note submitted by user and note is ${note}`);
    setNotes((currentNotes) => {
      return [...currentNotes, { key: currentNotes.length, data: note }];
    })
    setvisibleSubmitForm(false);
  };

  const onNoteDelete = (note) => {
    setNotes((currentNotes) => {
      return currentNotes.filter((item) => item.key != note.key);
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addNote}>
        <Button title='Add Note' onPress={() => {
          setvisibleSubmitForm(true)
          console.log("Add Button Pressed......");
        }} />
      </View>

      <FlatList data={notes} renderItem={({ item, index }) => {
        return <View style={noteItemStyle.item}>
          <Text>{item.data}</Text>
          <TouchableOpacity onPress={() => { onNoteDelete(item) }}>
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      }} />
      <FormModal visible={visibleSubmitForm} onFormCancelled={onFormCancelled} onFormSubmitted={onFormSubmitted} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: RNStatusBar.currentHeight + 25
  },
  addNote: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24
  }
});


const noteItemStyle = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    margin: 8,
    marginBottom: 0
  }
})

function FormModal(props) {
  const [note, setNote] = useState("");
  const formCancelled = () => {
    setNote("");
    console.log("Note cancelled");
    props.onFormCancelled();
  };

  const formSubmitted = (note) => {
    setNote("");
    console.log("Note Submitted");
    props.onFormSubmitted(note);
  };

  return (<Modal visible={props.visible}>
    <View style={formModalStyle.container}>
      <TextInput placeholder='Enter note' style={formModalStyle.input} value={note} onChangeText={setNote} />
      <View style={formModalStyle.noteSubmitOption}>
        <Button title='Cancel' onPress={formCancelled} />
        <Button title='Submit' onPress={() => formSubmitted(note)} />
      </View>
    </View>
  </Modal>);
}

const formModalStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25
  },
  input: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1
  },
  noteSubmitOption: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'space-between'
  }
})
