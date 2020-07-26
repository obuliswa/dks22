import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal} from 'react-native';

import AlertBox from './AlertBox';

export default function DksRemove ({route,navigation}) {
console.disableYellowBox = true;
  const [dkRemoveModal_DK,setDkRemoveModal_DK] = useState(true);
  const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);
  const [getTotSav,setGetTotSav] = useState();
  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);

  const today = new Date();
    let date = today.getDate();
    let num_month = today.getMonth();
    let year = today.getFullYear();
    
    const month = months[num_month];

  const dateDetails = `${route.params.items.date} ${route.params.items.month} ${route.params.items.year}`;

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/gettotasav')
    .then(savdata => savdata.json())
    .catch(error => console.log(error))
})
  
    const cancelRemoveDks = () => {
    setDkRemoveModal_DK(false);
    navigation.pop();
   }

  const submitRemoveDks = async () => {

    try
    {
    setSubmitButtonStatus(true);

  const res = await fetch('https://dkdemo-server.herokuapp.com/removesav1',{
      method : 'post',
      headers : {
        'Content-Type' : 'application/json'
      }
      ,body : JSON.stringify({
        _id : route.params.items._id,
      })
    });
    const data = await res.json();

      if(data.msg != 'failure')
      {
        Alert.alert('Removed Successfully');
      }
      else
      {
        Alert.alert('Removed Failure!!');
      }
      setSubmitButtonStatus(false);
      setDkRemoveModal_DK(false);
      navigation.navigate(`DK's Savings`);
    }
    catch(error) {
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message)
    }
   }
   

    return(

      <Modal visible={dkRemoveModal_DK} transparent={true} animationType='fade' >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveDks()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>DK's Remove</Text>

        <View style={{marginTop:30,alignContent:'center',marginBottom:30}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.nameDetails[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginTop:5,fontSize:15,fontStyle:'italic',fontWeight:'bold',color:'#6a5acd'}}>Added By : <Text style={{color:"black",fontWeight:'normal'}}>{route.params.items.adminName}</Text></Text>
            <Text style={{marginTop:5,fontSize:15,fontStyle:'italic',fontWeight:'bold',color:'#6a5acd'}}>Date : <Text style={{color:"black",fontWeight:'normal'}}>{dateDetails}</Text></Text>
            
            </View>

        </View>

            <Button 
            disabled={submitButtonStatus}
            title='Remove DKs'
            color='#6a5acd'
            onPress={() => submitRemoveDks()}/> 

                </View>
                </View>
            </Modal>
    );
}