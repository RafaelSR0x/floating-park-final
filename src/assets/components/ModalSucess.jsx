import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    align-items: center;
`;

const ModalText = styled.Text`
    font-size: 16px;
    font-family: PoppinsSemiBold;
    text-align: center;
    margin-bottom: 20px;
    color: #000;
`;

const ActionButton = styled.TouchableOpacity`
    background-color: ${(props) => props.bgColor || '#5626c4'};
    padding: 10px 25px;
    border-radius: 8px;
`;

const ActionText = styled.Text`
    color: #fff;
    font-family: PoppinsSemiBold;
    font-size: 14px;
`;

export default function AppModal({ visible, onClose, message, buttonText = 'OK', buttonColor = '#5626c4' }) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <ModalOverlay>
                <ModalContainer>
                    <ModalText>{message}</ModalText>
                    <ActionButton onPress={onClose} bgColor={buttonColor}>
                        <ActionText>{buttonText}</ActionText>
                    </ActionButton>
                </ModalContainer>
            </ModalOverlay>
        </Modal>
    );
}
