import React, {useState, useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,Picker, ScrollView,ActivityIndicator,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native';

export default function InStockDetailsPassTicket ({route,navigation}) {
  console.disableYellowBox = true;

  const [chooseTicketModal,setChooseTicketModal] = useState(true);  
    
  const [inStockPassTicketExpenditureModal,setInStockPassTicketExpenditureModal] = useState(false);

  const [inStockPassTicketOutStockModal,setInStockPassTicketOutStockModal] = useState(false);
  
  const [pickerV,setPickerV] = useState({});

  const hd = Dimensions.get('window').height;

    const [dropdownName,setDropdownName] = useState([{}]);
    const [pickerValue,setPickerValue] = useState();
    const [picketInd,setPicketInd] = useState();

    const [buttonStatusExpenditure,setButtonStatusExpenditure] = useState();
    const [buttonStatusOutstock,setButtonStatusOutstock] = useState();
    const [buttonStatusColorExp,setButtonStatusColorExp] = useState('#6a5acd');
    const [buttonStatusColorOut,setButtonStatusColorOut] = useState('#6a5acd');

    const [expenditurePassTicketCountDb,setExpenditurePassTicketCountDb] = useState('');
    const [expenditurePassTicketCountDbData,setExpenditurePassTicketCountDbData] = useState([{}]);
    

    const [inStockExpenditureInputAmount,setInStockExpenditureInputAmount] = useState('');
    const [inStockExpenditureInputNote,setInStockExpenditureInputNote] = useState('');

    const [outstockPassTicketCountDb,setOutstockPassTicketCountDb] = useState('');

    const [inStockOutStockName,setInStockOutStockName] = useState(route.params.items.name);
    const [inStockOutStockAmount,setInStockOutStockAmount] = useState(route.params.items.amount);
    const [inStockOutStockMonth,setInStockOutStockMonth] = useState('');
    const [inStockOutStockInterest,setInStockOutStockInterest] = useState('');
    const [inStockOutStockNote,setInStockOutStockNote] = useState(route.params.items.note);
    const [inStockOutStockInputAmount,setInStockOutStockInputAmount] = useState('');
    const [inStockOutStockInputNote,setInStockOutStockInputNote] = useState('');


    const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December'])

    const [outstockButton,setOutstockButton] = useState(0);
    const [latestInitiated,setLatestInitiated] = useState('');
    const [latestModified,setLatestModified] = useState('');

    const [expenditureInitiated,setExpenditureInitiated] = useState('');
    const [expenditureModified,setExpenditureModified] = useState('');

    const [outstockInitiated,setOutstockInitiated] = useState('');
    const [outstockModified,setOutstockModified] = useState('');

    const [checkPreview,setCheckPreview] = useState({});

    const [expInitModiPreview,setExpInitModiPreview] = useState({});

    const [buttonStatusOutstockSubmit,setButtonStatusOutstockSubmit] = useState(false);

    const [outstockNamePreview,setOutstockNamePreview] = useState('');

    const [activityIndiPreview,setActivityIndiPreview] = useState(true);

    const [openResetModal,setOpenResetModal] = useState(false);

    const [resetIdPreview,setResetIdPreview] = useState('');
    const [resetStatusPreview,setResetStatusPreview] = useState('');
    const [resetExpNamePreview,setResetExpNamePreview] = useState('');
    const [resetExpAmountPreview,setResetExpAmountPreview] = useState('');
    const [resetOutNamePreview,setResetOutNamePreview] = useState('');
    const  [resetOutAmountPreview,setResetOutAmountPreview] = useState('');

    const [defaultValueResetAmount,setDefaultValueResetAmount] = useState('');

    const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
    const [submitButtonStatusOut,setSubmitButtonStatusOut] = useState(false);
    const [submitButtonStatusReset,setSubmitButtonStatusReset] = useState(false);
    
    const today = new Date();
    let date = today.getDate();
    let num_month = today.getMonth();
    let year = today.getFullYear();
    
    const month = months[num_month];

    const [getTotalTempExp,setGetTotalTempExp] = useState();
    const [getTotalTempOut,setGetTotalTempOut] = useState();
    const [getTotalTemp,setGetTotalTemp] = useState();

    useEffect(() => {
      fetch('https://dkdemo-server.herokuapp.com/getDropdownName')
      .then(resdropdown => resdropdown.json())
      .then(data => {
        if(data != '')
        {
        setDropdownName(data);
        if(route.params.items.pickerDataOutstock == '')
        {
        setPickerValue(data[0]);
        setPicketInd(0);
        }
        else
        {
        setPickerValue(data[route.params.items.pickerIndexOut]);
        setPicketInd(route.params.items.pickerIndexOut);
        }
        }
        else
        {
          setDropdownName('');
        }
      })
    },[])

    useEffect(() => {
      fetch('https://dkdemo-server.herokuapp.com/getalldk')
      .then(restotal => restotal.json())
      .then(datatotal => {
        setGetTotalTemp(datatotal);

       if(datatotal[0].expenditureAmount != '' && datatotal[0].expenditureAmount != 'null')
       {
        setGetTotalTempExp(datatotal[0].expenditureAmount);
       }
       else
       {
        setGetTotalTempExp(0);
       }
       if(datatotal[0].outstockAmount != '' && datatotal[0].outstockAmount != 'null')
       {
        setGetTotalTempOut(datatotal[0].outstockAmount);
       }
       else
       {
        setGetTotalTempOut(0);
       }
      })
      .catch(error => console.log(error))
    },[])

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

        if(dataexp[0].pickerDataOutstock != '' && dataexp[0].pickerDataOutstock != undefined)
        {
        setOutstockNamePreview(dataexp[0].pickerDataOutstock[0].name);
        }
        setExpenditurePassTicketCountDbData(dataexp);
    
        setExpenditurePassTicketCountDb( dataexp[0].passticketExpenditureCounter);
        
        setOutstockPassTicketCountDb( dataexp[0].passticketOutStockCounter);

        setExpenditureInitiated(dataexp[0].initiatedBy);
        setExpenditureModified(dataexp[0].modifiedBy);

        setOutstockInitiated(dataexp[0].initiatedByoutstock);
        setOutstockModified(dataexp[0].modifiedByoutstock);

       let findId = dataexp[0].passTicketAdmin.find(item => item._id === route.params.routeAdm._id);

       setCheckPreview(findId);

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
    
        if(findId)
        {
          if(dataexp[0].passticketExpenditureCounter > 0 && dataexp[0].passticketExpenditureCounter < 3)
          {
          setButtonStatusExpenditure(true);
          setButtonStatusColorExp('#006400');
          setButtonStatusColorOut('#dc143c');
          }
          else
          {
          setButtonStatusOutstock(true);
          setButtonStatusColorOut('#006400');
          setButtonStatusColorExp('#dc143c');
          }
        }
        else
        {
          setButtonStatusExpenditure(false);
          setButtonStatusOutstock(false);
          if(dataexp[0].passticketExpenditureCounter != 0)
          {
          setButtonStatusColorExp('#006400');
          setButtonStatusColorOut('#dc143c');
          }
          else if(dataexp[0].passticketOutStockCounter != 0)
          {
          setButtonStatusColorExp('#dc143c');
          setButtonStatusColorOut('#006400');
          }
          else
          {
          setButtonStatusColorExp('#6a5acd');
          setButtonStatusColorOut('#6a5acd');
          }
        }

        if(dataexp[0].passticketExpenditureCounter === 1 || dataexp[0].passticketExpenditureCounter === 2)
        {
          setInStockExpenditureInputAmount(dataexp[0].expenditureAmount);
          setInStockExpenditureInputNote(dataexp[0].expenditureNote);
        }
     
        if(dataexp[0].passticketOutStockCounter === 1 || dataexp[0].passticketOutStockCounter === 2 )
        {
          setInStockOutStockInputAmount(dataexp[0].outstockAmount);
          setInStockOutStockInputNote(dataexp[0].outstockNote);
          setInStockOutStockMonth(dataexp[0].outstockMonth);
          setInStockOutStockInterest(dataexp[0].outstockInterest);
        }

        if(dataexp[0].passticketExpenditureCounter === 0 || dataexp[0].passticketOutStockCounter === 0)
        {
          setDefaultValueResetAmount(dataexp[0].amount);
        }
        setActivityIndiPreview(false);
      })  
    },[])

   const submitInStockPassTicketExpenditureModal = async () => {
    
    try 
    {

    if(inStockExpenditureInputAmount != '' && inStockExpenditureInputAmount != 0 && inStockExpenditureInputAmount <= parseInt( route.params.items.amount)) 
    {  
     if(inStockExpenditureInputNote != '')
     {
      setSubmitButtonStatus(true);

      const passAdminId = {_id : route.params.routeAdm._id, name : route.params.routeAdm.name};

      const amtCal = JSON.stringify(parseInt(route.params.items.amount) - parseInt(inStockExpenditureInputAmount));

      var modified = "";
      var initiated = "";

      if(expenditurePassTicketCountDb === 0)
      {
        initiated = route.params.routeAdm._id;
      }
      else if(route.params.items.balanceAmount === amtCal)
      {
        initiated = expenditureInitiated;
        modified = expenditureModified;
      }
      else
      {
        initiated = expenditureInitiated;
        modified = route.params.routeAdm._id;
      }

    const amountexpdk = JSON.stringify(parseInt(inStockExpenditureInputAmount) + getTotalTempExp);
    const updateinamt = getTotalTemp[0].instockAmount - parseInt(inStockExpenditureInputAmount);

    const resultexp = await fetch('https://dkdemo-server.herokuapp.com/updatepassticketexpenditure2',{
        method : 'post',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          _id : route.params.items._id,
          balanceAmount : amtCal,
          passTicketAdmin : passAdminId,
          expamount :  inStockExpenditureInputAmount,
          expnote : inStockExpenditureInputNote,
          globalPassticketStatus : 'Expenditure',
          initiatedBy : initiated,
          dateexpenditure : date,
          monthexpenditure : month,
          yearexpenditure : year,
          modifiedBy : modified,
          expenditurePassTicketCountDb : expenditurePassTicketCountDb,
          instockName : route.params.items.name,
          instockAmount : route.params.items.amount,
          instockBaseAmount : route.params.items.baseAmount,
          instockPickerValues : route.params.items.pickerValues,
          instockNote : route.params.items.note,
          status : 'Instock',
          date,
          month,
          year,
          admin : 'Admin',
          getTotalTempExp : getTotalTempExp,
          getTotalTemp : getTotalTemp,
          passticketexp : 0,
          amountexpdk : amountexpdk,
          updateinamt : updateinamt,
        })
     });
     const dataresultexp = await resultexp.json();
              console.log(dataresultexp);                     
          if(dataresultexp.msg != 'failure')
          {
            Alert.alert('Expenditure Ticket Passed Successfully');
          }
          else
          {
            Alert.alert('Expenditure Ticket Passed Failure!!');
          }
            setSubmitButtonStatus(false);
            setInStockPassTicketExpenditureModal(false);
            setChooseTicketModal(false);
            navigation.pop();
    }
    else {
      Alert.alert('Something Went Wrong.., Check Note');
    }
   }
   else {
    Alert.alert('Something Went Wrong.., Check Amount');
  }
      }
      catch(error) {
        Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message)
      }
    }


