import { StyleSheet } from 'react-native';
import Cores from '../Cores';

const FormStyle = StyleSheet.create({
  inputContainer: {
    padding: 25,
    paddingBottom: 0,
  },
  inputLabel: {
    color: Cores.roxoNubank,
    fontSize: 25,
    marginBottom: 10,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#747474',
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 20,
    paddingLeft: 15,
    color: '#545454'
  },
  pickerArea: {
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
    paddingLeft: 15,
    paddingRight: 15,
    color: '#545454',
  },
})

export default FormStyle;