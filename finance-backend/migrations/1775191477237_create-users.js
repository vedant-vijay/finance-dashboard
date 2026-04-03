export const up = (pgm)=>{
    pgm.createType('user_role', ['viewer', 'analyst', 'admin'])
    pgm.createTable('users', {
        id : {
            type : 'uuid',
            notNull : true,
            primaryKey : true,
            default : pgm.func('gen_random_uuid()')
        },
        name : {
            type : 'varchar(64)',
            notNull : true,
        },
        email :{
            type: 'varchar(64)',
            notNull : true,
            unique : true
        },
        password : {
            type : 'varchar(256)',
            notNull : true
        },
        role : {
            type : 'user_role',
            default : 'viewer'
        },
        is_active:{
            type: 'boolean',
            notNull : true,
            default : true
        },
        created_at : {
            type : 'timestamp',
            notNull : true,
            default : pgm.func('current_timestamp')
        },
        updated_at : {
            type : 'timestamp',
            notNull : true,
            default : pgm.func('current_timestamp')
        }
    })
}

export const down = (pgm)=>{
    pgm.dropTable('users')
    pgm.dropType('user_role')
}
