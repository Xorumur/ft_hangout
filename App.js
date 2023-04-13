import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image,
  Platform,
} from 'react-native';
import Header from './src/components/Header'
import CreateContact from './src/view/createContact';
import EditContact from './src/view/editContact';
import ContactInfo from './src/components/contactInfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import DatabaseManager from './SQLITE';
import Homepage from './src/view/Homepage';

const Stack = createNativeStackNavigator();

export default function App() {
	try {
		DatabaseManager.initializeDatabase();
	} catch (error) {
		console.log('CREATE DB ERROR -> ', error);
	}
	return (
		<NavigationContainer>
			<SafeAreaView style={styles.container}>
				<Header />
				<Stack.Navigator 
					initialRouteName='Home'
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name="Home" component={Homepage} />
					<Stack.Screen name="Create" component={CreateContact} />
					<Stack.Screen name="Edit" component={EditContact} />
					{/* <Stack.Screen name="Add" component={AddContact} /> */}
				</Stack.Navigator>
				{/* <AddContact /> */}
			</SafeAreaView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});