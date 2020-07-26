import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,ScrollView} from 'react-native';

export default function OutStockDetailsPassTicket ({route,navigation}) {
 console.disableYellowBox = true;

  const [outStockPassTicketModal,setOutStockPassTicketModal] = useState(true);
  const [outstockInputAmount,setOutstockInputAmount] = useState(route.params.items.outstockAmountInput);
  const [outstockInputNote,setOutstockInputNote] = useState(route.params.items.outstockNoteInput);
  const [outstockPassticketCounter,setOutstockPassticketCounter] = useState(route.params.items.passticketOutstockCounterOutstock);
  const [outstockInitiated,setOutstockInitiated] = useState(route.params.items.outstockInitiatedBy);
  const [outstockModified,setOutstockModified] = useState(route.params.items.outstockModifiedBy);
  const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);
  const [openResetModal,setOpenResetModal] = useState(false);
  const [reset,setReset] = useState();
  const [initName,setInitName] = useState('');
  const [modiName,setModiName] = useState('');
  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
  const [submitButtonStatusReset,setSubmitButtonStatusReset] = useState(false);
  const [getTotalTemp,setGetTotalTemp] = useState();

  const today = new Date();
  let date = today.getDate();
  let num_month = today.getMonth();
  let year = today.getFullYear();
  const month = months[num_month];

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getalldk')
    .then(restotal => restotal.json())
    .then(datatotal => {
      setGetTotalTemp(datatotal);
    })
    .catch(error => console.log(error))
  })

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getOutstock',{
      method:'post',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        _id : route.params.items._id
      })
    })
    .then(res => res.json())
    .then(data => 
      {      
        let findId = data[0].outstockPassTicketAdmin.find(item => item._id === route.params.routeAdm._id);

        let findIdInit = data[0].outstockPassTicketAdmin.find(item => item._id === data[0].outstockInitiatedBy);
        let findIdModi = data[0].outstockPassTicketAdmin.find(item => item._id === data[0].outstockModifiedBy);
         
          if(findIdInit)
          {
            setInitName(findIdInit.name);
          }
          if(findIdModi)
          {
            setModiName(findIdModi.name);
          }          
        if(findId)
        {
          setReset(true); 
        }
        else
        {
          setReset(false);
        }
      })
    .catch(error => console.log(error))
  },[])
  

const submitOutStockPassTicket = async () => {

  if(outstockInputAmount && outstockInputAmount != '' && outstockInputAmount != 0)
  {
    if(outstockInputNote && outstockInputNote != '')
    {
      try
      {
      setSubmitButtonStatus(true);

      const passTicketAdmin = {_id : route.params.routeAdm._id, name : route.params.routeAdm.name};

      let initiated = "";
      let modified = "";
      
      if(outstockPassticketCounter === 0)
      {
        initiated = route.params.routeAdm._id;
      }
      else if(route.params.items.outstockAmountInput === outstockInputAmount)
      {
        initiated = outstockInitiated;
        modified = outstockModified;
      }
      else
      {
        initiated = outstockInitiated,
        modified = route.params.routeAdm._id;
      }
let amountdk = parseInt(outstockInputAmount) + parseInt(getTotalTemp[0].incomeAmount);
let amounttotdk = (parseInt(outstockInputAmount) - parseInt(route.params.items.instockOutStockAmount)) + parseInt(getTotalTemp[0].totalAmountDK);
let outupdateamt = parseInt(getTotalTemp[0].outstockAmount) - parseInt(route.params.items.instockOutStockAmount);

   const collectionres = await fetch('https://dkdemo-server.herokuapp.com/updateoutstockcollection2',{
    method:'post',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      _id : route.params.items._id,
      inputAmount : outstockInputAmount,
      inputNote : outstockInputNote,
      outstockInitiatedBy : initiated,
      outstockModifiedBy : modified,
      outstockPassTicketAdmin : passTicketAdmin,
      outstockDate : date,
      outstockMonth : month,
      outstockYear : year,
      outstockPassticketCounter : outstockPassticketCounter,
      instockId : route.params.items.instockId,
      instockNameDetails : route.params.items.instockPickerValue,
      outstockNameDetails : route.params.items.instockOutStockName,
      instockPassticketId : route.params.items.instockPassticketOutCounter,
      instockAmount : route.params.items.instockAmount,
      instockBaseAmount : route.params.items.instockBaseAmount,
      outstockAmount : route.params.items.instockOutStockAmount,
      outstockInterest : route.params.items.instockInterest,
      outstockMonthIn : route.params.items.instockmonth,
      instockNote : route.params.items.instockNote,
      outstockNote : route.params.items.instockOutStockNote,
      status : 'Outstock',
      admin : 'Admin',
      date,
      month,
      year,
      getTotalTemp : getTotalTemp,
      amountdk : amountdk,
      amounttotdk : amounttotdk,
      outupdateamt : outupdateamt,

    })
  });
   const collectiondata = await collectionres.json();

   if(collectiondata.msg != 'failure')
   {
    Alert.alert('Outstock Ticket Passed Successfully');
   }
   else
   {
    Alert.alert('Outstock Ticket Passed Failure!!');
   }
    setSubmitButtonStatus(false);
    setOutStockPassTicketModal(false);
    navigation.pop();
  }
  catch(error) {
    Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
  }
    }
    else
    {
      Alert.alert('Something Went Wrong.., Check Note');
    }
  }
  else
  {
    Alert.alert('Something Went Wrong.., Check Amount');
  }
 }
   
   const cancelOutStockPassTicket = () => {
    setOutStockPassTicketModal(false)
    navigation.navigate('OutStock Details')
}

