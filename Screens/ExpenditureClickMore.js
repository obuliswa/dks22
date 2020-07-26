import React, {useState} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function ExpenditureClickMore ({route,navigation}) {
  
  const hd = Dimensions.get('window').height;

  console.disableYellowBox = true;
  const [expenditureClickMoreModal_DK,setExpenditureClickMoreModal_DK] = useState(true);

   const submitClickMoreExpenditure = () => {
     setExpenditureClickMoreModal_DK(false)
     navigation.navigate('Expenditure Details')
   }

   const dateDetails = `${route.params.items.date} ${route.params.items.month}  ${route.params.items.year}`;

    return(
<View>
      <Modal visible={expenditureClickMoreModal_DK} transparent={true} animationType='fade'>
        <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => submitClickMoreExpenditure()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}> Expenditure Info</Text>
                
        <View style={{marginTop:30,alignContent:'center',height:hd}}>

            <View style={{padding:10,marginVertical:10}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>InstockId : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockName}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Passticket Count : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockPassticketExpCounter}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Total Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockBaseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockExpenditureAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Expenditure Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockExpenditureNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>
            <Text style={{marginBottom:50,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{dateDetails}</Text></Text>
            </View>

        </View>
                </View>
                </View>
                </ScrollView>
            </Modal>
            </View>
    );
}