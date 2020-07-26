import React, { useState, useEffect } from 'react';
import {View,Text,ScrollView,FlatList,TouchableOpacity,Modal,Button, Alert,ActivityIndicator,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Tours ({navigation,route}) {
    
console.disableYellowBox = true;

    const hd = Dimensions.get('screen').height;
    const routeProfile = route.params;
    const [tourData,setTourData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getalltour')
        .then(res => res.json())
        .then(data => {
            if(data != '') 
            {
            setIsLoading(false);
            setTourData(data);
            }
            else 
            {
                setIsLoading(false);
                setTourData('');
            }
        })
        .catch(error => console.log(error));
    })

    const renderTours = ((item) => {
        return (
            <View style={{padding:6,backgroundColor:'rgba(255,255,255,.9)',marginHorizontal:6,marginBottom:10,elevation:5,borderRadius:10}}>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('Tour Click More',{
                items : item
            })}>
            <Text style={{fontSize:20,color:'#6a5acd',textAlign:'center',fontStyle:'italic'}}>{item.place}</Text> 
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5,}}>
                <View>
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Apx.Amount :<Text style={{color:"black",fontWeight:'normal'}}>{item.amount}</Text></Text>    
            </View>
            <View>
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Member : <Text style={{color:"black",fontWeight:'normal'}}>{item.member}</Text></Text>    
            </View>
            </View>
            </TouchableOpacity>
            
             {routeProfile.admin === true ?
             <View>
            <View style={{flexDirection:'row',justifyContent:'flex-end',marginTop:10,marginBottom:5}}>
            
            <Button title='Edit' color='#dc143c' onPress={() => navigation.navigate('Tours Edit',{
                items : item
            }) } />
            <View style={{padding:5}}></View>
            
            <Button title='Remove' color='#dc143c' onPress={() => navigation.navigate('Tours Remove',{
                items : item
            }) } />
            </View>
            </View>
            :
            <View style={{padding:10}}>
                <View style={{alignSelf:'center',marginBottom:5}}>
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:"black",fontWeight:'normal'}}>{item.dkDate}</Text></Text>    
            </View>
            </View>
            }
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
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Tours</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-tie" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>
    {isLoading && 
    <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:hd/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
     } 
    {(tourData === '' && isLoading === false) ? 
    <View style={{alignItems:'center',justifyContent:'center',marginTop:hd/3}}><TouchableOpacity onPress={() => navigation.navigate(`Dream Killer's`)} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View>
    :
        <FlatList 
        showsVerticalScrollIndicator={false}
        data = {tourData}
        keyExtractor = {item => item._id}
        renderItem = {({item}) => {
             return renderTours(item)
        }}
        />
    }
</View>
    );
}