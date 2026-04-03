export const up = (pgm) => {
    pgm.addColumns('users', {
        refresh_token: {
            type: 'text',
            default: null
        }
    })
}

export const down = (pgm) => {
    pgm.dropColumns('users', ['refresh_token'])
}