import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal} from 'react-native';

export default function DksCilckMore ({route,navigation}) {
  
  console.disableYellowBox = true;
  const [dkClickMore,setDkClickMore] = useState(true);

   const dateDetails = `${route.params.items.date} ${route.params.items.month}  ${route.params.items.year}`;

   const closeModal = () => {
    setDkClickMore(false);
    navigation.pop();
   }

    return(
<View>
      <Modal visible={dkClickMore} transparent={true} animationType='fade'>
        
        <View style={{backgroundColor:'#000000aa',flex:1,}}>
             <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
             <TouchableOpacity onPress = {() => closeModal()} >
             <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
             </TouchableOpacity>
             
             <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Savings Info</Text>
             
             <View style={{marginTop:20,alignContent:'center',marginBottom:20}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.nameDetails[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>{route.params.items.status != 'Removed' ? `Added By :` : `Removed By :` } <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.adminName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{dateDetails}</Text></Text>
            </View>

        </View>
                </View>
                </View>
                
            </Modal>
            </View>
    );
}