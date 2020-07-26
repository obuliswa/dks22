import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Picker,ScrollView} from 'react-native';

export default function TourForm ({profileAdmin,closeModal}) {
    console.disableYellowBox = true;
    const [tourInfoPlace,setTourInfoPlace] = useState('');
    const [tourInfoAmount,setTourInfoAmount] = useState();
    const [tourInfoMember,setTourInfoMember] = useState();
    const [tourInfoNote,setTourInfoNote] = useState('');
    const [tourInfoDate,setTourInfoDate] = useState('');
    const [tourInfoDkAmount,setTourInfoDkAmount] = useState();
    const [tourInfoDkNote,setTourInfoDkNote] = useState('');
    const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
    const [dkIncome,setDkIncome] = useState();

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getalldk')
        .then(res => res.json())
        .then(data => {
            if(data != '' && data[0].incomeAmount != '' )
            {
            setDkIncome(data[0].incomeAmount);
            }
            else
            {
            setDkIncome(0);
            }
        })
    },[])

    const borclr = () => {

    }

    const submitTour = async () => {
        if(tourInfoPlace != '')
        {
            if(tourInfoAmount != '')
            {
                if(tourInfoMember != '')
                {
                    if(tourInfoNote != '')
                    {
                        try
                        {
                        setSubmitButtonStatus(true);
                       const ress = await fetch('https://dkdemo-server.herokuapp.com/savetour1',{
                            method : 'post',
                            headers : {
                                'Content-Type' : 'application/json'
                            },
                            body : JSON.stringify({
                                place : tourInfoPlace,
                                amt : tourInfoAmount,
                                member : tourInfoMember,
                                note : tourInfoNote,
                                dkamt : tourInfoDkAmount,
                                dknote : tourInfoDkNote,
                                dkdate : tourInfoDate,
                            })
                        });
                        const data =  await ress.json();
                        if( data.msg != 'failure')
                        {
                            Alert.alert('Tour Added Successfully');
                        }
                        else
                        {
                            Alert.alert('Tour Added Failure!!');
                        }
                            setSubmitButtonStatus(false);
                            closeModal(false);
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
            Alert.alert('Something Went Wrong,,.Check Member');
        }
            }
            else
        {
            Alert.alert('Something Went Wrong,,.Check Amount');
        }
        }
        else
        {
            Alert.alert('Something Went Wrong,,.Check Place');
        }
    }

    return(
       <View>
             <View style={{marginTop:30,alignContent:'center',marginBottom:40}}> 

              <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Place</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:5}}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoPlace(val)} />

            <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Amount</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:5}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoAmount(val)} />

            <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Member</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:5}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoMember(val)} />

            <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Note</Text>

          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:5}}
            multiline={true}
            maxLength={500}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoNote(val)} />

<Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> Date</Text>

<TextInput 
  style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:5}}
  multiline={true}
  selectionColor = {'#6a5acd'}
  onChangeText={val => setTourInfoDate(val)} />

            <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> DK Amount</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:5}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoDkAmount(val)} />

        <Text style={{fontSize:15,color:'#6a5acd',marginBottom:5,fontStyle:'italic',fontWeight:'bold'}}> DK Note</Text>

            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:50}}
            multiline={true}
            maxLength={500}
            selectionColor = {'#6a5acd'}
            onChangeText={val => setTourInfoDkNote(val)} />
         </View> 
         <View style={{padding:5}}>
              <Button 
            disabled={submitButtonStatus}
            title='Add Tour'
            color='#6a5acd'
            onPress={() => submitTour()}
            />
         </View>
         </View>
    );
}