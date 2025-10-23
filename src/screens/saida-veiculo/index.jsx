import Header from '../../assets/components/Header';
import PrimaryButton from '../../assets/components/PrimaryButton';
import ModalSaidaVeiculo from '../../assets/components/ModalSaidaVeiculo';
import { ContainerSaida, Image, Title, InputWrapper, StyledInput } from './styles';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { liberateExit, getVehicleHistoryByPlate } from '../../api/api';

export default function Saida() {
    const navigation = useNavigation();
    const [placa, setPlaca] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [dadosSaida, setDadosSaida] = useState(null);
    const [loading, setLoading] = useState(false);

    const validarPlaca = (placa) => {
        const regex = /^[A-Z]{3}[-]?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
        return regex.test(placa.toUpperCase());
    };

    const handleVerificar = async () => {
        if (!placa) {
            Alert.alert('Erro', 'Por favor, digite a placa do veículo');
            return;
        }

        const placaFormatada = placa.toUpperCase();
        if (!validarPlaca(placaFormatada)) {
            Alert.alert('Erro', 'Placa inválida. Use o formato ABC-1234 ou ABC1D23');
            return;
        }

        try {
            const { data } = await getVehicleHistoryByPlate(placaFormatada);
            if (data && data.length > 0) {
                // Pega o veículo mais recente ativo (sem data de saída)
                const veiculoAtivo = data.find((v) => !v.dataSaida) || data[0];

                const agora = new Date();
                const horarioSaidaLocal = agora.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });

                // Calcular tempo de permanência estimado para preview
                const [h, m, s] = veiculoAtivo.horarioEntrada.split(':');
                let horaEntrada = parseInt(h) - 3;
                if (horaEntrada < 0) horaEntrada += 24;

                const horarioEntradaAjustado = `${horaEntrada.toString().padStart(2, '0')}:${m}:${s || '00'}`;
                const dataEntradaCompleta = new Date(`${veiculoAtivo.dataEntrada}T${horarioEntradaAjustado}`);

                const diferencaMs = agora - dataEntradaCompleta;
                const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
                const diferencaHoras = Math.floor(diferencaMinutos / 60);
                const minutosRestantes = diferencaMinutos % 60;

                // Calcular valor estimado (R$ 5,00 por hora)
                const horasCobradas = Math.ceil(diferencaMinutos / 60);
                const valorEstimado = horasCobradas * 10.0;

                setDadosSaida({
                    placa: placaFormatada,
                    dataEntrada: veiculoAtivo.dataEntrada,
                    horarioEntrada: veiculoAtivo.horarioEntrada,
                    dataSaida: agora.toISOString().split('T')[0],
                    horarioSaida: horarioSaidaLocal,
                    tempoPermanencia: `${diferencaHoras}h ${minutosRestantes}min`,
                    valorPago: valorEstimado,
                });
                setModalVisible(true);
            } else {
                Alert.alert('Erro', 'Veículo não encontrado no estacionamento');
            }
        } catch (err) {
            const mensagem = err.response?.data?.message || 'Erro ao buscar informações do veículo';
            Alert.alert('Erro', mensagem);
        }
    };

    const handleConfirmarSaida = async () => {
        try {
            setLoading(true);
            const { data } = await liberateExit(dadosSaida.placa);

            // O backend retorna os dados completos com data/hora de saída e valor
            if (data && data.veiculo) {
                const veiculoAtualizado = data.veiculo;

                // Calcula tempo de permanência com os dados reais do backend
                const dataEntrada = new Date(`${veiculoAtualizado.dataEntrada}T${veiculoAtualizado.horarioEntrada}`);
                const dataSaida = new Date(`${veiculoAtualizado.dataSaida}T${veiculoAtualizado.horarioSaida}`);
                const diferencaMs = dataSaida - dataEntrada;
                const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));
                const diferencaHoras = Math.floor(diferencaMinutos / 60);
                const minutosRestantes = diferencaMinutos % 60;

                Alert.alert(
                    'Sucesso!',
                    `Saída registrada com sucesso!\n\nTempo: ${diferencaHoras}h ${minutosRestantes}min\nValor: R$ ${
                        veiculoAtualizado.valorPago?.toFixed(2) || '0,00'
                    }`
                );
            } else {
                Alert.alert('Sucesso', 'Saída registrada com sucesso!');
            }

            setModalVisible(false);
            setPlaca('');
            navigation.navigate('Home', { update: Date.now() });
        } catch (err) {
            const mensagem = err.response?.data?.message || 'Erro ao registrar saída do veículo';
            Alert.alert('Erro', mensagem);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerSaida>
            <Header title="Saída" />
            <Image source={require('../../assets/images/logo-floating-park.png')} style={{ width: 189, height: 169 }} />

            <Title>Digite a placa do veículo que está de saída</Title>

            <InputWrapper>
                <StyledInput
                    placeholder="Digite a placa do veículo"
                    autoCapitalize="characters"
                    placeholderTextColor="#fff"
                    value={placa}
                    onChangeText={setPlaca}
                />
            </InputWrapper>

            <PrimaryButton title="Verificar" onPress={handleVerificar} />

            <ModalSaidaVeiculo
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                dados={dadosSaida}
                onConfirm={handleConfirmarSaida}
                loading={loading}
            />
        </ContainerSaida>
    );
}
