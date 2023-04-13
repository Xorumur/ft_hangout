import React from 'react';
import { 
	View, 
	Text, 
	TextInput,
	Button,
	Dimensions,
} from 'react-native';
import { useState } from 'react';
import DatabaseManager from '../../SQLITE';

const CreateContact = ({ navigation }) => {
	const filtrerChiffres = (texteSaisi) => {
	  // Filtrer les caractères non numériques et mettre à jour la valeur de l'état
	  const regex = /[^0-9]/g;
	  const chiffres = texteSaisi.replace(regex, '');
	  setPhone(chiffres);
	};

	const { width, height } = Dimensions.get('window');
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [phone, setPhone] = useState('');
	const [contact, setContact] = useState([]);

	const saveContact = async () => {
		if (name === '' || lastname === '' || phone === '') {
			alert('Please fill all the fields');
			return;
		}
		try  {
			console.log(name, lastname, phone);
			// await DatabaseManager.createContact(name, lastname, phone);
			DatabaseManager.insert('contacts', 'name, lastname, phone', [name, lastname, phone]);
			// console.log('Contact created');
		} catch (error) {
			console.log('ERROR ->', error);
		}
		//await DatabaseManager.getAllContact().then((result) => {console.log(result);});
		navigation.navigate('Home');
	};

	return (
		<View style={{
			flex: 1,
			flexDirection: 'column',
			// justifyContent: 'center',
			// alignItems: 'center',
			paddingLeft: 50,
		}}>
			<Text>Name</Text>
			<TextInput
				value={name}
				maxLength={15}
				placeholder="Name"
				style={style.input}
				onChangeText={(texte) => {setName(texte)}}
			/>
			<Text>Lastname</Text>
			<TextInput
				value={lastname}
				maxLength={15}
				placeholder="Lastname"
				style={style.input}
				onChangeText={(texte) => {setLastname(texte)}}
			/>
			<Text>Phone Number</Text>
			<TextInput
				style={style.input}
				maxLength={10}
				keyboardType="numeric"
				type="number"				
				value={phone}
				onChangeText={(texte) => filtrerChiffres(texte)}
			/>
			<View style={[style.Banner, {width: width}]}>
				<Button
					title="Cancel"
					onPress={() => {navigation.navigate('Home');}}
				/>
				<Button
					title="Create"
					onPress={saveContact}
				/>
			</View>
		</View>
	);
};

const style =  {
	input: {
		borderWidth: 1,
		borderColor: 'black',
		width: 100,
		borderRadius: 5,
	},
	Banner: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 50,
		borderWidth: 1,
		borderColor: 'black',
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff'
	},
};

export default CreateContact;