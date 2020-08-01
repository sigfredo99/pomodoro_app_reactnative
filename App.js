import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
const asd ="asdf";


class Counter extends React.Component{
  constructor() {
    super()
    this.state ={
      type: "Work",
      mincount:25,
      seccount:0,
      timer: "25:00",
      status: "PAUSE",
      minw:25,
      secw:0,
      minb:5,
      secb:0,
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(this.inc, 1000);
  }


  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if(this.state.type===nextState.type){
    this.checkvalues(nextState);
    }
  }

  pausecheck(){
    if(this.state.status==="PAUSE"){
      this.press();
    }
  }
  checkvalues = (nextState) =>{
    if(nextState.type==="Work"){
      if(this.state.minw!=nextState.minw){
        this.pausecheck();
          this.setState({
            mincount:nextState.minw,
            timer:this.addZeros(nextState.minw,nextState.seccount),
            
          });
      }else{
        if(this.state.secw!=nextState.secw){
          this.pausecheck();
          this.setState({
            seccount:nextState.secw,
            timer:this.addZeros(nextState.mincount,nextState.secw),
            
          });
        }
      }
    }else{
      if(this.state.minb!=nextState.minb){
        this.pausecheck();
        this.setState({
          mincount:nextState.minb,
          timer:this.addZeros(nextState.minb,nextState.seccount),
          
        });
      }else{
        if(this.state.secb!=nextState.secb){
          this.pausecheck();
          this.setState({
            seccount:nextState.secb,
            timer:this.addZeros(nextState.mincount,nextState.secb),
            
          });
        }
      }
    }
   
    
  }
  press = () => {
    
    if(this.state.status==="PAUSE"){  
      clearInterval(this.interval);
      this.setState({
        status: "START"
      });
     
 
    }else{
      this.interval = setInterval(this.inc, 1000);
      this.setState({
        status: "PAUSE"
      });
      
    }
  }

  inc = () => {
    if(this.state.seccount<=1){
      if(this.state.mincount<=0){   
        if(this.state.type==="Break"){
          this.setState(
            {
              mincount:this.state.minw,
              seccount:this.state.secw, 
              timer:this.addZeros(this.state.minw,this.state.secw),
              type:"Work"
          })
        }else{
          this.setState(
            {
              mincount:this.state.minb,
              seccount:this.state.secb, 
              timer:this.addZeros(this.state.minb,this.state.secb),
            type:"Break"
          })
        }
      }
      else{
      this.setState((prevState) => (
        {
        mincount: prevState.mincount - 1,
        seccount: prevState.seccount +59,
        timer: this.addZeros(prevState.mincount - 1,prevState.seccount+59),
        
      }))
    }
    }else{
      this.setState((prevState) => (
        {
        seccount: prevState.seccount - 1,
        timer: this.addZeros(prevState.mincount,prevState.seccount - 1),
        
      }))
    }

  
  }



  resettime = () => {
    clearInterval(this.interval);
    this.setState({
      type: "Work",
      mincount:this.state.minw,
      seccount:this.state.secw,
      timer: this.addZeros(this.state.minw,this.state.secw),
      status: "START",
    })
  }

  onChange(variable,name) {
     if(variable===''){
        this.setState({
          [name]: 0
        })
     }else{
      this.setState({
        [name]: parseInt(variable)
      })
     }
  }

  limitchangue(value){
    const parsedQty = Number.parseInt(value)
    if (Number.isNaN(parsedQty)) {
      setQuantity(0) 
    } else if (parsedQty > 59) {
      setQuantity(59)
    } else {
      setQuantity(parsedQty)
    }
  }

  addZeros(min,sec) {
    min = String(min);
    sec = String(sec);
    while (min.length < 2) {
      min = '0' + min;
    }
    while (sec.length < 2) {
      sec = '0' + sec;
    }
    return min+":"+sec;
  }



  render(){
    return(
      <View style={styles.menucontainer}>
  
        <Text style={styles.timer}>POMODORO APP</Text>
        <Text style={styles.title}>{this.state.type} Timer</Text>
        <Text style={styles.timer}>{this.state.timer}</Text>
    
        <View style={styles.row}>
       
        <TouchableOpacity onPress={this.press} style={styles.button}>
    <Text  style={styles.textbutton}>{this.state.status}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.resettime} style={[styles.button,styles.reset]}>
        <Text style={styles.textbutton}>RESET</Text>
      </TouchableOpacity>
    
        </View>
        <View style={styles.row}>
        <Text style={styles.typetitle}>Work Time:</Text>
        </View>
        <View style={styles.row}>
      
          <Text style={styles.text}>Mins: </Text>
    
          <TextInput
          style={styles.input}
          onChangeText={(minw) => { this.onChange(minw,"minw") }}
          placeholder="25"
          keyboardType='numeric'
          maxLength = {2}
          />
          <Text style={styles.text} >Sec: </Text>
          <TextInput 
           placeholder="00"
           onChangeText={(secw) => { this.onChange(secw,"secw") }}
          style={styles.input}  
          keyboardType='numeric'
          maxLength = {2}
          />
        </View>
        <View style={styles.row}>
        <Text style={styles.typetitle}>Break Time:</Text>
        </View>

        <View style={styles.row}>
       
          <Text style={styles.text}>Mins: </Text>
          <TextInput 
          placeholder="05"
          onChangeText={(minb) => { this.onChange(minb,"minb") }}
          style={styles.input} 
          keyboardType='numeric'
          maxLength = {2}
          />
          <Text style={styles.text} >Sec: </Text>
          <TextInput 
          placeholder="00"
          onChangeText={(secb) => { this.onChange(secb,"secb") }}
          style={styles.input}  
          keyboardType='numeric'
          maxLength = {2}
          />
        </View>

      
 
      </View>
     
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 5000,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menucontainer:{
    fontSize: 5000,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    fontSize:50,

  },
  timer: {
    fontSize: 50,
    fontWeight:'bold',
  },

  row: {
    alignItems:'center',
    paddingTop:20,
    flexDirection: 'row'
  },

  typetitle:{
    fontWeight: 'bold',
    fontSize: 30,
   
  },

  text:{
    alignItems:'center',
    paddingLeft:10,
    fontSize:22,
  },
  input:{
    fontSize:22,
    paddingLeft:5,
    paddingRight:12,
    borderColor: 'black',
    borderWidth:1
  },
  button:{
    alignItems: 'center',
    width:"45%",
    height:70,
    padding: 22,
    backgroundColor: "#0095FF",
  },
  reset:{
    backgroundColor: "#F35C36",
  },

  textbutton:{
    color:'white',
    fontSize:20,
    fontWeight: 'bold',
    },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>  
        <Counter />
      </View>
    );
  }
}
