import React, { useEffect, Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useState } from 'react';
import ContactInfo from '../components/contactInfo';
import DatabaseManager from '../../SQLITE';
import { useIsFocused } from '@react-navigation/native';

const Homepage = ({ navigation }) => {
	const { width, height } = Dimensions.get('window');
	let [contacts, setContacts] = useState([]);
	let key = 0;
	const isFocused = useIsFocused();

	async function getContacts() {
		try {
		  const result = await DatabaseManager.getAllContact();
		//   console.log('Result useeffects ->', result);
		  setContacts(result);
		} catch (error) {
		  console.log('ERROR ->', error);
		}
	}

	useEffect(() => {
		if (isFocused) {
			getContacts();
		}
	  }, [isFocused]);


	return (
		<View style={style.container}>
			<View style={{paddingBottom: style.Banner.height}}>
				<ScrollView>
					{contacts.map((contact, Set) => {
						console.log('Contact name->', contact);
						return (
							<ContactInfo  key={key++} navigation={navigation} contact={contact} />
						);
					})}
				</ScrollView>
			</View>
			<View style={[style.Banner, {width: width}]}>
				<TouchableOpacity style={{width: width, alignItems: 'center'}} onPress={() => {navigation.navigate('Create')}}>
					<View>
						<Text style={style.Create}>Create</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const style = {
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#FD3A73',
		position: 'relative',
	},
	Banner: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		borderWidth: 1,
		borderColor: 'black',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff'
	},
	Create: {
		fontSize: 20,
	}
}

export default Homepage;