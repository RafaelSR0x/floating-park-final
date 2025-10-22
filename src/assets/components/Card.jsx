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

export default function Card() {
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
                    <TextPlaca>Placa: ABC-1234</TextPlaca>
                    <SmallText>Data de entrada: </SmallText>
                    <SmallText>Hora: </SmallText>
                </ContentCard>
            </CardBox>
        </ContainerCard>
    );
}
