import { authFirebase,authGoogle } from './init';
import {signInWithPopup, onAuthStateChanged} from 'firebase/auth';
import { bdFirestore } from './init';
import { doc, setDoc } from '@firebase/firestore';
/**
 * Ouvre une connexion Firebase (avec Google dans cette situation)
 */
export function connexion(){
    signInWithPopup(authFirebase, authGoogle)
  }
/**
 *  Ferme la connexion Firebase Auth
*/  
export function deconnexion() {
    authFirebase.signOut()//detruit l'utilisateur connecté
  }
export function observerEtatConnexion(mutateurEtatUtilisateur){//mutateur = set uttilisateur donc sa va raffraichir la page
  onAuthStateChanged(authFirebase, // detecte les changement d'authentification
    user =>  {
            if(user) {
                //Sauvegarder le user
                setDoc(doc(bdFirestore,'signets', user.uid), 
                {nom:user.displayName,courriel:user.email}, 
                {merge: true}); //si le user existe merge les
            }
            mutateurEtatUtilisateur(user)
        }
    )
}