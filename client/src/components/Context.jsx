import axios from "axios";
import { createContext , useState , useEffect} from "react";
import { useLocation } from "react-router-dom";

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [user , setUser] = useState(false)
    const [verifiedData , setVerifiedData] = useState({
        name: '' , 
        id : '' 

    })

    const location = useLocation()



    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(token){

            const headers = { 'Authorization': 'Bearer ' + token };
    
            axios.get('https://to-do-server-w6ww.onrender.com/current' , {headers})
            .then(({data}) => {
               
                setVerifiedData({name : data.name , id : data.id})
                
            }).catch((error) => {
                console.error("Error fetching data: ", error);
            });
        }
        else{
            console.log('Token is not available')
        }

       
    } , [location.key , user])

    
    return (
        <UserContext.Provider value={{user , setUser , verifiedData , setVerifiedData }}>
            {children}
        </UserContext.Provider>
    )
}
