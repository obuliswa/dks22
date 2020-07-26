import React, { useState, useEffect, useCallback,  } from 'react';
import {View,Text,ScrollView,FlatList,TouchableOpacity,Modal,Button, Alert,ActivityIndicator,Dimensions,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';

export default function DKsDetails ({navigation,route}) {
    console.disableYellowBox = true;
  const profileDetails = route.params;
  const width = Dimensions.get('screen').width;
    const [dkDetail,setDkDetail] = useState([]);
    const [acti,setActi] = useState(true);

    const height = Dimensions.get('screen').height;

useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/allsavings')
        .then(res => res.json())
        .then(data => {
            if(data != '')
            {
            setActi(false);      
            setDkDetail(data);
            }
            else
            {
                setActi(false);     
                setDkDetail(''); 
            }
        })
        .catch(error => {Alert.alert('Something Went Wrong,,. Try Again!!'); })
    },[])
);

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/gettotasav')
        .then(savdata => savdata.json())
        .catch(error => console.log(error))
    })
      
    const renderDkDetails = ((item) => {

        return (
            <View >   
         <View style={{marginBottom:10,padding:4,backgroundColor:'rgba(255,255,255,.9)',marginHorizontal:6,elevation:5,borderRadius:10}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Name: <Text style={{color:"black",fontWeight:'normal'}}>{item.nameDetails[0].name}</Text> </Text>
           <Text style={{fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount: <Text style={{color:"black",fontWeight:'normal'}}>{item.amount}</Text></Text>
            </View>
            <TouchableOpacity style={{alignItems:'center'}} onPress={() => navigation.navigate('DKs Click More',{
                items : item,
            })}>
            <Text style={{fontSize:15,color:'#6a5acd',marginTop:10,width:100,fontStyle:'italic',fontWeight:'bold'}}>Click More<Text>...</Text></Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row',margin:5,backgroundColor:'white',justifyContent:'space-between'}}>
            <Text style={{marginTop:5,fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{item.adminName}</Text></Text>
            {profileDetails.admin ?
            <View>
            {(profileDetails.admin && item.status === 'Removed') ?
            <Text style={{marginTop:5,fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> }</Text>
            : 
            <Button title='Remove' color='#dc143c'  onPress={() => navigation.navigate('DKs Remove',{
                items : item,profile : profileDetails,
            }) } />
            }
            </View>
            : 
            <Text style={{marginTop:5,fontSize:15,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{item.status}</Text> }</Text>
            }
            </View>
            </View>
            </View>
        );
    });

    return(        
    <View style={{flex:1,borderWidth:5,borderColor:'white'}} > 
            <View style={{flexDirection:'row',padding:15,justifyContent:'space-between',backgroundColor:'transparent'}}>
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
            <Icon name="angle-left" color={'#6a5acd'} size={30}  />
            </TouchableOpacity>
            </View>
            <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> DK's Savings</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="braille" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>
           
   {acti &&  
   <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:height/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
    }
        {(dkDetail === '' && acti === false) ?
          <View style={{alignItems:'center',justifyContent:'center',marginTop:height/3}}><TouchableOpacity onPress={() => navigation.navigate('Profile')} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View>
        :
        <FlatList 
        showsVerticalScrollIndicator={false}
        data = {dkDetail}
        keyExtractor = {item => item._id}
        renderItem = {({item}) => {
             return renderDkDetails(item)
        }}
        />
        }
</View>
    );
}