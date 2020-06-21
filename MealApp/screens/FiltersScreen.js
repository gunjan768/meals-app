import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import { setFilters } from '../store/actions/meals';

// import Colors from '../constants/Colors';
// import { useNavigation } from '@react-navigation/native';

const FilterSwitch = props => 
{
	return (
		<View style = { styles.filterContainer }>
			<Text>{ props.label }</Text>
			<Switch
				trackColor = {{ true: "lightgreen" }}
				thumbColor = { Platform.OS === 'android' ? "white" : '' }
				value = { props.state }
				
				// onValueChange will automatically send the value which is either true or false. If switch is closed then it will send
				// false and if open then sends true. You can't write like this : prop.onChange(anyValue) as value will be automatially 
				// sent. onValueChange property will be fired whenever the user clicks the switch.
				onValueChange = { props.onChange }
			/>
		</View>
	);
}

const FiltersScreen = props => 
{
	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);
	
	// useDispatch() provides the dispatch() function.
	const dispatch = useDispatch();

	// Here we have used useCallback() so that we don't get strucked in an infinite loop. It will work in the similiar manner as useEfect do.
	// It also takes a dependencies as a second argument same as useEffect. saveFilters() function will executes after : 1st it has to
	// be called as it is a user defined function , 2nd it will check the dependencies as it is wrapped by useCallback().
	const saveFilters = useCallback(() => 
	{
		const appliedFilters = 
		{
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			isVegetarian: isVegetarian
		};
		
		console.log("Applied Filters ",appliedFilters);

		dispatch(setFilters(appliedFilters));

	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

	useEffect(() => 
	{
		props.navigation.setParams({ save: saveFilters });

	}, [saveFilters]);
		
	useEffect(() => 
	{
		props.navigation.setOptions(configureHeaderBar(props))

	}, [props.route.params]);

	return (
		<View style = { styles.screen }>

			<Text style = { styles.title }>Available Filters / Restrictions</Text>

			<FilterSwitch
				label="Gluten-free"
				state = { isGlutenFree }
				onChange = { newValue => setIsGlutenFree(newValue) }
			/>

			<FilterSwitch
				label="Lactose-free"
				state = { isLactoseFree }
				onChange = { newValue => setIsLactoseFree(newValue) }
			/>

			<FilterSwitch
				label="Vegan"
				state = { isVegan }
				onChange = { newValue => setIsVegan(newValue) }
			/>

			<FilterSwitch
				label="Vegetarian"
				state = { isVegetarian }
				onChange = { newValue => setIsVegetarian(newValue) }
			/>

		</View>
	);
}

const configureHeaderBar = newProps =>
{	
	return (
	{
		headerTitle: 'Filter Meals',
		// headerLeft: (
		// 	<HeaderButtons HeaderButtonComponent = { HeaderButton }>
		// 		<Item
		// 		title="Menu"
		// 		iconName="ios-menu"
		// 		onPress =
		// 		{
		// 			() =>
		// 			{
		// 				navigation.toggleDrawer();
		// 			}
		// 		}
		// 	/>
		// 	</HeaderButtons>
		// ),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent = { HeaderButton }>
				<Item
					title="Save"
					iconName="ios-save"
					onPress = 
					{ 
						newProps.route.params != undefined ? 
							newProps.route.params.save 
						: 
							console.log("Sorry for this approach") 
					}
				/>
			</HeaderButtons>
		)
	});
}

const styles = StyleSheet.create(
{
	screen: 
	{
		flex: 1,
		alignItems: 'center'
	},
	title: 
	{
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center'
	},
	filterContainer: 
	{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 15
	}
})

export default FiltersScreen;
