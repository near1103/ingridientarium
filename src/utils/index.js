
export async function fetchRecipes(filter) {
    const {query, limit} = filter;

    const uri = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=${limit}&`;

    const response = await fetch(uri, {
        headers: {
            'Edamam-Account-User': 'near1103'  // Замените 'your_user_id' на ваш настоящий userID от Edamam
        }
    });

    const data = await response.json();

    return data?.hits;
}

export async function fetchRecipe(id){
    const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`

    const response = await fetch(url, {
        headers: {
            'Edamam-Account-User': 'near1103'  // Замените 'your_user_id' на ваш настоящий userID от Edamam
        }
    });

    const data = await response.json();

    return data[0];
}