import styled from 'styled-components/native';

export const ContainerSaida = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 50px; */
    background-color: #5b37b7;
    border: 0px;
`;

export const Image = styled.Image`
    margin-top: 30px;
`;

export const Title = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 24px;
    color: #fff;
    margin-top: 50px;
`;

export const InputWrapper = styled.View`
    width: 90%;
    height: 50px;
    border-bottom-width: 1px;
    border-bottom-color: #fff;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    margin-bottom: 15px;
    margin-top: 50px;
`;

export const StyledInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
    margin-left: 8px;
`;
