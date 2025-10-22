import styled from 'styled-components/native';

export const CadastroContainer = styled.View`
    flex: 1;
    background-color: #5b37b7;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

export const Image = styled.Image`
    margin-top: 70px;
`;

export const Title = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 40px;
    color: #fff;
`;

export const Form = styled.View`
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
`;

export const StyledInput = styled.TextInput`
    flex: 1;
    font-size: 16px;
    color: #fff;
    margin-left: 8px;
`;

export const ToggleButton = styled.TouchableOpacity`
    padding: 4px;
`;

export const LoginButton = styled.TouchableOpacity`
    margin-top: 10px;
`;

export const LoginText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-family: PoppinsRegular;
`;
