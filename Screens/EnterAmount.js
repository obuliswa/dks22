import React,{ useState,useEffect } from "react";
import { View,Text,Modal,TouchableOpacity,TouchableWithoutFeedback, Keyboard, Alert,ScrollView,Dimensions } from "react-native";

import  GetAmtForm  from "./GetAmtForm";

export default function EnterAmount ({name,id,nav,pd}) {
    console.disableYellowBox = true;
        const [modalOpen,setMdalOpen] = useState(false);

        const closeMod = (res) => {
            setMdalOpen(res);
        }

        return(
            <View  >
                <TouchableWithoutFeedback onPress ={() => Keyboard.dismiss()}>
                <Modal visible={modalOpen} transparent={true} >
                    <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setMdalOpen(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <GetAmtForm adminName={name} adminId={id} navigation={nav} profile={pd} clm={closeMod} />
                </View>
                </View>
                </ScrollView>
            </Modal>
            </TouchableWithoutFeedback>
                <TouchableOpacity onPress = {() => setMdalOpen(true)} >
                <Text style={{fontSize:18,fontWeight:'bold',paddingHorizontal:6,padding:1,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:10}}>Enter Amount</Text>
                </TouchableOpacity>
            </View>            
        );
    }


