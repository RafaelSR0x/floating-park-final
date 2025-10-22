import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuHamburger from './MenuHamburger';

const HeaderContainer = styled.View`
    width: 100%;
    height: 70px;
    background-color: #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 31px;
`;

const ContainerLogoTitle = styled.View`
    flex-direction: row;
    gap: 50px;
    align-items: flex-end;
`;

const Menu = styled.View`
    position: absolute;
    right: 30px;
    top: 20px;
`;

const LogoImage = styled.Image``;

const Title = styled.Text`
    font-family: PoppinsSemiBold;
    font-size: 18px;
`;

export default function Header({ title }) {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <>
            <HeaderContainer>
                <ContainerLogoTitle>
                    <LogoImage
                        source={require('../../assets/images/logo-header.png')}
                        style={{ width: 102, height: 33 }}
                    />
                    <Title>{title}</Title>
                </ContainerLogoTitle>

                <Menu>
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <Ionicons name="menu" size={32} color="black" />
                    </TouchableOpacity>
                </Menu>
            </HeaderContainer>

            <MenuHamburger visible={menuVisible} onClose={() => setMenuVisible(false)} />
        </>
    );
}
