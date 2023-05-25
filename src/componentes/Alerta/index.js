import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error=false, SetError }) {
    return (
        <Snackbar 
            visible={error}
            onDismiss={() => SetError(false)}
            duration={1500}
            action={{
                label: "OK",
                onPress: () => SetError(false)
           }}
        >
            {mensagem}
        </Snackbar>
    )
}
