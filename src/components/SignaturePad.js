import React, {useRef} from 'react';
import {View, Button} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const SignaturePad = ({onOK}) => {
  const ref = useRef();

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleOK = signature => {
    onOK(signature);
  };

  return (
    <View style={{flex: 1}}>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        onEmpty={() => console.log('Empty')}
        descriptionText="Sign"
        clearText="Clear"
        confirmText="Save"
        webStyle={`
          .m-signature-pad--footer
          {
            display: none; margin: 0px; padding: 0px;
          }
        `}
      />
      <Button title="Clear" onPress={handleClear} />
    </View>
  );
};

export default SignaturePad;
