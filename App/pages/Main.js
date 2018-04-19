import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Title from '../components/Title';
import Button from '../components/Button';
import LargeButton from '../components/LargeButton';

class Main extends Component {
  handleSignUp = () => {
    const { navigate } = this.props.navigation 
    navigate('SignUp')
  }

  handleLogIn = () => {
    const { navigate } = this.props.navigation 
    navigate('LogIn')
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Title style={{marginBottom : 143}}/>
        <LargeButton title='New user?' onPress={this.handleSignUp} style={{marginBottom : 20}}/>
        <Button title='Existing user?' onPress={this.handleLogIn} />          
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 200,
    backgroundColor : 'white',
  }
});

export default Main;