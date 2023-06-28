import { useState } from "react";
import { ImSearch } from 'react-icons/im';
import './styles.css';
import api from "./services/api";
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
  
  async function handlesearch(){
   //  /01310930/json
   
   if (input === "") {
      alert("Preencha algum cep")
      return;
    } else {
      try {
        const response = await api.get(`${input}/json`)
        setCep(response.data)
      } catch {
        alert("Erro ao buscar cep")
        setInput('Não encontrado.')
        setCep([])
      }
    }
  }
  return (
    <div className="container">
      
      <h1 className='title'>Busca-Cep</h1>

      <div className="containerInput"> 
              
        <input type='text' 
        placeholder='Digite o Cep...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
          
          <button className="buttonSearch" onClick={handlesearch}> 
            <ImSearch size={25} color='#f1f1f1'/>
          </button>
      </div>

      <main className='main'>
        <h2>CEP: {input}</h2>

        <span>Rua {cep.logradouro}</span>
        <span>Bairro {cep.bairro}</span>
        <span>{cep.localidade}</span>
        <span>{cep.uf}</span>

      </main>
    </div>
  );
}

export default App;
