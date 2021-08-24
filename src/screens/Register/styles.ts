import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    paddingTop: getStatusBarHeight() + 8,
    width: '100%',
    height: 96 + getStatusBarHeight(),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#279c00',
    justifyContent: 'space-around',
  },
  headerText:{
    fontSize: 22,
    color: '#ffff',
    fontWeight: 'bold'
  },
  content:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  button:{
    width: '90%',
    height: 56,
    backgroundColor: '#7159c1',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  buttonText:{
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  },
  input:{
    width: '90%',
    height: 64,
    padding: 10,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: '#279c90',
    marginTop: 10,
    fontSize:16
  }
});

export { styles }