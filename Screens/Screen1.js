import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,TouchableOpacity,Dimensions,ScrollView,Animated,ActivityIndicator,Image, Alert,Picker,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';

export default function Screen1 ({navigation,route}) {
    console.disableYellowBox = true;
    const profileDetails = route.params;

    const hd = Dimensions.get('screen').height;
    const wd = Dimensions.get('screen').width;
    
    const [arr,setArr] = useState([{}]);
    const [acti,setActi] = useState(true);
    const [getYear,setGetYear] = useState([{}]);
    const [pickerValue,setPickerValue] = useState();
    const [receivedSavings,setReceivedSavings] = useState();
    const [months,setMonths] = useState(['January','February','March','April','May','June','July','August','September','October','November','December']);

    const today = new Date();
    let date = today.getDate();
    let num_month = today.getMonth();
    let year = today.getFullYear();
    
    const month = months[num_month];

    const fromMonth = 10;
    const fromYear = 2019;
    const toMonth = month;
    const toYear = year;

    const [dateCal,setDateCal] = useState('');
    const [monthCal,setMonthCal] = useState('');
    const [dateCalMon,setDateCalMon] = useState('');
    
   const start_date = new Date(dateCal);

    const end_date = new Date();
    const monthCount = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
    
    const [mon,setMon] = useState([
            {month : 'January',color : '#FF7F00'},
            {month : 'February',color : '#FFFF00'},
            {month : 'March',color : '#7FFF00'},
            {month : 'April',color : '#00FF00'},
            {month : 'May',color : '#00FF7F'},
            {month : 'June',color : '#00FFFF'},
            {month : 'July',color : '#007FFF'},
            {month : 'August',color : '#0000FF'},
            {month : 'September',color : '#7F00FF'},
            {month : 'October',color : '#FF00FF'},
            {month : 'November',color : '#FF0000'},
            {month : 'December',color : '#808080'}]
        );

useFocusEffect(
       useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getyearagg')
        .then(resyear => resyear.json())
        .then(datayear => {
            if(datayear != '')
            {
            setGetYear(datayear);
            }
        })
        .catch(error => {Alert.alert('Something Went Wrong,,. Try Again!!'); })
    },[])
)
    useFocusEffect(
        useCallback(() => {
            fetch('https://dkdemo-server.herokuapp.com/getascdate')
            .then(resasc => resasc.json())
            .then(dataasc => {
               if(dataasc)
               {
               setDateCal(`${(months.indexOf(dataasc.month)+1)}/${dataasc.date}/${dataasc.year}`);
               setDateCalMon(`${dataasc.date} ${dataasc.month} ${dataasc.year}`);
               }
               else
               {
                setDateCal('');
               }
            })
            .catch(error => {
                console.log(error);
            })
        })
    )

useFocusEffect(
    useCallback(() => {
        fetch('https://dkdemo-server.herokuapp.com/getsavingaggregate',{
            method:'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                _id : profileDetails._id,
            })
        })
        .then(aggres => aggres.json())
        .then(dataagg => {
            if(dataagg != ''){
            setReceivedSavings(dataagg[0].total);
            }
        })
        .catch(error => {Alert.alert('Something Went Wrong,,. Try Again!!'); })
    },[])
)

