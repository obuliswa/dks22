import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal} from 'react-native';

export default function InStockRemove ({route,navigation}) {
  const [inStockModal_DK,setInStockModal_DK] = useState(true);
  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
  const [dkData,setDkData] = useState({});
 
console.disableYellowBox = true;

  useEffect(() => {
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
},[])

   const cancelRemoveInStock = () => { 
    setInStockModal_DK(false);
    navigation.pop();
   }

const submitRemoveInStock = async () => {
  try
  {
  if(route.params.items.passtickdetails == '' || (route.params.items.amount === route.params.items.baseAmount))
{
  let resultAmount = JSON.stringify(parseInt(dkData[0].instockAmount) - parseInt(route.params.items.amount));
  let incupt = parseInt(route.params.items.amount) + parseInt(dkData[0].incomeAmount);

 setSubmitButtonStatus(true);

 const res = await fetch('https://dkdemo-server.herokuapp.com/removeinstock1',{
    method:'post',
    headers:{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      _id : route.params.items._id,
      status : 'Removed',
      _iddk : dkData[0]._id,
      amtdk : resultAmount,
      incomupdatdk : incupt,
    })
  });
    const data = await res.json();

    if(data.msg != 'failure')
    {
      Alert.alert('Instock Removed Successfully');
    }
    else
    {
      Alert.alert('Instock Removed Failure!!');
    }
      setSubmitButtonStatus(false);
      setInStockModal_DK(false)
      navigation.pop();
  }
  else
  {
    navigation.pop();
  }
    }
    catch(error) {
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
    }
 }

    return(

      <Modal visible={inStockModal_DK} transparent={true} >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveInStock()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20}}>InStock Remove</Text>

        <View style={{marginTop:30,alignContent:'center',marginBottom:70}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
            </View>
        </View>
            <Button 
            disabled={submitButtonStatus}
            title='Remove InStock'
            color='#6a5acd'
            onPress={() => submitRemoveInStock()}/> 
                </View>
                </View>
            </Modal>
    );
}