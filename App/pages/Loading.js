import React from 'react'
import { apiClient } from '../services/api';
import { AsyncStorage, Text} from 'react-native'

class Loading extends React.Component {
    async componentWillMount() {
      console.log("Loading...")
      try {
        const { navigate } = this.props.navigation
        const token = await AsyncStorage.getItem('@letsunite:jwt')
        //console.log("Token:", token)
        if (token) {     
          const user =  {
            token: token,
          }
          // Send a request to the API to check token validity
          const response = await apiClient('auth/validate', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(user)
          })
          console.log("Loading response:", response)
          if (response.ok) {
            navigate('Home')
          } else {
            navigate('Main')
          }
        }
      } catch (err) {
        console.error(err)
        // Navigate to the Login Screen
        navigate('Main')
      }
    }
    render() {
      return <Text>Loading</Text>
    }
  }

  Loading.navigationOptions = {
    gesturesEnabled: false,
}

export default Loading