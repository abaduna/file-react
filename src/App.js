
import './App.css';
import {useState,useEffect} from "react"
import { storage} from "./confic/firebase"
import  {ref,uploadBytes,listAll,getDownloadURL } from "firebase/storage" 
import { v4} from "uuid"
function App() {
  const [imageUpLoading,setImageUpLoading] = useState(null)
  const [imageList,setImageList] = useState([])
  const imageListRef = ref(storage,"images/")

  const upLoadingimage=()=>{
    console.log(`click`);
    if (imageUpLoading === "") return
      
    
    console.log(`retun`);
    const imageRef = ref(storage, `images/${imageUpLoading.name + v4()}`)
    console.log(imageRef);
    uploadBytes(imageRef,imageUpLoading).then((snaphost)=>{
      getDownloadURL(snaphost.ref).then((url)=>{
        setImageList((prev)=>[...prev,url])
      })
      
    })

  }
  useEffect(()=>{
    listAll(imageListRef).then((response)=>{
      response.items.forEach((item)=>{
        getDownloadURL(item).then((url)=>{
          setImageList((prev)=>[...prev,url])
        })
      })
    })
  },[])

  return (
    <div className="App">
      <h2>Hopla</h2>
      <input type="file" onChange={(e)=> setImageUpLoading(e.target.files[0])} />
      <button onClick={()=>upLoadingimage()} > Subir imagenes</button>
    <br/>
      {imageList.map((url)=>{
        return <div>  <img style={{width: `100px`}} src={url} /> <br/></div>
      })}
    </div>
  );
}

export default App;
