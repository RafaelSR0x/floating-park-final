import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native';
import { useFonts } from 'expo-font';
import Navigation from './src/navigation/Navigation.jsx';

const ContainerApp = styled.View`
    flex: 1;
`;

export default function App() {
    const [fontsLoaded] = useFonts({
        PoppinsRegular: require('./src/assets/fonts/Poppins-Regular.ttf'),
        PoppinsSemiBold: require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    });

    if (!fontsLoaded) return null;

    return (
        <ContainerApp>
            <StatusBar style="light" />
            <Navigation />
        </ContainerApp>
    );
}
