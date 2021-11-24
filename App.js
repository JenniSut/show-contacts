import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View,Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);
  const [contactList, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
      if (data.length > 0) {
          setContacts(data)
          console.log(contacts);
        }
        
      }
    })();
  }, []);

  const setContacs = () => {
    setList(contacts)
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <FlatList
          keyExtractor={contact => contact.id.toString()}
          renderItem={({ item }) => <View><Text style={{ textAlign: 'center' }}>{item.name}: {item.phoneNumbers[0].number}</Text>
          </View>}
          data={contactList}
        />
      </View>
      <Button title='Get contacts' onPress={setContacs} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  }
});