const submitInStockOutStock = async () => {
  try
  {
  if(pickerValue && pickerValue._id != '' && pickerValue.name != '')
  { 
    if(inStockOutStockInputAmount != '' && inStockOutStockInputAmount != 0 && inStockOutStockInputAmount <= parseInt( route.params.items.amount))
    {
      if(inStockOutStockMonth != '' && inStockOutStockMonth != 0) 
      {
        if(inStockOutStockInterest != '' && inStockOutStockInterest != 0)
        {
          if(inStockOutStockInputNote != '')
          {
            setSubmitButtonStatusOut(true);

  const passAdminIdOut = {_id : route.params.routeAdm._id, name : route.params.routeAdm.name};
        
  const amtCalOut = JSON.stringify(parseInt(route.params.items.amount) - parseInt(inStockOutStockInputAmount));
      
  var modifiedOut = "";
  var initiatedOut = "";

  let pickerDataCheck = route.params.items.pickerDataOutstock.find(item => item._id === pickerValue.id);
  let temp='';

  if(outstockPassTicketCountDb === 0)
  {
    initiatedOut = route.params.routeAdm._id;
  }
  else 
  {
   if(route.params.items.balanceAmount === amtCalOut && temp === '' )
  {
    initiatedOut = outstockInitiated;
    modifiedOut = outstockModified;
  }
  else
  {
    temp = 'true';
    initiatedOut = outstockInitiated;
    modifiedOut = route.params.routeAdm._id;
  }
   if(pickerDataCheck != '' && temp === '')
  {
    initiatedOut = outstockInitiated;
    modifiedOut = outstockModified;
  }
  else
  {
    temp = 'true';
    initiatedOut = outstockInitiated;
    modifiedOut = route.params.routeAdm._id;
  }
  if(route.params.items.outstockMonth === inStockOutStockMonth && temp === '')
  { 
    initiatedOut = outstockInitiated;
    modifiedOut = outstockModified; 
  }
  else
  {
    temp = 'true';
    initiatedOut = outstockInitiated;
    modifiedOut = route.params.routeAdm._id;
  }
  if(route.params.items.outstockInterest === inStockOutStockInterest &&  temp === '')
  {
    initiatedOut = outstockInitiated;
    modifiedOut = outstockModified;
  }
  else
  {
    temp = 'true';
    initiatedOut = outstockInitiated;
    modifiedOut = route.params.routeAdm._id;
  }
}

let amountoutdk = JSON.stringify(parseInt(inStockOutStockInputAmount) + parseInt(getTotalTempOut));
let updateinamt = parseInt(getTotalTemp[0].instockAmount) - parseInt(inStockOutStockInputAmount);

 const resultout = await fetch('https://dkdemo-server.herokuapp.com/updatepassticketoutstockentry2',{
        method : 'post',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          _id : route.params.items._id,
          balanceAmount : amtCalOut,
          passTicketAdmin : passAdminIdOut,
          pickerDataOutstock : pickerValue,
          outstockamount : inStockOutStockInputAmount,
          outstockmonth : inStockOutStockMonth,
          outstockinterest : inStockOutStockInterest,
          outstocknote : inStockOutStockInputNote,
          globalPassticketStatus : 'Outstock',
          initiatedByoutstock : initiatedOut,
          dateoutstock : date,
          monthoutstock : month,
          yearoutstock : year,
          modifiedByoutstock : modifiedOut,
          pickerI : picketInd,
          outstockPassTicketCountDb : outstockPassTicketCountDb,
          instockName : route.params.items.name,
          instockAmount : route.params.items.amount,
          instockBaseAmount : route.params.items.baseAmount,
          instockPickerValues : route.params.items.pickerValues,
          instockNote : route.params.items.note,
          status : 'Instock',
          date,
          month,
          year,
          admin : 'Admin',
          getTotalTempOut : getTotalTempOut,
          getTotalTemp : getTotalTemp,
          instockBalanceAmount : route.params.items.balanceAmount,
          passticketout : 0,
          pickerIndexOut : 0,
          amountoutdk : amountoutdk,
          updateinamt : updateinamt,
        })
     });
    const dataresultout = await resultout.json();
                    
        if(dataresultout.msg != 'failure')
        {
          Alert.alert('Outstock Ticket Passed Successfully');
        } 
        else
        {
          Alert.alert('Outstock Ticket Passed Failure!!');
        } 
          setSubmitButtonStatusOut(false);
          setInStockPassTicketOutStockModal(false);
          setChooseTicketModal(false);
          navigation.pop();
          }
          else{
            Alert.alert('Something Went Wrong.., Check Note');
          }
        }
        else{
          Alert.alert('Something Went Wrong.., Check Interest');
        }
      }
      else
      {
        Alert.alert('Something Went Wrong.., Check Month');
      }
    }
    else{
      Alert.alert('Something Went Wrong.., Check Amount');
    }
  }
  else
  {
  Alert.alert('Something Went Wrong.., Check Name');
  }
    }
    catch(error) {
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
    }
  }

   const cancelChooseTicketModal = () => {
    setChooseTicketModal(false);
    navigation.navigate('InStock Details')
    
   }

   const openExpenditureModal = () => {
    setInStockPassTicketExpenditureModal(true);
   }

   const openOutStockModal = () => {
     setOutstockButton(1);
    setInStockPassTicketOutStockModal(true);
   }

   const cancelInStockPassTicketExpenditureModal = () => {
    setInStockPassTicketExpenditureModal(false)
    }

    const cancelInStockPassTicketOutStockModal = () => {
     setInStockPassTicketOutStockModal(false);
    }

    const openResetPreviewOption = (id,status,expname,expamount,outname,outamount) => {
      setResetIdPreview(id);
      setResetStatusPreview(status);
      setResetExpNamePreview(expname);
      setResetExpAmountPreview(expamount);
      setResetOutNamePreview(outname);
      setResetOutAmountPreview(outamount);
      setOpenResetModal(true);
    }

    const resetPreviewModal = async () => {
      try
      {
      setSubmitButtonStatusReset(true);
  const resetrespreview = await fetch('https://dkdemo-server.herokuapp.com/resetpreview1',{
       method:'post',
       headers : {
         'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
         resetid : resetIdPreview,
         amount : defaultValueResetAmount,
       })
     });

     const dataresetpreview = await resetrespreview.json();

     if(dataresetpreview.msg != 'failure')
     {
      Alert.alert('Instock Reset Successfully');
     }
     else
     {
      Alert.alert('Instock Reset Failure!!');
     }
       setSubmitButtonStatusReset(false);
       setOpenResetModal(false);
       setChooseTicketModal(false);
       navigation.pop();
    }
    catch(error) {
      Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
    }
  }



    const cancelResetModal = () => {
      setOpenResetModal(false);
    }

    return(

  <View style={{flex:1,}}>
        
        <Modal visible={chooseTicketModal} transparent={true} animationType='fade'>
          <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{backgroundColor:'#000000aa',flex:1,}}>
        <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10,marginBottom:10}}>
        <TouchableOpacity onPress = {() => cancelChooseTicketModal()} >
        <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
        </TouchableOpacity>
        {route.params.items.amount != 0 ?
        
        <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20}}>Choose Ticket</Text>
        
        : <View></View>}
        <View style={{height:hd,}}>
          {route.params.items.amount != 0 ?
        <View style={{marginTop:30,backgroundColor:'white',}}>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:10}}>
            <Button title="OutStock" color={buttonStatusColorOut} disabled={buttonStatusOutstock}  onPress={() => openOutStockModal()} />
            <Button title="Expenditure" color={buttonStatusColorExp} disabled={buttonStatusExpenditure}  onPress={() => openExpenditureModal()} />
            </View>
          {activityIndiPreview ? 
          <View style={{marginTop:5,alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20,}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
          : 
          <View>
          {expInitModiPreview !='' && (checkPreview != '' && checkPreview != undefined) ?          
                    
<View style={{}}>
           {expenditurePassTicketCountDbData[0].globalPassticketStatus === 'Expenditure' ? 
           
<View style={{marginTop: 20,padding:10,}}>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{expenditurePassTicketCountDbData[0].globalPassticketStatus}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0]._id}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInit}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModi}</Text></Text>
          <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].expenditureAmount}</Text></Text>
          <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal',fontSize:15,}}>{expenditurePassTicketCountDbData[0].expenditureNote}</Text></Text>
          <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].dateexpenditure}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].monthexpenditure} <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].yearexpenditure}</Text></Text> </Text>
          <View style={{alignSelf:'center',marginBottom:5,marginTop:20}}>
          <TouchableOpacity onPress={() => openResetPreviewOption(expenditurePassTicketCountDbData[0]._id,expenditurePassTicketCountDbData[0].globalPassticketStatus,expenditurePassTicketCountDbData[0].name,expenditurePassTicketCountDbData[0].expenditureAmount,outstockNamePreview,expenditurePassTicketCountDbData[0].outstockAmount)} >
          <Text style={{color:'#6a5acd',fontSize:22}}>RESET  </Text>
          </TouchableOpacity> 
          </View>
