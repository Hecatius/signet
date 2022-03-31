import { bdFirestore } from "./init";
import { getDocs, collection,addDoc,Timestamp } from "firebase/firestore";

/**
 * Obtenir tous les dossiers d'un utilisateur
 * @param {string} idUtilisateur Identifiant Firebase de l'utilisateur connecté
 * @returns {Promise<any[]>} Promesse avec le tableau des dossiers lorsque complétée
 */
export async function lireTout(idUtilisateur) {
    return getDocs(collection(bdFirestore, 'signets', idUtilisateur, 'dossiers')).then(
        res => res.docs.map(doc => ({id: doc.id, ...doc.data()}))
    );
}

export async function creer(idUtilisateur,dossier) {
    //On ajoute dateModif à l'objet dossier
    dossier.dateModif = Timestamp.now;
    let coll = collection(bdFirestore,'signets', idUtilisateur , dossier )
    let refDoc = await addDoc(coll,dossier);
    return await getDoc(refDoc);
}
// Ajouter un dossier