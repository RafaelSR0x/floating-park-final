import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    background-color: #323232;
    border-top-width: 1px;
    border-top-color: #333;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding-top: 7px;
    height: 90px;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 10;
`;

const TabButton = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Label = styled.Text`
    font-size: 14px;
    font-family: PoppinsSemiBold;
    color: ${(props) => (props.active ? '#fff' : '#aaa')};
    margin-top: 3px;
`;

export default function BottomBar({ state, descriptors, navigation }) {
    if (!state) return null;

    return (
        <Container>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                let iconName;
                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Entrada') iconName = 'car';
                else if (route.name === 'Saida') iconName = 'exit-outline';

                return (
                    <TabButton key={route.key} onPress={() => navigation.navigate(route.name)}>
                        <Ionicons name={iconName} size={28} color={isFocused ? '#fff' : '#aaa'} />
                        <Label active={isFocused}>{route.name.charAt(0).toUpperCase() + route.name.slice(1)}</Label>
                    </TabButton>
                );
            })}
        </Container>
    );
}
