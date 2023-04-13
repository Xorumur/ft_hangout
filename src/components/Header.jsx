import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const Header = () => {
	let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'white', 'dodgerblue', 'pink', 'brown', 'grey', 'gold', 'silver', 'cyan', 'magenta', 'lime', 'olive', 'maroon', 'navy', 'teal', 'aqua', 'fuchsia', 'indigo', 'violet', 'coral', 'crimson', 'hotpink', 'khaki', 'lavender', 'lavenderblush', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue']
	let [color, setColor] = useState('red');

	function changeColor(col) {
		setColor(col);
	}



    return (
		<View style={[style.container, {backgroundColor: color}]}>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				height: 50,
				backgroundColor: color,
				marginBottom: 10,
			}}>
				<Image style={{
					width: 70,
					height: 70,
					}}
					source={require('../../assets/test42.png')} />
				<Text>FT_HANGOUTS</Text>
			</View>
			<View style={{marginTop: 0}}>
				<ScrollView horizontal={true}>
					{colors.map((selected) => {
						return (
							<TouchableOpacity key={selected} onPress={() => changeColor(selected)}>
								<View 
									style={[style.square, {backgroundColor: selected}]}
									
								/>
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		</View>
    );
};


const style =  {
	container: {
		flexDirection: 'column',
	},
	square: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderColor: 'black',
		// borderRadisus: 5,
	}
}

export default Header;