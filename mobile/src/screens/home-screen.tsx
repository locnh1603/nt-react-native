import * as React from 'react';
import {Text, View} from 'react-native';
import {useAuth} from '../contexts/auth-context';
import Button from '../components/Button';
import type {HomeScreenProps} from '../types/navigation';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    const {user} = useAuth();

    return (
        <View style={{margin: 10, flex: 1, flexDirection: 'column'}}>
            {user ? (
                <>
                    <Text style={{flex: 1}}>Welcome, {user.username}!</Text>
                    <View>
                        <Button onPress={() => navigation.navigate('Account')}>
                            <Text>View Profile</Text>
                        </Button>
                    </View>
                </>
            ) : (
                <>
                    <Text style={{flex: 1}}>Welcome Guest</Text>
                    <Button title="Login" onPress={() => navigation.navigate('Account')}>
                        <Text>Log in</Text>
                    </Button>
                </>
            )}
        </View>
    );
};

export { HomeScreen };