const AUTORES_SIMULADOS = [
    { username: '@carla.dev', avatar: 'https://i.pravatar.cc/80?img=5' },
    { username: '@martin_ok', avatar: 'https://i.pravatar.cc/80?img=12' },
    { username: '@luli.fotos', avatar: 'https://i.pravatar.cc/80?img=25' },
    { username: '@nico_r', avatar: 'https://i.pravatar.cc/80?img=33' },
    { username: '@sofi.arte', avatar: 'https://i.pravatar.cc/80?img=47' },
]

const MENSAJES_SIMULADOS = ['¡Increíble! 😍', 'Me encanta esta foto', '🔥🔥🔥', 'Qué buena captura', 'Wow, hermoso', 'Necesito uno así']

// Hash simple y determinístico: el mismo postId siempre genera los mismos comentarios simulados.
const hashCode = (texto) => {
    let hash = 0
    for (let i = 0; i < texto.length; i++) {
        hash = (hash << 5) - hash + texto.charCodeAt(i)
        hash |= 0
    }
    return Math.abs(hash)
}

export const generarComentarios = (postId) => {
    const semilla = hashCode(postId ?? '')

    return AUTORES_SIMULADOS.map((autor, i) => ({
        id: `${postId}-comentario-${i}`,
        usuario: autor,
        mensaje: MENSAJES_SIMULADOS[(semilla + i) % MENSAJES_SIMULADOS.length],
        likesBase: (semilla + i * 7) % 40,
    }))
}

export const generarEtiquetas = (descripcion) => {
    if (!descripcion) return []

    return descripcion
        .replace(/[^\p{L}\s]/gu, '')
        .split(' ')
        .filter((palabra) => palabra.length > 3)
        .slice(0, 4)
        .map((palabra) => `#${palabra.toLowerCase()}`)
}
