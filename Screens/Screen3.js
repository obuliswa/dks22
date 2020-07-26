import React,{useState, useEffect, useCallback} from 'react';
import {View,Text,TextInput,TouchableOpacity,Button,Modal,Alert,ActivityIndicator,Dimensions } from 'react-native';
import { ScrollView, FlatList, State } from 'react-native-gesture-handler';
import AnimatedNumber from 'react-native-animate-number';
import InStock from './InStock';
import InStockForm from './InStockForm';
import OutStock from './OutStock';
import Expenditure from './Expenditure';
import Income from './Income';
import IncomeForm from './IncomeForm';
import TourForm from './TourForm';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';

export default function Screen3 ({navigation,route}) {
    console.disableYellowBox = true;
    const hd = Dimensions.get('screen').height;

    const profileDetails = route.params;

    const [modalOpen_DK,setMdalOpen_DK] = useState(false);
    const [outStockModal_DK,setOutStockModal_DK] = useState(false);
    const [expenditureModal_DK,setExpenditureModal_DK] = useState(false);
    const [incomeModal_DK,setIncomeModal_DK] = useState(false);
    const [tourModal_DK,setTourModal_DK] = useState(false);
    const [dkDetailsTotalAmt,setDkDetailsTotalAmt] = useState();
    const [dkDetailsIncomeAmt,setDkDetailsIncomeAmt] = useState();
    const  [dkDetailsExpenditureAmt,setDkDetailsExpenditureAmt] = useState();
    const  [dkDetailsOutstockAmt,setDkDetailsOutstockAmt] = useState();
    const  [dkDetailsInstockAmt,setDkDetailsInstockAmt] = useState();
    const  [dkDetailsSavingsAmt,setDkDetailsSavingsAmt] = useState();
    const [dkDetailsMember,setDkDetailsMember] = useState();

    const [dknTours,setDknTours] = useState();

    const [acti,setActi] = useState(true);

    const instockModalClose = (res) => {
        setMdalOpen_DK(res);
    }

    const incomeModalClose = (res) => {
        setIncomeModal_DK(res);
    }

    const tourModalClose = (res) => {
        setTourModal_DK(res);
    }
   
    useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getalldk')
        .then(resdk => resdk.json())
        .then(datadk => {
            if(datadk != '')
            {
            if(datadk[0].totalAmountDK )
            {
            setDkDetailsTotalAmt(datadk[0].totalAmountDK);
            }
            else
            {
            setDkDetailsTotalAmt(0);
            }
            if(datadk[0].incomeAmount )
            {
            setDkDetailsIncomeAmt(datadk[0].incomeAmount);
            }
            else
            {
            setDkDetailsIncomeAmt(0);
            }
            if(datadk[0].expenditureAmount )
            {
            setDkDetailsExpenditureAmt(datadk[0].expenditureAmount);
            }
            else
            {
            setDkDetailsExpenditureAmt(0);
            }
            if(datadk[0].outstockAmount)
            {
            setDkDetailsOutstockAmt(datadk[0].outstockAmount);
            }
            else
            {
            setDkDetailsOutstockAmt(0);
            }
            if(datadk[0].instockAmount )
            {
            setDkDetailsInstockAmt(datadk[0].instockAmount);
            }
            else
            {
            setDkDetailsInstockAmt(0);
            }
            if(datadk[0].totalMemberDK)
            {
                
            setDkDetailsMember(datadk[0].totalMemberDK);
            }
            else
            {
            setDkDetailsMember(0);
            }
        }
            else
            {
                setDkDetailsTotalAmt(0);
                setDkDetailsIncomeAmt(0);
                setDkDetailsExpenditureAmt(0);
                setDkDetailsOutstockAmt(0);
                setDkDetailsInstockAmt(0);
                setDkDetailsMember(0);
            }
            setActi(false);
        })
        .catch(error => console.log(error))
    })
    )

    useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getctour')
        .then(tres => tres.json())
        .then(tdata => {
            setDknTours(tdata.count);
        })
        .catch(error => console.log(error))
    })
    )

    useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/gettotasav')
        .then(savdata => savdata.json())
        .then(savres => {
            if(savres != '')
            {
            setDkDetailsSavingsAmt(savres[0].total);
            }
            else
            {
            setDkDetailsSavingsAmt(0);
            }
        })
        .catch(error => console.log(error))
    })
    )

    return (
        <View style={{flex:1,borderWidth:5,borderColor:'white',}}>
        <ScrollView showsVerticalScrollIndicator={false} >

            <Modal visible={modalOpen_DK} transparent={true} animationType="fade" >
                <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setMdalOpen_DK(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>In-Stock Amount Info</Text>
                <InStockForm profileAdmin={profileDetails} closeModal = {instockModalClose} />
                </View>
                </View>
                </ScrollView>
            </Modal>

<Modal visible={outStockModal_DK} transparent={true} animationType="fade">
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:2,padding:25,marginLeft:13,marginRight:13,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setOutStockModal_DK(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Out-Stock Amount Info</Text>
                <OutStock  />
                </View>
                </View>
            </Modal>

<Modal visible={expenditureModal_DK} transparent={true} animationType="fade">
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:2,padding:25,marginLeft:13,marginRight:13,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setExpenditureModal_DK(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Expenditure Info</Text>
                <Expenditure/>
                </View>
                </View>
            </Modal>

<Modal visible={incomeModal_DK} transparent={true} animationType="fade">
    <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:5,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setIncomeModal_DK(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Income Info</Text>
                <IncomeForm profileAdmin={profileDetails} closeModall = {incomeModalClose} navigation={navigation} />
                </View>
                </View>
    </ScrollView>
            </Modal>


<Modal visible={tourModal_DK} transparent={true} animationType="fade">
    <ScrollView>
                <View style={{backgroundColor:'#000000aa',flex:1,}}>
                <View style={{backgroundColor:'#ffffff',marginTop:2,padding:25,marginLeft:13,marginRight:13,marginBottom:10,borderRadius:10}}>
                <TouchableOpacity onPress = {() => setTourModal_DK(false)} >
                <Text style={{fontSize:14,padding:6,color:'white',backgroundColor:'#6a5acd',textAlign:'center',borderRadius:8}}>CANCEL</Text>
                </TouchableOpacity>
                <Text style={{fontSize:15,fontWeight:'bold',color:'#6a5acd',marginTop:20,}}>Tour Info</Text>
                <TourForm profileAdmin={profileDetails} closeModal = {tourModalClose} />
                </View>
                </View>
    </ScrollView>
            </Modal>

            <View style={{flexDirection:'row',padding:15,justifyContent:'space-between',backgroundColor:'transparent'}}>
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
            <Icon name="angle-left" color={'#6a5acd'} size={30}  />
            </TouchableOpacity>
            </View>
            <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> Dream Killer's</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="braille" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>

            {acti ?
            <View style={{alignSelf:'center',width:40,elevation:3,borderColor:'transparent',height:40,borderWidth:2,backgroundColor:'white',marginTop:hd/3,justifyContent:'center',borderRadius:20}}><ActivityIndicator  style={{}} size={'small'} color={'#6a5acd'}/></View>
            : 
            <View style={{}} >
            <View style={{marginBottom:15,padding:8,backgroundColor:'rgba(255,255,255,.9)',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Amount In Dk </Text>
            <Text style={{fontSize:15}}>{dkDetailsTotalAmt}</Text>
            </View>

            <View style={{marginBottom:15,padding:8,backgroundColor:'rgba(255,255,255,.9)',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Savings Amount In Dk (RS.100)  </Text>
            <Text style={{fontSize:15}}>{dkDetailsSavingsAmt}</Text>
            </View>

            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Player's </Text>
            <Text style={{fontSize:15}}>{dkDetailsMember}</Text>
            </View>

            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>In-Stocks Amount</Text>
            <Text style={{fontSize:15,paddingBottom:13}}>{dkDetailsInstockAmt}</Text>
            {profileDetails.admin === true ?
            <View style={{flexDirection:'row', }}>
            <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('InStock Details',profileDetails)} /> 
            <View style={{padding:10}}></View>
            <Button title="Enter Info" color="#6a5acd" onPress={() => setMdalOpen_DK(true)} />
            </View>
             : 
            <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('InStock Details',profileDetails)} /> 
             } 
            </View>
            
            
            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Out-Stock Amount </Text>
            <Text style={{fontSize:15,paddingBottom:12}}>{dkDetailsOutstockAmt}</Text>
            {profileDetails.admin === true ?
            <View style={{flexDirection:'row' }}>
            <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('OutStock Details',profileDetails)} /> 
            </View>
             :
             <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('OutStock Details',profileDetails)} /> 
            }
            </View>
            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Expenditure Amount</Text>
            <Text style={{fontSize:15,paddingBottom:12}}>{dkDetailsExpenditureAmt}</Text>
            {profileDetails.admin === true ?
            <View style={{flexDirection:'row' }}>
            <Button title="Details"  color="#6a5acd" onPress={() => navigation.navigate('Expenditure Details',profileDetails)} /> 
            </View>
             :
             <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('Expenditure Details',profileDetails)} /> 
            }
            </View>
            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Income Amount</Text>
            <Text style={{fontSize:15,paddingBottom:12}}>{dkDetailsIncomeAmt}</Text>
            {profileDetails.admin === true ?
            <View style={{flexDirection:'row' }}>
            <Button title="Details"  color="#6a5acd"  onPress={() => navigation.navigate('Income Details',profileDetails)} /> 
            <View style={{padding:10}}></View>
            <Button title="Enter Info" color="#6a5acd" onPress={() => setIncomeModal_DK(true)} />
            </View>
             :
             <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('Income Details',profileDetails)} /> 
            }
            </View>

            <View style={{marginBottom:15,padding:8,backgroundColor:'white',alignItems:'center',marginHorizontal:6,borderRadius:10,elevation:5}}>
            <Text style={{fontSize:15,paddingBottom:12,color:'#6a5acd',fontStyle:'italic',fontWeight:'bold'}}>Tour's</Text>
            <Text style={{fontSize:15,paddingBottom:12}}>{dknTours}</Text>
            {profileDetails.admin === true ?
            <View style={{flexDirection:'row' }}>
            <Button title="Details"  color="#6a5acd"  onPress={() => navigation.navigate('Tours Details',profileDetails)} /> 
            <View style={{padding:10}}></View>
            <Button title="Enter Info" color="#6a5acd" onPress={() => setTourModal_DK(true)} />
            </View>
             :
             <Button title="Details" color="#6a5acd" onPress={() => navigation.navigate('Tours Details',profileDetails)} /> 
            }
            </View>
        </View>
}
        </ScrollView>
        </View>
    );
}


