import { LoginContainer, Image, Title, InputWrapper, StyledInput, ToggleButton } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Usuário ou senha inválidos');
            }

            const data = await response.json();
            console.log('Login bem-sucedido:', data);

            //Alert.alert('Sucesso', 'Login realizado com sucesso!');
            navigation.navigate('BottomTabs');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    }

    return (
        <LoginContainer>
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 150, height: 134 }} />
            <Title>Acesse Sua Conta</Title>

            <InputWrapper>
                <Icon name="mail" size={20} color="#fff" />
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
                <Icon name="lock" size={20} color="#fff" />
                <StyledInput
                    placeholder="Digite sua senha"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                />
                <ToggleButton onPress={() => setShowPassword(!showPassword)}>
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#fff" />
                </ToggleButton>
            </InputWrapper>

            <PrimaryButton title="Login" onPress={handleLogin} />
        </LoginContainer>
    );
}
