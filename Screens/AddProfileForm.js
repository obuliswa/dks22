import React,{useState, useEffect} from 'react';
import {View,Text,TextInput,Button, Alert,Platform, Image,Switch, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function AddProfileForm ({closeModal}) {

  const [Admincount,setadmincount] = useState();
  const [dkTotalMem,setDkTotalMem] = useState();
  const [dkTotalMemId,setDkTotalMemId] = useState(false);
  
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [avatarSource,setAvatarSource] = useState('');
  const [isEnabled,setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(ps => !ps);

  const [submitButtonStatus,setSubmitButtonStatus] = useState(false);
  const [submitButtonStatusI,setSubmitButtonStatusI] = useState(false);

  const [addingImage,setAddingImage] = useState(false);

  console.disableYellowBox = true;
  
  useEffect(() => {
    fetch("https://dkdemo-server.herokuapp.com/getadmcout")
    .then(res => res.json())
    .then(data => {
      if(data != '')
      {
      setadmincount(data[0].admin);
      }
      else
      {
        setadmincount(0);
      }
    })
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    fetch("https://dkdemo-server.herokuapp.com/getalldk")
    .then(restotal => restotal.json())
    .then(datatotal => {
      if(datatotal != '' && (datatotal[0].totalMemberDK != '' && datatotal[0].totalMemberDK != 0))
      {
        setDkTotalMemId(true);
        setDkTotalMem(datatotal[0].totalMemberDK);
      }
      else
      { 
        setDkTotalMem(0);
      }
    })
    .catch(error => console.log(error))
  },[])



    const submitProfile = () => {

      if(name != '' )
      {
        if(phone != '')
        {
          if(avatarSource != '')
          {
            setSubmitButtonStatus(true);
       
            fetch("https://dkdemo-server.herokuapp.com/addprofile",{
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name,
                phone,
                picture : avatarSource,
                admin : isEnabled,
                exitin : dkTotalMemId,
            })
        })
        .then((res) => { return res.json()})
        .then(data => {
          if(data.msg === 'exist')
          {
            Alert.alert('Profile Already Exist!!');
            setSubmitButtonStatusI(false);
            setSubmitButtonStatus(false);
            closeModal(false);
          }
          else if(data.msg === 'success')
          {
            Alert.alert('Player Added Successfully');
            setSubmitButtonStatusI(false);
            setSubmitButtonStatus(false);
            closeModal(false);
          }
          else
          {
            Alert.alert('Sorry, Something Went Wrong.., Please Try Again')  
          }
        })
        .catch(error => {
          Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message)
        })
      }
      else
      {
        Alert.alert('Something Went Wrong.., Check Picture');
      }
    }
    else
    {
      Alert.alert('Something Went Wrong.., Check Phone');
    }
  }
  else
  {
    Alert.alert('Something Went Wrong.., Check Name');
  }
    }

    const option = {
        title:'selected',
        storageOption : {
          skipBackup:true,
         path:'images',
        }
      }

    const pickerImageGallery = () => {
        ImagePicker.launchImageLibrary(option,response => {
      
          if(response.didCancel) {
          console.log('user cancelled image picker');
          }
          else if(response.error) {
            console.log('imagepicker error',response.error);
          }
          else {
            setAddingImage(true);
            const newFile = {
              uri :  response.uri,
              type : `${name.replace(/ +/g, "")}/${response.uri.substring(response.uri.lastIndexOf('.') + 1)}`,
              name : `${name.replace(/ +/g, "")}.${response.uri.substring(response.uri.lastIndexOf('.') + 1)}`
            } 
           const data = new FormData();
           data.append('file',newFile);
           data.append('upload_preset','dksApp');
           data.append("cloud_name","obuli42");    
           fetch("https://api.cloudinary.com/v1_1/obuli42/image/upload",{
             method:'post',
             body:data
           }).then(res => res.json())
           .then(data => {
             if(data.secure_url)
             {
             Alert.alert('Picture Added Successfully');
             setAvatarSource(data.secure_url);
             }
             else
             {
              Alert.alert('Picture Added Failure!!');
             }
             setAddingImage(false);
             setSubmitButtonStatusI(true);
           })  
           
        }
        
      }) }

    return(
        <View style={{marginTop:20,alignContent:'center'}}>
{(Admincount < 3) && 
<View style ={{flexDirection:'row',justifyContent:'flex-end',marginBottom:25}}>
  
<Text style={{fontSize:15,color:`${isEnabled ? '#6a5acd' : '#dc143c'}`,marginRight:10,fontStyle:'italic',fontWeight:'bold'}}>Admin</Text>

      <Switch 
        trackColor={{false : "#dc143c",true : "#6a5acd"}}
        thumbColor={'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
</View>
}
<Text style={{marginTop:5,marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Name</Text>
        <TextInput 
        style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:15}}
        selectionColor = {'#6a5acd'}
        onChangeText={(val) => setName(val)} 
        />
<Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}> Phone</Text>
        <TextInput 
        style={{borderWidth:1,borderColor:'#ddd',padding:5,fontSize:12,borderRadius:6,marginBottom:25}}
        keyboardType='numeric'
        selectionColor = {'#6a5acd'}
        onChangeText={(val) => setPhone(val)} 
        />
       
        <Button
        color={'#6a5acd'}
        disabled={submitButtonStatusI}
        title = 'Add Picture'
        onPress = {() => pickerImageGallery()}
        />

    {addingImage && 
    <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
     }

        <View><Text></Text></View>
        {avatarSource != '' &&
        <Button 
        disabled={submitButtonStatus}
        title='Add DK`s'
        color='#6a5acd'
        onPress={() => submitProfile()}
        />
        }
         {avatarSource != '' &&
        <View style={{marginTop:15,marginBottom:0,alignSelf:'center',width:100,height:100}}>
          <Image  style={{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
          source={{uri : avatarSource}}
          />
        
        </View>
          }

        </View>
    );
}