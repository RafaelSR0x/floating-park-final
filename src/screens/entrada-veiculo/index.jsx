import BottomBar from '../../assets/components/BottomBar';
import AppModal from '../../assets/components/ModalSuccess';
import Header from '../../assets/components/Header';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { ContainerSaida, Image, Title, InputWrapper, StyledInput, handleProhibited } from './styles';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function Entrada() {
    const [activeTab, setActiveTab] = useState('inicio');
    const [entrada, setEntrada] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ContainerSaida>
            <Header title="Entrada" />
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 213, height: 190 }} />

            <Title>Registrar entrada de veículo</Title>

            <InputWrapper>
                <StyledInput
                    placeholder="Digite a placa do veículo"
                    autoCapitalize="none"
                    placeholderTextColor="#fff"
                    value={entrada}
                    onChangeText={setEntrada}
                />
            </InputWrapper>
            <PrimaryButton title="Enviar" onPress={() => setModalVisible(true)} />

            <BottomBar />
            <AppModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                message="Veículo cadastrado com sucesso!"
                buttonText="OK"
                buttonColor="#5626c4"
            />
        </ContainerSaida>
    );
}
