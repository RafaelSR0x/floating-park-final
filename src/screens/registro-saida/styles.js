import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    background-color: #5b37b7;
    border: 0px;
`;

export const Card = styled.View`
    width: 90%;
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
`;

export const InfoTitleText = styled.Text`
    font-family: 'PoppinsSemiBold';
    font-size: 20px;
    margin-bottom: 20px;
`;

export const InfoText = styled.Text`
    font-size: 16px;
    margin-bottom: 10px;
`;
