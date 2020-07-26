import React, { useState, useEffect } from 'react';
import {View,Text,ScrollView,FlatList,TouchableOpacity,Modal,Button, Alert,ActivityIndicator,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ExpenditureForm from './ExpenditureForm';

export default function ExpenditureDetails ({navigation,route}) {
    console.disableYellowBox = true;
    const hd = Dimensions.get('window').height;
    
    const routeProfile = route.params;
    const [expenditureData,setExpenditureData] = useState([]);
    const [instockLoading,setInstockLoading] = useState(true);

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getallexpenditure')
        .then(res => res.json())
        .then(data => {
            if(data != '') 
            {
            setInstockLoading(false);
            setExpenditureData(data);
            }
            else 
            {
                setInstockLoading(false);
                setExpenditureData('');
            }
        })
        .catch(error => console.log(error));
    },[])

     const [expenditureModal,setExpenditureModal] = useState(false);

    const renderExpenditure = ((item) => {

        return (
            <View >
         
            <View style={{padding:6,backgroundColor:'rgba(255,255,255,.9)',marginHorizontal:6,marginBottom:10,elevation:5,borderRadius:10}}>

           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               
           <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:"black",fontWeight:'normal',fontWeight:'normal'}}>{item.instockName}</Text> </Text>
           
            <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:"black",fontWeight:'normal'}}>{item.instockExpenditureAmount}</Text></Text>
            
            </View>
            <TouchableOpacity style={{marginHorizontal:100}} onPress={() => navigation.navigate('Expenditure Click More',{
                items : item
            })}>
            <Text style={{fontSize:15,color:'#6a5acd',textAlign:'center',fontStyle:'italic',fontWeight:'bold'}}>Click More<Text>...</Text></Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:5,backgroundColor:'white',justifyContent:'space-between'}}>
            <Text style={{margin:6,fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{item.admin}</Text></Text>
            <Text style={{margin:6,fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> }</Text>
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
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Expenditure</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Icon name="user-tie" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>
    {instockLoading &&
    <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:hd/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
     }
    {(expenditureData === '' && instockLoading === false) ? 
    <View style={{alignItems:'center',justifyContent:'center',marginTop:hd/3}}><TouchableOpacity onPress={() => navigation.navigate(`Dream Killer's`)} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View>
    :
        <FlatList 
        showsVerticalScrollIndicator={false}
        data = {expenditureData}
        keyExtractor = {item => item._id}
        renderItem = {({item}) => {
             return renderExpenditure(item)
        }}
        />
    }
</View>
    );
}