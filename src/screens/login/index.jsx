import {
    LoginContainer,
    Image,
    Title,
    InputWrapper,
    StyledInput,
    ToggleButton,
    RegisterText,
    RegisterButton,
} from './styles';
import React, { useState } from 'react';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import api, { loginUser } from '../../api/api';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        try {
            const { data } = await loginUser({ email, senha: password }); // backend espera 'senha', não 'password'
            if (!data || !data.token) {
                throw new Error('Usuário ou senha inválidos');
            }

            // Salva token no SecureStore para que o interceptor do api.js envie nas requisições
            await SecureStore.setItemAsync('userToken', data.token);

            console.log('Login bem-sucedido');
            navigation.navigate('BottomTabs');
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Erro no login';
            Alert.alert('Erro', message);
        }
    }

    return (
        <LoginContainer>
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 150, height: 134 }} />
            <Title>Acesse Sua Conta</Title>

            <InputWrapper>
                <MaterialIcons name="email" size={20} color="#fff" />
                <StyledInput
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                />
            </InputWrapper>

            <InputWrapper>
                <MaterialIcons name="lock" size={20} color="#fff" />
                <StyledInput
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                />
                <ToggleButton onPress={() => setShowPassword(!showPassword)}>
                    <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={20} color="#fff" />
                </ToggleButton>
            </InputWrapper>

            <PrimaryButton title="Login" onPress={handleLogin} />

            <RegisterButton onPress={() => navigation.navigate('Cadastro')}>
                <RegisterText>Não tem uma conta? Cadastre-se</RegisterText>
            </RegisterButton>
        </LoginContainer>
    );
}
