import React, {useState,useEffect, useCallback} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,Dimensions,Image,ScrollView,ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

export default function InStockClickMore ({route,navigation}) {
  console.disableYellowBox = true;
  const [inStockClickMoreModal_DK,setInStockClickMoreModal_DK] = useState(true);
  const [separateRemoveExp,setSeparateRemoveExp] = useState({});
  const [separateUndoExp,setSeparateUndoExp] = useState({});
  const [separateUndoOut,setSeparateUndoOut] = useState({});
  const [separateRemoveOut,setSeparateRemoveOut] = useState({});
  const [instockRemoveModal,setInstockRemoveModal] = useState(false);
  const [instockUndoModal,setInstockUndoModal] = useState(false);
  const [activePreview,setActivePreview] = useState([{}]);
  const [expInitModiPreview,setExpInitModiPreview] = useState({});
  const [outstockNamePreview,setOutstockNamePreview] = useState('');
  const [activePreviewFlag,setActivePreviewFlag] = useState(true);
  const [dk,setDk] = useState([{}]);
  const [submitButtonStatusRE,setSubmitButtonStatusRE] = useState(false);
  const [submitButtonStatusRO,setSubmitButtonStatusRO] = useState(false);
  const [submitButtonStatusUE,setSubmitButtonStatusUE] = useState(false);
  const [submitButtonStatusUO,setSubmitButtonStatusUO] = useState(false);

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
      setDk(datadk);
    })
    .catch(error => console.log(error))
  })

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getpassticketexpenditure',{
      method:'post',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        _id : route.params.items._id
      })
    })
    .then(resexp =>  resexp.json())
    .then(dataexp => { 
      setActivePreview(dataexp);
      if(dataexp[0].pickerDataOutstock != '' && dataexp[0].pickerDataOutstock != undefined)
      {
      setOutstockNamePreview(dataexp[0].pickerDataOutstock[0].name);
      }

  let checkFindIdInitPreviewExp = dataexp[0].passTicketAdmin.find(item => item._id === dataexp[0].initiatedBy);
  let checkFindIdInitPreviewOut = dataexp[0].passTicketAdmin.find(item => item._id === dataexp[0].initiatedByoutstock);
  let checkFindIdModiPreviewExp = dataexp[0].passTicketAdmin.find(item => item._id === dataexp[0].modifiedBy);
  let checkFindIdModiPreviewOut = dataexp[0].passTicketAdmin.find(item => item._id === dataexp[0].modifiedByoutstock);

   let findIdInitPreviewExp = '';
   let findIdInitPreviewOut = '';
   let findIdModiPreviewExp = '';
   let findIdModiPreviewOut = '';

  if(checkFindIdInitPreviewExp != '' && checkFindIdInitPreviewExp != undefined)
   findIdInitPreviewExp = checkFindIdInitPreviewExp.name;

  if(checkFindIdInitPreviewOut != '' && checkFindIdInitPreviewOut != undefined)
   findIdInitPreviewOut = checkFindIdInitPreviewOut.name;

  if(checkFindIdModiPreviewExp != '' && checkFindIdModiPreviewExp != undefined)
   findIdModiPreviewExp = checkFindIdModiPreviewExp.name;

  if(checkFindIdModiPreviewOut != '' && checkFindIdModiPreviewOut != undefined)
   findIdModiPreviewOut = checkFindIdModiPreviewOut.name;

   setExpInitModiPreview({nameInit : findIdInitPreviewExp,nameModi : findIdModiPreviewExp,nameInitOut : findIdInitPreviewOut, nameModiOut : findIdModiPreviewOut});
   setActivePreviewFlag(false);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  const cancelClickMoreInStock = () => {     
     setInStockClickMoreModal_DK(false)
    navigation.pop();
   }

   const separateRemove = (items,option) => {
    
    if(items.status === 'Expenditure' || option === 'Expenditure')
    {
      setSeparateRemoveOut('');
      setSeparateRemoveExp(items);
      setInstockRemoveModal(true);
    }
    else
    {
      setSeparateRemoveExp('');
      setSeparateRemoveOut(items);
      setInstockRemoveModal(true);
    }
   }

   
   const separateUndo = (items,option) => {
    if(items.status === 'Expenditure' || option === 'Expenditure')
    {
      setSeparateUndoOut('');
      setSeparateUndoExp(items);
      setInstockUndoModal(true);
    }
    else
    {
      setSeparateUndoExp('');
      setSeparateUndoOut(items);
      setInstockUndoModal(true);
    }
  }


   const cancelRemoveInstock = () => {
    setInstockRemoveModal(false);
   }
   const cancelUndoInstock = () => {
    setInstockUndoModal(false);
   }

const RemoveSeparateInstock = async (option) => {

  if(option === 'Expenditure')
  {
    if(dk!= '')
    {
    try
    {
    let setintotamtdk = (dk[0].expenditureAmount - parseInt(separateRemoveExp.expAmount));
    let updateinamt = dk[0].instockAmount + parseInt(separateRemoveExp.expAmount);

   setSubmitButtonStatusRE(true);

   let minusexpamt = parseInt(route.params.items.amount) + parseInt(separateRemoveExp.expAmount);

  const resremovedexp = await fetch('https://dkdemo-server.herokuapp.com/removesexp2',{
     method:'post',
     headers : {
       'Content-Type' : 'application/json'
     },
     body : JSON.stringify({
       passticket : separateRemoveExp.id,
       instock : separateRemoveExp.instockId,
       status : 'Removed',
       removedBy : route.params.routeAdm.name,
       removedDate : removeDate,
       expamt : minusexpamt,
       _id : separateRemoveExp.expenditureId,
       dk : dk,
       srexpamt : separateRemoveExp.expAmount,
       setintotamtdk : setintotamtdk,
       updateinamt : updateinamt,
     })
   });

  const dataremovedexp = await resremovedexp.json();

    if(dataremovedexp.msg != 'failure')
    {
      Alert.alert('Removed Successfully');
    }
    else
    {
      Alert.alert('Removed Failure!!');
    }
         setSubmitButtonStatusRE(false);
         setInstockRemoveModal(false);
         setInStockClickMoreModal_DK(false);
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
  else
  {
    if(dk != '')
    {

    try
    {
  
  setSubmitButtonStatusRO(true);

 const res = await fetch('https://dkdemo-server.herokuapp.com/findchild',{
   method:'post',
   headers : {
     'Content-Type' : 'application/json'
   },
   body : JSON.stringify({
     outid : separateRemoveOut.outstockId,
   })
 });

  const data = await res.json();
 
  if(data.outstockPassTicketDetails == '' || (data.outstockPassTicketDetails != '' && data.outstockPassTicketDetails[0].status !== 'Income') )
  {

    let setintotamtdk = (dk[0].outstockAmount - parseInt(separateRemoveOut.outAmountInput));
    let updateinamt = dk[0].instockAmount + parseInt(separateRemoveOut.outAmountInput);
     
  let addoutamt = parseInt(route.params.items.amount) + parseInt(separateRemoveOut.outAmountInput); 

  const resremovedout = await fetch('https://dkdemo-server.herokuapp.com/removesout2',{
     method:'post',
     headers : {
       'Content-Type' : 'application/json'
     },
     body : JSON.stringify({
       passticket : separateRemoveOut.id,
       instock : separateRemoveOut.instockId,
       status : 'Removed',
       removedBy : route.params.routeAdm.name,
       removedDate : removeDate,
       expamt : addoutamt,
       _id : separateRemoveOut.outstockId,
       dk : dk,
       sroutamt : separateRemoveOut.outAmountInput,
       setintotamtdk : setintotamtdk,
       updateinamt : updateinamt,
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
       setSubmitButtonStatusRO(false);
       setInstockRemoveModal(false);
       setInStockClickMoreModal_DK(false);
       navigation.pop();
      
  }
  else
  {
    Alert.alert('Something Went Wromg,,. Check Child Ticket');
    setInstockRemoveModal(false);
  }
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
 }


  const UndoSeparateInstock = async (option) => {

    if(option === 'Expenditure')
    {
     if(parseInt(route.params.items.amount) >= parseInt(separateUndoExp.expAmount))
     {
       if(dk != '')
       {
      try
      {
       setSubmitButtonStatusUE(true);

     let addexpamt = parseInt(route.params.items.amount) - parseInt(separateUndoExp.expAmount);
     let setintotamtdk = (dk[0].expenditureAmount + parseInt(separateUndoExp.expAmount));
    let updateinamt = dk[0].instockAmount - parseInt(separateUndoExp.expAmount);

     const resundodexp = await fetch('https://dkdemo-server.herokuapp.com/undosexp2',{
       method:'post',
       headers : {
         'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
         passticket : separateUndoExp.id,
         instock : separateUndoExp.instockId,
         status : 'Expenditure',
         removedBy : route.params.routeAdm.name,
         removedDate : removeDate,
         expamt : addexpamt,
         _id : separateUndoExp.expenditureId,
         statusIn : 'Instock',
         dk : dk,
         srexpamt : separateUndoExp.expAmount,
         setintotamtdk : setintotamtdk,
         updateinamt : updateinamt,
       })
     });
     
      const dataundodexp = await resundodexp.json();

      if(dataundodexp.msg != 'failure')
      {
        Alert.alert('Undo Successfully');
      }
      else
      {
        Alert.alert('Undo Failure!!');
      }
           setSubmitButtonStatusUE(false);
           setInstockUndoModal(false);
           setInStockClickMoreModal_DK(false);
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
else
{
  Alert.alert('Something Went Wrong,,. Check Balance');
  setInstockUndoModal(false);
}
   }
    else
    {

     if(parseInt(route.params.items.amount) >= parseInt(separateUndoOut.outAmountInput))
     {
       if(dk != '')
       {
       try
       {

       setSubmitButtonStatusUO(true);

     let addoutamt = parseInt(route.params.items.amount) - parseInt(separateUndoOut.outAmountInput); 
     let setintotamtdk = (dk[0].outstockAmount + parseInt(separateUndoOut.outAmountInput));
     let updateinamt = dk[0].instockAmount - parseInt(separateUndoOut.outAmountInput);

   const resundoout = await fetch('https://dkdemo-server.herokuapp.com/undosout2',{
       method:'post',
       headers : {
         'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
         passticket : separateUndoOut.id,
         instock : separateUndoOut.instockId,
         status : 'Outstock',
         removedBy : route.params.routeAdm.name,
         removedDate : removeDate,
         expamt : addoutamt,
         _id : separateUndoOut.outstockId,
         statusIn : 'Instock',
         dk : dk,
         suoutamt : separateUndoOut.outAmountInput,
         setintotamtdk : setintotamtdk,
         updateinamt : updateinamt,
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
           setSubmitButtonStatusUO(false);
           setInstockUndoModal(false);
           setInStockClickMoreModal_DK(false);
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
else
{
  Alert.alert('Something Went Wrong,,. Check Balance');
  setInstockUndoModal(false);
}
   }
  }

   const dateDetails = `${route.params.items.date} ${route.params.items.month} ${route.params.items.year}`;
   const pictureWidth = Dimensions.get('window').width;
   const height = Dimensions.get('window').height;

    return(
      <View>
        
      <Modal visible={inStockClickMoreModal_DK} transparent={true} animationType='fade'>
      <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelClickMoreInStock()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{marginTop:20,color:'#6a5acd',fontWeight:'bold',fontSize:15}}> In-stock Ticket Info</Text>

        <View style={{marginTop:30,padding:10,marginBottom:5}}>
             <View style={{marginBottom:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.name}</Text></Text>            
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Pass Ticket Status :
            <Text style={{color:'black',fontWeight:'normal'}}> { route.params.items.globalPassticketCounter }</Text>
            </Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Total Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.baseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : {route.params.items.amount != 0 ? <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text> : <Text style={{color:'#dc143c'}}>{route.params.items.amount}</Text>}</Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.createdAdminName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status :  {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic'}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginBottom:20,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{dateDetails}</Text></Text>
            </View>

             {route.params.items.passtickdetails != '' ?   
              <View >
        <Text style={{padding:30,fontSize:22,color:'#6a5acd',fontStyle:'italic',alignSelf:'center',marginBottom:5}}>Pass Ticket Details</Text> 
          <View>
        {route.params.items.passtickdetails.map((item,index) => (
          <View key={item.id}>
            {(item.status === 'Expenditure' || (item.expInitName != null && item.status === 'Removed')) ? 
            
              <View style={{marginTop:10,padding:10,marginBottom:5}}>
              
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> } </Text>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal',fontWeight:'normal'}}>{item.id}</Text></Text>
              <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{item.expInitName}</Text></Text>
              <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{item.expModiName}</Text></Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{item.expAmount}</Text></Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{item.expNote}</Text></Text>
           {(item.inActive != '' || item.active != '') &&
           <View>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? `Removed By : ${item.inActive}` : `Undo By : ${item.active}`}</Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? 'Removed Date' : 'Undo Date'} : <Text style={{color:'black',fontWeight:'normal'}}>{item.removedDate}</Text></Text>
           </View>
            }
           <View style={{flexDirection:'row'}}>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{item.expDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{item.expMonth} <Text style={{color:'black',fontWeight:'normal'}}>{item.expYear}</Text></Text> </Text>
           {(route.params.routeAdm.admin && route.params.items.status != 'Removed') &&
           <TouchableOpacity onPress={() => (item.expInitName !='' && item.status != 'Expenditure') ? separateUndo(item,'Expenditure') : separateRemove(item,'Expenditure')} ><Text style={{color:'#dc143c',fontWeight:'bold',marginTop:0,fontSize:15}}>     {(item.expInitName !='' && item.status != 'Expenditure') ? 'Undo' : 'Remove'}</Text></TouchableOpacity>
            }
           </View>
           
           
           
           </View>
            : 
            <View style={{marginTop:10,padding:10,marginBottom:5}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {item.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{item.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{item.status}</Text> } </Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal'}}>{item.id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{item.outInitName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{item.outModiName}</Text></Text>  
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{item.pickerName[0].name}</Text></Text> 
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{item.outAmountInput}</Text></Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{item.outMonthInput}</Text></Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{item.outInterestInput}</Text></Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{item.outNoteInput}</Text></Text>
           {(item.inActive != '' || item.active != '') &&
           <View>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? `Removed By : ${item.inActive}` : `Undo By : ${item.active}`}</Text>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{item.inActive != '' ? 'Removed Date' : 'Undo Date'} : <Text style={{color:'black',fontWeight:'normal'}}>{item.removedDate}</Text></Text>
           </View>
            }
           <View style={{flexDirection:'row',}}>
           <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{item.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{item.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{item.outYear}</Text></Text> </Text>
           {(route.params.routeAdm.admin && route.params.items.status != 'Removed') &&
           <TouchableOpacity onPress={() => (item.outInitName !='' && item.status != 'Outstock') ? separateUndo(item,'Outstock') : separateRemove(item,'Outstock')} ><Text style={{color:'#dc143c',fontWeight:'bold',marginTop:0,fontSize:15}}>     {(item.outInitName !='' && item.status != 'Outstock') ? 'Undo' : 'Remove'}</Text></TouchableOpacity>
            }
           </View>
           </View>
          }
          {(((route.params.items.passtickdetails).length) -1 > index )  &&
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{width:(pictureWidth/2)-80,backgroundColor:'#00ffdd',padding:2.5,alignSelf:'center',}}></View>
          <View style={{padding:15}}><Text style={{fontStyle:'normal',fontWeight:'bold',color:'black'}}>DK</Text></View>
          <View style={{width:(pictureWidth/2)-80,backgroundColor:'#00ffdd',padding:2.5,alignSelf:'center',}}></View>
          </View>
          }
          </View>
          
          ))}

 <View style={{marginTop:20,}}>
 {activePreviewFlag ?
          <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
          
                  :
                  <View style={{marginTop:5,marginBottom:20}}>
                    {activePreview[0].globalPassticketStatus === 'Expenditure' &&           
                    <View>
  <Text style={{marginTop:5,marginBottom:30,color:'#00ffdd',fontSize:15,fontWeight:'bold'}}>Active Ticket</Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{activePreview[0].globalPassticketStatus}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0]._id}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInit}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModi}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].expenditureAmount}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{activePreview[0].expenditureNote}</Text></Text>
  <Text style={{marginBottom:20,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].dateexpenditure}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].monthexpenditure} <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].yearexpenditure}</Text></Text> </Text>   
                   </View>
                    }
                    {activePreview[0].globalPassticketStatus === 'Outstock' &&           
                    <View>
                      <Text style={{marginTop:5,marginBottom:30,color:'#00ffdd',fontSize:15,fontWeight:'bold'}}>Active Ticket</Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{activePreview[0].globalPassticketStatus}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInitOut}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModiOut}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{outstockNamePreview}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockAmount}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockMonth}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockInterest}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{activePreview[0].outstockNote}</Text></Text>
  <Text style={{marginBottom:20,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].dateoutstock}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].monthoutstock} <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].yearoutstock}</Text></Text> </Text>
                    </View>
                    }
                  </View>
                }
            </View>
        </View>
                </View>
                : 
            <View style={{marginBottom:height/10}}>
          <View style={{marginTop:100,alignSelf:'center',marginBottom:height/5,}}>
            <Text style={{fontSize:20,fontStyle:'italic',color:'#6a5acd'}}>No Ticket Passed Yet.</Text>
          </View>
                
                {activePreviewFlag ?
          <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
          
                  :
                  <View style={{marginTop:-height/5+30}}>
                    {activePreview[0].globalPassticketStatus === 'Expenditure' &&           
                    <View>
  <Text style={{marginTop:5,marginBottom:30,color:'#00ffdd',fontSize:15,fontWeight:'bold'}}>Active Ticket</Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{activePreview[0].globalPassticketStatus}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0]._id}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInit}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModi}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].expenditureAmount}</Text></Text>
  <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{activePreview[0].expenditureNote}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].dateexpenditure}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].monthexpenditure} <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].yearexpenditure}</Text></Text> </Text>   
                   </View>
                    }
                    {activePreview[0].globalPassticketStatus === 'Outstock' &&           
                    <View>
                      <Text style={{marginTop:5,marginBottom:30,color:'#00ffdd',fontSize:15,fontWeight:'bold'}}>Active Ticket</Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{activePreview[0].globalPassticketStatus}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInitOut}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModiOut}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{outstockNamePreview}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockAmount}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockMonth}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].outstockInterest}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{activePreview[0].outstockNote}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].dateoutstock}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].monthoutstock} <Text style={{color:'black',fontWeight:'normal'}}>{activePreview[0].yearoutstock}</Text></Text> </Text>
                    </View>
                    }
                  </View>
                }
              </View>      
                }
                </View>
                </View>
                </View>
                </ScrollView>
            </Modal>

                <Modal visible={instockRemoveModal} transparent={true} animationType='fade'>
                  <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelRemoveInstock()} >
                <Text style={{fontSize:18,padding:2,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Remove Ticket Details</Text>
                
            {separateRemoveExp != '' ?
                <View style={{marginTop:30,padding:10,}}>
          
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateRemoveExp.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{separateRemoveExp.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateRemoveExp.status}</Text> }</Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>InStock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.instockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expenditureId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.id}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expInitName}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expModiName}</Text></Text>    
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expAmount}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateRemoveExp.expNote}</Text></Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{marginBottom:height/3,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveExp.expYear}</Text></Text> </Text>
          </View>
          
          <Button disabled={submitButtonStatusRE} title='Remove' color='#6a5acd' onPress={() => RemoveSeparateInstock('Expenditure')} />
          
                </View>
            :
                <View style={{marginTop:30,padding:4}}>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateRemoveOut.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{separateRemoveOut.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateRemoveOut.status}</Text> }</Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.instockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outstockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.id}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outInitName}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outModiName}</Text></Text>    
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.pickerName[0].name}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outAmountInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outMonthInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outInterestInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateRemoveOut.outNoteInput}</Text></Text>
          <Text style={{marginBottom:height/3,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateRemoveOut.outYear}</Text></Text> </Text>
          <Button disabled={submitButtonStatusRO} title='Remove' color='#6a5acd' onPress={() => RemoveSeparateInstock('Outstock')} />
                </View>
                }
                </View>
                </View>
                </ScrollView>
                </Modal>

                <Modal visible={instockUndoModal} transparent={true} animationType='fade'>
                  <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelUndoInstock()} >
                <Text style={{fontSize:18,padding:2,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>Cancel</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Undo Ticket Details</Text>
                
            {separateUndoExp != '' ?
                <View style={{marginTop:30,padding:10,}}>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateUndoExp.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic'}}>{separateUndoExp.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateUndoExp.status}</Text> }</Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>InStock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.instockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expenditureId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.id}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expInitName}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expModiName}</Text></Text>    
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expAmount}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateUndoExp.expNote}</Text></Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{marginBottom:height/3,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoExp.expYear}</Text></Text> </Text>
          </View>
          <Button disabled={submitButtonStatusUE} title='Undo' color='#6a5acd' onPress={() => UndoSeparateInstock('Expenditure')} />
                </View>
            :
                <View style={{marginTop:30,padding:10}}>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {separateUndoOut.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{separateUndoOut.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{separateUndoOut.status}</Text> }</Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.instockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Id : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outstockId}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.id}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outInitName}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outModiName}</Text></Text>    
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outAmountInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outMonthInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outInterestInput}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{separateUndoOut.outNoteInput}</Text></Text>
          <Text style={{marginBottom:height/3,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outDate}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outMonth} <Text style={{color:'black',fontWeight:'normal'}}>{separateUndoOut.outYear}</Text></Text> </Text>
          <Button  disabled={submitButtonStatusUO} title='Undo' color='#6a5acd' onPress={() => UndoSeparateInstock('Outstock')} />
                </View>
                }
                </View>
                </View>
                </ScrollView>
                </Modal>
          </View>
    );
}