const cancelResetModal = () => {
  setOpenResetModal(false);
}


const resetPreviewModal = async () => {
  try
  {
  setSubmitButtonStatusReset(true);

 const resetrespreview = await fetch('https://dkdemo-server.herokuapp.com/resetpreviewoutstock1',{
    method:'post',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      resetid : route.params.items._id,
    })
  });
    const dataresetpreview = await resetrespreview.json();
    
    if(dataresetpreview.msg != 'failure')
    {
      Alert.alert('Reset Successfully');
    }
    else
    {
      Alert.alert('Reset Failure!!');
    }
    setSubmitButtonStatusReset(false);
    setOpenResetModal(false);
    setOutStockPassTicketModal(false);
    navigation.pop();
  }
  catch(error) {
    Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
}
 }


    return(
      <View>
      <Modal visible={outStockPassTicketModal} transparent={true} animationType='fade'>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelOutStockPassTicket()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{marginTop:20,fontSize:15,fontWeight:'bold',color:'#6a5acd'}}>OutStock Pass Ticket Details</Text>
                
                <View style={{marginTop:30,alignContent:'center',marginBottom:30}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockPassticketOutCounter}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockName[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Base Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockBaseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockAmount}</Text></Text>
            
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockInterest}</Text></Text>
            <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockmonth}</Text></Text>
            {reset !== true &&
            <View>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount</Text>
           
            <TextInput 
                style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
                keyboardType='numeric'
                selectionColor = {'#6a5acd'}
                value = {outstockInputAmount}
                onChangeText={val => setOutstockInputAmount(val)} 
                />
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note</Text>
            <TextInput 
              style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:10}}
              multiline={true}
              selectionColor = {'#6a5acd'}
              value = {outstockInputNote}
              maxLength={500}
              onChangeText={val => setOutstockInputNote(val)} 
              />
              </View>
          }
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockOutStockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.status}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>

          {reset === true &&
          <View>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockAmountInput}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.outstockNoteInput}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{initName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{modiName}</Text></Text>
            <Text style={{marginBottom:40,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Date : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockMonth} <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockYear}</Text></Text> </Text>
          </View>
          }
                </View>
                </View>
      {reset === true ? <Button title='RESET' color='#6a5acd' onPress={() => setOpenResetModal(true)} /> : 
            <Button 
            disabled={submitButtonStatus}
            title='OK, Pass Ticket'
            color='#6a5acd'
            onPress={() => submitOutStockPassTicket()}/> 
    }
    <View style={{padding:5}}></View>
                </View>
                </View>
                </ScrollView>
            </Modal>


        <Modal visible={openResetModal} transparent={true} animationType='fade'>
        <View style={{backgroundColor:'#000000aa',flex:1}}>
        <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
        <TouchableOpacity onPress = {() => cancelResetModal()} >
        <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
        </TouchableOpacity>
     
        <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',alignSelf:'center',marginTop:20,}}>To Confirm, Reset This Ticket Entry..</Text>   
        <View style={{marginTop:20,padding:10,width:150,alignSelf:'center'}}>
        <Button 
            disabled={submitButtonStatusReset}
            title='OK, RESET ENTRY'
            color='#6a5acd'
            onPress={() => resetPreviewModal()}/> 
        </View>
        </View>
        </View>
        </Modal>
            </View>
    );
}


