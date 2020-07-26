import React, { useState,useEffect, useCallback } from 'react';
import {View,Text,ScrollView,FlatList,TouchableOpacity,Modal,Button, Alert,ActivityIndicator,Dimensions} from 'react-native';
import AnimatedNumber from 'react-native-animate-number';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useFocusEffect} from '@react-navigation/native';

export default function IncomeDetails ({navigation,route}) {

    const hd = Dimensions.get('screen').height;
    const routeProfile = route.params;
    const [incomeData,setIncomeData] = useState([]);
    const [instockLoading,setInstockLoading] = useState(true);

    console.disableYellowBox = true; 
   
   useFocusEffect( 
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getallincome')
        .then(res => res.json())
        .then(data => {
            if(data != '') 
            {
            setInstockLoading(false);
            setIncomeData(data);
            }
            else 
            {
                setInstockLoading(false);
                setIncomeData('');
            }
        })
        .catch(error => console.log(error))
    })
   )

    const renderIncome = ((item) => {     
        return (
            
    <View >
    <View style={{padding:6,backgroundColor:'rgba(255,255,255,.9)',marginHorizontal:6,marginBottom:10,elevation:5,borderRadius:10}}>
            {item.status === 'Outstock' || item.status === 'Removed' ? 
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>  
    <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:"black",fontWeight:'normal'}}>{item.outstockNameDetails[0].name}</Text> </Text>
    <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:"black",fontWeight:'normal'}}>{item.collectionAmount} </Text></Text>
            </View>
         : 
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>  
    <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:"black",fontWeight:'normal'}}>{item.pickerValuesName[0].name}</Text> </Text>
    <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:"black",fontWeight:'normal'}}>{item.amount} </Text></Text>
        </View>
         }
    
    <TouchableOpacity style={{marginHorizontal:100}} onPress={() => navigation.navigate('Income Click More',{
                items : item
            })}>
    <Text style={{fontSize:15,color:'#6a5acd',alignSelf:'center',marginTop:10,textAlign:'center',width:100,fontStyle:'italic',fontWeight:'bold'}}>Click More<Text>...</Text></Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:5,backgroundColor:'white',justifyContent:'space-between',marginBottom:5}}>
            {item.status === 'Outstock' || item.status === 'Removed' ?
            <View style={{marginTop:5}}><Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{item.admin}</Text></Text></View>
            : 
            <View style={{marginTop:5}}><Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{item.incomeAddedByName}</Text></Text></View>
            }
            
            <View style={{}} >    
            {(item.incomeStatus === 'Income' && routeProfile.admin === true && item.incomeStatus) ? 
               <Button title='Remove' color='#dc143c'  onPress={() => navigation.navigate('Income Remove',{
                items : item
            }) } />
            :
            <View>
                {item.incomeStatus &&   
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {(item.incomeStatus != 'Removed' && item.incomeStatus) ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.incomeStatus}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.incomeStatus}</Text> }</Text>}
            {item.status &&
                <View style={{marginTop:5}}><Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {(item.status != 'Removed' && item.status) ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> }</Text>
             </View>
            }
            </View>
            }
            </View>
            </View>
            </View>  
            </View>
        );
    });
    
    return(
    <View style={{flex:1,borderWidth:5,borderColor:'white',margin:1}} >
    <View style={{flexDirection:'row',padding:15,justifyContent:'space-between',backgroundColor:'transparent'}}>
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.pop()} >
            <Icon name="angle-left" color={'#6a5acd'} size={30}  />
            </TouchableOpacity>
            </View>
            <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Income</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-tie" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>
    {instockLoading &&
    <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:hd/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
     } 
    {(incomeData === '' && instockLoading === false) ?
    <View style={{alignItems:'center',justifyContent:'center',marginTop:hd/3}}><TouchableOpacity onPress={() => navigation.navigate(`Dream Killer's`)} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View>
    :
    <FlatList 
    showsVerticalScrollIndicator={false}
    data = {incomeData}
    keyExtractor = {item => item._id}
    renderItem = {({item}) => {
            return renderIncome(item)
    }}
    />
        }
</View>
    );
}