import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

// ========== 견적서 (Estimates) ==========

export async function saveEstimate(userId, estimateData) {
    const estimatesRef = collection(db, 'users', userId, 'estimates')
    const docRef = await addDoc(estimatesRef, {
        ...estimateData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
    return docRef.id
}

export async function updateEstimate(userId, estimateId, estimateData) {
    const docRef = doc(db, 'users', userId, 'estimates', estimateId)
    await updateDoc(docRef, {
        ...estimateData,
        updatedAt: serverTimestamp()
    })
}

export async function deleteEstimate(userId, estimateId) {
    const docRef = doc(db, 'users', userId, 'estimates', estimateId)
    await deleteDoc(docRef)
}

export async function getEstimates(userId) {
    const estimatesRef = collection(db, 'users', userId, 'estimates')
    const q = query(estimatesRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getEstimate(userId, estimateId) {
    const docRef = doc(db, 'users', userId, 'estimates', estimateId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
    }
    return null
}

// ========== 템플릿 (Templates) ==========

export async function saveTemplate(userId, templateData) {
    const templatesRef = collection(db, 'users', userId, 'templates')
    const docRef = await addDoc(templatesRef, {
        ...templateData,
        createdAt: serverTimestamp()
    })
    return docRef.id
}

export async function getTemplates(userId) {
    const templatesRef = collection(db, 'users', userId, 'templates')
    const q = query(templatesRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function deleteTemplate(userId, templateId) {
    const docRef = doc(db, 'users', userId, 'templates', templateId)
    await deleteDoc(docRef)
}

// ========== 고객 (Customers) ==========

export async function saveCustomer(userId, customerData) {
    const customersRef = collection(db, 'users', userId, 'customers')
    const docRef = await addDoc(customersRef, {
        ...customerData,
        createdAt: serverTimestamp()
    })
    return docRef.id
}

export async function getCustomers(userId) {
    const customersRef = collection(db, 'users', userId, 'customers')
    const q = query(customersRef, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function updateCustomer(userId, customerId, customerData) {
    const docRef = doc(db, 'users', userId, 'customers', customerId)
    await updateDoc(docRef, {
        ...customerData,
        updatedAt: serverTimestamp()
    })
}

export async function deleteCustomer(userId, customerId) {
    const docRef = doc(db, 'users', userId, 'customers', customerId)
    await deleteDoc(docRef)
}

// ========== 사용자 프로필 ==========

export async function saveUserProfile(userId, profileData) {
    const docRef = doc(db, 'users', userId, 'profile', 'main')
    const { setDoc } = await import('firebase/firestore')
    await setDoc(docRef, {
        ...profileData,
        updatedAt: serverTimestamp()
    }, { merge: true })
}

export async function getUserProfile(userId) {
    const docRef = doc(db, 'users', userId, 'profile', 'main')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    }
    return null
}

// ========== 저장된 품목 (Saved Items) ==========

export async function saveItem(userId, itemData) {
    const itemsRef = collection(db, 'users', userId, 'savedItems')
    const docRef = await addDoc(itemsRef, {
        name: itemData.name,
        unitPrice: itemData.unitPrice || 0,
        createdAt: serverTimestamp()
    })
    return docRef.id
}

export async function getSavedItems(userId) {
    const itemsRef = collection(db, 'users', userId, 'savedItems')
    const q = query(itemsRef, orderBy('name', 'asc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function deleteSavedItem(userId, itemId) {
    const docRef = doc(db, 'users', userId, 'savedItems', itemId)
    await deleteDoc(docRef)
}
