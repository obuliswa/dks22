
import React, {useState, useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Picker, Image,ActivityIndicator,Dimensions} from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome';

export default function InStockForm ({profileAdmin,closeModal}) {

const hd = Dimensions.get('window').height;
console.disableYellowBox = true;
  
    const [inStockInfoName,setInStockInfoName] = useState('');
    const [inStockInfoAmount,setInStockInfoAmount] = useState('');
    const [inStockInfoNote,setInStockInfoNote] = useState('');
    const [instockData,setInstockData] = useState([]);
    const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
    const [getTotalTemp,setGetTotalTemp] = useState();
    const [dkInstock,setDkInstock] = useState();
    const [dkincom,setDkIncom] = useState();
    const [isFocused,setIsFocused] = useState(true);
    
    const [pickerValue,setPickerValue] = useState({});

    const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December'])

   console.disableYellowBox = true; 
  
  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getDropdownName')
    .then(resname => resname.json())
    .then(dataname => setInstockData(dataname))
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    fetch('https://dkdemo-server.herokuapp.com/getalldk')
    .then(restotal => restotal.json())
    .then(datatotal => {
      if(datatotal != '' && datatotal[0].incomeAmount != '')
      {
      setGetTotalTemp(datatotal[0]._id);
      setDkIncom(datatotal[0].incomeAmount);
      if(datatotal[0].instockAmount != '' && datatotal[0].instockAmount != undefined && datatotal[0].instockAmount != 'null')
      {
        setDkInstock(datatotal[0].instockAmount);
      }
      else
      {
        setDkInstock(0);
      }
    }
    else
    {
      setDkIncom(0);
    }
    })
    .catch(error => console.log(error))
  },[])

  const handleFocus = () => {
    setIsFocused('red');
  }
  const handleBlur = () => {
    setIsFocused(false);
  }

  const today = new Date();
  let date = today.getDate();
  let num_month = today.getMonth();
  let year = today.getFullYear();
  
  const month = months[num_month];


const submitInstock = async () => {
  if(pickerValue != '' )
  {
  if( inStockInfoAmount !='' && inStockInfoAmount < dkincom) 
  {
  if( inStockInfoNote != '') 
  {
    try
    {
    setSubmitButtonStatus(true);
    const pickvalue = {_id : pickerValue._id,name : pickerValue.name,admin : pickerValue.admin,phone : pickerValue.phone,picture : pickerValue.picture};
    let amountinstock = JSON.stringify(parseInt(inStockInfoAmount) + parseInt(dkInstock));
    let incomerest = parseInt(dkincom) - parseInt(inStockInfoAmount);

 const res = await fetch("https://dkdemo-server.herokuapp.com/addinstock2",{
        method : "post",
        headers : {
          "Content-Type" : "application/json" 
        },
        body : JSON.stringify({
          name : pickerValue.name,
          pickerValues : pickvalue,
          baseAmount : inStockInfoAmount,
          amount : inStockInfoAmount,
          note : inStockInfoNote,
          createdAdminId : profileAdmin._id,
          createdAdminName : profileAdmin.name,
          status : 'Instock',
          date,
          month,
          year,
          _id : getTotalTemp,
          amt : amountinstock,
          incom : incomerest,
        })
  });
  const data = await res.json();
    if(data.msg != 'failure')
    {
    Alert.alert('In Stock Added Successfully');
    }
    else
    {
    Alert.alert('In Stock Added Failure!!');
    }
    setSubmitButtonStatus(false);
    closeModal(false);
    }
    catch(error) {
          Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
  }
}
else {
  Alert.alert('Something Went Wrong.., Check Note');
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
  
    return(
      <View>
        <View style={{marginTop:30,alignContent:'center',height:hd}}>
      <View style={{flexDirection:'row',marginHorizontal:20,marginBottom:20}}>
        <View style={{height:100,width:100,}}>
        <Image
        style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
        source = {{uri : profileAdmin.picture}}
        />
        </View>
      <View style={{padding:30,marginTop:10}}><Text></Text></View>
        {pickerValue.picture ?
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
      </View>

      {instockData == '' &&
  <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
      } 

      <Text style={{marginTop:20,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Choose User</Text>
          <Picker style={{width:300,height:40}}
            selectedValue={pickerValue}
            onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue)}}
            >
              {instockData.map((item,key) => (
                 <Picker.Item  label={item.name} value={item} key={key} />
              ))}
              
          </Picker>
              
            <Text style={{fontSize:15,color:'#6a5acd',marginTop:10,fontWeight:'bold',fontStyle:'italic',marginBottom:5}}>Income Amount <Text style={{fontStyle:'italic',fontSize:15,color:'black'}}>{dkincom >=0 && `: ${dkincom}`}</Text></Text>
            <Text style={{marginTop:15,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Amount</Text>

            <TextInput 
            style={{borderWidth:1,padding:5,fontSize:12,borderRadius:6, borderColor:'#ddd'}}
          keyboardType={'numeric'}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setInStockInfoAmount(val)} />

          <Text style={{marginTop:15,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Note</Text>

          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:20,}}
            selectionColor = {'#6a5acd'}
            multiline={true}
            maxLength={500}
            onChangeText={val => setInStockInfoNote(val)} />
            
        </View>
        <View style={{marginBottom:5,marginTop:1}}>
        <Button 
        disabled={submitButtonStatus}
        title='Add Instock'
        color='#6a5acd'
        onPress={() => submitInstock()}
        />
        </View>
        </View>
    );
}