import React, { useEffect, useRef, useState } from 'react';
import { Modal, Animated, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Overlay = styled(Animated.View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
`;

const MenuContainer = styled(Animated.View)`
    width: 75%;
    height: 100%;
    background-color: #5626c4;
    padding: 20px 30px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: absolute;
    right: 0;
    top: 0;
`;

const HeaderRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`;

const LogoImage = styled.Image``;

const CloseButton = styled.TouchableOpacity``;

const MenuItem = styled.TouchableOpacity`
    padding: 15px 0;
    border-bottom-width: 1px;
    border-bottom-color: rgba(255, 255, 255, 0.3);
`;

const MenuText = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 16px;
    color: #fff;
`;

export default function MenuHamburger({ visible, onClose }) {
    const [showModal, setShowModal] = useState(visible);
    const slideAnim = useRef(new Animated.Value(width)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();
    const [saida, setSaida] = useState('');

    const handleUsuario = () => {
        navigation.navigate('EditarUsuario');
    };

    const handleCadastrar = () => {
        navigation.navigate('Cadastro');
    };

    const handleSair = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                    easing: (t) => t * (2 - t), // easing suave
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: width,
                    duration: 400,
                    useNativeDriver: true,
                    easing: (t) => t * (2 - t),
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => setShowModal(false));
        }
    }, [visible]);

    if (!showModal) return null;

    return (
        <Modal visible transparent animationType="none" onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Overlay style={{ opacity: fadeAnim }}>
                    <TouchableWithoutFeedback>
                        <MenuContainer style={{ transform: [{ translateX: slideAnim }] }}>
                            <HeaderRow>
                                <LogoImage
                                    source={require('../../assets/images/logo-menu.png')}
                                    style={{ width: 131, height: 38 }}
                                />
                                <CloseButton onPress={onClose} accessibilityLabel="Fechar menu">
                                    <Ionicons name="close" size={32} color="#fff" />
                                </CloseButton>
                            </HeaderRow>

                            <ScrollView>
                                <MenuItem onPress={handleUsuario}>
                                    <MenuText>Editar perfil</MenuText>
                                </MenuItem>

                                <MenuItem onPress={handleCadastrar}>
                                    <MenuText>Cadastrar usuário</MenuText>
                                </MenuItem>

                                <MenuItem onPress={handleSair}>
                                    <MenuText>Sair</MenuText>
                                </MenuItem>
                            </ScrollView>
                        </MenuContainer>
                    </TouchableWithoutFeedback>
                </Overlay>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
