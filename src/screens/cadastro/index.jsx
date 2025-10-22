import {
    CadastroContainer,
    Image,
    InputWrapper,
    StyledInput,
    Title,
    ToggleButton,
    LoginButton,
    LoginText,
    Form,
} from './styles';
import React, { useState } from 'react';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../../api/api';
import { Alert } from 'react-native';

export default function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!name || !email || !password || password !== confirmPassword) {
            Alert.alert('Erro', 'Preencha corretamente os campos e verifique as senhas');
            return;
        }

        try {
            await registerUser({ nome: name, email, senha: password });
            Alert.alert('Sucesso', 'Usuário registrado com sucesso');
            navigation.navigate('Login');
        } catch (err) {
            const message = err.response?.data || err.message || 'Erro ao registrar';
            Alert.alert('Erro', message);
        }
    };

    return (
        <CadastroContainer>
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 150, height: 134 }} />
            <Title>Cadastre-se</Title>
            <Form>
                <InputWrapper>
                    <MaterialIcons name="person" size={20} color="#fff" />
                    <StyledInput
                        placeholder="Nome de usuário"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#fff"
                        value={name}
                        onChangeText={setName}
                    />
                </InputWrapper>
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
                <InputWrapper>
                    <MaterialIcons name="lock" size={20} color="#fff" />
                    <StyledInput
                        placeholder="Confirmar senha"
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor="#fff"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <ToggleButton onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <MaterialIcons
                            name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                            size={20}
                            color="#fff"
                        />
                    </ToggleButton>
                </InputWrapper>
            </Form>
            <PrimaryButton title="Cadastrar" onPress={handleRegister} />

            <LoginButton onPress={() => navigation.navigate('Login')}>
                <LoginText>Já tem uma conta? Faça login</LoginText>
            </LoginButton>
        </CadastroContainer>
    );
}
