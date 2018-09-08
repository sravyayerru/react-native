import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE,
    SEARCH_PRODUCT
} from "../actionTypes/product";

export default (prevState = {
    products: [],
    product: {},
    isLoading: false,
    isRefreshing: false,
    page: 1,
    limit: 8
}, action) => {
    console.log(action.type);
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...prevState,
                isLoading: prevState.products.length > 0 ? false:true,
                page: action.page
            }
        case GET_PRODUCTS_SUCCESS:
            return { ...prevState,
                isLoading: false,
                products: prevState.products.concat(action.products)
            }
        case GET_PRODUCT:
            return { ...prevState,
                isLoading: true
            }
        case GET_PRODUCT_SUCCESS:
            return { ...prevState,
                isLoading: false,
                product: action.product
            }
      
        case GET_PRODUCTS_FAILURE:
        case GET_PRODUCT_FAILURE:
        return {
            ...prevState,
            isLoading: false,
            error: action.error
          };
        case SEARCH_PRODUCT:
          return {
            ...prevState,
            isLoading: false,
            filteredProducts:
              action.itemName.length > 0
                ? action.products.filter(tmpProduct =>
                    tmpProduct.title.includes(action.itemName)
                  )
                : []
          };
        default:
            return prevState;

    }
}