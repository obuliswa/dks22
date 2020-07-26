import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,ScrollView,ActivityIndicator,Dimensions} from 'react-native';

export default function OutStockClickMore ({route,navigation}) {
  console.disableYellowBox = true;
  const hd = Dimensions.get('window').height;

  const [outStockClickMoreModal_DK,setOutStockClickMoreModal_DK] = useState(true);
  const [outstockRemoveModal,setOutstockRemoveModal] = useState(false);
  const [separateRemoveOutstock,setSeparateRemoveOutstock]= useState({});
  const [separateUndoOutstock,setSeparateUndoOutstock] = useState({});
  const [outstockUndoModal,setOutstockUndoModal] = useState(false);
  const [incomeDk,setIncomeDk] = useState([{}]);
  const [wrongEntryData,setWrongEntryData] = useState({});
  const [wrongEntryModal,setWrongEntryModal] = useState(false);
  const [outstockInputAmount,setOutstockInputAmount] = useState();
  const [outstockInputNote,setOutstockInputNote] = useState();

  const [initName,setInitName] = useState('');
  const [modiName,setModiName] = useState('');
  const [activePreviewFlag,setActivePreviewFlag] = useState(true);

  const [submitButtonStatusRI,setSubmitButtonStatusRI] = useState(false);
  const [submitButtonStatusUI,setSubmitButtonStatusUI] = useState(false);
  const [submitButtonStatusWE,setSubmitButtonStatusWE] = useState(false);

  const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);

  const today = new Date();
  let date = today.getDate();
  let num_month = today.getMonth();
  let year = today.getFullYear();
  
  const month = months[num_month];

  const removeDate = `${date} ${month} ${year}`;

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getalldk')
    .then(resdk => resdk.json())
    .then(datadk => {
      setIncomeDk(datadk);
    })
    .catch(error => console.log(error))
  },[])


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
          setActivePreviewFlag(false);
      })
      .catch(error => {
        console.log(error)
      })
    },[])

   const submitClickMoreOutStock = () => {

     setOutStockClickMoreModal_DK(false)
     navigation.navigate('OutStock Details')
   }
   const cancelRemoveOutstock = () => {
    setOutstockRemoveModal(false);
   }
   const cancelUndoOutstock = () => {
    setOutstockUndoModal(false);
   }
   const cancelWrongEntry = () => {
    setWrongEntryModal(false);
   }

   const separateRemove = (items,option) => {
    setSeparateUndoOutstock('');
     setSeparateRemoveOutstock(items);
     setOutstockRemoveModal(true);
     
   }
   const separateUndo = (items,option) => {
      setSeparateRemoveOutstock('');
      setSeparateUndoOutstock(items);
      setOutstockUndoModal(true);
    }
    const wrongEntry = (item) => {
      setWrongEntryData(item);
      setWrongEntryModal(true);
    }

  const RemoveSeparateOutstock = async (option) => {
    if(incomeDk != '')
    {
    try
    {
    setSubmitButtonStatusRI(true);
let setintotamtdk = parseInt(incomeDk[0].incomeAmount) - parseInt(separateRemoveOutstock.outCollectionAmount);
let updateoutamtR = incomeDk[0].outstockAmount + parseInt(route.params.items.instockOutStockAmount);
let updtotdk = parseInt(incomeDk[0].totalAmountDK) - (parseInt(separateRemoveOutstock.outCollectionAmount) - parseInt(route.params.items.instockOutStockAmount));        

   const resremovedout = await fetch('https://dkdemo-server.herokuapp.com/removesoutstock2',{
       method:'post',
       headers : {
         'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
        _id : separateRemoveOutstock.outstockId,
         status : 'Removed',
         removedBy : route.params.routeAdm.name,
         removedDate : removeDate,
         incomid : separateRemoveOutstock.incomeId,
         incomeDk : incomeDk,
         sroutcollamt : separateRemoveOutstock.outCollectionAmount,
         insoutamt : route.params.items.instockOutStockAmount,
         setintotamtdk : setintotamtdk,
         updateoutamtR : updateoutamtR,
         updtotdk : updtotdk,
       })
     });
     const dataremovedout = await resremovedout.json();
     
    if(dataremovedout.msg != 'failure') 
    {
      Alert.alert('Removed Successfully');
    } 
    else
    {
      Alert.alert('Removed Failure!!');
    }       
       setSubmitButtonStatusRI(false);
       setOutstockRemoveModal(false);
       setOutStockClickMoreModal_DK(false);
       navigation.pop(); 
  }
  catch(error) {
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
  } 
}
else
{
  Alert.alert('Sorry, Something Went Wrong.., Please Try Again');
}
    }

    const UndoSeparateOutstock = async (option) => {
      if(incomeDk != '')
      {
      try 
      {
      setSubmitButtonStatusUI(true);

let setintotamtdk = parseInt(incomeDk[0].incomeAmount) + parseInt(separateUndoOutstock.outCollectionAmount);
let updateoutamtU = incomeDk[0].outstockAmount - parseInt(route.params.items.instockOutStockAmount);
let updtotdk = parseInt(incomeDk[0].totalAmountDK) + (parseInt(separateUndoOutstock.outCollectionAmount) - parseInt(route.params.items.instockOutStockAmount));
  
     const resundoout = await fetch('https://dkdemo-server.herokuapp.com/undosoutstock2',{
          method:'post',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            _id : separateUndoOutstock.outstockId,
            status : 'Income',
            removedBy : route.params.routeAdm.name,
            removedDate : removeDate,
            incmid : separateUndoOutstock.incomeId,
            statusOut : 'Outstock',
            amt : separateUndoOutstock.outCollectionAmount,
            not : separateUndoOutstock.outCollectionNote,
            incomeDk : incomeDk, 
            insoutamtt : route.params.items.instockOutStockAmount,
            setintotamtdk : setintotamtdk,
            updateoutamtU : updateoutamtU,
            updtotdk : updtotdk,
          })
        });
          const dataundoout = await resundoout.json();
  
          if(dataundoout.msg != 'failure')
          {
            Alert.alert('Undo Successfully');
          }
          else
          {
            Alert.alert('Undo Failure!!');
          }
        setSubmitButtonStatusUI(false);
        setOutstockUndoModal(false);
        setOutStockClickMoreModal_DK(false);
        navigation.pop();
        }
        catch(error) {
          Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
        }
      }
      else
      {
        Alert.alert('Sorry, Something Went Wrong.., Please Try Again');
      }
      }


  const UpdateWrongEntry = async () => {
      
    if(outstockInputAmount && outstockInputAmount != '' && outstockInputAmount != 0 )
    {
      if(outstockInputNote && outstockInputNote != '')
      {   
        try
        {
    setSubmitButtonStatusWE(true);

   const reswrong = await fetch('https://dkdemo-server.herokuapp.com/uwrongentry1',{
      method : 'post',
      headers : { 
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        _id : wrongEntryData.outstockId,
        collamt : outstockInputAmount,
        collnot : outstockInputNote,
        wupdated : route.params.routeAdm.name,
        wupdateddate : removeDate,
      })
    });
    const datawrong = await reswrong.json();

    if(datawrong.msg != 'failure')
    {
      Alert.alert('Income Entry Updated Successfully');
    }
    else
    {
      Alert.alert('Income Entry Updated Failure!!');
    }
      setSubmitButtonStatusWE(false);
      setWrongEntryModal(false);
      setOutStockClickMoreModal_DK(false);
      navigation.pop();
  }
   catch(error) { 
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
   }
  }
  else
  {
    Alert.alert('Something Went Wrong,,. Check Note');
  }
}
else
  {
    Alert.alert('Something Went Wrong,,. Check Amount');
  }
  }

    return(
      <View>
      <Modal visible={outStockClickMoreModal_DK} transparent={true} animationType='fade'>
        <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => submitClickMoreOutStock()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{marginTop:20,color:'#6a5acd',fontWeight:'bold',fontSize:15}}>   Out-stock Ticket Info</Text>
        <View style={{marginTop:20,alignContent:'center'}}>

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
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockmonth}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockOutStockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{route.params.items.status}</Text> } </Text>
            <Text style={{marginBottom:15,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>

        {route.params.items.outstockPassTicketDetails != '' ?   
          <View style={{marginBottom:40}}>
    <Text style={{fontSize:22,color:'#6a5acd',fontStyle:'italic',alignSelf:'center',marginTop:10,padding:10}}>Pass Ticket Details</Text> 

      <View>
    {route.params.items.outstockPassTicketDetails.map((item,index) => (
      <View key={item.id}>
        <View style={{marginTop:20,padding:10,}}>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> }</Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{item.outInitName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{item.outModiName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal',}}>{item.outCollectionAmount}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{item.outCollectionNote}</Text></Text>
        {(item.inActive != '' || item.active != '') &&
           <View>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? `Removed By : ${item.inActive}` : `Undo By : ${item.active}`}</Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? 'Removed Date' : 'Undo Date'} : <Text style={{color:'black',fontWeight:'normal'}}>{item.removedDate}</Text></Text>
           {item.wupdated != '' &&
           <View>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{`Updated By : ${item.wupdated}`}</Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{`Updated Date : ${item.wupdateddate}`}</Text>
           </View>
            }
           </View>
        }
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{item.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{item.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{item.outYear}</Text></Text> </Text>
        {(route.params.routeAdm.admin && route.params.items.status != 'Removed') &&
           <TouchableOpacity onPress={() => item.status != 'Income' ? separateUndo(item,'Income') : separateRemove(item,'Income')  } ><Text style={{color:'#dc143c',fontWeight:'bold',fontSize:15}}>     {item.status != 'Income' ? 'Undo' : 'Remove'}</Text></TouchableOpacity>
        }
        <View style={{marginLeft:5}}>
           {(item.status === 'Removed' && route.params.routeAdm.admin && route.params.items.status != 'Removed') && 
          <TouchableOpacity onPress={() => wrongEntry(item)} ><Text style={{color:'#dc143c',fontWeight:'bold',fontSize:15}}>Edit</Text></TouchableOpacity>
          }
        </View>
            
        </View>
        </View>
</View>
    ))}</View>

</View>
:
<View style={{marginBottom:hd/12}}>
 <View style={{marginTop:100,alignSelf:'center',marginBottom:20,padding:20}}><Text style={{fontSize:20,fontStyle:'italic',color:'#6a5acd'}}>No Ticket Passed Yet.</Text></View>
          
 {activePreviewFlag ?
          <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
                  : 
                  <View>
{route.params.items.outstockPassTicketAdmin != '' &&
            <View>
              <Text style={{marginTop:5,marginBottom:30,color:'#00ffdd',fontSize:15,fontWeight:'bold'}}>Active Ticket</Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockAmountInput}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.outstockNoteInput}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{initName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{modiName}</Text></Text>
            <Text style={{marginBottom:40,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Date : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockMonth} <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockYear}</Text></Text> </Text>
           </View>
}
</View>
} 
 </View>
  }
       </View>
        </View>
                </View>
                </View>
                </ScrollView>
            </Modal>


            <Modal visible={outstockRemoveModal} transparent={true} animationType='fade'>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveOutstock()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Remove Ticket Details</Text>
                
                <View style={{marginTop:30,padding:10,marginBottom:10}}>

            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockPassticketOutCounter}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockName[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Base Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockBaseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockInterest}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockmonth}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockOutStockNote}</Text></Text>
            
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.status}</Text> }</Text>    
            <Text style={{marginBottom:20,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>

            <Text style={{fontSize:20,color:'#6a5acd',fontStyle:'italic',alignSelf:'center',marginBottom:20,padding:10}}>Pass Ticket Details</Text> 
            
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateRemoveOutstock.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{separateRemoveOutstock.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateRemoveOutstock.status}</Text> }</Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>OutStock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outstockId}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Income Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.incomeId}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outInitName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outModiName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outCollectionAmount}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateRemoveOutstock.outCollectionNote}</Text></Text>
        <Text style={{marginBottom:50,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOutstock.outYear}</Text></Text> </Text>
        
                </View>
                <View style={{padding:5}}>
                <Button disabled={submitButtonStatusRI} title='Remove' color='#6a5acd' onPress={() => RemoveSeparateOutstock('Income')} />
                </View>
                </View>
                </View>
                </ScrollView>
                </Modal>

              <Modal visible={outstockUndoModal} transparent={true} animationType='fade'>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelUndoOutstock()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Undo Ticket Details</Text>
                
                <View style={{marginTop:30,padding:10,marginBottom:10}}>

            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockPassticketOutCounter}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockName[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Base Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockBaseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockOutStockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockInterest}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockmonth}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockOutStockNote}</Text></Text>
            
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginBottom:20,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>

            <Text style={{fontSize:22,color:'#6a5acd',fontStyle:'italic',alignSelf:'center',marginBottom:20,padding:10}}>Pass Ticket Details</Text> 

        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateUndoOutstock.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',fontWeight:'normal'}}>{separateUndoOutstock.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateUndoOutstock.status}</Text> }</Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>OutStock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outstockId}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Income Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.incomeId}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outInitName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outModiName}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outCollectionAmount}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateUndoOutstock.outCollectionNote}</Text></Text>
        <Text style={{marginBottom:50,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOutstock.outYear}</Text></Text> </Text>
        
                </View>
                <View style={{padding:5}}>
                <Button disabled={submitButtonStatusUI} title='Undo' color='#6a5acd' onPress={() => UndoSeparateOutstock('Income')} />
                </View>
                </View>
                </View>
                </ScrollView>
                </Modal>


                <Modal visible={wrongEntryModal} transparent={true} animationType='fade'>
              <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10,marginBottom:10}}>
                <TouchableOpacity onPress = {() => cancelWrongEntry()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{marginTop:30,color:'#6a5acd',fontWeight:'bold',fontSize:15}}>Collection Ticket Info</Text>
                
                <View style={{marginTop:30,marginBottom:10,height:hd}}>

        
        <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{wrongEntryData.outCollectionAmount}</Text></Text>
        <Text style={{marginBottom:15,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{wrongEntryData.outCollectionNote}</Text></Text>

        <View style={{marginBottom:100}}>
            <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Re - Collection Amount : </Text>
           
            <TextInput 
                style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:5}}
                keyboardType='numeric'
                value = {outstockInputAmount}
                onChangeText={val => setOutstockInputAmount(val)} 
                />
            <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Re - Collection Note : </Text>
            <TextInput 
              style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:30}}
              multiline={true}
              value = {outstockInputNote}
              maxLength={500}
              onChangeText={val => setOutstockInputNote(val)} 
              />
              </View>
                </View>
                <View style={{padding:5}}>
                <Button disabled={submitButtonStatusWE} title='Update Entry' color='#6a5acd' onPress={() => UpdateWrongEntry()} />
                </View>
                </View>
                </View>
                </ScrollView>
                </Modal>
            </View>
    );
  }