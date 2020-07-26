
import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function TourRemove ({route,navigation}) {
    console.disableYellowBox = true;
    const hd = Dimensions.get('window').height;
  const [tourModal_DK,setTourModal_DK] = useState(true);
  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);

   const cancelRemoveTour = () => { 
    setTourModal_DK(false);
    navigation.pop();
   }

const submitRemoveTour = async () => {    
    try
    {
    setSubmitButtonStatus(true);

   const res = await fetch('https://dkdemo-server.herokuapp.com/remtour1',{
        method:'post',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            _id : route.params.items._id,
        })
    });
    const data = await res.json();

    if(data.msg != 'failure')
    {
        Alert.alert('Tour Removed Successfully');
    }
    else
    {
        Alert.alert('Tour Removed Failure!!');
    }
        setSubmitButtonStatus(false);
        setTourModal_DK(false);
        navigation.pop();
    }
    catch(error) {
        Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
    }
  }

    return(
      <Modal visible={tourModal_DK} transparent={true} >
          <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveTour()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20}}>Tour Remove</Text>
        <View style={{marginTop:30,alignContent:'center',marginBottom:30,height:hd}}>
            <View style={{padding:10,marginVertical:10,}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Place : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.place}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Member : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.member}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.dkDate}</Text></Text>
            {(route.params.items.dkAmount != 0 ) &&
                
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>DK Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.dkAmount}</Text></Text>
                }
                {route.params.items.dkNote != '' &&
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>DK Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.dkNote}</Text></Text>
            }
            </View>
        </View>
            <Button 
            disabled={submitButtonStatus}
            title='Remove Tour'
            color='#6a5acd'
            onPress={() => submitRemoveTour()}/> 
                </View>
                </View>
                </ScrollView>
            </Modal>
    );
}