useFocusEffect(
    useCallback(() => {  
        let yr = '';
        if(pickerValue != null)
        {
            yr = pickerValue;
        }
        else{
            yr = year;
        }
    
        fetch('https://dkdemo-server.herokuapp.com/getsavingsy',{
            method:'post',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                _id : profileDetails._id,
                stat : 'Credited',
                year : yr,
            })
        })          
        .then(ressaving => ressaving.json())
        .then(datasaving => {
            if(datasaving != '')
            {
            setActi(false);
            setArr(datasaving);
            }
            else
            {
            setActi(false);
            setArr('');
            }
        })
        .catch(error => {Alert.alert('Something Went Wrong,,. Try Again!!'); })
    },[pickerValue])
)
    const position = new Animated.ValueXY({x:360,y:0});

    Animated.spring(position,{
        toValue:{x:0,y:0},
        bounciness:20,
    }).start()


    return(
        <View style={{flex:1,borderWidth:5,borderColor:'white'}}>
<View style={{flexDirection:'row',padding:15,justifyContent:'space-between',backgroundColor:'transparent',}}>
                <View style={{marginTop:5}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} >
            <Icon name="angle-left" color={'#6a5acd'} size={30}  />
            </TouchableOpacity>
            </View>
            <Text style={{textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -2, height: 1},
         textShadowRadius: 6,fontStyle:'italic',fontSize:30,color:'black',marginBottom:12}}> DK's 100</Text>   
            <View style={{marginTop:5}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="braille" color={'#6a5acd'} size={25}  />
            </TouchableOpacity>
            </View>
            </View>

        {(arr === '' && acti === false) ?    

          <View style={{alignItems:'center',justifyContent:'center',marginTop:hd/3}}><TouchableOpacity onPress={() => navigation.navigate('Profile')} ><Text style={{color:'#6a5acd'}}>No Data Available!!</Text><Text style={{textAlign:'center',color:'#6a5acd',fontStyle:'italic'}}>Back</Text></TouchableOpacity></View> 
          :
            <ScrollView showsVerticalScrollIndicator={false}>
                            
        <View style={{flexDirection:'row',justifyContent:'center'}}>
            <Text style={{fontSize:20,fontStyle:'italic',color:'#6a5acd'}}>{profileDetails.name}</Text>
        </View>
            <View style={{flexDirection:'row',height:hd-145,padding:20,}}>
            <View style={{borderWidth:1,borderRadius:1,borderColor:'transparent'}}>
            <View style={{borderRadius:1,borderWidth:1,width:15,marginBottom:13,borderColor:'transparent'}}>
                <View>
                    <Text style={{textAlign:'center',marginTop:6,fontStyle:'italic',color : '#FF7F00'}}>D</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#FFFF00'}}>R</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#7FFF00'}}>E</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#00FF00'}}>A</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#00FF7F'}}>M</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#00FFFF'}}>K</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#007FFF'}}>I</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#0000FF'}}>L</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#7F00FF'}}>L</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,fontStyle:'italic',color : '#FF00FF'}}>E</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',fontStyle:'italic',marginTop:19,color : '#FF0000'}}>R</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center',marginTop:19,marginBottom:8,fontStyle:'italic',color : '#808080'}}>S</Text>
                </View>
                </View>
            </View>
 <View style={{marginTop:5,}}>

{mon.map((temp,index) => (
    <View key={index}>   
    
{(arr.find(it => it._id === temp.month)) ?

<View>    
{arr.map((item,index) => (
    <View key={index}>
        {temp.month === item._id &&
 <Animated.View  style={{transform:[{translateX:position.x}],borderRadius:5,borderWidth:1,backgroundColor:`${temp.color}`,borderColor:'white',width:wd-50,height:25,marginBottom:13}}>
 <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>{`${item._id} ${item.total}`}</Text>
 </Animated.View>     
        }
 </View>
))}
</View>   
:
<View>
    <Animated.View  style={{transform:[{translateX:position.x}],borderRadius:5,borderWidth:1,backgroundColor:`${temp.color}`,borderColor:'white',width:wd-50,height:25,marginBottom:13}}>
    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold'}}>{temp.month} </Text>
    </Animated.View> 
    </View>
    }
   </View>
))}  
</View>
       </View>

    <View style={{borderColor:'#6a5acd',borderRadius:10,elevation:2,borderWidth:2,marginBottom:10}}>
       <View style={{alignItems:'center',justifyContent:'center'}}>
       <View style={{flexDirection:'row',marginTop:10}} >
           <Text style={{marginTop:5,marginLeft:10,color:'#6a5acd',fontSize:15,fontStyle:'italic',fontWeight:'bold'}}>Choose Year</Text>
       <Picker style={{width:120,height:30,marginBottom:10,marginLeft:5,}}
            selectedValue={pickerValue}
            onValueChange={(itemValue,itemIndex) => {setPickerValue(itemValue)}}
            >  
              {getYear.map((item,key) => (   
                 <Picker.Item  label={String(item._id)} value={item._id} key={key} />  
              ))}
          </Picker>
        </View>
             <Text style={{marginTop:10,fontStyle:'italic',fontSize:20,color:'#6a5acd',fontWeight:'bold'}}>Saving's Details</Text>
              <Text style={{marginTop:15,fontSize:15,fontWeight:'bold',fontStyle:'italic',color:'#6a5acd'}}>From {dateCalMon} - Present</Text>
              <Text style={{marginTop:10,fontSize:15,color:'#6a5acd'}}>{receivedSavings} / {monthCount}</Text>
              <Text style={{marginTop:10,fontSize:15,fontWeight:'bold',fontStyle:'italic',color:'#6a5acd'}}>Till, Received From {month.substring(0,3)} {year},</Text>
              <Text style={{marginTop:10,fontSize:15,marginBottom:10,color:'#6a5acd'}}>{receivedSavings}</Text>
          </View>
    </View>
            </ScrollView>     
}        
        </View>   
    );
}


