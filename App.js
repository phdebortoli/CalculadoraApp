import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [operacao, setOperacao] = useState('');

  const realizarCalculo = () => {
    if (valor1 && valor2 && operacao) {
      let resultado = 0;
      const num1 = parseFloat(valor1);
      const num2 = parseFloat(valor2);

      switch (operacao) {
        case 'somar':
          resultado = num1 + num2;
          break;
        case 'subtrair':
          resultado = num1 - num2;
          break;
        case 'multiplicar':
          resultado = num1 * num2;
          break;
        case 'dividir':
          resultado = num1 / num2;
          break;
      }

      navigation.navigate('Resultado - Cálculos', {
        valor1: num1,
        valor2: num2,
        operacao,
        resultado,
      });
    } else {
      alert('Por favor, insira os valores e escolha a operação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabalho 01 - Cálculos</Text>

      <Text style={styles.label}>Informe o primeiro valor</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor1}
        onChangeText={setValor1}
      />

      <Text style={styles.label}>Informe o segundo valor</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor2}
        onChangeText={setValor2}
      />

      <Text style={styles.label}>Informe a operação</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => setOperacao('somar')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setOperacao('subtrair')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setOperacao('multiplicar')}>
          <Text style={styles.buttonText}>x</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setOperacao('dividir')}>
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.operation}>Operação escolhida: {operacao.toUpperCase() || "NENHUMA"}</Text>

      <TouchableOpacity style={styles.calculateButton} onPress={realizarCalculo}>
        <Text style={styles.calculateButtonText}>Efetuar cálculo</Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultScreen({ route }) {
  const { valor1, valor2, operacao, resultado } = route.params;

  const nomeOperacao = {
    somar: 'Somar',
    subtrair: 'Subtrair',
    multiplicar: 'Multiplicar',
    dividir: 'Dividir',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trabalho 01 - Cálculos</Text>
      <Text style={styles.resultText}>Valor 1: {valor1}</Text>
      <Text style={styles.resultText}>Valor 2: {valor2}</Text>
      <Text style={styles.resultText}>Operação: {nomeOperacao[operacao]}</Text>
      <Text style={styles.resultText}>
        Cálculo: {valor1} {operacao === 'somar' ? '+' : operacao === 'subtrair' ? '-' : operacao === 'multiplicar' ? 'x' : '÷'} {valor2}
      </Text>
      <Text style={styles.resultText}>Resultado: {resultado}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Trabalho 01 - Cálculos" component={HomeScreen} />
        <Stack.Screen name="Resultado - Cálculos" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ccc',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  operation: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#ccc',
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  calculateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
