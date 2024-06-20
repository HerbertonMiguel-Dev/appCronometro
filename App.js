import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

let timer = null;  // Variável global para armazenar o identificador do timer
let ss = 0;  // Segundos
let mm = 0;  // Minutos
let hh = 0;  // Horas

export default function App() {
  const [numero, setNumero] = useState(0);  // Estado para armazenar o tempo formatado
  const [botao, setBotao] = useState('VAI');  // Estado para o texto do botão
  const [ultimo, setUltimo] = useState(null);  // Estado para armazenar o último tempo registrado

  function vai() {
    if (timer !== null) {
      // Parar o timer se já estiver rodando
      clearInterval(timer);
      timer = null;
      setBotao('VAI');  // Mudar texto do botão para 'VAI'
    } else {
      // Iniciar o timer
      timer = setInterval(() => {
        ss++;  // Incrementar segundos

        if (ss == 60) {
          ss = 0;
          mm++;  // Incrementar minutos se os segundos atingirem 60
        }

        if (mm == 60) {
          mm = 0;
          hh++;  // Incrementar horas se os minutos atingirem 60
        }

        // Formatar o tempo no formato HH:MM:SS
        let format = 
          (hh < 10 ? '0' + hh : hh) + ':' +
          (mm < 10 ? '0' + mm : mm) + ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(format);  // Atualizar o estado do número

      }, 100);  // Executar a cada segundo

      setBotao('PARAR');  // Mudar texto do botão para 'PARAR'
    }
  }

  function limpar() {
    if (timer !== null) {
      // Parar o timer
      clearInterval(timer);
      timer = null;
    }

    setUltimo(numero);  // Armazenar o último tempo registrado
    setNumero(0);  // Resetar o número
    ss = 0;  // Resetar segundos
    mm = 0;  // Resetar minutos
    hh = 0;  // Resetar horas
    setBotao('VAI');  // Mudar texto do botão para 'VAI'
  }



return (
  <View style={styles.container}>
    
    {/* Imagem do cronômetro */}
   <Image
   source={require('./src/crono.png')} 
   /> 

    {/* Exibir o tempo formatado */}
   <Text style={styles.timer}> {numero} </Text>

   <View style={styles.btnArea}>
    {/* Botão para iniciar/parar o timer */}
     <TouchableOpacity style={styles.btn} onPress={vai}>
       <Text style={styles.btnTexto}> {botao} </Text>
     </TouchableOpacity>

    {/* Botão para limpar/resetar o timer */} 
     <TouchableOpacity style={styles.btn} onPress={limpar}>
       <Text style={styles.btnTexto}>LIMPAR</Text>
     </TouchableOpacity>
   </View>

   <View style={styles.areaUltima}>
    {/* Exibir o último tempo registrado, se houver */}
     <Text style={styles.textoCorrida}>
       { ultimo ? 'Ultimo tempo: ' + ultimo : ''}
     </Text>
   </View>


  </View>
 );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer:{
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea:{
    flexDirection:  'row',
    marginTop: 130,
    height: 40,
  },
  btn:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima:{
   marginTop: 40, 
  },
  textoCorrida:{
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic'
  }
})