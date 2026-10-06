import type {MedicalRecordInput, UpdateMedicalRecordInput} from "../types/medical-record.type.ts";

const BASE_URL = 'http://localhost:8080/api';

export async function getMedicalRecords(id: string) {
  const response = await fetch(`${BASE_URL}/medical/patient/${id}`, {credentials: "include"});
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Tibbiy yozuvlarni olishda xatolik yuz berdi");
  }
  return response.json();
}

export async function getMedicalRecord(id: string) {
  const response = await fetch(`${BASE_URL}/medical/record/${id}`, {credentials: "include"});
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Tibbiy yozuvni olishda xatolik yuz berdi");
  }
  return response.json();
}

export async function createMedicalRecord(record: MedicalRecordInput) {
  const response = await fetch(`${BASE_URL}/medical/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(record),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Tibbiy yozuv yaratishda xatolik yuz berdi");
  }
  return response.json();
}

export async function updateMedicalRecord(id: string, record: UpdateMedicalRecordInput) {
  const response = await fetch(`${BASE_URL}/medical/record/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(record),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Tibbiy yozuvni yangilashda xatolik yuz berdi");
  }
  return response.json();
}

export async function deleteMedicalRecord(id: string) {
  const response = await fetch(`${BASE_URL}/medical/record/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Tibbiy yozuvni o'chirishda xatolik yuz berdi");
  }
  return response.json();
}
