import React,{useState,useEffect} from 'react';
import {View,Platform,Text,Image,Dimensions,TouchableOpacity, ImageBackground, Linking,Modal,Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/AntDesign';


export default function ProfileData ({navigation,img,name,phone}) {
        console.disableYellowBox = true;
    const width = Dimensions.get('screen').width;

    const openDail = (phoneNumber) => {
            if(Platform.OS === "android")
            Linking.openURL(`tel:${phoneNumber}`);
    }
    const position = new Animated.ValueXY({x:-360,y:0});
    Animated.spring(position,{
            toValue:{x:5,y:100},
            bounciness:20,
    }).start()

        return (           
<View style={{flex:1,margin:10,}}>
<ImageBackground source={{uri : img}} style={{width:width-20,height:380,}} resizeMode='cover' >  
<View style={{flex:1,backgroundColor:'rgba(255,255,255,.1)',marginTop:260}}>
<Animated.View style={{transform:[{translateX:position.x}]}}><Text style={{fontSize:50,fontStyle:'italic',color:'#00ffdd',alignSelf:'center'}}>{name}</Text></Animated.View>

<View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',marginBottom:0,width:350,height:30,backgroundColor:'rgba(255,255,255,.06)'}}>
<TouchableOpacity onPress={() => openDail(phone)}>
<View style={{flexDirection:'row'}}><Iconn name="phone" size={15} color={'#00ffdd'} style={{marginTop:5}} />
<Text style={{fontSize:20,fontStyle:'italic',color:'#00ffdd'}}> { phone}</Text>
</View>
</TouchableOpacity>

</View>

<View style={{flexDirection:'row',justifyContent:'flex-end',paddingHorizontal:5}}>
<View style={{backgroundColor:'transparent'}}>
<TouchableOpacity style={{width:40,alignItems:'center',}} onPress = { () => navigation.openDrawer({name})} >  
<Icon name="braille" color={'#00ffdd'} size={30}/>
</TouchableOpacity>
</View>
</View>
</View>
</ImageBackground>             
  </View>           
        );
}