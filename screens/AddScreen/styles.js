import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 16,
  },
  inputMultiLine: {
    height: 120,
    width: 370,
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  button: {
    backgroundColor: '#00693e',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
