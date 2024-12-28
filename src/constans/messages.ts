export const feedbackMessages = {
    collection: {
        created: (collectionName: string) =>
            `¡La colección "${collectionName}" se ha creado con éxito!`,
        updated: (collectionName: string) =>
            `¡La colección "${collectionName}" se ha actualizado correctamente!`,
        deleted: (collectionName: string) =>
            `¡La colección "${collectionName}" se ha eliminado con éxito!`,
        notFound: (collectionName: string) =>
            `No se encontró la colección "${collectionName}". Por favor, verifica el nombre.`,
        errorCreating: (collectionName: string) =>
            `Hubo un problema al crear la colección "${collectionName}". Inténtalo nuevamente.`,
        errorUpdating: (collectionName: string) =>
            `Error al actualizar la colección "${collectionName}". Inténtalo nuevamente.`,
        errorDeleting: (collectionName: string) =>
            `Error al eliminar la colección "${collectionName}". Inténtalo nuevamente.`,
    },
    game: {
        added: (gameName: string) =>
            `¡"${gameName}" se ha añadido a la colección con éxito!`,
        removed: (gameName: string, collectionName: string) =>
            `¡"${gameName}" se ha eliminado de la colección "${collectionName}" con éxito!`,
        notFound: (gameName: string) =>
            `No se encontró el juego "${gameName}". Por favor, verifica el nombre.`,
        alreadyExists: (gameName: string, collectionName: string) =>
            `El juego "${gameName}" ya existe en la colección "${collectionName}".`,
        errorAdding: (gameName: string) =>
            `Error al añadir "${gameName}" a la colección. Inténtalo nuevamente.`,
        errorRemoving: (gameName: string, collectionName: string) =>
            `Error al eliminar "${gameName}" de la colección "${collectionName}". Inténtalo nuevamente.`,
    },
    general: {
        success: "¡Acción completada con éxito!",
        error: "Ocurrió un error inesperado. Inténtalo nuevamente.",
        unauthorized: "No autorizado. Por favor, inicia sesión nuevamente.",
        loading: "Cargando datos. Por favor, espera un momento...",
        noResults: "No se encontraron resultados. Intenta con otro término.",
        confirmation: (action: string, name: string) =>
            `¿Estás seguro de que deseas ${action} "${name}"? Esta acción no puede deshacerse.`,
    },
};
