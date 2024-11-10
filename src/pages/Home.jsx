import React, {useEffect} from 'react'
import {Header} from "../components/Header";
import Recipes from "../components/Recipes";

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <main className='w-full flex flex-col'>
            <Header
                title={
                    <p>
                        Try something new with
                        <br/> Ingridientarium!
                    </p>
                }
                type='home'
            />
            <section id="recipes" className='md:max-w-[1440px] mx-auto px-4 md:px-20'>
                <Recipes/>
            </section>
        </main>
    )
}
export default Home
