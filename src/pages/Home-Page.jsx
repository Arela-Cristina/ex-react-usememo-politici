import { useState, useEffect } from "react"
import style from './Home-Page.module.css'

export default function HomePage() {

    const [politician, setPolitician] = useState([])
    console.log('risultato fetch', politician)

    function fetchPoliticians() {

        fetch(`https://rickandmortyapi.com/api/character`)
            .then(response => response.json())
            .then(data => setPolitician(data.results))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchPoliticians()
    }, [])


    return (
        <>
            <h1>Mostri</h1>
            <section>
                {politician.map((p, i) => (
                    <figure key={i}>
                        <img src={p.image} alt={p.name} />
                        <div className={style.caption}>
                            <div>Nome: {p.name} </div>
                            <div>Posizione: {p.species}</div>
                            <div>Biography: {p.gender}</div>
                        </div>

                    </figure>
                ))}
            </section></>



    )
}