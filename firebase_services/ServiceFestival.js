import {db} from "../firebase/firebaseConfig";
import {query,limit, collection, getDocs, where, startAfter, orderBy} from "firebase/firestore"

export class FestivalService{

    static festivalsColl = collection(db,"festivals");

    static getFestivalByName(name) {
        return getDocs(query(this.festivalsColl, where("nom_du_festival", "==", name)))
    }

   /**
     * Renvoie une promise sur tous les festivals
     * exemple : FestivalService.getAllFestivalsPromise()
     *     .then((query) => query.docs.forEach(value => console.log(value.get("identifiant"))))
     *     .catch(reason => {console.error(reason)})
     * @returns {Promise<QuerySnapshot<DocumentData>>}
     */
    static getAllFestivalsPromise(){
        return getDocs(this.festivalsColl);
    }

    /**
     * Renvoie une promise des lmt premiers festivals
     * @param lmt la limite de nombre sur les festivals
     * @param last
     * @returns {Promise<QuerySnapshot<DocumentData>>}
     */
    static getFestivalsLimitsPromise(lmt,last){
        if(last == null){
            return getDocs(query(this.festivalsColl,orderBy("nom_du_festival"),limit(lmt)))
        }
        else{
            return getDocs(query(this.festivalsColl,limit(lmt),startAfter(last)))
        }

    }

    static getFestivalsFilterTownLimits(townName,lmt,last){
        if(last == null){
            return getDocs(query(this.festivalsColl,
                where("commune_principale_de_deroulement",">=",townName),
                where("commune_principale_de_deroulement","<=",townName + '\uf8ff'),
                limit(lmt)))
        }
        else{
            return getDocs(query(this.festivalsColl,
                where("commune_principale_de_deroulement",">=",townName),
                where("commune_principale_de_deroulement","<=",townName + '\uf8ff'),
                limit(lmt),
                startAfter(last)))
        }
    }

    static getFestivalsFilterMainActivityLimits(mainActivity,lmt,last){
        if(last == null){
            return getDocs(query(this.festivalsColl,
                where("discipline_dominante",">=",mainActivity),
                where("discipline_dominante","<=",mainActivity + '\uf8ff'),
                limit(lmt)))
        }
        else{
            return getDocs(query(this.festivalsColl,
                where("discipline_dominante",">=",mainActivity),
                where("discipline_dominante","<=",mainActivity + '\uf8ff'),
                limit(lmt),
                startAfter(last)))
        }
    }

    static getFestivalsFilterTitleLimits(title,lmt,last){
        if(last == null){
            return getDocs(query(this.festivalsColl,
                where("nom_du_festival",">=",title),
                where("nom_du_festival","<=",title + '\uf8ff'),
                limit(lmt)))
        }
        else{
            return getDocs(query(this.festivalsColl,
                where("nom_du_festival",">=",title),
                where("nom_du_festival","<=",title + '\uf8ff'),
                limit(lmt),
                startAfter(last)))
        }
    }

}
