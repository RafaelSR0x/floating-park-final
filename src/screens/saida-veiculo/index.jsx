import Header from '../../assets/components/Header';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { ContainerSaida, Image, Title, InputWrapper, StyledInput, handleProhibited } from './styles';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import RegistroSaida from '../registro-saida';
import BottomBar from '../../assets/components/BottomBar';

export default function Saida() {
    const navigation = useNavigation();
    const [saida, setSaida] = useState('');

    const handleVerificar = () => {
        navigation.navigate('RegistroSaida', { placa: saida });
    };

    return (
        <ContainerSaida>
            <Header title="Saída" />
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 213, height: 190 }} />

            <Title>Digite a placa do veículo que está de saída</Title>

            <InputWrapper>
                <StyledInput
                    placeholder="Digite a placa do veículo"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#fff"
                    value={saida}
                    onChangeText={setSaida}
                />
            </InputWrapper>

            <PrimaryButton title="Verificar" onPress={handleVerificar} />
            <BottomBar />
        </ContainerSaida>
    );
}
