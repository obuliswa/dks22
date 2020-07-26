import React, { useState,useEffect, useCallback } from 'react';
import {View,Text,Modal,TouchableOpacity,FlatList,Picker,Image,Button, Alert, Dimensions,ScrollView,ActivityIndicator} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';

export default function AdminChange ({navigation,route}) {
    console.disableYellowBox = true;
    const [showAdmin,setShowAdmin] = useState(true);
    const [nameInfo,setNameInfo] = useState([]);
    const [dropNameInfo,setDropNameInfo] = useState([]);
    const [pickerValue,setPickerValue] = useState({});
    const [dropPickerValue,setDropPickerValue] = useState({});
    const [getDkMem,setGetDkMem] = useState();
    const [submitButtonStatusAC,setSubmitButtonStatusAC] = useState(false);
    const [submitButtonStatusDU,setSubmitButtonStatusDU] = useState(false);

    const width = Dimensions.get('window').width;
    const hd = Dimensions.get('window').height;

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getuniqadn')
        .then(res => res.json())
        .then(data => {
            if(data != '')
            {
            setNameInfo(data);
            setPickerValue(data[0]);
            }
            else
            {
                setNameInfo('');
            }
        })
        .catch(error => console.log(error))
    },[])

    
    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getDropdownName')
        .then(res1 => res1.json())
        .then(data1 => {
            if(data1 != '') {
            setDropNameInfo(data1);
            }
            else
            {
                setDropNameInfo('');
            }
        })
        .catch(error => console.log(error))
    },[])
    

    useEffect(() => {
        fetch('https://dkdemo-server.herokuapp.com/getdkmtot')
        .then(totres => totres.json())
        .then(datatot => {
            if(datatot != '')
            {
            setGetDkMem(datatot);
            }
            else
            {
            setGetDkMem('');
            }
        })
        .catch(error => console.log(error))
    },[])

    const closeModal = () => {
        setShowAdmin(false);
        navigation.pop();
    }

    const submitAdmin = async () => {

        if(pickerValue != '')
        {
            try
            {
            setSubmitButtonStatusAC(true);

       const subres = await fetch('https://dkdemo-server.herokuapp.com/changeadmin1',{
            method : 'post',
            headers : {
                "Content-Type" : 'application/json'
            },
            body : JSON.stringify({
                newAdm : pickerValue._id,
                oldAdm : route.params._id,
            })
        });
           const datasub = await subres.json();
           if(datasub.msg != 'failure')
           {
            Alert.alert('Admin Changed Successfully');
           }
           else
           {
            Alert.alert('Admin Changed Failure!!');
           }
        setSubmitButtonStatusAC(false);
        setShowAdmin(false);
        navigation.navigate('Feed');
        }
        catch(error) {
            Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
        }
        }
        else
        {
            Alert.alert('Something Went Wrong.., Check Name');
        }
    }

    const submitDelete = async () => {        
        if(dropPickerValue != '')
        {  
            if(getDkMem != '')
            {
            try
            {
            setSubmitButtonStatusDU(true);
            let temcount = getDkMem - 1;
          const delres = await fetch('https://dkdemo-server.herokuapp.com/deluser1',{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    pid : dropPickerValue._id,
                    dec : temcount,
                    dkid : getDkMem[0]._id,
                })
            });
              const datadel = await delres.json();
              if(datadel.msg != 'failure')
              {
                Alert.alert('User Delete Successfully');
              }
              else
              {
                Alert.alert('User Delete Failure!!');
              }
                setSubmitButtonStatusDU(false);
                setShowAdmin(false);
                navigation.navigate('Feed');
            }
            catch(error) {
                Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
            }
        }
        else
        {
            Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message);
        }
    }
        else
        {
            Alert.alert('Something Went Wrong.., Check Name');
        }
    }

    return (

        
        <View style={{width:width-10,}}>
             <Modal visible={showAdmin} transparent={true} animationType='fade'>
     
                 <ScrollView>
             <View style={{backgroundColor:'#000000aa',flex:1,}}>
             <View style={{backgroundColor:'#ffffff',marginTop:10,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
             <TouchableOpacity onPress = {() => closeModal()} >
             <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
             </TouchableOpacity>
             
             <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:30}}>Change Admin</Text>
             

             <View style={{marginTop:20,alignContent:'center',height:hd}}>
    
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:30}}>
                
                    <Text style={{textAlign:'left',marginLeft:20,marginTop:14}}>{route.params.name} </Text>
                   {nameInfo != '' ?
                    <View style={{marginHorizontal:-11}}>
                    <Picker style={{width:135,height:40}}
            selectedValue={pickerValue}
            onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue)}}
            >
              {nameInfo.map((item,key) => (
                 <Picker.Item  label={item.name} value={item} key={key} />
              ))}
              
          </Picker>       
          </View>
                : <Text style={{marginTop:10,color:'#6a5acd',fontSize:15}}>No User Found!</Text>
                }

                </View>

           <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:40}}>
               <View style={{height:100,width:100,}}>
               <Image
                style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
                source = {{uri : route.params.picture}}
                />
               </View>
               <View style={{padding:15}}></View>
               {nameInfo != '' ?
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
                <View style={{marginTop:10,marginBottom:10}}>
                <Button disabled={submitButtonStatusAC} title="Change" color='#6a5acd' onPress= { () => submitAdmin()} />
                </View>
                <View style={{marginTop:20}}>
                {dropNameInfo == '' &&
                <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
                }
                </View>

                <View style={{marginTop:10,}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
                    <View style={{width:130,height:3,backgroundColor:'#00ffdd',marginTop:7.5}}></View>
                    <Text style={{color:'#6a5acd'}}>OR</Text>
                    <View style={{width:130,height:3,backgroundColor:'#00ffdd',marginTop:7.5}}></View>
                </View>
                <Text style={{color:'#6a5acd',fontWeight:'bold',fontSize:15,marginBottom:15,marginTop:20}}>Delete User</Text>

                    <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:40}}>
            <Picker style={{width:135,height:40,}}
            selectedValue={dropPickerValue}
            onValueChange={(itemValue,itemIndex) => {setDropPickerValue(itemValue)}}
            >
              {dropNameInfo.map((item,key) => (
                 <Picker.Item  label={item.name} value={item} key={key} />
              ))}
              
          </Picker>       
          {dropNameInfo != '' ?
               <View style={{height:100,width:100,}}>
               <Image
                style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
                source = {{uri : dropPickerValue.picture}}
                />
               </View>
         :
         <View style={{height:100,width:100,backgroundColor:'transparent',borderBottomRightRadius:23}}>
             <View style={{alignSelf:'center',marginTop:40}}>
             
             </View>
         </View>
         }
                    </View>
<View style={{marginTop:30,marginBottom:10}}>
         <Button disabled={submitButtonStatusDU} title="Delete User" color='#6a5acd' onPress={() => submitDelete() } />
         </View>
                </View>
            </View>
            </View>
            </View>
            </ScrollView>
        
            </Modal>

            </View>
               

    );
        
}
