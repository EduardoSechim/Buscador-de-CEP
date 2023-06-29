import { useState } from "react";
import { ImSearch } from 'react-icons/im';
import axios from 'axios';
import './styles.css';
  
let response = []

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function BuscaCep(){
   
    if (input.trim() != "") {
      try {
        const api = axios.create({baseURL: "https://viacep.com.br/ws/"})
        response = await api.get(`${input}/json`)
        setCep(response.data)

        if (response.data.erro) {
          alert('Cep inexistente.')
          setCep([])
          return
        }
      } catch {
        alert('Insira um Cep Válido')
        setInput('')
        setCep([])
      }
    }
  }

  return (
    <div className="container">
      
      <h1 className='title'>Busca-Cep</h1>

      <div className="containerInput"> 
        <input type='text' maxlength="9" placeholder='Digite o Cep...' value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="buttonSearch" onClick={BuscaCep}> 
            <ImSearch size={25} color='#f1f1f1'/>
          </button>
      </div>

      {Object.keys(cep).length > 1 && (

        <main className='main'>

          <h2>CEP: {cep.cep}</h2>

          <span>Rua {cep.logradouro}</span>
          <span>Bairro {cep.bairro}</span>
          <span>{cep.localidade}</span>
          <span>{cep.uf}</span>

        </main>
      )}
      <footer> Projeto feito com React por Eduardo Sechim Carreiro. </footer> 
    </div>
  );
}

export default App;
