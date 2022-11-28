import {auth, db} from "../firebase/firebaseConfig";
import {
    collection,
    updateDoc,
    doc,
    arrayUnion,
    arrayRemove,
    getDoc,
    query,
    where,
    getDocs,
    setDoc
} from "firebase/firestore"
//import messaging from '@react-native-firebase/messaging';



export class FavorisService{

    static usersColl = collection(db,"users");

    /**
     * Ajoute un favori à l'utilisateur
     * Pas besoin de fournir l'email de l'utilisateur, on le récupère directement depuis auth
     * @param idFestival
     * @returns {Promise<void>}
     */
    static addFavoriToUser(idFestival) {
        const email = auth.currentUser.email
        const userRef = doc(db, "users",email)
        updateDoc(userRef, {
            favoris: arrayUnion(idFestival)
        }).catch(() => setDoc(userRef, {
                favoris: arrayUnion(idFestival)
            }).catch((error) => console.error(error)))
    }

    /**
     * Retire un favori à l'utilisateur
     * @param idFestival
     * @returns {Promise<void>}
     */
    static removeFavoriFromUser(idFestival){
        const email = auth.currentUser.email
        const userRef = doc(db, "users",email)
        updateDoc(userRef, {
            favoris: arrayRemove(idFestival)
        })
    }

    /**
     * Pour l'instant, fait plusieurs requêtes
     */
    static async getAllFavoriteFestivals(){
        const email = auth.currentUser.email
        const userRef = doc(db, "users",email)
        const festivalsColl = collection(db,"festivals")

        const snapshot = await getDoc(userRef)
        const listOfFavoriteIds = snapshot.get('favoris')
        if(listOfFavoriteIds === undefined) {
            return [];
        }
        let listOfFavoriteFestivals = []
        for (let i = 0; i <= Math.floor(listOfFavoriteIds.length/10); i++) {
            if(listOfFavoriteIds.slice(i, i+10).length === 0) {
                break;
            }
            const querySnap = await getDocs(
                query(
                    festivalsColl, where(
                        'identifiant','in',listOfFavoriteIds.slice(i,i+10)
                    )
                )
            )
            querySnap.forEach((doc) => {
                const data = doc.data()
                data["uid"] = doc.id

                listOfFavoriteFestivals.push(doc.data())
            })
        }
        return listOfFavoriteFestivals
    }

    static async getAllNotificationsFromUser(){
        const email = auth.currentUser.email
        const userRef = doc(db, "users",email)
        const notifications = collection(db,"notifications")
        const snapshot = await getDoc(userRef)
        const listOfFavoriteIds = snapshot.get('favoris')
        let listOfNotifications = []
        for (let i = 0; i <= Math.floor(listOfFavoriteIds.length/10); i++) {
            if(listOfFavoriteIds.slice(i, i+10).length === 0) {
                break;
            }
            const querySnap = await getDocs(
                query(
                    notifications, where(
                        'identifiant','in',listOfFavoriteIds.slice(i,i+10)
                    )
                )
            )
            querySnap.forEach((doc) => {
                const data = doc.data()
                data["uid"] = doc.id
                listOfNotifications.push(data)
            })
        }
        return listOfNotifications
    }
}
