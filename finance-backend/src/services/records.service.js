import { getAllRecords, getRecordById, createRecord, updateRecord, softDeleteRecord } from '../repositories/records.repository.js'

export async function getAllRecordsService(filters) {
    const records = await getAllRecords(filters)
    return records
}

export async function getRecordByIdService(id) {
    const record = await getRecordById(id)
    if (!record) throw new Error('Record not found')
    return record
}

export async function createRecordService(userId, amount, type, category, date, notes) {
    const record = await createRecord(userId, amount, type, category, date, notes)
    return record
}

export async function updateRecordService(id, fields) {
    const record = await getRecordById(id)
    if (!record) throw new Error('Record not found')
    const updated = await updateRecord(id, fields)
    return updated
}

export async function softDeleteRecordService(id) {
    const record = await getRecordById(id)
    if (!record) throw new Error('Record not found')
    await softDeleteRecord(id)
}