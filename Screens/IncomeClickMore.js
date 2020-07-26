import React, {useState,useEffect} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Alert,Modal,ScrollView,Image,Dimensions} from 'react-native';

export default function IncomeClickMore ({route,navigation}) {

const hd = Dimensions.get('window').height;
  console.disableYellowBox = true; 

  const [incomeClickMoreModal_DK,setIncomeClickMoreModal_DK] = useState(true);

   const cancelClickMoreIncome = () => {
     setIncomeClickMoreModal_DK(false)
     navigation.navigate('Income Details')
   }
   let outstockDate = `${route.params.items.date} ${route.params.items.month} ${route.params.items.year}`;
   let incomeDate = `${route.params.items.incomeDate} ${route.params.items.incomeMonth} ${route.params.items.incomeYear}`;

    return(
<View >
  
      <Modal visible={incomeClickMoreModal_DK} transparent={true} animationType='fade'>
      <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => cancelClickMoreIncome()} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>

                <Text style={{marginTop:20,color:'#6a5acd',fontWeight:'bold',fontSize:15}}> Income Ticket Info</Text>

        <View style={{marginTop:30,alignContent:'center',marginBottom:20}}>

        {route.params.items.status === 'Outstock' || route.params.items.status === 'Removed' ? 
            <View style={{padding:10,marginBottom:30}}>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockNameDetails[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockNameDetails[0].name}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Passticket Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockPassticketId}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Base Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockBaseAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.instockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Interest : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockInterest}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Month : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.outstockMonth}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Instock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.instockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Outstock Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.outstockNote}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.status != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{route.params.items.status}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.status}</Text> }</Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.admin}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.collectionAmount}</Text></Text>
            <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Collection Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.collectionNote}</Text></Text>
            <Text style={{marginBottom:40,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{outstockDate}</Text></Text>
            </View>
        :

        <View style={{padding:10,marginBottom:20,flex:1,height:hd}}>
        <View style={{alignItems:'center',marginTop:10,marginBottom:40,}}>
        <Image
        style = {{width:100,height:100,resizeMode:'cover',borderBottomRightRadius:23}}
        source = {{uri : route.params.items.pickerValuesName[0].picture}}
        />
        </View>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Id : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items._id}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Name : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.pickerValuesName[0].name}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Amount : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.amount}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Status : {route.params.items.incomeStatus != 'Removed' ? <Text style={{color:'#006400',fontStyle:'italic',}}>{route.params.items.incomeStatus}</Text>:<Text style={{color:'#dc143c',fontStyle:'italic',}}>{route.params.items.incomeStatus}</Text> }</Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Note : <Text style={{color:'black',fontWeight:'normal',fontStyle:'normal'}}>{route.params.items.note}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Date : <Text style={{color:'black',fontWeight:'normal'}}>{incomeDate}</Text></Text>
        <Text style={{marginBottom:5,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Added By : <Text style={{color:'black',fontWeight:'normal'}}>{route.params.items.incomeAddedByName}</Text></Text>
        </View>
      }
        </View>
                </View>
                </View>
                </ScrollView>
            </Modal>
    </View>   
    );
}