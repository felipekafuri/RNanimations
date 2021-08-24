import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minWidth: '100%',
    minHeight: '100%',
  },
  userContainer:{
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#71AE08',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    right: 0,
    top: 0,
    zIndex:1
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
  buttonText:{
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  },
  todoCard:{
    width: 300,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#763E08',
    borderRadius: 15,
    marginBottom: 8
  },
  todoName:{
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  },
});

export { styles }