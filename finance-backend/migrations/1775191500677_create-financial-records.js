export const up = (pgm) => {
    pgm.createType('record_type', ['income', 'expense'])
    pgm.createTable('financial_records', {
        
        id: {
            type: 'uuid',
            notNull: true,
            primaryKey: true,
            default: pgm.func('gen_random_uuid()')
        },
        user_id: {
            type: 'uuid',
            notNull: true,
            references: '"users"',
            onDelete: 'CASCADE'
        },
        amount: {
            type: 'numeric(12,2)',
            notNull: true
        },
        type: {
            type: 'record_type',
            notNull: true
        },
        category: {
            type: 'varchar(64)',
            notNull: true
        },
        date: {
            type: 'date',
            notNull: true
        },
        notes: {
            type: 'text'
        },
        deleted_at: {
            type: 'timestamp'
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
}

export const down = (pgm) => {
    pgm.dropTable('financial_records')
    pgm.dropType('record_type')
}