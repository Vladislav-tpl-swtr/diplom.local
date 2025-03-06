import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Cart from "./pages/Cart"
import FavoritePage from "./pages/FavoritePage"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import RecommendationPage from "./pages/ReccomendationPage"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, CART_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, RECCOMENDATION_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: FAVORITE_ROUTE,
        Component: FavoritePage
    },
    {
        path: RECCOMENDATION_ROUTE,
        Component: RecommendationPage
    }
    
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: HomePage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    }
]