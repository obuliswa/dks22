
import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,ScrollView,Dimensions} from 'react-native';

export default function TourClickMore ({route,navigation}) {
    console.disableYellowBox = true;
    const hd = Dimensions.get('window').height;

  const [tourClickMoreModal_DK,setTourClickMoreModal_DK] = useState(true);

   const cancelClickMoreTour = () => {
    setTourClickMoreModal_DK(false);
     navigation.pop();
   }

    return(
<View>
      <Modal visible={tourClickMoreModal_DK} transparent={true} animationType='fade'>
        <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelClickMoreTour()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20}}> Tour Info</Text>
                
        <View style={{marginTop:30,alignContent:'center',marginBottom:50,height:hd}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Place : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.place}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Member : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.member}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.dkDate}</Text></Text>
            {route.params.items.dkAmount != '' &&
            <View>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>DK's Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.dkAmount}</Text></Text>
            </View>
            }
            {route.params.items.dkNote != '' &&
            <View>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>DK's Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.dkNote}</Text></Text>
            </View>
            }
            </View>
        </View>
                </View>
                </View>
                </ScrollView>
            </Modal>
            </View>
    );
}