</View>
          : 
<View style={{marginTop: 20,padding:10,}}>   
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : <Text style={{color:'black',}}>{expenditurePassTicketCountDbData[0].globalPassticketStatus}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Initiated : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameInitOut}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Modified : <Text style={{color:'black',fontWeight:'normal'}}>{expInitModiPreview.nameModiOut}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{outstockNamePreview}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].outstockAmount}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Month : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].outstockMonth}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Interest : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].outstockInterest}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{expenditurePassTicketCountDbData[0].outstockNote}</Text></Text>
        <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].dateoutstock}</Text> <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].monthoutstock} <Text style={{color:'black',fontWeight:'normal'}}>{expenditurePassTicketCountDbData[0].yearoutstock}</Text></Text> </Text>
        <View style={{alignSelf:'center',marginTop:20,marginBottom:5}}>
          <TouchableOpacity onPress={() => openResetPreviewOption(expenditurePassTicketCountDbData[0]._id,expenditurePassTicketCountDbData[0].globalPassticketStatus,expenditurePassTicketCountDbData[0].name,expenditurePassTicketCountDbData[0].expenditureAmount,outstockNamePreview,expenditurePassTicketCountDbData[0].outstockAmount)} >
          <Text style={{color:'#6a5acd',fontSize:22}}>RESET  </Text>
          </TouchableOpacity> 
        </View>
