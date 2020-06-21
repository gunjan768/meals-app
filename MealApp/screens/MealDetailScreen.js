import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => 
{
	return (
		<View style = { styles.listItem }>
			<DefaultText>{ props.children }</DefaultText>
		</View>
	);
}
  
const MealDetailScreen = props => 
{
	const mealId = props.route.params.mealId;
	const availableMeals = useSelector(state => state.meals.meals);
	
	// some() is an alternative for find() function. You can use any one of them.
	const currentMealIsFavorite = useSelector(state =>
	  	state.meals.favoriteMeals.some(meal => meal.id === mealId)
	);
  
	const selectedMeal = availableMeals.find(meal => meal.id === mealId);
  
	const dispatch = useDispatch();
		
	// Here we have used useCallback() so that we don't get struck in infinite loop. It will work in the similiar manner as useEfect do. It 
	// also takes a dependencies as a second argument same as useEffect. toggleFavoriteHandler() function will executes after : 1st it has to
	// be called as it is a user defined function , 2nd it will check the dependencies as it is wrapped by useCallback().
	const toggleFavoriteHandler = useCallback(() => 
	{
		dispatch(toggleFavorite(mealId));
		  
	}, [dispatch, mealId]);
  
	useEffect(() => 
	{
		props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
		  
	}, [toggleFavoriteHandler]);
	
	useEffect(() => 
	{ 
		props.navigation.setParams({ isFav: currentMealIsFavorite });

	}, [currentMealIsFavorite]);

	useLayoutEffect(() => 
	{ 
		props.navigation.setOptions(configureHeaderBar(props));

	}, [props.route.params]);

	return (
		<ScrollView>
			
			<Image source = {{ uri: selectedMeal.imageUrl }} style = { styles.image } />

			<View style = { styles.details }>
				<DefaultText>{ selectedMeal.duration }min</DefaultText>
				<DefaultText>{ selectedMeal.complexity.toUpperCase() }</DefaultText>
				<DefaultText>{ selectedMeal.affordability.toUpperCase() }</DefaultText>
			</View>

			<Text style = { styles.title }>Ingredients</Text>

			{
				selectedMeal.ingredients.map(ingredient => (
					<ListItem key = { ingredient }>{ ingredient }</ListItem>
				))
			}

			<Text style = { styles.title }>Steps</Text>
				{
					selectedMeal.steps.map(step => (
						<ListItem key = { step }>{ step }</ListItem>
					))
				}

		</ScrollView>
	);
}

// popToTop() method will send back to the page which is at top of the stack i.e to the starting page.
const configureHeaderBar = newProps => 
{	
	const mealTitle = newProps.route.params.mealTitle;
	const toggleFav = newProps.route.params.toggleFav;
	const isFavorite = newProps.route.params.isFav; 
	
	return (
	{
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent = { HeaderButton }>
				<Item
					title="Favorite"
					iconName = { isFavorite ? 'ios-star' : 'ios-star-outline' }
					onPress = 
					{ 
						newProps.route.params.toggleFav != undefined ? 
							newProps.route.params.toggleFav 
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
	image: 
	{
		width: '100%',
		height: 200
	},
	details:
	{
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	title: 
	{
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	listItem: 
	{
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
})
  
export default MealDetailScreen;