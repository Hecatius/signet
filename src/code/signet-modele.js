import { bdFirestore } from "./init";
import { getDocs, query, orderBy, collection, addDoc, Timestamp, getDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";

/**
 * Ajoute un signet en recréant le tableau des top 3 dans le dossier identifié
 * @param {String} uid Identifiant Firebase Auth de l'utilisateur connecté
 * @param {String} iDossier Identifiant Firestore du dossier auquel on ajoute le signet
 * @param {Object[]} derniers3 Tableau des objet signets représentant les dernier 3 signets a conserver
 * @returns  {Promesse<void>} Promesse sans paramètre une fois que la requete est fini
 */
export async function creer(uid,iDossier, derniers3) {
    // Référence à la collection dans laquelle on veut ajouter le dossier
    let docRef = doc(bdFirestore, 'signets', uid, 'dossiers', iDossier);
    return await updateDoc(docRef,{top3: derniers3});
}