import React from 'react';
import { useState, useEffect } from 'react';
import { dateParser } from './../../Utils';

import { Icon } from '@iconify/react';
import '../Dashboard/style.css'
import { auth, db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import { collection, collectionGroup, getDocs, onSnapshot, query} from 'firebase/firestore'


const Recup = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([])
    const [temps, setTemps] = useState([]);
    const { user } = UserAuth();
     
      useEffect(() => {
        const q = query(collection(db, 'stats'))
         onSnapshot(q, (querySnapshot) => {
          setTasks(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      }, []);

        //  const getData = async () => {
        //     const t = query(collectionGroup(db, 'time'));
        //     onSnapshot(t, (querySnapshot) => {
        //       setTemps(querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         data: doc.data()
        //       })))
        //     })
        //   }
        //   getData()
        const tempss = [];
        const [kakah , setkakah] = useState([]);
      
        useEffect(() => {

        const getUsers = async () => {
          const t = query(collectionGroup(db, 'time'));
          const data = await getDocs(t);
          data.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              setTemps(doc.id, doc.data())
              tempss.push({
                time: doc.data().time,
                glycemie: doc.data().glycemie,
              });
              console.log(doc.data());
            });
            setkakah(tempss);
          };
    
        getUsers();
      }, []);
    

      return (
          <div  className='w-full h-screen p-4 overflow-x-auto'>
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-gray-500 dark:text-gray-400">
                    <thead>
                        <tr>
                            <th className='bg-6 text-center  text-4 border '>
                                Date
                            </th>
                           <th className='bg-6 text-center  text-4 border '>
                            Matin
                            <tr className='text-xs font-bold border-t '>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                Glycémie
                                </th>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                IR
                                </th>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                 après
                                </th>
                            </tr>
                            </th> 
                            <th className='bg-6 text-center  text-4 border'>
                            Midi
                            <tr className='text-xs font-bold border-t'>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                Glycémie
                                </th>
                                <th scope="col" colSpan={2}  class="py-3 px-6">
                                IR
                                </th>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                après
                                </th>
                            </tr>
                            </th> 
                             <th className='bg-6 text-center  text-4 border'>
                            Soir
                            <tr className='text-xs font-bold border-t'>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                Glycémie
                                </th>
                                <th scope="col"  colSpan={2} class="py-3 px-6">
                                IR
                                </th>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                après
                                </th>
                            </tr>
                          </th> 
                          <th className='bg-6 text-center  text-4 border'>
                            Soirée
                            <tr className='text-xs font-bold border-t'>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                Glycémie
                                </th>
                                <th scope="col" colSpan={2}  class="py-3 px-6">
                                IL
                                </th>
                                <th scope="col" colSpan={2} class="py-3 px-6">
                                Nuit
                                </th>
                            </tr>
                          </th> 
                        
                          <th className='bg-6 text-center  text-4 border'>
                            Observations
                          </th>
                        </tr>
                        
                    </thead>

                    
 <tbody> 

       
                    
                        
                    {tasks.map((task) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" > 
                              <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {task.id}
                              </th>
                            

                          {users.map((user) => { 
                                
                            <td>
                                <td scope="col" class="py-3 px-6" colSpan={2}>
                                 {user.user}
                                </td>
                                <td scope="col" class="py-3 px-6" colSpan={2}>
                                 
                                </td>
                                <td scope="col" class="py-3 px-6" colSpan={2}>
                                 
                                </td>
                            </td>
})}


{kakah.map((kakah) => {
                            <td>
                                <td class="py-3 px-6" colSpan={2}>
                                 {kakah.time}
                                </td>
                                <td class="py-3 px-6" colSpan={2}>
                                 
                                </td>
                                <td class="py-3 px-6" colSpan={2}>
                                 
                                </td>
                            </td>
})}
                            <td>
                                <td class="py-3 px-6" colSpan={2}>
                                  
                                </td>
                                <td class="py-3 px-6" >
                                 
                                </td>
                                <td class="py-3 px-6" colSpan={2}>
                                 
                                </td>
                            </td>
                          
                            <td> 
                                <td class="py-3 px-6" colSpan={2}>
                                
                                </td>
                                <td class="py-3 px-6" colSpan={2}>
                                
                                </td>
                                <td class="py-3 px-6" colSpan={2}>
                                
                                </td>
                            </td>    
                         
                        </tr>
                            ))}
                        
                    
                   
    </tbody>      
                </table>
            </div>

            <div className='btnContainer flex flex-row  justify-end mt-2 '>
              <button type="button" class="flex flex-row items-center  font-medium p-2.5  text-center mr-2 mb-2 text-sm s rounded-full text-0 bg-11 hover:bg
              focus:outline-none focus:ring-2 focus:ring-blue-300 ">
                <div>Statistiques</div> 
                <Icon icon="bi:arrow-right-short" color="#f6faff" width="20" height="20" />
                </button>
              <button type="button" class="flex flex-row items-center  font-medium p-2.5  text-center mr-2 mb-2 text-sm s rounded-full text-0 bg-11 hover:bg
              focus:outline-none focus:ring-2 focus:ring-blue-300 ">
                <div>Télécharger</div> 
                <Icon icon="ps:download" color="#f6faff" width="20" height="20" />
                </button>
              <button type="button" class=" flex flex-row items-center  font-medium p-2.5  text-center mr-2 mb-2 text-sm s rounded-full text-0 bg-6 hover:bg-10 
              focus:outline-none focus:ring-2 focus:ring-blue-300  ">
                <div className='mr-1.5'>Envoyer </div> 
                <Icon icon="lucide:send" color="#f6faff" width="20" height="20" />
              </button>
            </div>

            <div>
              khraaaaaa
              {temps.map((temps) => { 
                  <div scope="col" class="py-3 px-6" colSpan={2}>
                      {temps.glycemie}
                  </div>                                 
              })}
            </div>
         </div>
      )
}

//     return (
//         <div>
//           dunno
//           <div>
//           {tasks.map((task) => (
//               <div>
//                 id={task.id}
//                 key={task.id}
//               </div>
//             ))}
//                     {user && <div className='flex flex-col gap-5 items-center justify-center'>
//                         <p className='text-3xl font-bold'>Sub-Collection</p>
//                         <div>
//                            {workData.map((elem)=>{
//                                return(
//                                    <div key={elem.date} className='w-full text-center'>
//                                        <p>{elem.date}</p>
                                       
//                                        <p>{elem.time}</p>
                                       
//                                        <p></p>
//                                        <hr />
//                                    </div>
//                                )
//                            })}
//                         </div>
//                     </div>}
//                 </div>
//         </div>
//     )
// }

export default Recup