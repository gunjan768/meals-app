import React, { useLayoutEffect } from 'react';

import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => 
{
	const catId = props.route.params.categoryId;

	const availableMeals = useSelector(state => state.meals.filteredMeals);

	// categoryIds is an array. See 'dummy-data' and 'MealList' pages for clearance. 
	const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0 );
	
	useLayoutEffect(() => 
	{
		props.navigation.setOptions(configureHeaderBar(props))

	},[props.navigation]);

	if(!displayedMeals.length) 
	{
		return (
			<View style = { styles.content }>
				<DefaultText>No meals found, maybe check your filters..??</DefaultText>
			</View>
		);
	}

	return <MealList listData = { displayedMeals } navigation = { props.navigation } />;
}

const configureHeaderBar = newProps =>
{
	const catId = newProps.route.params.categoryId;
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

	return (
	{
		headerTitle: selectedCategory.title
	});
}

const styles = StyleSheet.create(
{
	screen:
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: 
	{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default CategoryMealScreen;