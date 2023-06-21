import {useState, useContext} from "react"
import { CoffeeContext } from "./Context/coffee"

function AddCoffee(){
  const {user, coffee, setCoffee} = useContext(CoffeeContext)
  const [name, setName] = useState("")
  const [origin, setOrigin]= useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState([])

  function onAddCoffee(newCoffee){
    setCoffee([...coffee, newCoffee])
    console.log(coffee)
  }
  

    function handleSubmit(e){
      e.preventDefault();
      fetch("/coffee", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          origin,
          notes,
          user_id: user.id
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((newCoffee) => onAddCoffee(newCoffee));
          alert('coffee has been created!')
        } else {
          alert('you made it to me')
          r.json().then((errorData) => setErrors(errorData.errors));
        }
      });

    }
    return(
        <div>
            <h1>Share your own blend:</h1>
            <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label htmlFor="origin">Origin: </label>
        <input
          type="text"
          id="origin"
          autoComplete="off"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
        <br></br>
        <label htmlFor="notes">Notes: </label>
        <input
          type="text"
          id="notes"
          autoComplete="off"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <br></br>
        
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
      {errors.map((error) => (
        <li key={error}>{error}</li>
        ))}
    </ul>
  )}
  <button type="Submit">Share your blend</button>
      </form>
            
        </div>
        )}
export default AddCoffee;
