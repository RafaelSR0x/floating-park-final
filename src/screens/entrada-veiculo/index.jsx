import AppModal from '../../assets/components/ModalSuccess';
import Header from '../../assets/components/Header';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { ContainerSaida, Image, Title, InputWrapper, StyledInput } from './styles';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { liberateEntrance } from '../../api/api';

export default function Entrada() {
    const navigation = useNavigation();
    const [entrada, setEntrada] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const validarPlaca = (placa) => {
        // Regex para validar placa no formato antigo (ABC-1234) ou Mercosul (ABC1D23)
        const regex = /^[A-Z]{3}[-]?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
        return regex.test(placa.toUpperCase());
    };

    const handleEnviar = async () => {
        if (!entrada) {
            Alert.alert('Erro', 'Por favor, digite a placa do veículo');
            return;
        }

        const placaFormatada = entrada.toUpperCase();
        if (!validarPlaca(placaFormatada)) {
            Alert.alert('Erro', 'Placa inválida. Use o formato ABC-1234 ou ABC1D23');
            return;
        }

        try {
            await liberateEntrance(placaFormatada);
            setEntrada(''); // Limpa o campo após sucesso
            setModalVisible(true);
            // Navega para a Home e força uma atualização
            navigation.navigate('Home', { update: Date.now() });
        } catch (err) {
            const mensagem = err.response?.data?.message || 'Erro ao registrar entrada do veículo';
            Alert.alert('Erro', mensagem);
        }
    };

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
            <PrimaryButton title="Enviar" onPress={handleEnviar} />

            <AppModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    // Atualiza a lista de veículos na tela Home
                    navigation.navigate('Home');
                }}
                message="Veículo cadastrado com sucesso!"
                buttonText="OK"
                buttonColor="#5626c4"
            />
        </ContainerSaida>
    );
}
