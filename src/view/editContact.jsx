import React from 'react';
import { View, Text, TextInput, Button, Alert, Dimensions } from 'react-native';
import Datamanager from '../../SQLITE';
import { useState } from 'react';

const EditContact = (props) => {
	const { width, height } = Dimensions.get('window');
	const { contact } = props.route.params;
	let [newName, setN] = useState(contact.name);
	let [newLastname, setL] = useState(contact.lastname);
	let [newPhone, setP] = useState(contact.phone);

	const filtrerChiffres = (texteSaisi) => {
		// Filtrer les caractères non numériques et mettre à jour la valeur de l'état
		const regex = /[^0-9]/g;
		const chiffres = texteSaisi.replace(regex, '');
		setP(chiffres);
	};

	const handleCancel = () => {
		props.navigation.navigate('Home');
	};

	const handleSave = async () => {
		if (newName === '' && newLastname === '' && newPhone === '') {
			alert('Please fill at leeast one field');
			return;
		}
		try {
			console.log('New elem ->', contact.contact_id, newName, newLastname, newPhone);
			await Datamanager.update(contact.contact_id, newName, newLastname, newPhone);
		} catch (error) {
			console.log('ERR ->', error)
			alert('Error while updating contact');
		}
		props.navigation.navigate('Home');
	}

	const handleDelete = async () => {
		Alert.alert(
			'Confirmation',
			'Are you sure you want to proceed?',
			[
			  {
				text: 'No',
				onPress: () => console.log('No button pressed'),
				style: 'cancel'
			  },
			  {
				text: 'Yes',
				onPress: async () => {
					try {
						console.log('Delete elem ->', contact.contact_id)
						await Datamanager.delete(contact.contact_id);
					} catch (error) {
						console.log('ERR ->', error)
						alert('Error while deleting contact');
					}
					props.navigation.navigate('Home');
				}
			  }
			]
		);
	}

	return (
		<View style={{flex: 1, position: 'relative'}}>
			<View style={style.inputContainer}>
				<Text style={style.title}>Name</Text>
				<TextInput
					value={newName}
					maxLength={15}
					placeholder={contact.name}
					onChangeText={(texte) => {setN(texte)}}
					style={style.input}
				/>
				<Text style={style.title}>Lastname</Text>
				<TextInput
					value={newLastname}
					maxLength={15}
					placeholder={contact.lastname}
					onChangeText={(texte) => {setL(texte)}}
					style={style.input}
				/>
				<Text style={style.title}>Phone</Text>
				<TextInput
					value={newPhone}
					placeholder={contact.phone}
					style={style.input}
					maxLength={10}
					keyboardType="numeric"
					onChangeText={(texte) => filtrerChiffres(texte)}
				/>
			</View>
			<View style={[style.Banner, {width: width}]}>
				<Button style={style.button} title="Cancel" onPress={handleCancel}/>
				<Button style={style.button} title="Save" onPress={handleSave}/>
				<Button style={style.button} title="Delete" onPress={handleDelete}/>
			</View>
		</View>
	);
};

const style = {
	inputContainer:{
		flexDirection: 'column',
		paddingLeft: 50,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
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
	button: {
		borderColor: 'black',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	title: {
		fontSize: 20,
		marginTop: 20,
	},
	input: {
		borderWidth: 1,
		width: 100,
		borderRadius: 5,
	}
};

export default EditContact;