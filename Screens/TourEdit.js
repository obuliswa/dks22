import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal, ScrollView} from 'react-native';

export default function TourEdit ({route,navigation}) {
    console.disableYellowBox = true;
const [tourInfoPlace,setTourInfoPlace] = useState(route.params.items.place);
const [tourInfoAmount,setTourInfoAmount] = useState(JSON.stringify(route.params.items.amount));
const [tourInfoMember,setTourInfoMember] = useState(JSON.stringify(route.params.items.member));
const [tourInfoNote,setTourInfoNote] = useState(route.params.items.note);
const [tourInfoDate,setTourInfoDate] = useState(route.params.items.dkDate);
const [tourInfoDkAmount,setTourInfoDkAmount] = useState(JSON.stringify(route.params.items.dkAmount));
const [tourInfoDkNote,setTourInfoDkNote] = useState(route.params.items.dkNote);
const [editTourModal,setEditTourModal] = useState(true);
const [submitButtonStatus,setSubmitButtonStatus] = useState(false);


const submitEditTour = async () => {    
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
                    
                   const res = await fetch('https://dkdemo-server.herokuapp.com/edittour1',{
                        method : 'post',
                        headers : {
                            'Content-Type' : 'application/json'
                        },
                        body : JSON.stringify({
                            _id : route.params.items._id,
                            place : tourInfoPlace,
                            amt : tourInfoAmount,
                            member : tourInfoMember,
                            note : tourInfoNote,
                            dkamt : tourInfoDkAmount,
                            dknote : tourInfoDkNote,
                            dkdate : tourInfoDate,
                        })
                    });
                        const data = await res.json();

                        if(data.msg != 'failure')
                        {
                            Alert.alert('Tour Edited Successfully');
                        }
                        else
                        {
                            Alert.alert('Tour Edited Failure!!');
                        }
                        setSubmitButtonStatus(false);
                        setEditTourModal(false);   
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
   
   const cancelEditTour = () => {

    setEditTourModal(false);   
    navigation.pop();

   }

    return(

      <Modal visible={editTourModal} transparent={true} >
          <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelEditTour()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Tour Info Edit</Text>
            
                <View style={{marginTop:30,alignContent:'center',marginBottom:30}}>
                <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Place</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            selectionColor = {'#6a5acd'}
            value = {tourInfoPlace}
            onChangeText={val => setTourInfoPlace(val)} />
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Apx.Amount</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            value = {tourInfoAmount}
            onChangeText={val => setTourInfoAmount(val)} />
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Member</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            value = {tourInfoMember}
            onChangeText={val => setTourInfoMember(val)} />

<Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Note</Text>
          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:10}}
            multiline={true}
            maxLength={500}
            selectionColor = {'#6a5acd'}
            value = {tourInfoNote}
            onChangeText={val => setTourInfoNote(val)} />


<Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Date</Text>
          <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:10}}
            multiline={true}
            selectionColor = {'#6a5acd'}
            value = {tourInfoDate}
            onChangeText={val => setTourInfoDate(val)} />

  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> DK's Amount</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:10}}
            keyboardType='numeric'
            selectionColor = {'#6a5acd'}
            value = {tourInfoDkAmount}
            onChangeText={val => setTourInfoDkAmount(val)} />
  <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> DK's Note</Text>
            <TextInput 
            style={{borderWidth:1,borderColor:'#ddd',fontSize:12,borderRadius:6,marginBottom:50}}
            multiline={true}
            maxLength={500}
            selectionColor = {'#6a5acd'}
            value = {tourInfoDkNote}
            onChangeText={val => setTourInfoDkNote(val)} />
                </View>
                <View style={{padding:5}}>
                <Button 
            disabled={submitButtonStatus}
            title='Update Tour'
            color='#6a5acd'
            onPress={() => submitEditTour()}/> 
            </View>
            </View>
                </View>
                </ScrollView>
            </Modal>      
    );
}