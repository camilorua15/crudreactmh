import React, {useState} from 'react';
import uniqid from 'uniqid';

const Listadodenombres = () => {

  const [nombre, setNombre] = useState('')
  const [listadenombres, setListadenombres] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const addNombres = (e) => {
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre está vacío')
      return
    }
    const nuevoNombre = {
      id: uniqid(),
      titulonombre: nombre
    }
    setListadenombres([...listadenombres,nuevoNombre])
    setNombre('')
    setError(null)
  }
  const deleteNombre = (id) => {
    const nuevoArray = listadenombres.filter( item => item.id !== id)
    setListadenombres(nuevoArray)
  }
  const editar = (item) => {
    setModoEdicion(true)
    setNombre(item.titulonombre)
    setId(item.id)
  }
  const editarNombre = (e) => {
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre está vacío')
      return
    }
    const nuevoArray1 = listadenombres
    .map( item => item.id === id ? {id:item.id, titulonombre: nombre}:item)
    setListadenombres(nuevoArray1)
    setModoEdicion(false)
    setNombre('')
    setError(null)
  }

  return (
    <div>
      <h2>Aplicación CRUD BASICA por Camilo Rúa</h2>
      <div className="row">
        <div className="col">
          <h2>Listado de nombres</h2>
          <ul className="list-group">
            {
              listadenombres.map( item =>
                <li key={item.id} className="list-group-item">
                  {item.titulonombre}
                  <button 
                    className="btn btn-danger float-end mx-2"
                    onClick={() => {deleteNombre(item.id)}}
                  >
                    Borrar
                  </button>
                  <button 
                    className="btn btn-info float-end mx-2"
                    onClick={() => {editar(item)}}
                  >
                    Editar
                  </button>
                </li>
              )
            }
          </ul>
        </div>
        <div className="col">
          <h2>Formulario para añadir nombres</h2>
          <form onSubmit={modoEdicion ? editarNombre : addNombres} className="form-group">
            <input
              onChange={(e) => {setNombre(e.target.value)}}
              className="form-control mb-3"
              type="text"
              placeholder="Introduce el nombre"
              value={nombre}
            />
            <input 
              className="btn btn-success btn-block w-100"
              type="submit"
              value={modoEdicion ? 'Editar nombre':'Registrar nombre'}
            />
          </form>
          {
            error != null ? (
              <div className="alert alert-danger mt-2">
                {error}
              </div>
            ):
            (
              <div></div>
            ) 
          }
        </div>
      </div>
    </div>
  )
}

export default Listadodenombres