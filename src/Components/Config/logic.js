export const isPresentinFavorites = (favorites,restaurant) => { // here favorites is the list of restaurants and restaurant is a single restaurant.
    for(let item of favorites){
        if(restaurant.id == item.id){
            return true
        }
    }

    return false;
}