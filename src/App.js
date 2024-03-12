import './App.css';
import {useState} from "react";

function App() {
  const[img,setImg]=useState('');
  const[loading,setLoading]=useState(false);
  const[qrData,setQrData]=useState("");
  const[qrSize,setQrSize]=useState("150")

  async function generateQR(){
    setLoading(true)
    try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${qrData}`;
        setImg(url)
    }catch(error){
        console.log("Error Genarting QR code ", error)
    }finally{
        setLoading(false)
    }
  }
  function downloadQR(){
    fetch(img)
    .then((Response)=> Response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.log("Error downloading QR Code", error);
    })
  }

  return (
    <div className="App_container">
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait....</p>}
      {img && <img src={img} className="qr_image" />}
      <div>
        <label htmlFor="dataInput" className="input_label">Data for QR Code :</label>
        <input type="text" value={qrData} onChange={(e)=>setQrData(e.target.value)} id="input_label" placeholder="Enter data for QR code" />
        <label htmlFor="sizeinput" className="input_label">Image Size (e.g., 150)</label>
        <input type="text" value={qrSize} id="sizeinput" placeholder="Enter Image Size" onChange={(e)=>setQrSize(e.target.value)}/>
        <button className="generate-button" disabled={loading} onClick={()=>generateQR()}>Generate QR Code</button>
        <button className="download-button" onClick={()=>downloadQR()}>Download QR Code</button>
      </div>
      <p className="footer">Designed By<a href=""> Nowsath</a></p>
    </div>
  );
}

export default App;
