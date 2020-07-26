import React, {Component,useEffect} from 'react';
import {View,Text,Platform, StatusBar} from 'react-native';
import SplashScreen  from 'react-native-splash-screen';


import Feed from './Screens/Feed';
import Detail from './Screens/Detail';
import Tab1 from './Screens/Tab1';
import Tab2 from './Screens/Tab2';
import Tab3 from './Screens/Tab3';

import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';
import Screen3 from './Screens/Screen3';

import InStockNavigate from './Screens/InStockNavigate';
import InStockDetails from './Screens/InStockDetails';
import ExpenditureDetails from './Screens/ExpenditureDetails';
import IncomeDetails from './Screens/IncomeDetails';
import OutStockDetails from './Screens/OutStockDetails';

import ExpenditureEditForm from './Screens/ExpenditureEditForm';
import IncomeEditForm from './Screens/IncomeEditForm';
import IncomeRemove from './Screens/IncomeRemove';
import IncomeClickMore from './Screens/IncomeClickMore';
import ExpenditureClickMore from './Screens/ExpenditureClickMore';
import ExpenditureRemove from './Screens/ExpenditureRemove';
import OutStockClickMore from './Screens/OutStockClickMore';
import OutStockRemove from './Screens/OutStockRemove';
import InStockClickMore from './Screens/InStockClickMore';
import InStockRemove from './Screens/InStockRemove';

import Tours from './Screens/Tours';
import TourEdit from './Screens/TourEdit';
import TourRemove from './Screens/TourRemove';
import TourClickMore from './Screens/TourClickMore';

import DksEditForm from './Screens/DksEditForm';
import DKsDetails from './Screens/DKsDetails';
import DksRemove from './Screens/DksRemove';

import OutStockDetailsPassTicket from './Screens/OutStockDetailsPassTicket';
import InStockDetailsPassTicket from './Screens/InStockDetailsPassTicket';

import DksCilckMore from './Screens/DksCilckMore';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NotifyAlert from './Screens/NotifyAlert';
import NotifyAlertDetail from './Screens/NotifyAlertDetail';
import AuthScreen from './Screens/AuthScreen';
import AdminChange from './Screens/AdminChange';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();




export default function App () {

  useEffect(() => {
    SplashScreen.hide();
  },[])


   /* createHomeStack = () => 
   <Stack.Navigator>
     <Stack.Screen name="Feed" component={Feed} />
     <Stack.Screen name="Detail" component={Detail} />
   </Stack.Navigator>
*/
/*createDrawer = () =>
<Drawer.Navigat
          <Drawer.Screen name="Contacts" component={Screen1} />
          <Drawer.Screen name="Favorites" component={Screen2}/>
          <Drawer.Screen name="Settings" component={Screen3}/>
</Drawer.Navigator>*/
    return (
  /*   <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" children={createHomeStack}/>
          <Drawer.Screen name="Contacts" component={Screen1} />
          <Drawer.Screen name="Favorites" component={Screen2}/>
          <Drawer.Screen name="Settings" component={Screen3}/>
        </Drawer.Navigator>       
     </NavigationContainer>*/
     
     <NavigationContainer >
       
       <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name="Feed"  component={Feed}  />
         <Stack.Screen name="Detail"  component={Detail}   />
         <Stack.Screen name="DK" component={Screen3}/>
         <Stack.Screen name="InStock Details" component={InStockDetails} />
         <Stack.Screen name="Expenditure Details" component={ExpenditureDetails} />
         <Stack.Screen name="Income Details" component={IncomeDetails} />
         <Stack.Screen name="OutStock Details" component={OutStockDetails} />
         <Stack.Screen name="Expenditure Edit" component={ExpenditureEditForm} />
         <Stack.Screen name="Income Edit" component={IncomeEditForm} />
         <Stack.Screen name="Income Remove" component={IncomeRemove} />
         <Stack.Screen name="Income Click More" component={IncomeClickMore} />
         <Stack.Screen name="Expenditure Click More" component={ExpenditureClickMore} />
         <Stack.Screen name="Expenditure Remove" component={ExpenditureRemove} />
         <Stack.Screen name="Out Stock Click More" component={OutStockClickMore} />
         <Stack.Screen name="Out Stock Remove" component={OutStockRemove} />
         <Stack.Screen name="In Stock Click More" component={InStockClickMore} />
         <Stack.Screen name="In Stock Remove" component={InStockRemove} />
         <Stack.Screen name="DKs Edit Details" component={DksEditForm} />
         <Stack.Screen name="DKs Details" component={DKsDetails} />
         <Stack.Screen name="DKs Remove" component={DksRemove} />
         <Stack.Screen name="DKs Click More" component={DksCilckMore} />
         <Stack.Screen name="Out Stock Pass Ticket" component={OutStockDetailsPassTicket} />
         <Stack.Screen name="In Stock Pass Ticket" component={InStockDetailsPassTicket} />
         <Stack.Screen name="Notification" component={NotifyAlert} />
         <Stack.Screen name="Notification Detail" component={NotifyAlertDetail} />
         <Stack.Screen name="authper" component={AuthScreen} />
         <Stack.Screen name="admin change" component={AdminChange} />
         <Stack.Screen name="Tours Details" component={Tours} />
         <Stack.Screen name="Tours Edit" component={TourEdit} />
         <Stack.Screen name="Tours Remove" component={TourRemove} />
         <Stack.Screen name="Tour Click More" component={TourClickMore} />
         

       </Stack.Navigator>
       
     </NavigationContainer>
    );
  }
