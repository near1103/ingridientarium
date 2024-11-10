import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {fetchRecipe, fetchRecipes} from "../utils";
import Loading from "../components/Loading";
import {Header} from "../components/Header";
import {AiFillPushpin} from "react-icons/ai";
import {BsPatchCheck} from "react-icons/bs";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import RecipeCard from "../components/RecipeCard";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null)
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [user, setUser] = useState(null)

    const {id} = useParams()
    const auth = getAuth();
    const db = getFirestore();

    const checkIfSaved = async (userId) => {
        if (!userId) return;

        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setIsSaved(userData.recipes?.includes(id) || false);
            }
        } catch (error) {
            console.error("Error checking saved status:", error);
        }
    };

    const handleSaveRecipe = async () => {
        if (!user) return;

        try {
            const userRef = doc(db, 'users', user.uid);

            if (isSaved) {
                await updateDoc(userRef, {
                    recipes: arrayRemove(id)
                });
                setIsSaved(false);
            } else {
                await updateDoc(userRef, {
                    recipes: arrayUnion(id)
                });
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    const getRecipe = async (id) => {
        try {
            setLoading(true)
            const data = await fetchRecipe(id)
            setRecipe(data)
            const recommend = await fetchRecipes({query: recipe?.label, limit:6})
            setRecipes(recommend)
            setLoading(false)
        } catch(error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() => {
        getRecipe(id)
        window.scrollTo(0, 0);
    }, [id])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                checkIfSaved(user.uid);
            }
        });

        return () => unsubscribe();
    }, [auth, id]);

    if(loading) {
        return (
            <div className='w-full h-[100vh] flex items-center justify-center'>
                <Loading/>
            </div>
        );
    }

    return (
        <div className='w-full'>
            <Header
                title={recipe?.label}
                image={recipe?.image}
            />

            {/* Save Button */}
            <div className="flex justify-center mt-4">
                {user ? (
                    <button
                        onClick={handleSaveRecipe}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                            isSaved
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                        {isSaved ? (
                            <>
                                <AiFillHeart /> Saved
                            </>
                        ) : (
                            <>
                                <AiOutlineHeart /> Save to Favorites
                            </>
                        )}
                    </button>
                ) : (
                    <p className="text-gray-400">Sign up to save in favorites</p>
                )}
            </div>

            <div className='w-full px-4 lg:px-20 pt-5'>
                <div className='flex gap-10 items-center justify-center px-4'>
                    <div className='flex flex-col justify-between'>
                        <span className='text-white text-center border border-gray-500 py-1.5 px-2 rounded-full mb-2'>
                            {recipe?.calories.toFixed(2)}
                        </span>
                        <p className='text-neutral-100 text-[12px] md:text-md'>CALORIES</p>
                    </div>

                    <div className='flex flex-col justify-center'>
                        <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
                          {recipe?.totalTime}
                        </span>
                        <p className='text-neutral-100 text-[12px] md:text-md'>
                            TOTAL TIME
                        </p>
                    </div>

                    <div className='flex flex-col justify-center'>
                        <span className='text-white text-center border border-gray-500 py-1.5 rounded-full mb-2'>
                          {recipe?.yield}
                        </span>
                        <p className='text-neutral-100 text-[12px] md:text-md'>SERVINGS</p>
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row gap-8 py-20 px-4 md:px-10'>
                    {/*LEFT SIDE*/}
                    <div className='w-full md:w-2/4 md:border-r border-slate-800 pr-1'>
                        <div className='flex flex-col gap-5'>
                            <p className='text-gray-200 text-2xl underline'>Ingredients</p>
                            {
                                recipe?.ingredientLines?.map((ingredient, index) => {
                                    return (
                                        <p key={index} className='text-neutral-100 flex gap-2'>
                                            <AiFillPushpin className='text-gray-400 text-xl'/> {ingredient}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        <div className='flex flex-col gap-3 mt-20'>
                            <p className='text-gray-300 text-2xl underline'>Health Labels</p>

                            <div className='flex flex-wrap gap-4'>
                                {
                                    recipe?.healthLabels.map((item, index) => (
                                        <p className='text-white flex gap-2 items-center bg-[#fff5f518] px-2 py-1 rounded-full '
                                           key={index}>
                                            <BsPatchCheck className='align-middle' color='gray'/> {item}
                                        </p>
                                    ))
                                }

                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className='w-full md:w-2/4 2xl:pl-10 mt-20 md:mt-0'>
                        {
                            recipes?.length > 0 && (
                                <>
                                    <p className='text-white text-2xl'>Also Try This</p>

                                    <div className='flex flex-wrap gap-6 px-1 pt-3'>
                                        {
                                            recipes?.map((item, index) => (
                                                <RecipeCard recipe={item} index={index} />
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetail