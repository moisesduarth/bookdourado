export const DIALOG = {
    CONFIRM: {
        DELETE: {
            title: 'Tem certeza de que deseja excluir?',
            content: 'Todos os dados serão inativos e não estarão disponíveis para uso.',
            actionConfirm: 'Excluir',
            actionCancel: 'Cancelar'
        },
        UPDATE: {
            title: 'Tem certeza de que deseja atualizar?',
            content: 'As informações alteradas refletirão em outras partes do sistema.',
            actionConfirm: 'Atualizar',
            actionCancel: 'Cancelar'
        },
        REACTIVATE: {
            title: 'Tem certeza de que deseja reabilitar este ítem?',
            content: 'Este ítem irá ser exibido na lista de ativos. Deseja confirmar esta ação?',
            actionConfirm: 'Reativar',
            actionCancel: 'Cancelar'
        },
        SAVED: {
            title: 'Tem certeza de que deseja mudar a semana de planejamento?',
            content: 'O planejamento atual não foi salvo ainda. Deseja continuar?',
            actionConfirm: 'Continuar',
            actionCancel: 'Cancelar'
        }
    }
};

export const TOAST = {
    SUCCESS: {
        SAVE: {
            message: 'Registro salvo com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        },
        DELETE: {
            message: 'Registro excluído com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        },
        UPDATE: {
            message: 'Registro atualizado com sucesso!',
            action: 'Fechar',
            type: 'success-snackbar'
        }
    },

    ERROR: {
        message: 'Ops! Houve um problema com este registro!',
        action: 'Fechar',
        type: 'error-snackbar'
    },

    WARNING: {
        message: 'Atenção!',
        action: 'Fechar',
        type: 'warning-snackbar'
    },

    SUPPORT: {
        message: 'Erro interno do servidor, favor contactar o suporte!',
        action: 'Fechar',
        type: 'error-snackbar'
    }
};
