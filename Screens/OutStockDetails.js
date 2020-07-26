import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,ScrollView,FlatList,TouchableOpacity,Modal,Button, Alert,ActivityIndicator,Animated,Dimensions} from 'react-native';
import InStockEditForm from './InStockEditForm';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useFocusEffect} from '@react-navigation/native';

export default function OutStockDetails ({navigation,route}) {

    console.disableYellowBox = true;

const hd = Dimensions.get('window').height;

    const routeProfile = route.params;
    const [outstockDate,setOutstockData] = useState([]);

     const [outStockModal,setOutStockModal] = useState(false);
     const [passTicketButton,setPassTicketButton] = useState(false);
     const [passTicketId,setPassTicketId] = useState('');
     const [buttonStatus,setButtonStatus] = useState();
     const [instockLoading,setInstockLoading] = useState(true);
    
     useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getalloutstock')
        .then(res => res.json())
        .then(data => {
            if(data != '') 
            {
            setInstockLoading(false);
            setOutstockData(data);
            }
            else 
            {
                setOutstockData('');
                setInstockLoading(false);
            }
        })
        .catch(error => console.log(error))
    })
     )

    const position = new Animated.ValueXY({x:0,y:0});

    Animated.spring(position,{
        toValue:{x:3,y:0},
        bounciness:50,
    }).start()

    const renderOutStock = ((item) => {
    return (
            <View >
            <View style={{marginBottom:10,padding:6,backgroundColor:'rgba(255,255,255,.9)',marginHorizontal:6,elevation:5,borderRadius:10}}>
            {item.passticketOutstockCounterOutstock != 0 || item.passticketOutstockCounterOutstock != 0 ? 
                <Animated.View style={{transform:[{translateX:position.x}],borderWidth:5,borderRadius:1,alignSelf:'flex-start',borderColor:'#006400'}}></Animated.View>
                : <View></View>}
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               
           <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:"black",fontWeight:'normal'}}>{item.instockOutStockName[0].name}</Text> </Text>
           
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:"black",fontWeight:'normal'}}>{item.instockOutStockAmount} </Text></Text>
    
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:"black",fontWeight:'normal'}}>{item.instockInterest}</Text> </Text>
               
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:"black",fontWeight:'normal'}}>{item.instockmonth}</Text></Text>
                
            </View>
         
             <TouchableOpacity style={{marginHorizontal:100}} onPress={() => navigation.navigate('Out Stock Click More',{
                items : item,routeAdm:routeProfile
            })}>
            <Text style={{fontSize:15,color:'#6a5acd',textAlign:'center',fontStyle:'italic',fontWeight:'bold'}}>Click More<Text>...</Text></Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:9,backgroundColor:'white',justifyContent:'space-between'}}>
            <View style={{}}><Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{item.admin}</Text></Text></View>
            {item.status != 'Removed' ? 
            <View>
            {routeProfile.admin === true ?
            
            <View style={{flexDirection:'row',}}>
                {(item.outstockPassTicketDetails != '') ? <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{item.status}</Text> }</Text> :
            <Button title='Pass Ticket'  color='#6a5acd' onPress={() => navigation.navigate('Out Stock Pass Ticket',{items:item,routeAdm:routeProfile}) } />}
            <View style={{padding:4}}></View>
            </View>
            : <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{item.status}</Text> }</Text>
            }
            </View>
            : <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{item.status}</Text> }</Text>
            }
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
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Out-Stock</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-tie" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>
    {instockLoading && 
    <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:hd/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
    } 
    {(outstockDate === '' && instockLoading === false) ? 
    <View style={{alignItems:'center',justifyContent:'center',marginTop:hd/3}}><TouchableOpacity onPress={() => navigation.navigate(`Dream Killer's`)} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View>
    :
        <FlatList 
        showsVerticalScrollIndicator={false}
        data = {outstockDate}
        keyExtractor = {item => item._id}
        renderItem = {({item}) => {
             return renderOutStock(item)
        }}
        />
    }
</View>
    );
}