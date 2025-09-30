import pages from '../pages/';


const routes = [
    {
        path: "/vendor-dashboard",
        component: pages.VendorDashboard,
        exact: true,
        isPrivate: true,
        isLogin: false
    },
    {
        path: "/add-new-product",
        component: pages.AddNewProduct,
        exact: true,
        isPrivate: true,
        isLogin: false
    },
    {
        path: "/upload-images/:productId",
        component: pages.UploadImages,
        exact: true,
        isPrivate: true,
        isLogin: false
    },
    {
        path: "/edit-product/:productId",
        component: pages.EditProduct,
        exact: true,
        isPrivate: true,
        isLogin: false
    },
    {
        path: "/login-seller",
        component: pages.Login,
        exact: true,
        isPrivate: false,
        isLogin: true
    },
    {
        path: "/",
        component: pages.FrontPage,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/login",
        component: pages.Login,
        exact: true,
        isPrivate: false,
        isLogin: true
    },
    {
        path: "/register",
        component: pages.SignUp,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/cart",
        component: pages.Cart,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/:category/:productId",
        component: pages.Product,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/become-a-seller",
        component: pages.BecomeSeller,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/login-client",
        component: pages.SignInClient,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/register-client",
        component: pages.RegisterClient,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/auth-client",
        component: pages.AuthClient,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/checkout",
        component: pages.Checkout,
        exact: true,
        isPrivate: false,
        isLogin: false
    },
    {
        path: "/orders",
        component: pages.Orders,
        exact: true,
        isPrivate: false,
        isLogin: false
    }
];

export default routes;