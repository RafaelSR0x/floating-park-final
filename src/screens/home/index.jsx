import Card from '../../assets/components/Card.jsx';
import Header from '../../assets/components/Header.jsx';
import BottomBar from '../../assets/components/BottomBar.jsx';
import React, { useState } from 'react';
import { ContainerCards, HomeContainer } from './styles';

export default function Home() {
    const [activeTab, setActiveTab] = useState('inicio');
    return (
        <HomeContainer>
            <Header title="Veículos" />
            <ContainerCards
                contentContainerStyle={{
                    alignItems: 'center',
                    gap: 15, // aqui funciona (RN >= 0.71) ou use marginBottom nos cards
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Card />
                <Card />
                <Card />
                <Card />
            </ContainerCards>
        </HomeContainer>
    );
}
