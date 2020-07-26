import React, {useState,useEffect} from 'react';
import {Image,View,Text,TextInput,TouchableOpacity,Button,Alert,Picker,ActivityIndicator,Dimensions} from 'react-native';

export default function IncomeForm ({profileAdmin,closeModall,navigation}) {
const hd = Dimensions.get('window').height;
    const [incomeInfoName,setIncomeInfoName] = useState('');
    const [incomeInfoAmount,setIncomeInfoAmount] = useState('');
    const [incomeInfoNote,setIncomeInfoNote] = useState('');
    const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
    
    const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);
    
    const today = new Date();
    let date = today.getDate();
    let num_month = today.getMonth();
    let year = today.getFullYear();
    
    const month = months[num_month];
  
  const [pickerValue,setPickerValue] = useState({});

  const [incomeNameData,setIncomeNameData] = useState([]);
  const [getTotalTemp,setGetTotalTemp] = useState();

    console.disableYellowBox = true; 
      
  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getDropdownName')
    .then(resname => resname.json())
    .then(dataname => {
      if(dataname != '')
      {
      setIncomeNameData(dataname);
      }
      else
      {
      setIncomeNameData('');
      }
    })
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getalldk')
    .then(restotal => restotal.json())
    .then(datatotal => {
      setGetTotalTemp(datatotal);
    })
    .catch(error => console.log(error))
  },[])

    const [listtt,setListtt] = useState(false);

const submitIncome = async () => {

  if(pickerValue != '')
  {
    if(incomeInfoAmount != '')
    {
      if(incomeInfoNote != '')
      {
        try
        {
  setSubmitButtonStatus(true);
  let amount ;
  let totamount; 
 amount = parseInt(incomeInfoAmount) + (getTotalTemp  != '' ? getTotalTemp[0].incomeAmount : 0);
 totamount = parseInt(incomeInfoAmount) + (getTotalTemp  != '' ? getTotalTemp[0].totalAmountDK : 0);

  const pickvalue = {_id : pickerValue._id,name : pickerValue.name,admin : pickerValue.admin,phone : pickerValue.phone,picture : pickerValue.picture};

const res = await fetch("https://dkdemo-server.herokuapp.com/add-income2",{
    method : "post",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      amount : incomeInfoAmount,
      note : incomeInfoNote,
      incomeStatus : 'Income',
      incomeDate : date,
      incomeMonth : month,
      incomeYear : year,
      incomeAddedById : profileAdmin._id,
      incomeAddedByName : profileAdmin.name,
      pickerValuesName : pickvalue,
      getTotalTemp : getTotalTemp,
      amount1 : amount,
      totamount : totamount,
    })
  });
  const data = await res.json();
  if(data.msg != 'failure')
  {
    Alert.alert('Income Added Successfully');
  }
  else
  {
    Alert.alert('Income Added Failure!!');
  }
   setSubmitButtonStatus(false);
   closeModall(false);
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
else
{
Alert.alert('Something Went Wrong.., Check Name');
}
 }

    return(
<View>
        <View style={{marginTop:20,alignContent:'center',marginBottom:20,height:hd}}>

<View style={{alignSelf:'center'}}>

{incomeNameData != '' ?
               <View style={{height:100,width:100,}}>
               <Image
                style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
                source = {{uri : pickerValue.picture}}
                />
               </View>
         :
         <View style={{height:100,width:100,backgroundColor:'transparent',borderBottomRightRadius:23}}>
             <View style={{alignSelf:'center',marginTop:40}}>
             
             </View>
         </View>
         }
         {incomeNameData == '' &&
      <View style={{marginTop:10,alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
      } 

</View>

<Text style={{marginTop:20,marginBottom:1,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Choose User</Text>

          <Picker style={{width:300,height:50}}
            selectedValue={pickerValue}
            onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue)}}
            >
              {incomeNameData.map((item,key) => (
                
                 <Picker.Item  label={item.name} value={item} key={key} />
                
              ))}    
          </Picker>
              
<Text style={{marginTop:1,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Amount</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            onChangeText={val => setIncomeInfoAmount(val)} />

<Text style={{marginTop:1,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Note</Text>
          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:90}}
            multiline={true}
            maxLength={500}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setIncomeInfoNote(val)} />
             
        </View>
        <View style={{padding:5}}>
        <Button 
        disabled={submitButtonStatus}
        title='Add Income'
        color='#6a5acd'
        onPress={() => submitIncome()}
        />
     </View>  
</View>
    );
}