import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';


const ButtonContainer = styled.Pressable`
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    padding: 15px 30px;
    margin-top: 30px;
`;

const ButtonText = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 18;
`;

export default function PrimaryButton({ title, onPress }) {
    return (
        <ButtonContainer
            onPress={onPress}
            style={({ pressed }) => ({
                backgroundColor: pressed ? '#000' : '#fff',
            })}
        >
            {({ pressed }) => <ButtonText style={{ color: pressed ? '#fff' : '#000' }}>{title}</ButtonText>}
        </ButtonContainer>
    );
}

PrimaryButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
