import styled from 'styled-components/native';
import { Pressable } from 'react-native';

const ContainerCard = styled.View`
    width: 100%;
    height: 100px;
    border-radius: 10px;
`;

const CardBox = styled(Pressable)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
`;

const Image = styled.Image``;

const ContentCard = styled.View`
    display: flex;
    flex-direction: column;
`;

const TextPlaca = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 18px;
`;

const SmallText = styled.Text`
    font-family: PoppinsRegular;
    font-size: 14px;
`;

export default function Card({ placa = 'ABC-1234', dataEntrada = '', horarioEntrada = '' }) {
    const formatarData = (data) => {
        if (!data) return '';
        try {
            // Se a data já estiver no formato dd/mm/yyyy, retorna como está
            if (data.includes('/')) return data;

            // Tenta converter de yyyy-mm-dd para dd/mm/yyyy
            if (data.includes('-')) {
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            }

            // Se for timestamp ou outro formato, usa Date
            const date = new Date(data);
            if (isNaN(date.getTime())) return data; // Se inválida, retorna original

            return date.toLocaleDateString('pt-BR');
        } catch (e) {
            console.warn('Erro ao formatar data:', e);
            return data; // Em caso de erro, retorna o valor original
        }
    };

    const formatarHora = (hora) => {
        if (!hora) return '';
        try {
            // Se vier como string HH:mm:ss, ajusta o fuso
            if (typeof hora === 'string' && hora.includes(':')) {
                const [h, m] = hora.split(':');
                // Converte para número e subtrai 3 horas (UTC-3)
                let horaAjustada = parseInt(h) - 3;
                // Ajusta caso a hora fique negativa
                if (horaAjustada < 0) horaAjustada += 24;
                return `${horaAjustada.toString().padStart(2, '0')}:${m}`;
            }

            // Para outros formatos (Date/timestamp)
            const date = new Date(hora);
            if (!isNaN(date.getTime())) {
                // Obtém a hora no fuso local
                return date.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo',
                });
            }

            return hora;
        } catch (e) {
            console.warn('Erro ao formatar hora:', e, hora);
            return hora;
        }
    };

    return (
        <ContainerCard>
            <CardBox
                style={({ pressed }) => ({
                    backgroundColor: pressed ? '#DFD7F3' : '#fff',
                })}
            >
                <Image
                    source={require('../../assets/images/icon-park-outline_car.png')}
                    style={{ width: 48, height: 48 }}
                />
                <ContentCard>
                    <TextPlaca>Placa: {placa}</TextPlaca>
                    <SmallText>Data de entrada: {formatarData(dataEntrada)}</SmallText>
                    <SmallText>Hora: {formatarHora(horarioEntrada)}</SmallText>
                </ContentCard>
            </CardBox>
        </ContainerCard>
    );
}
