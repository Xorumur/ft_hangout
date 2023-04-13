import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

class Props {
	label;
}

const Dropdown = ({label}) => {
	let [visible, setV] = useState(false);

	const Dropdown = () => {
		setV(!visible);
		console.log(visible);
	};

	const renderDropdown = () => {
		if (visible) {
			return (
				<View style={style.dropdown}>
					<Text>Dropdown</Text>
				</View>
			);
		}
	};

	return (
		<TouchableOpacity onPress={Dropdown} style={style.button}>
			{renderDropdown()}
			<Feather name="settings" size={24} color="black" />
		</TouchableOpacity>
	);
	
};

const style = {
	button : {
		width: '100%',
	},
	dropdown: {
		position: 'absolute',
		backgroundColor: '#fff',
		top: 50,
	},
}

export default Dropdown;