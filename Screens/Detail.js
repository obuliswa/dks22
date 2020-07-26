import React,{Component, useEffect, useState} from 'react';
import {View ,Text,Button,TouchableOpacity,ScrollView,Modal, Alert,Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContent} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import ProfileData from './ProfileData';
import EnterAmount from './EnterAmount';
import AccountDetails from './AccountDetailsProfile';
import {DrawerProfile} from './DrawerProfile';


const Drawer = createDrawerNavigator();

export default function Detail({route,navigation}) {
    console.disableYellowBox = true;
    const [authC,setAuthC] = useState();
    const {wt,ht} = Dimensions.get('window');

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getAllProfile')
        .then(res => res.json())
        .catch(error => console.log(error))

    })
        const dat = route.params;
        const profileDetails = route.params;
         var img = null;
         const namee = dat.name;
         const phone = dat.phone;
         const idd = dat._id;
         const im = dat.picture;
         const adminAccess = dat.admin;
         
       const createT = ({navigation}) => 

  <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >  

    <View style={{flexDirection:'row',justifyContent:'space-between',padding:10,backgroundColor:'white',}}>
            <View style={{marginTop:5}}>
            <Icon name="angle-left" color={'#6a5acd'} size={30} onPress={() => navigation.pop()} />
            </View>
            <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Profile </Text>
            {profileDetails.admin ? 
            <View style={{marginTop:5}}>
            <Icon name="users-cog" color={'#6a5acd'} size={25} onPress={() => navigation.navigate('admin change',profileDetails) } />
            </View>
            :
            <View style={{padding:20}}>
            
            </View>
            }
    </View>
    
           <View style={{backgroundColor:'white',paddingBottom: 40 }}>
           <ProfileData name={namee} navigation={navigation} id={idd} phone={phone} img={im} />

        <Text style={{textAlign:'center',textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -2, height: 1},
        textShadowRadius: 6,fontStyle:'italic',fontSize:32,color:'black',marginBottom:20,marginTop:20}}>Dream Killer's </Text>  

        {profileDetails.admin ? 
               <View style={{flexDirection:'row',justifyContent:'space-around'}}>
               <View style={{}}>   
               <EnterAmount name={namee} id={idd} nav={navigation} pd={profileDetails} />
               </View>
               <TouchableOpacity style={{}} onPress = {() => navigation.navigate('DKs Details',profileDetails)} >
                <Text style={{fontSize:18,fontWeight:'bold',padding:1,paddingHorizontal:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:10}}>DK's Savings</Text>
                </TouchableOpacity>
        
                </View>
                : <TouchableOpacity style={{alignSelf:'center'}} onPress = {() => navigation.navigate('DKs Details',profileDetails)} >
                <Text style={{fontSize:18,fontWeight:'bold',padding:1,paddingHorizontal:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:10}}>DK's Savings</Text>
                </TouchableOpacity>
                } 
           
            </View>
            
    </ScrollView>   
            
        return(
            <Drawer.Navigator   >
            <Drawer.Screen name="Profile" component={createT}  />
            <Drawer.Screen  name="DK's 100" component={Screen1} initialParams={profileDetails}  />
            <Drawer.Screen name="DK's Savings" component={Screen2} initialParams={profileDetails} />
            <Drawer.Screen name="Dream Killer's" component={Screen3} initialParams={profileDetails} />
            </Drawer.Navigator>    
          
        );
    
}