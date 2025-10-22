import { CadastroContainer, Image, InputWrapper, StyledInput, Title, ToggleButton, Form } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import PrimaryButton from '../../assets/components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function EditarUsuario() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigation = useNavigation();

    const handleUpdate = () => {
        navigation.navigate('BottomTabs');
    };

    return (
        <CadastroContainer>
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 150, height: 134 }} />
            <Title>Atualize seus dados</Title>
            <Form>
                <InputWrapper>
                    <Icon name="user" size={20} color="#fff" />
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
                <InputWrapper>
                    <Icon name="lock" size={20} color="#fff" />
                    <StyledInput
                        placeholder="Confirmar senha"
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor="#fff"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <ToggleButton onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#fff" />
                    </ToggleButton>
                </InputWrapper>
            </Form>
            <PrimaryButton title="Atualizar" onPress={handleUpdate} />
        </CadastroContainer>
    );
}
