import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
// import { useScreens } from 'react-native-screens';

import MealsNavigator from './navigation/MealsNavigator';
// import { NavigationContainer } from '@react-navigation/native';

// Speaking of efficiency there is one thing you can do regarding react navigaton is to use useScreens() which ensures that under the hood react
// naviagtion uses react native screen components provided android and ios. In android it uses fragments and in ios it uses UI View controllers. 
// useScreens();

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import mealsReducer from './store/reducers/meals';

const rootReducer = combineReducers(
{
	meals: mealsReducer
})
  
const store = createStore(rootReducer);

const fetchFonts = () => 
{
	return Font.loadAsync(
	{
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
}

export default function App() 
{
	const [fontLoaded, setFontLoaded] = useState(false);

	if(!fontLoaded) 
	{
		return (
			<AppLoading
				startAsync = { fetchFonts }
				onFinish = { () => setFontLoaded(true) }
			/>
		);
	}

	return (
		<Provider store = { store }>
			<MealsNavigator />
		</Provider>
  	);
}