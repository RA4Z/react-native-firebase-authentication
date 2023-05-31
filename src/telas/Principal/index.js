import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import estilos from './estilos';
import { auth } from '../../config/firebase';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { BotaoProduto } from '../../componentes/BotaoProduto';
import { pegarProdutos, pegarProdutosTempoReal, pesquisarProduto } from '../../services/firestore';
import Botao from '../../componentes/Botao';

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);
  const [produtoPesquisa, setProdutoPesquisa] = useState('');
  const [refreshing, setRefreshing] = useState(false)

  async function carregarDadosProdutos(){
    setRefreshing(true)
    const produtosFirestore = await pegarProdutos()
    setProdutos(produtosFirestore)
    setRefreshing(false)
  }

  useEffect(() =>{
    carregarDadosProdutos()
    pegarProdutosTempoReal(setProdutos)
  }, [])

  function deslogar(){
    auth.signOut();
    navigation.replace('Login')
  }

  async function procurarProduto() {
    let produtosFirestore = await pesquisarProduto(produtoPesquisa)
    if(produtosFirestore == ''){
      produtosFirestore = await pegarProdutos()
      Alert.alert('Produto não encontrado!')
    }
    setProdutos(produtosFirestore)
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>
        <EntradaTexto 
          label='Nome do produto'
          value={produtoPesquisa}
          onChangeText={texto => setProdutoPesquisa(texto)}/>
        <Botao onPress={() => procurarProduto()}>Procurar</Botao>

      <ScrollView 
        style={{ width:'100%' }}
        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={carregarDadosProdutos}
          />}
      >
        {
          produtos?.map((produto) => {
            return (
              <TouchableOpacity key={produto.id} onPress={() => navigation.navigate('DadosProduto',produto)}>
              <Produto 
                nome={produto.nome} 
                preco={produto.preco} />
                </TouchableOpacity>)
          })
        }
      </ScrollView>
      <BotaoProduto onPress={() => navigation.navigate('DadosProduto')} />
     </View>
  );
}
