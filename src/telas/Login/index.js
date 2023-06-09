import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { Alerta } from '../../componentes/Alerta'

import { logar } from '../../services/requisicoesFirebase';
import estilos from './estilos';
import { auth } from '../../config/firebase';
import { alteraDados, verificaSeTemEntradaVazia } from '../../utils/common';
import { entradas } from './entradas';
import animacaoCarregando from '../../../assets/carregando.gif'

export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: '',
    senha: ''
  });

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if(usuario){
        navigation.replace('Principal')
      }
      setCarregando(false)
    })
    return () => estadoUsuario();
  }, [])

  if(carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image 
          source={animacaoCarregando} 
          style={estilos.imagem} 
        />
      </View>
    )
  }

  async function realizarLogin() {
    if(verificaSeTemEntradaVazia(dados, setDados)) return

    const resultado = await logar(dados.email, dados.senha)
    if(resultado == 'erro') {
      setStatusError(true)
      setMensagemError('E-mail ou senha não conferem!')
      return
    }
    navigation.replace('Principal')
  }

  return (
    <View style={estilos.container}>
      {
        entradas.map((entrada) => {
          return (
            <EntradaTexto
              key={entrada.id}
              {...entrada}
              value={dados[entrada.name]}
              onChangeText={valor => alteraDados(entrada.name,valor, dados, setDados)}
              />
            )
        })
      }
      <Alerta 
        mensagem={mensagemError}
        error={statusError}
        SetError={setStatusError}
        tempoDuracao={2000}
      />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
