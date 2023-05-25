import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error=false, SetError, tempoDuracao }) {
    return (
        <Snackbar 
            visible={error}
            onDismiss={() => SetError(false)}
            duration={tempoDuracao}
            action={{
                label: "OK",
                onPress: () => SetError(false)
           }}
        >
            {mensagem}
        </Snackbar>
    )
}
