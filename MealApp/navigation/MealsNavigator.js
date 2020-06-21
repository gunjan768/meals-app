import React from 'react';
import { Platform, Text, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

  
const Stack = createStackNavigator();
const StackNext = createStackNavigator();
const FilterStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const BottomTab = createBottomTabNavigator();
const MaterialBottomTab = createMaterialBottomTabNavigator();


const defaultStackNavOptions = (navigation, route) => 
{
	return (
	{	
		// headerTitle: "Home Screen",
		headerStyle: 
		{
			backgroundColor: Platform.OS === 'android' ? "tomato" : '',
		},
		headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primaryColor,
		headerTitleStyle: 
		{
			fontFamily: 'open-sans-bold'
		},
		headerBackTitleStyle: 
		{
			fontFamily: 'open-sans'
		},
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent = { HeaderButton }>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress = { () => { navigation.toggleDrawer() }}
				/>
			</HeaderButtons>
		)
	})
}

const MyTheme = 
{
	dark: false,
	colors: 
	{
		primary: 'rgb(255, 45, 85)',
		background: 'rgb(242, 242, 242)',
		card: 'rgb(255, 255, 255)',
		text: 'rgb(28, 28, 30)',
		border: 'rgb(199, 199, 204)',
	}
};

const mixtureComponents = props =>
{
	const MealsNavigator = () =>
	{
		return (
			<Stack.Navigator 
				initialRouteName="Categories"
				screenOptions = { ({navigation, route}) => 
				{
					return defaultStackNavOptions(navigation, route);
				}}
			>
				<Stack.Screen 
					name="Categories" 
					component = { CategoriesScreen } 
					// mode = "modal"
					options = { ({navigation, route}) => 
					({ 
						title: 'Home Screen', 
						
						// You can put it either in Left or Right for each individual screen. 

						// headerRight: () =>
						// {
						// 	return (
						// 		<Button
						// 			style = { styles.ButtonStyle }
						// 			onPress = { () => alert('This is a button !') }
						// 			title="Info"
						// 		/>
						// 	)
						// }
						// headerLeft: () => (
						// 	<HeaderButtons HeaderButtonComponent = { HeaderButton }>
						// 		<Item
						// 			title="Menu"
						// 			iconName="ios-menu"
						// 			onPress = { () => { navigation.toggleDrawer() }}
						// 		/>
						// 	</HeaderButtons>
						// )
						// headerTransparent: true,
					})}
				/>
				<Stack.Screen name="CategoryMeals" component = { CategoryMealsScreen }/>
				<Stack.Screen name="MealDetail" component = { MealDetailScreen } />

			</Stack.Navigator>
		);
	}

	const FavNavigator = () =>
	{
		return (
			<StackNext.Navigator 
				initialRouteName="Favorites" 
				screenOptions = { ({navigation, route}) => 
				{
					return defaultStackNavOptions(navigation, route);
				}}
			>

				<StackNext.Screen 
					name="Favorites" 
					component = { FavoritesScreen } 
					
					// If you want to hamburger sign for this particular screen then use 'options' prop. Just uncomment the code and 
					// remove 'screenOption' from StackNext.Navigator to see the effect.

					// options = { ({navigation, route}) => 
					// ({ 
					// 	headerLeft: () => (
					// 		<HeaderButtons HeaderButtonComponent = { HeaderButton }>
					// 			<Item
					// 				title="Menu"
					// 				iconName="ios-menu"
					// 				onPress = { () => { navigation.toggleDrawer() }}
					// 			/>
					// 		</HeaderButtons>
					// 	)
					// 	// headerTransparent: true,
					// })}
				/>
				<StackNext.Screen name="MealDetail" component = { MealDetailScreen } />				  

			</StackNext.Navigator>
		);
	}
	
	const FiltersNavigator = () =>
	{
		return (
			<FilterStack.Navigator 
				initialRouteName="Filters" 
				screenOptions = { ({navigation, route}) => 
				{
					return defaultStackNavOptions(navigation, route);
				}}
			>

				<FilterStack.Screen name="Filters" component = { FiltersScreen } />		  
			
			</FilterStack.Navigator>
		);
	}

	const MealsFavTabNavigator = () =>
	{
		return (
			Platform.OS === 'android' ?
				<MaterialBottomTab.Navigator 
					initialRouteName="Meals"
					
					// activeColor is the color of the active tab's text color.
					activeColor="orange"

					inactiveColor="#3e2465"
					shifting
					barStyle =
					{{
						backgroundColor: Colors.primaryColor,
						// paddingBottom: 
					}}
				>
					
					<MaterialBottomTab.Screen 
						name="Meals" 
						component = { MealsNavigator }
						options = 
						{{
							title: "Meals Screen",

							// Color for the tab bar when the tab corresponding to the screen is active. Used for the ripple effect. This is 
							// only supported when shifting is true.
							tabBarColor: Colors.primaryColor,

							tabBarIcon: tabInfo => <Ionicons name="ios-restaurant" size = { 25 } color = { tabInfo.tintColor } />,
							tabBarLabel:
								Platform.OS === 'android' ? 
									<Text style = {{ fontFamily: 'open-sans-bold' }}>Meals</Text>
								: 
									'Meals',
						}}
					/>

					<MaterialBottomTab.Screen 
						name="Favorites" 
						component = { FavNavigator }
						options = 
						{{
							title: "Meals Screen",
							tabBarColor: Colors.accentColor,
							tabBarIcon: tabInfo => <Ionicons name="ios-star" size = { 25 } color = { tabInfo.tintColor } />,
							tabBarLabel:
								Platform.OS === 'android' ? 
									<Text style = {{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
								: 
									'Favorites',
						}}
					/>

				</MaterialBottomTab.Navigator>
			:
				<BottomTab.Navigator
					tabBarOptions =
					{{
						labelStyle: 
						{
							fontFamily: 'open-sans'
						},
						activeTintColor: Colors.accentColor,
					}}
				>
					<BottomTab.Screen 
						name="Meals" 
						component = { MealsNavigator }
						options = 
						{{
							title: "Meals Screen",
							tabBarColor: Colors.primaryColor,
							tabBarIcon: tabInfo => <Ionicons name="ios-restaurant" size = { 25 } color = { tabInfo.tintColor } />,
							tabBarLabel:
								Platform.OS === 'android' ? 
									<Text style = {{ fontFamily: 'open-sans-bold' }}>Meals</Text>
								: 
									'Meals',
						}}
					/>

					<MaterialBottomTab.Screen 
						name="Favorites" 
						component = { FavNavigator }
						options = 
						{{
							title: "Meals Screen",
							tabBarColor: Colors.accentColor,
							tabBarIcon: tabInfo => <Ionicons name="ios-star" size = { 25 } color = { tabInfo.tintColor } />,
							tabBarLabel:
								Platform.OS === 'android' ? 
									<Text style = {{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
								: 
									'Favorites',
						}}
					/>

				</BottomTab.Navigator>
		);
	}
	
	const MainNavigator = (
		<Drawer.Navigator
			initialRouteName="MealsFavs"
			drawerStyle =
			{{
				backgroundColor: '#c6cbef',
				width: 240,
			}}
			drawerContentOptions =
			{{
				activeTintColor: Colors.accentColor,
				labelStyle: 
				{
					fontFamily: 'open-sans-bold'
				}
			}}
		>

			<Drawer.Screen 
				name="MealsFavs" 
				component = { MealsFavTabNavigator }
				options =
				{{
					// drawerLabel will overwrite the 'name' prop. If drawerLabel is not mentioned then automatically name will be considered
					// according to the 'name' prop.
					drawerLabel: 'Meals'
				}}
			/>

			<Drawer.Screen 
				name="Filters" 
				component = { FiltersNavigator }
				options =
				{{
					// drawerLabel will overwrite the 'name' prop. If drawerLabel is not mentioned then automatically name will be considered
					// according to the 'name' prop.
					drawerLabel: 'Filters'
				}}
			/>

		</Drawer.Navigator>
	);
	
	// useColorScheme() is a functional hook which returns 'dark' or 'light' depending on your Operating System.
	const scheme = useColorScheme();
	
	return (
		<AppearanceProvider>
			<NavigationContainer theme = { scheme === 'dark' ? DarkTheme : DefaultTheme } >
				{ MainNavigator }
			</NavigationContainer>
		</AppearanceProvider>
	);
}

const styles = StyleSheet.create(
{
	ButtonStyle:
	{
		width: 130
	}
})

export default mixtureComponents;