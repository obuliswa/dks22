import React,{useState,useEffect} from 'react';
import {View,Text,TextInput,Button, Alert,Switch,Picker,Modal,Image,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';

export default function GetAmtForm ({adminName,adminId,navigation,profile,clm}) {
  const wt = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

    const [getAmountName,setGetAmountName] = useState([]);
    const [getTotalTemp,setGetTotalTemp] = useState();
    const [dkInstock,setDkInstock] = useState();
    const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
    const [pickerValue,setPickerValue] = useState({});
    const [savingAmount,setSavingAmount] = useState();
    const [modalOpen,setModalOpen] = useState(false);
    const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);

    const [submitButtonStatusRE,setSubmitButtonStatusRE] = useState(false);

  const [isEnabled,setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(ps => !ps);

  console.disableYellowBox = true;

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getDropdownName')
        .then(resname => resname.json())
        .then(dataname => {
          if(dataname != '')
          {
          setGetAmountName(dataname);
        }
        else
        {
          setGetAmountName('');
        }
      })
        .catch(error => console.log(error))
      },[])

      useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/gettotasav')
        .then(savdata => savdata.json())
        .then(savres => {
            if(savres != '')
            {
           setDkInstock(savres[0].total);
            }
            else
            {
            setDkInstock(0);
            }
        })
        .catch(error => console.log(error))
    },[])

      const resetSav = async () => {
       
        if(dkInstock != 0)
        {
          try
          {
          setSubmitButtonStatusRE(true);

       const res = await fetch('https://dkdemo-server.herokuapp.com/resetsav1');
       const data = await res.json();
          
          if(data.msg != 'failure')
          {
            Alert.alert('DKs Savings Reset Successfully');
          }
          else
          {
            Alert.alert('DKs Savings Reset Failure!!');
          }
            setModalOpen(false);
            clm(false);
            navigation.navigate('Feed');
        }
        catch(error) {
          Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
        }
      }
      else
      {
          Alert.alert('Something Went Wrong,,. Check Savings Amount');
      }
    }

    const today = new Date();
    let date = today.getDate();
    let num_month = today.getMonth();
    let year = today.getFullYear();
    
    const month = months[num_month];


const submitSavingAmount = async () => {

  if(pickerValue != '' )  
  {
  if(savingAmount != '' && savingAmount != undefined && savingAmount != 'null' && savingAmount > 0)  
  {
    try
    {
        setSubmitButtonStatus(true);
     const res = await fetch('https://dkdemo-server.herokuapp.com/addsavings1',{
      method : 'post',
      headers : {
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
          nameDetails : pickerValue,
          amount : savingAmount,
          adminId : adminId,
          adminName : adminName,
          date : date,
          month : month,
          year : year,
          status : 'Credited',
          existtotsav : dkInstock,
      })
  });
    const data = await res.json();
    if(data.msg != 'failure')
    {
      Alert.alert('Amount Credited Successfully');
    }
    else
    {
      Alert.alert('Amount Credited Failure!!');
    }
      setSubmitButtonStatus(false);
      clm(false);
  }
  catch(error) {
  Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
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

    return (
        <View style={{marginTop:40,alignContent:'center',marginBottom:20}}>
            {pickerValue != '' &&
     <View style={{flexDirection:'row',marginBottom:20}}>
        <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: 6, height: 4},
        textShadowRadius: 6,fontStyle:'italic',fontSize:32,color:'black',marginBottom:10,marginTop:22,paddingRight:5}}>Dream</Text>

    {getAmountName != '' ?
        <View style={{width:100,height:100,}}>
        <Image
                style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
                source = {{uri : pickerValue.picture}}
                />
        </View>
        :
          <View style={{width:100,height:100,backgroundColor:'transparent',borderBottomRightRadius:23}}>
            <View style={{alignSelf:'center',marginTop:40}}>
             </View>
          </View>
}
        <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -6, height: 4},
        textShadowRadius: 6,fontStyle:'italic',fontSize:32,color:'black',marginBottom:10,marginTop:22,paddingLeft:5}}>Killer's</Text>
     </View>
        }  
        {getAmountName == '' &&
        <View style={{justifyContent:'center',alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
      }  
      
        <View style={{marginTop:30}}>
         <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Choose Name </Text>   
            <Picker style={{width:300,height:50,marginBottom:10}}
            selectedValue={pickerValue}
            
            onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue)}}
            >  
              {getAmountName.map((item,key) => (   
                 <Picker.Item  label={item.name} value={item} key={key} />  
              ))}
          </Picker>

          <Text style={{fontSize:15,color:'#6a5acd',marginBottom:10,fontStyle:'italic',fontWeight:'bold'}}>Enter Amount </Text> 
          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:40}}
            selectionColor = {'#6a5acd'}
            keyboardType='numeric'
            onChangeText={val => setSavingAmount(val)} />
                <View style={{marginBottom:20,marginTop:20}}>
        <Button 
        disabled={submitButtonStatus}
        title="Add ACCOUNT"
        color='#6a5acd'       
        onPress={() => submitSavingAmount()}     
        />
        </View>
          </View>
          
            <View style={{marginTop:30,marginBottom:5}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:130,height:3,backgroundColor:'#00ffdd',marginTop:7.5}}></View>
                    <Text style={{color:'#6a5acd'}}>OR</Text>
                    <View style={{width:130,height:3,backgroundColor:'#00ffdd',marginTop:7.5}}></View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:50,marginBottom:15}}>
                  <Text style={{fontSize:18,color:`${isEnabled ? '#6a5acd' : '#dc143c'}`,marginTop:1,fontStyle:'italic',fontWeight:'bold',}}>Reset DK's Savings Account?</Text>
                <Switch 
        trackColor={{false : "#dc143c",true : "#6a5acd"}}
        thumbColor={'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
                {isEnabled === true &&
                <View>
                <Text style={{color:'#6a5acd',fontWeight:'bold',fontSize:20,marginTop:15}}>Reset DK's 100</Text>

                <Text style={{marginBottom:30,fontSize:15,marginTop:20,fontStyle:'italic',fontWeight:'bold',color:'#6a5acd'}}>Total Savings Amount :<Text style={{fontWeight:'normal',color:'black',}}> {dkInstock}</Text> </Text>
                
                 <Button title="Reset" color= '#6a5acd' onPress= { () => setModalOpen(true) } /> 
                </View>
                }
                </View>

                <Modal visible={modalOpen} transparent={true} >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setModalOpen(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <View style={{marginTop:30,padding:10}}>
                <Text style={{fontSize:15,marginBottom:20,fontStyle:'italic',}}>Make Sure,The Tour Plan Was Successfully Executed And Then Proceed To Click<Text style={{color:'#dc143c',fontWeight:'bold'}}> Confirm!!</Text></Text>
                <Button disabled={submitButtonStatusRE} title="Confirm" color= '#dc143c' onPress= { () => resetSav() } />
                </View>
                </View>
                </View>
                </Modal>
        </View>
    );
}