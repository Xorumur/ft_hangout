import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import Header from './Header';
import DatabaseManager from '../../SQLITE';

const ContactInfo = (props) => {
	// console.log('Navigation ->', navigation);
	const handlePress = () => {
		props.navigation.navigate('Edit', {contact: props.contact});
	}
	// console.log('Contact ->', props);
	return (
		<View style={style.Banner}>
			<Text style={style.Name}>{props.contact.name}</Text>
			<View style={{justifyContent: 'flex-end'}}>
				<TouchableOpacity onPress={handlePress}>
					<Feather name="settings" size={24} color="black" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const style = {
	Banner: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
		backgroundColor: 'gray',
		borderRadius: 10,
		height: 100,
		padding: 5,
	},
	Name: {
		color: 'white',
		fontSize: 40,
	},
	Setting: {
		opacity: 1,
		width: 150,
		height: 150,
	}
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
  });

export default ContactInfo;