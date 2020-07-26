import React, {useState, useEffect, useCallback} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,Dimensions} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function IncomeRemove ({route,navigation}) {
const hd = Dimensions.get('window').height;
  console.disableYellowBox = true;

  const [incomeModal_DK,setIncomeModal_DK] = useState(true);
  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
  const [dkData,setDkData] = useState([]);

  useFocusEffect(
  useCallback(() => {
      fetch('https://dkdemo-server.herokuapp.com/getalldk')
      .then(resdk => resdk.json())
      .then(datadk => {
        if(datadk != '')
        {
        setDkData(datadk);
        }
        else
        {
          setDkData('');
        }
      })
      .catch(error => console.log(error))
  })
  )

  const submitRemoveIncome = async () => {

    try
    {
    setSubmitButtonStatus(true);

    let resultAmount = (dkData[0].incomeAmount - parseInt(route.params.items.amount));
    let resultAmountt = (dkData[0].totalAmountDK - parseInt(route.params.items.amount));

   const res = await fetch('https://dkdemo-server.herokuapp.com/removeincome1',{
     method:'post',
     headers:{
       'Content-Type' : 'application/json'
     },
     body : JSON.stringify({
       _id : route.params.items._id,
       incomeStatus : 'Removed',
       dkData : dkData,
       amt : route.params.items.amount,
       resultAmount : resultAmount,
       resultAmountt : resultAmountt,
     })
   });
     const data = await res.json();

    if(data.msg != 'failure')
    {
      Alert.alert('Income Removed Successfully');
    }
    else
    {
      Alert.alert('Income Removed Failure!!');
    }
     setSubmitButtonStatus(false);
     setIncomeModal_DK(false)
     navigation.pop();
  }
  catch(error) {
    Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
  } 
   }

   const cancelRemoveIncome = () => {
    setIncomeModal_DK(false)
    navigation.pop();
   }

    return(
      <Modal visible={incomeModal_DK} transparent={true} >
        <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10,marginBottom:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveIncome()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20}}>Income Remove</Text>
                
        <View style={{marginTop:30,alignContent:'center',height:hd,}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.pickerValuesName[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:40,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
            </View>
        </View>
            <Button 
            disabled={submitButtonStatus}
            title='Remove Income'
            color='#6a5acd'
            onPress={() => submitRemoveIncome()}/> 

                </View>
                </View>
                </ScrollView>
            </Modal>
    );
}