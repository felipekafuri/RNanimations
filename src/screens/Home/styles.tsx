import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  userContainer:{
    paddingTop: getStatusBarHeight() + 8,
    width: '100%',
    height: 96 + getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#279c00'
  },
  userAvatar:{
    width: 64,
    height: 64,
    borderRadius: 32
  },
  greetings:{
    marginLeft: 16,
    fontSize: 22,
    color: '#ffff',
    fontWeight: 'bold'
  },
  content:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  buttonText:{
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  }
});

export { styles }