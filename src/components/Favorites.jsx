import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import { Header } from '../components/Header';

const Favorites = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    const fetchRecipeById = async (id) => {
        try {
            const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`;

            const response = await fetch(url, {
                headers: {
                    'Edamam-Account-User': 'near1103'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return {
                recipe: data[0]
            };
        } catch (error) {
            console.error("Error fetching recipe:", error);
            return null;
        }
    };

    const fetchSavedRecipes = async (userId) => {
        try {
            setLoading(true);
            // Get user's saved recipe IDs from Firestore
            const userDoc = await getDoc(doc(db, 'users', userId));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const recipeIds = userData.recipes || [];

                // Fetch each recipe individually
                const recipePromises = recipeIds.map(id => fetchRecipeById(id));
                const recipesData = await Promise.all(recipePromises);

                // Filter out null results and set recipes
                const validRecipes = recipesData.filter(recipe => recipe !== null);
                setSavedRecipes(validRecipes);
            }
        } catch (error) {
            console.error("Error fetching saved recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                fetchSavedRecipes(user.uid);
            } else {
                setSavedRecipes([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return (
            <div className='w-full h-[100vh] flex items-center justify-center'>
                <Loading />
            </div>
        );
    }

    if (!user) {
        return (
            <div className='w-full min-h-[calc(100vh-80px)]'>
                <Header title="Favorites" />
                <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
                    <p className='text-white text-2xl font-semibold'>Please sign in to see your favorites</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-[calc(100vh-80px)]'>
            <Header title="Your Favorite Recipes" />

            <div className='w-full px-4 lg:px-20 pt-5'>
                {savedRecipes.length === 0 ? (
                    <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
                        <p className='text-white text-2xl font-semibold'>No saved recipes yet</p>
                        <p className='text-gray-400 mt-2'>Your favorite recipes will appear here</p>
                    </div>
                ) : (
                    <>
                        <p className='text-white text-2xl mb-6'>
                            You have {savedRecipes.length} saved {savedRecipes.length === 1 ? 'recipe' : 'recipes'}
                        </p>

                        <div className='flex flex-wrap gap-10 items-center justify-center px-4 pb-20'>
                            {savedRecipes.map((recipe, index) => (
                                <RecipeCard
                                    key={index}
                                    recipe={recipe}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Favorites;