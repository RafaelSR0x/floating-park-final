import Card from '../../assets/components/Card.jsx';
import Header from '../../assets/components/Header.jsx';
import React, { useState, useCallback } from 'react';
import { ContainerCards, HomeContainer } from './styles';
import { getActiveVehicles } from '../../api/api';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {
    const [activeTab, setActiveTab] = useState('inicio');
    const [veiculos, setVeiculos] = useState([]);

    useFocusEffect(
        useCallback(() => {
            async function load() {
                try {
                    const { data } = await getActiveVehicles();
                    console.log('Dados dos veículos:', data);
                    console.log('Exemplo de veículo:', data[0]); // Log para debug
                    setVeiculos(data || []);
                } catch (err) {
                    console.warn('Erro ao buscar veículos:', err.message || err);
                }
            }
            load();
        }, [])
    );
    return (
        <HomeContainer>
            <Header title="Veículos" />
            <ContainerCards
                contentContainerStyle={{
                    alignItems: 'center',
                    gap: 15,
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            >
                {veiculos.length > 0 ? (
                    veiculos.map((v, index) => (
                        <Card
                            key={v.id || `veiculo-${index}`}
                            placa={v.placa}
                            dataEntrada={v.dataEntrada}
                            horarioEntrada={v.horarioEntrada}
                        />
                    ))
                ) : (
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            fontFamily: 'PoppinsRegular',
                            textAlign: 'center',
                            marginTop: 20,
                        }}
                    >
                        Não há veículos estacionados no momento
                    </Text>
                )}
            </ContainerCards>
        </HomeContainer>
    );
}
