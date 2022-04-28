import './Dossier.scss'; 
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import couvertureDefaut from '../images/couverture-defaut.webp';
import { formaterDate } from '../code/helper';
import { useState, useContext } from 'react';
import FrmDossier from './FrmDossier';
import * as signetModele from'../code/signet-modele';
import { UtilisateurContext } from './Appli';

export default function Dossier({id, titre, couleur, dateModif, couverture,top3, supprimerDossier, modifierDossier}) {
  //Identifiant de l'utilisateur
  const utilisateur = useContext(UtilisateurContext);
  const uid = utilisateur.uid;

  // État des signetss dans ce dossier
  const [signets,setSignets] = useState(top3 || []);
  
  // État du menu contextuel
  const [eltAncrage, setEltAncrage] = useState(null);
  const ouvertMenu = Boolean(eltAncrage);

  // État du formulaire de modification
  const [ouvertFrm, setOuvertFrm] = useState(false);

  function gererMenu(event) {
    setEltAncrage(event.currentTarget);
  };

  function gererFermerMenu() {
    
    setEltAncrage(null);
  };

  function afficherFormulaireDossier() {
    // Ouvrir le formulaire de modification du dossier (transférer l'info sir le
    // dossier dans le formulaire) ...
    setOuvertFrm(true);
    // ... puis fermer le menu.
    gererFermerMenu();
  }
  
  function gererSupprimer() {
    // Appeler la fonction de ListeDossiers qui gère la suppression dans Firestore
    supprimerDossier(id);

    // ... puis fermer le menu.
    gererFermerMenu();
  }

  // Tester si l'URL dans la variable couverture est valide
  let urlCouverture;
  try {
    urlCouverture = new URL(couverture);
  }
  catch(e) {
    couverture = couvertureDefaut;
  }

//SECTION DROPZONE
const [dropzone, setDropZone] = useState(false)

  function gererDragEnter(evt){
    evt.preventDefault();
    setDropZone(true);
  }

  function gererDragOver(evt){
    evt.preventDefault();
  }

  function gererDragLeave(evt){
    evt.preventDefault();
    setDropZone(false)
  }

  function gererDrop(evt){
    evt.preventDefault();
    setDropZone(false);
    console.log("URL de l'adresse glissée/déposé : ",evt.dataTransfer.getData("URL"));
    let url = evt.dataTransfer.getData("URL");
    // On aimerait aussi chercher le Title (une autre fois)

    // On appelle la méthode d'ajout d'un signet dans un dossier définie dans le composant
    // parent et passée

    ajouterSignet(id,url)
  }

  function ajouterSignet(idDossier,url){
    const derniers3 = [...signets,{adresse: url, titre:"Blablabla"}].slice(-3);
    console.log("ID du dossier et URL à ajouter :", derniers3)
    signetModele.creer(uid, idDossier, derniers3).then (
      //Permet de updater la constante
      () => setSignets(derniers3)
    );
  }


  
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className={"Dossier" + (dropzone ? ' dropzone': '')} onDrop={gererDrop} onDragEnter={gererDragEnter} onDragOver={gererDragOver} onDragLeave={gererDragLeave} style={{backgroundColor: couleur}}>
      <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
      </IconButton>
      <div className="couverture">
        <img src={couverture || couvertureDefaut} alt={titre}/>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {formaterDate(dateModif.seconds)}</p>
      </div>
      <IconButton onClick={gererMenu} className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-contextuel-dossier"
        anchorEl={eltAncrage}
        open={ouvertMenu}
        onClose={gererFermerMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={afficherFormulaireDossier}>Modifier</MenuItem>
        <MenuItem onClick={gererSupprimer}>Supprimer</MenuItem>
      </Menu>
      <FrmDossier gererActionDossier={modifierDossier} ouvert={ouvertFrm} setOuvert={setOuvertFrm} id={id} titre_p={titre} couleur_p={couleur} couverture_p={couverture} />
    </article>
  );
}