</View>
          }   
          </View>
            :<View></View>}
          </View>
          }
        </View>
         : <Text style={{marginTop:40,fontSize:22,color:'#6a5acd',alignSelf:'center',fontWeight:'bold',marginBottom:hd}}>Amount Is Low.</Text>
          }</View>
            </View>
            </View>
            </ScrollView>
        </Modal>
       
      <Modal visible={inStockPassTicketExpenditureModal} transparent={true} animationType='fade' >
      <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelInStockPassTicketExpenditureModal()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,marginTop:20,fontWeight:'bold',color:'#6a5acd',}}>   Expenditure Info </Text>
                <View style={{marginTop:30,alignContent:'center',marginBottom:10}}>
      
                <View style={{padding:10,}}>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.name}</Text></Text>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Total Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.baseAmount}</Text></Text>
                <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Amount </Text>
                <TextInput 
                style={{borderWidth:1,borderColor:'#6a5acd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
                selectionColor = {'#6a5acd'}
                keyboardType='numeric'
                value = {inStockExpenditureInputAmount}
                onChangeText={val => setInStockExpenditureInputAmount(val)} />

                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
                <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.createdAdminName}</Text></Text>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Note  </Text>
                <TextInput 
                style={{borderWidth:1,borderColor:'#6a5acd',fontSize:12,borderRadius:6,marginBottom:hd/10}}
                selectionColor = {'#6a5acd'}
                value = {inStockExpenditureInputNote}
                multiline={true}
                maxLength={500}
                onChangeText={val => setInStockExpenditureInputNote(val)} />
                </View>
                </View>

<View style={{margin:10}}>
            <Button 
            disabled={submitButtonStatus}
            title='OK, Pass Ticket'
            color='#6a5acd'
            onPress={() => submitInStockPassTicketExpenditureModal()}/> 
</View>
                </View>
                </View>
                </ScrollView>
            </Modal>


        <Modal visible={inStockPassTicketOutStockModal} transparent={true} animationType='fade'>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:'#000000aa',flex:1,}}>
            <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10,marginBottom:10}}>
            <TouchableOpacity onPress = {() => cancelInStockPassTicketOutStockModal()} >
            <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
            </TouchableOpacity>
            
            <Text style={{marginTop:20,fontSize:15,fontWeight:'bold',color:'#6a5acd'}}>  OutStock Info</Text>
          
        <View style={{marginTop:30,alignContent:'center',marginBottom:5}}>
          
      <Text style={{fontSize:15,fontStyle:'italic',fontWeight:'bold',color:'#6a5acd',marginTop:5}}> Choose User</Text>

       <Picker style={{width:300,height:50}}
          selectedValue={pickerValue}
          onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue), setPicketInd(itemIndex)}}
          >
            {dropdownName.map((item,keyy) => (
               <Picker.Item  label={item.name} value={item} key={keyy} />               
            ))}
        </Picker>

          <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>  Amount : <Text style={{color:'black',fontWeight:'normal'}}>{inStockOutStockAmount}</Text></Text>

      <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> OutStock Amount </Text>
                <TextInput 
                style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
                keyboardType='numeric'
                selectionColor = {'#6a5acd'}
                value = {inStockOutStockInputAmount}
                onChangeText={val => setInStockOutStockInputAmount(val)} />

<Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> OutStock Month</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            value = {inStockOutStockMonth}
            onChangeText={val => setInStockOutStockMonth(val)} />

<Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> OutStock Interest</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            value = {inStockOutStockInterest}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setInStockOutStockInterest(val)} />

          <Text style={{marginBottom:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{inStockOutStockNote}</Text></Text>
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> OutStock Note </Text>
         
                <TextInput 
                style={{borderWidth:1,borderColor:'#6a5acd',fontSize:12,borderRadius:6,marginBottom:hd/10}}
                selectionColor = {'#6a5acd'}
                value = {inStockOutStockInputNote}
                multiline={true}
                maxLength={500}
                onChangeText={val => setInStockOutStockInputNote(val)} />

            <View style={{marginTop:10,marginBottom:10}}>
            <Button 
            disabled={submitButtonStatusOut}
            title='OK , Pass Ticket'
            color='#6a5acd'
            onPress={() => submitInStockOutStock()}
            />  
            </View>
        </View>
        </View>
        </View>
        </ScrollView>
        </Modal>

        <Modal visible={openResetModal} transparent={true} animationType='fade'>
        <View style={{backgroundColor:'#000000aa',flex:1}}>
        <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:20,borderRadius:10}}>
        <TouchableOpacity onPress = {() => cancelResetModal()} >
        <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
        </TouchableOpacity>
        
        <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',alignSelf:'center',marginTop:20,}}>To Confirm, Reset This Ticket Entry..</Text>
        
        <View style={{marginTop:30,padding:10,width:150,alignSelf:'center'}}>
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



  