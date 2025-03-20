import React, { useState, useEffect, useMemo } from "react"
import style from './Home-Page.module.css'



export default function HomePage() {

    const Politician = React.memo(({ p }) => {
        console.log("Renderizando Politician:", p.name)
        return (
            <figure>
                <img src={p.image} alt={p.name} />
                <div className={style.caption}>
                    <div>Nome: {p.name}</div>
                    <div>Specie: {p.species}</div>
                    <div>Biography: {p.gender}</div>
                </div>
            </figure>
        );
    });


    // stato della query input  di ricerca
    const [query, setQuery] = useState('')

    // stato di partenza per i mostri
    const [politician, setPolitician] = useState([])
    function fetchPoliticians() {

        fetch(`https://rickandmortyapi.com/api/character`)
            .then(response => response.json())
            .then(data => {
                setPolitician(data.results)
            })

            .catch(err => console.error(err))
    }

    function handleChangeQuery(e) {
        setQuery(e.target.value)
    }

    const filtered = useMemo(() => {
        return politician.filter(p => {
            return p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.species.toLowerCase().includes(query.toLowerCase());
        });
    }, [query, politician])

    console.log(filtered)

    useEffect(() => {
        fetchPoliticians()
    }, [])


    return (
        <>
            <h1>Politicians versione Mostri perche il API di politician era in error 500</h1>
            <div>
                <div>Cerca il tuo mostro</div>
                <input
                    type="text"
                    value={query}
                    onChange={handleChangeQuery} />
            </div>

            <section>
                {filtered.map((p, i) => (
                    <Politician key={i} p={p} />
                ))}
            </section>
        </>
    )
}