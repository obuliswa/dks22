import React,{useState, useEffect} from 'react';
import {View ,Alert,Text,Button,FlatList,Modal,TouchableOpacity,Dimensions,ActivityIndicator,Image,} from 'react-native';
import AddProfileForm from './AddProfileForm';
import LoadingScreen from './LoadingScreen';

import ProfileFeed from "./ProfileFeed";

export default function Feed ({navigation}){
  console.disableYellowBox = true;
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;

        const [addProfile,setAddProfile] = useState(false);

        const [addProfileButton,setAddProfileButton] = useState(true)
        const [ProfileData,setProfileData] = useState([]);
        const [profileLoading,setProfileLoading] = useState(true);
        const [removeDb,setRemoveDb] = useState(false);
        const [profileCount,setProfileCount] = useState();

        useEffect(() => {          
             fetch('https://dkdemo-server.herokuapp.com/getAllProfile')
             .then(res => res.json())
             .then(data => {
              setProfileData(data);
              setProfileLoading(false); 
             })
             .catch(error => console.log(error))
        })
        useEffect(() => {
             fetch('https://dkdemo-server.herokuapp.com/getAllProfileCount')
             .then(res1 => res1.json())
             .then(data1 => {
               setProfileCount(data1.count)
             })
             .catch(error => console.log(error))
        })

        const RemoveDbfun = () => {
          setRemoveDb(true);
        }

        const cancelRemove = () => {
          setRemoveDb(false);
         
        }

        const closeModalProfile = (res) => {
          setAddProfile(res);
        }

        const submitRemove = () => {
          fetch("https://dkdemo-server.herokuapp.com/removeadb")
          .then(remres => remres.json())
          .then(remdat => { 
            setRemoveDb(false)
            Alert.alert('Removed All Db')
          })
          .catch(error => {
          Alert.alert('Sorry, Something Went Wrong.., Please Try Again',error.message)
          })

        }

        return(
                <View style={{flex:1,backgroundColor:'#fff2fe',}}>

          <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-around'}}>
            <View></View>
        <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:32,color:'black',marginBottom:30}}>Dream Killer's </Text>
                  {(profileCount < 22 ) ?
                  <View>
                <View style={{marginTop:3}}>
                <Button title="SAY DK's" color='#6a5acd' onPress={() => setAddProfile(true)}  />
                </View>
                </View>
                  :
                  <View></View>
                  }
          </View>
                {profileLoading && <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:height/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>} 
                <FlatList 
                showsVerticalScrollIndicator={false}
                numColumns={3}
                keyExtractor={(item) => item._id}
                data={ProfileData}
                renderItem={({item}) => (
                   
                <ProfileFeed items={item} nav={navigation}  />
                
                )}
                />

                <Modal visible={addProfile} transparent={true} animationType='fade' >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                
                <TouchableOpacity onPress = {() => setAddProfile(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{marginTop:18,marginBottom:5,color:'#6a5acd',fontSize:15,fontWeight:'bold'}}> Add Profile</Text>
              <AddProfileForm closeModal = {closeModalProfile} navigation={navigation} />
                </View>
                </View>
            </Modal>

            <Modal visible={removeDb} transparent={true} animationType='fade' >
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10}}>
                <TouchableOpacity onPress = {() => cancelRemove()} >
                <Text style={{fontSize:12,padding:2,color:'white',backgroundColor:'blue',textAlign:'center',borderRadius:8}}>Close</Text>
                </TouchableOpacity>

                <Text>Remove All Db??</Text>
                <Button title="remove db" color="blue" onPress = {() => submitRemove()} />

                </View>
                </View>
                </Modal>
                </View>                
    )
  }
    