import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert,Dimensions} from 'react-native';

export default function ProfileFeed ({items,nav}) {
    console.disableYellowBox = true;
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;
    
    return(
        <View style={{width:width/3}}>
        <View style={{marginTop:0,padding:0,marginLeft:10,marginRight:10,marginBottom:30,}}>
        
            <TouchableOpacity onPress={() => nav.navigate('Detail',items)}>
               <View style={{width:100,height:100}}>
                <Image 
                style={{height:100,width:100,borderBottomRightRadius:23,resizeMode:'cover'}}
                source={{uri : items.picture}}
                  />          
                <Text style={{textAlign:'center',fontSize:14,color:'#6a5acd',}}>{items.name}</Text>
                </View>
            </TouchableOpacity>
            </View>
            </View>
    );
}