import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import PrimaryButton from './PrimaryButton';

const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    width: 90%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-family: PoppinsSemiBold;
    color: #000;
    text-align: center;
    margin-bottom: 20px;
`;

const InfoContainer = styled.View`
    margin-bottom: 20px;
`;

const InfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const InfoLabel = styled.Text`
    font-family: PoppinsRegular;
    font-size: 16px;
    color: #666;
`;

const InfoValue = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 16px;
    color: #000;
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    gap: 10px;
    align-items: flex-end;
`;

const CancelButton = styled.TouchableOpacity`
    background-color: #ccc;
    padding: 15px 30px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
`;

const CancelText = styled.Text`
    color: #000;
    font-family: PoppinsSemiBold;
    font-size: 18px;
`;

export default function ModalSaidaVeiculo({ visible, onClose, dados, onConfirm, loading }) {
    if (!dados) return null;

    const formatarData = (data) => {
        if (!data) return 'N/A';
        try {
            if (data.includes('/')) return data;
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }
            const date = new Date(data);
            if (isNaN(date.getTime())) return data;
            return date.toLocaleDateString('pt-BR');
        } catch (e) {
            return data;
        }
    };

    const formatarHora = (hora) => {
        if (!hora) return 'N/A';
        try {
            if (typeof hora === 'string' && hora.includes(':')) {
                const [h, m] = hora.split(':');
                let horaAjustada = parseInt(h) - 3;
                if (horaAjustada < 0) horaAjustada += 24;
                return `${horaAjustada.toString().padStart(2, '0')}:${m}`;
            }
            const date = new Date(hora);
            if (!isNaN(date.getTime())) {
                return date.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo',
                });
            }
            return hora;
        } catch (e) {
            return hora;
        }
    };

    const formatarHoraSaida = (hora) => {
        if (!hora) return 'Agora';
        try {
            // Se já está no formato HH:mm:ss, retorna apenas HH:mm
            if (typeof hora === 'string' && hora.includes(':')) {
                const [h, m] = hora.split(':');
                return `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
            }
            return hora;
        } catch (e) {
            return hora;
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <ModalOverlay>
                <ModalContainer>
                    <Title>Registro de Saída</Title>

                    <InfoContainer>
                        <InfoRow>
                            <InfoLabel>Placa:</InfoLabel>
                            <InfoValue>{dados.placa || 'N/A'}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Data de entrada:</InfoLabel>
                            <InfoValue>{formatarData(dados.dataEntrada)}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Hora de entrada:</InfoLabel>
                            <InfoValue>{formatarHora(dados.horarioEntrada)}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Data de saída:</InfoLabel>
                            <InfoValue>{formatarData(dados.dataSaida) || 'Hoje'}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Hora de saída:</InfoLabel>
                            <InfoValue>{formatarHoraSaida(dados.horarioSaida)}</InfoValue>
                        </InfoRow>
                        {dados.tempoPermanencia && (
                            <InfoRow>
                                <InfoLabel>Tempo de permanência:</InfoLabel>
                                <InfoValue>{dados.tempoPermanencia}</InfoValue>
                            </InfoRow>
                        )}
                        {dados.valorPago && (
                            <InfoRow>
                                <InfoLabel>Valor a pagar:</InfoLabel>
                                <InfoValue>R$ {dados.valorPago.toFixed(2)}</InfoValue>
                            </InfoRow>
                        )}
                    </InfoContainer>

                    <ButtonsContainer>
                        <CancelButton onPress={onClose}>
                            <CancelText>Cancelar</CancelText>
                        </CancelButton>
                        <PrimaryButton
                            title="Confirmar Saída"
                            onPress={onConfirm}
                            loading={loading}
                            style={{ flex: 1, marginTop: 0, padding: 15 }}
                        />
                    </ButtonsContainer>
                </ModalContainer>
            </ModalOverlay>
        </Modal>
    );
}
