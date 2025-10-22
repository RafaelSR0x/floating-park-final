import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomBar from '../assets/components/BottomBar.jsx';
import Cadastro from '../screens/cadastro/index.jsx';
import Login from '../screens/login/index.jsx';
import EditarUsuario from '../screens/editar-usuario/index.jsx';
import Home from '../screens/home/index.jsx';
import Entrada from '../screens/entrada-veiculo/index.jsx';
import Saida from '../screens/saida-veiculo/index.jsx';
import RegistroSaida from '../screens/registro-saida/index.jsx';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// === Navegação das abas (após login)
function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomBar {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Entrada" component={Entrada} />
            <Tab.Screen name="Saida" component={Saida} />
        </Tab.Navigator>
    );
}

// === Navegação principal (com Login como inicial)
export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="BottomTabs" component={BottomTabs} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
                <Stack.Screen name="RegistroSaida" component={RegistroSaida} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
